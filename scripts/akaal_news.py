"""
╔══════════════════════════════════════════════════════════════════╗
║     Akaalibani — Punjabi News CLI (Vertex AI + Imagen 3)        ║
║  700+ word SEO-optimized articles with AI-generated images      ║
╚══════════════════════════════════════════════════════════════════╝

Usage:  python scripts/akaal_news.py

Requirements:
    google-auth  requests  python-dotenv  rich
"""

import base64
import json
import os
import random
import re
import sys
import time
import uuid
from datetime import datetime, timezone

import requests as http_requests
from dotenv import load_dotenv
from google.oauth2 import service_account
import google.auth.transport.requests
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.rule import Rule
from rich.text import Text

# ── Project root ─────────────────────────────────────────────────────────────
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.abspath(os.path.join(_SCRIPT_DIR, ".."))
load_dotenv(os.path.join(_PROJECT_ROOT, ".env"))
load_dotenv(os.path.join(_PROJECT_ROOT, ".env.local"))

console = Console()

# ── Constants ────────────────────────────────────────────────────────────────
CATEGORIES = ["punjab", "international", "national", "heritage",
              "education", "business", "agriculture", "science",
              "sports", "entertainment", "technology"]

# Punjabi display labels for each category slug — used when auto-creating
# missing category documents in Sanity.
CATEGORY_LABELS = {
    "punjab": "ਪੰਜਾਬ",
    "international": "ਵਿਦੇਸ਼",
    "national": "ਦੇਸ਼",
    "heritage": "ਵਿਰਾਸਤ",
    "education": "ਸਿੱਖਿਆ",
    "business": "ਕਾਰੋਬਾਰ",
    "agriculture": "ਖੇਤੀ",
    "science": "ਸਾਇੰਸ",
    "sports": "ਖੇਡਾਂ",
    "entertainment": "ਮਨੋਰੰਜਨ",
    "technology": "ਟੈਕਨੋਲੋਜੀ ਅਤੇ AI",
}

GEMINI_MODEL = "gemini-2.5-flash"
IMAGEN_MODEL = "imagen-3.0-generate-002"

# ── Gemini System Prompt — Natural Punjabi newsroom voice ────────────────────

SYSTEM_INSTRUCTION = """Act as a Senior Punjabi Editor for Akaalibani.com.

Your task: Given a URL or topic, write a detailed SEO-optimized Punjabi news article in Gurmukhi script.

WRITING RULES:
- Write ONLY in Punjabi Gurmukhi script
- Headline must be punchy, natural, newsroom conversational Punjabi; avoid overly formal or bookish phrasing
- Tone must be professional but natural, never overly literary
- Use hybrid Punjabi with common English loanwords in Gurmukhi where natural (e.g. ਅਲਟੀਮੇਟਮ, ਬਜਟ, ਕੂਟਨੀਤੀ, ਬੁਨਿਆਦੀ ਢਾਂਚਾ)
- For important financial/technical keywords, include Punjabi Gurmukhi with English keyword in parentheses, e.g. ਸੋਨੇ ਦੇ ਭਾਅ (Gold price)
- NEVER use bold markdown (**text**)
- Follow Mukta Mahee style conventions
- Use Google Search to include latest facts and data in the article
- Use a soft infographic structure: clear section headers + concise explanatory flow

SEO RULES:
1. SLUG: English only, lowercase, hyphens, keyword-rich, 3-6 words (e.g. punjab-deputy-cm-offer-skm-ayali)
2. TITLE: Punjabi, 50-70 characters, include the main keyword
3. META DESCRIPTION: Punjabi, 140-155 characters, summary for Google search results
4. HEADINGS: Each section heading in Punjabi with searchable keywords (h2 style)

OUTPUT FORMAT - return ONLY valid JSON, no markdown, no code blocks, no extra text:

{
  "title": "Punjabi headline 50-70 chars with main keyword",
  "slug": "english-seo-keyword-slug-3-to-6-words",
  "metaDescription": "Punjabi 140-155 char Google search description",
  "heroImagePrompt": "Photorealistic high-resolution image of a Punjab or India scene related to the article. Golden hour lighting, cinematic wide shot, vibrant natural colors, professional photojournalism style. NO text, NO watermarks, NO faces of people.",
  "sections": [
    {
      "heading": "Punjabi section heading with keyword",
      "content": "Minimum 120 words of detailed Punjabi content with facts and analysis."
    }
  ],
    "bulletPoints": ["3-5 total Punjabi key takeaway bullets for the whole article"],
    "tags": ["3-5 broad English SEO tags like punjab news, india politics, punjab farming"],
    "search_tags": ["4-8 specific searchable subject keywords from article context"]
}

CRITICAL RULES:
1. Write 4-5 sections minimum. Each section must be 120+ words.
2. Total article word count should follow the user-requested target word count.
3. heroImagePrompt must be 50+ words, Punjab/India visual context, NO text in image.
4. Do NOT generate FAQ section. Put all important information in the main body.
5. Slug must be English only - SEO-friendly keywords separated by hyphens.
6. Output ONLY valid JSON. Nothing else - no preamble, no explanation."""


# ══════════════════════════════════════════════════════════════════════════════
# AUTH — Get Vertex AI access token
# ══════════════════════════════════════════════════════════════════════════════

def _get_token() -> str:
    key_path = os.path.join(_PROJECT_ROOT, "gcp-key.json")
    if not os.path.exists(key_path):
        console.print(f"[bold red]ERROR:[/] gcp-key.json not found at:\n  {key_path}")
        sys.exit(1)

    creds = service_account.Credentials.from_service_account_file(
        key_path, scopes=["https://www.googleapis.com/auth/cloud-platform"]
    )
    auth_req = google.auth.transport.requests.Request()
    creds.refresh(auth_req)
    return creds.token


def _vertex_url(model: str, method: str = "generateContent") -> str:
    project = os.environ.get("GCP_PROJECT_ID")
    location = os.environ.get("GCP_LOCATION", "us-central1")
    return f"https://{location}-aiplatform.googleapis.com/v1/projects/{project}/locations/{location}/publishers/google/models/{model}:{method}"


# ══════════════════════════════════════════════════════════════════════════════
# 1. GEMINI — Generate article with Google Search grounding
# ══════════════════════════════════════════════════════════════════════════════

def call_gemini(user_input: str, is_url: bool, preferred_word_count: int, subject_names: list[str]) -> dict:
    if not os.environ.get("GCP_PROJECT_ID"):
        console.print("[bold red]ERROR:[/] GCP_PROJECT_ID not set in .env")
        sys.exit(1)

    subjects_line = ", ".join(subject_names) if subject_names else "None provided"
    if is_url:
        prompt = (
            "Is news article URL ton jaankari lo te ik natural Punjabi newsroom style khabar likho.\n"
            f"Source URL: {user_input}\n"
            f"Preferred word count target: {preferred_word_count}\n"
            f"Primary subject names to prioritize as tags: {subjects_line}\n"
            "Important: No FAQ. Keep soft infographic flow and 3-5 total bullets only."
        )
    else:
        prompt = (
            "Is topic baare Google Search karke tazaa jaankari naal natural Punjabi newsroom style khabar likho.\n"
            f"Topic: {user_input}\n"
            f"Preferred word count target: {preferred_word_count}\n"
            f"Primary subject names to prioritize as tags: {subjects_line}\n"
            "Important: No FAQ. Keep soft infographic flow and 3-5 total bullets only."
        )

    console.print("\n[dim]  Gemini naal gall ho rahi ae...[/dim]")

    MAX_RETRIES = 2
    for attempt in range(MAX_RETRIES + 1):
        try:
            if attempt > 0:
                wait = attempt * 15
                console.print(f"[yellow]  Retry {attempt}/{MAX_RETRIES} — {wait}s baad...[/]")
                time.sleep(wait)

            token = _get_token()
            url = _vertex_url(GEMINI_MODEL)

            body = {
                "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                "systemInstruction": {"role": "system", "parts": [{"text": SYSTEM_INSTRUCTION}]},
                "tools": [{"googleSearch": {}}],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 8192,
                },
            }

            resp = http_requests.post(
                url,
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                json=body,
                timeout=90,
            )
            resp.raise_for_status()

            result = resp.json()
            text = result["candidates"][0]["content"]["parts"][0]["text"]
            if not text:
                raise Exception("Empty response")

            return _parse_response(text)

        except http_requests.exceptions.HTTPError as exc:
            status = exc.response.status_code if exc.response else 0
            console.print(f"[red]HTTP {status} error:[/] {exc.response.text[:600] if exc.response else str(exc)}")
            if status == 429 and attempt < MAX_RETRIES:
                continue
            if status == 404:
                console.print(f"[bold red]ERROR:[/] Model not found.")
                sys.exit(1)
            raise

    raise RuntimeError("All retries failed")


def _parse_response(raw: str) -> dict:
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip().strip("`").strip()
    match = re.search(r"\{.*\}", cleaned, re.DOTALL)
    if not match:
        console.print(f"[red]Response parse fail:[/]\n{raw[:500]}")
        sys.exit(1)

    data = json.loads(match.group())

    # Validate required fields
    for key in ("title", "slug", "sections", "heroImagePrompt"):
        if key not in data:
            console.print(f"[red]'{key}' field missing.[/]")
            sys.exit(1)

    if "search_tags" not in data:
        data["search_tags"] = data.get("tags", [])

    # Clean slug
    data["slug"] = re.sub(r"[^a-z0-9-]", "", data["slug"].lower().strip()).strip("-")[:96]
    if len(data["slug"]) < 5:
        data["slug"] = f"punjab-news-{int(datetime.now(timezone.utc).timestamp())}"

    # Sanitize tags
    if not isinstance(data.get("tags"), list):
        data["tags"] = []
    data["tags"] = [str(t).strip() for t in data.get("tags", []) if str(t).strip()]

    if not isinstance(data.get("search_tags"), list):
        data["search_tags"] = []
    data["search_tags"] = [str(t).strip().lower() for t in data.get("search_tags", []) if str(t).strip()]

    return data


# ══════════════════════════════════════════════════════════════════════════════
# 2. IMAGEN 3 — AI Image Generation (same approach as spacehindi)
# ══════════════════════════════════════════════════════════════════════════════

def generate_image(prompt: str) -> bytes | None:
    """Generate image using Vertex AI Imagen 3, return PNG bytes or None."""
    console.print("[dim]  AI image generate ho rahi ae...[/dim]")

    try:
        token = _get_token()
        url = _vertex_url(IMAGEN_MODEL, "predict")

        body = {
            "instances": [{"prompt": prompt}],
            "parameters": {
                "sampleCount": 1,
                "aspectRatio": "16:9",
                "safetyFilterLevel": "block_few",
                "personGeneration": "dont_allow",
            },
        }

        resp = http_requests.post(
            url,
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json=body,
            timeout=60,
        )

        if resp.status_code == 429:
            console.print("[yellow]  Imagen rate-limit, 30s wait...[/]")
            time.sleep(30)
            token = _get_token()
            resp = http_requests.post(
                url,
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                json=body,
                timeout=60,
            )

        resp.raise_for_status()
        result = resp.json()
        b64 = result.get("predictions", [{}])[0].get("bytesBase64Encoded")

        if not b64:
            console.print("[yellow]  Image generate nahi hoi (safety filter).[/]")
            return None

        img_bytes = base64.b64decode(b64)
        console.print(f"[green]  Image generated ({len(img_bytes) // 1024} KB)[/]")
        return img_bytes

    except Exception as exc:
        console.print(f"[yellow]  Image generation fail: {exc}[/]")
        return None


def _mime_from_path(path: str) -> str:
    ext = os.path.splitext(path.lower())[1]
    if ext in (".jpg", ".jpeg"):
        return "image/jpeg"
    if ext == ".webp":
        return "image/webp"
    if ext == ".gif":
        return "image/gif"
    return "image/png"


def _normalize_tag_token(tag: str) -> str:
    token = re.sub(r"[^a-z0-9]+", "_", tag.lower()).strip("_")
    return token


def _auto_pick_local_image(search_tags: list[str]) -> tuple[bytes, str] | None:
    folder = os.path.join(_PROJECT_ROOT, "images", "default_pics")
    if not os.path.isdir(folder):
        console.print(f"[yellow]  Local folder nahi mili:[/] {folder}")
        return None

    all_files = [
        os.path.join(folder, f)
        for f in os.listdir(folder)
        if os.path.isfile(os.path.join(folder, f))
        and os.path.splitext(f.lower())[1] in (".png", ".jpg", ".jpeg", ".webp", ".gif")
    ]
    if not all_files:
        console.print("[yellow]  images/default_pics folder vich image files nahi miliyan.[/]")
        return None

    token_candidates = []
    for tag in search_tags:
        token = _normalize_tag_token(tag)
        if token:
            token_candidates.append(token)

    matched = []
    for path in all_files:
        filename = os.path.basename(path).lower()
        if any(token in filename for token in token_candidates):
            matched.append(path)

    if not matched:
        console.print("[yellow]  search_tags de mutabik local image match nahi mili.[/]")
        return None

    pick = random.choice(matched)
    with open(pick, "rb") as f:
        img_bytes = f.read()
    console.print(f"[green]  Local image auto-pick hoi:[/] {os.path.basename(pick)}")
    return (img_bytes, _mime_from_path(pick))


def _select_image_for_publish(article: dict) -> tuple[bytes, str] | None:
    console.print("\n[bold yellow]Image Selector[/]")
    console.print("  [bold cyan][1][/] Generate AI Image [dim](uses search_tags prompt context)[/]")
    console.print("  [bold cyan][2][/] Auto-Pick from Local Folder [dim](images/default_pics)[/]")
    console.print("  [bold cyan][3][/] Select Custom File [dim](enter full path)[/]")

    choice = Prompt.ask("\n[bold yellow]Image option[/]", choices=["1", "2", "3"], default="1")

    if choice == "1":
        tags = article.get("search_tags", [])
        tags_line = ", ".join(tags) if tags else "Punjab news context"
        ai_prompt = (
            f"{article.get('heroImagePrompt', '')} "
            f"Focus tags: {tags_line}. Headline context: {article.get('title', '')}."
        )
        img = generate_image(ai_prompt)
        return (img, "image/png") if img else None

    if choice == "2":
        return _auto_pick_local_image(article.get("search_tags", []))

    custom_path = Prompt.ask("\n[bold]Image file path paste karo[/]").strip().strip('"')
    if not os.path.isfile(custom_path):
        console.print("[red]Custom image file nahi mili.[/]")
        return None

    with open(custom_path, "rb") as f:
        img_bytes = f.read()
    console.print(f"[green]  Custom image select ho gayi:[/] {custom_path}")
    return (img_bytes, _mime_from_path(custom_path))


# ══════════════════════════════════════════════════════════════════════════════
# 3. SANITY — Publish article with image
# ══════════════════════════════════════════════════════════════════════════════

def _sanity_cfg() -> dict:
    pid = os.environ.get("NEXT_PUBLIC_SANITY_PROJECT_ID")
    dataset = os.environ.get("NEXT_PUBLIC_SANITY_DATASET", "production")
    token = os.environ.get("SANITY_API_WRITE_TOKEN")

    if not pid or not token:
        console.print("[bold red]ERROR:[/] Sanity env vars missing (.env check karo)")
        sys.exit(1)

    base = f"https://{pid}.api.sanity.io/v2024-01-01"
    hdrs = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    return {"base": base, "dataset": dataset, "hdrs": hdrs, "token": token}


def _upload_image_to_sanity(img_bytes: bytes, mime_type: str = "image/png") -> dict | None:
    """Upload image bytes to Sanity and return asset reference."""
    cfg = _sanity_cfg()
    try:
        resp = http_requests.post(
            f"{cfg['base']}/assets/images/{cfg['dataset']}",
            headers={"Authorization": f"Bearer {cfg['token']}", "Content-Type": mime_type},
            data=img_bytes,
            timeout=30,
        )
        resp.raise_for_status()
        aid = resp.json().get("document", {}).get("_id")
        if aid:
            return {"_type": "image", "asset": {"_type": "reference", "_ref": aid}}
    except Exception as exc:
        console.print(f"[yellow]  Sanity image upload fail: {exc}[/]")
    return None


def _category_id(slug: str) -> str:
    """Resolve a Sanity category document _id for the given slug.

    Looks the category up via the POST query API (params in JSON body to avoid
    URL-encoding issues with `$`-prefixed GROQ variables). Auto-creates the
    category if missing. Raises on hard failure so we never publish a post
    with a broken category reference.
    """
    cfg = _sanity_cfg()

    # 1) Look up existing category by slug — POST query, params in JSON body.
    try:
        r = http_requests.post(
            f"{cfg['base']}/data/query/{cfg['dataset']}",
            headers=cfg["hdrs"],
            json={
                "query": '*[_type == "category" && slug.current == $slug][0]{ _id }',
                "params": {"slug": slug},
            },
            timeout=15,
        )
        r.raise_for_status()
        res = r.json().get("result")
        if isinstance(res, dict) and res.get("_id"):
            existing_id = res["_id"]
            # Legacy broken IDs (e.g. "category.agriculture") were created by
            # an older version of this script as placeholders. They look like
            # real refs but no actual document exists at that ID, so any post
            # that references them gets rejected. Skip them and let the
            # create-on-miss path build a real category.
            if existing_id.startswith("category."):
                console.print(
                    f"[yellow]  Ignoring legacy bogus category id:[/] {existing_id}"
                )
            else:
                console.print(f"[dim]  Category resolved:[/] {slug} → {existing_id}")
                return existing_id
    except Exception as exc:
        console.print(f"[yellow]  Category lookup error: {exc}[/]")

    # 2) Not found — create the category document.
    # Use a deterministic ID so we don't depend on mutate response payload
    # shape (some projects return operation metadata without an `id` field).
    deterministic_id = f"category-{slug}"
    title = CATEGORY_LABELS.get(slug, slug)
    new_doc = {
        "_id": deterministic_id,
        "_type": "category",
        "title": title,
        "slug": {"_type": "slug", "current": slug},
    }
    try:
        cr = http_requests.post(
            f"{cfg['base']}/data/mutate/{cfg['dataset']}",
            headers=cfg["hdrs"],
            json={"mutations": [{"create": new_doc}]},
            timeout=20,
        )
        cr.raise_for_status()
        payload = cr.json()
        results = payload.get("results", [])
        if results and results[0].get("id"):
            new_id = results[0]["id"]
            console.print(f"[green]  Created Sanity category:[/] {slug} → {new_id}")
            return new_id

        # Fallback path: create succeeded but no id was returned.
        # Since we created with deterministic _id, we can return it directly.
        if isinstance(results, list) and results:
            console.print(f"[green]  Created Sanity category:[/] {slug} → {deterministic_id}")
            return deterministic_id

        # Last-resort safety: re-query by slug before failing.
        rr = http_requests.post(
            f"{cfg['base']}/data/query/{cfg['dataset']}",
            headers=cfg["hdrs"],
            json={
                "query": '*[_type == "category" && slug.current == $slug][0]{ _id }',
                "params": {"slug": slug},
            },
            timeout=15,
        )
        rr.raise_for_status()
        refetched = rr.json().get("result")
        if isinstance(refetched, dict) and refetched.get("_id"):
            refetched_id = refetched["_id"]
            console.print(f"[green]  Created Sanity category:[/] {slug} → {refetched_id}")
            return refetched_id

        raise RuntimeError(f"unexpected mutate response: {payload}")
    except Exception as exc:
        console.print(f"[red]  Category create failed:[/] {exc}")
        raise RuntimeError(
            f"Could not resolve or create Sanity category '{slug}'. "
            "Check SANITY_API_WRITE_TOKEN permissions and the category schema."
        ) from exc


def _to_portable_text(article: dict) -> list:
    """Convert structured article to Sanity Portable Text blocks."""
    blocks = []

    for section in article.get("sections", []):
        # Section heading as h2
        heading = section.get("heading", "")
        if heading:
            blocks.append({
                "_type": "block", "_key": uuid.uuid4().hex[:12],
                "style": "h2",
                "children": [{"_type": "span", "_key": uuid.uuid4().hex[:12],
                               "text": heading, "marks": []}],
                "markDefs": [],
            })

        # Section content — split into paragraphs
        content = section.get("content", "")
        for para in content.split("\n"):
            para = para.strip()
            if not para:
                continue
            blocks.append({
                "_type": "block", "_key": uuid.uuid4().hex[:12],
                "style": "normal",
                "children": [{"_type": "span", "_key": uuid.uuid4().hex[:12],
                               "text": para, "marks": []}],
                "markDefs": [],
            })

    # Bullet points
    for bp in article.get("bulletPoints", []):
        bp = bp.strip()
        if bp.startswith(("• ", "- ")):
            bp = bp[2:]
        if bp:
            blocks.append({
                "_type": "block", "_key": uuid.uuid4().hex[:12],
                "style": "normal", "listItem": "bullet", "level": 1,
                "children": [{"_type": "span", "_key": uuid.uuid4().hex[:12],
                               "text": bp, "marks": []}],
                "markDefs": [],
            })

    return blocks


def publish_to_sanity(article: dict, source_input: str, is_url: bool, image_payload: tuple[bytes, str] | None) -> bool:
    cfg = _sanity_cfg()

    image_ref = None
    if image_payload:
        img_bytes, mime_type = image_payload
        image_ref = _upload_image_to_sanity(img_bytes, mime_type)

    category_id = _category_id(article["category"])
    console.print(f"[dim]  Using category ref:[/] {article['category']} → {category_id}")
    slug = article["slug"]
    source_url = source_input if is_url else f"https://akaalibani.com/{slug}"

    # Find any existing posts with the same slug — we'll delete them so this
    # publish replaces the old version instead of producing duplicates that
    # confuse the homepage feed (older duplicates with stale categories were
    # winning the GROQ ordering and showing posts under the wrong category).
    existing_ids: list[str] = []
    try:
        qr = http_requests.post(
            f"{cfg['base']}/data/query/{cfg['dataset']}",
            headers=cfg["hdrs"],
            json={
                "query": '*[_type == "post" && slug.current == $slug]._id',
                "params": {"slug": slug},
            },
            timeout=15,
        )
        qr.raise_for_status()
        existing_ids = [i for i in qr.json().get("result", []) if isinstance(i, str)]
    except Exception as exc:
        console.print(f"[yellow]  Duplicate-slug check failed: {exc}[/]")

    if existing_ids:
        console.print(
            f"[yellow]  Found {len(existing_ids)} existing post(s) with slug "
            f"'{slug}' — deleting before re-publish.[/]"
        )

    doc = {
        "_type": "post",
        "title": article["title"],
        "slug": {"_type": "slug", "current": slug},
        "categories": [
            {"_type": "reference", "_ref": category_id, "_key": uuid.uuid4().hex[:12]}
        ],
        "publishedAt": datetime.now(timezone.utc).isoformat(),
        "body": _to_portable_text(article),
        "sourceUrl": source_url,
        "searchTags": article.get("search_tags", []),
        "seoTags": article.get("tags", []),
    }

    if image_ref:
        doc["mainImage"] = {
            **image_ref,
            "caption": article["title"][:100],
            "alt": article.get("metaDescription", article["title"])[:125],
        }

    mutations: list[dict] = []
    for old_id in existing_ids:
        mutations.append({"delete": {"id": old_id}})
    mutations.append({"create": doc})

    try:
        r = http_requests.post(
            f"{cfg['base']}/data/mutate/{cfg['dataset']}",
            headers=cfg["hdrs"],
            json={"mutations": mutations},
            timeout=30,
        )
        r.raise_for_status()
        console.print(f"\n[bold green]  Sanity te publish ho gaya![/bold green]")
        console.print(f"   Slug: [cyan]{slug}[/cyan]")
        console.print(f"   URL:  [dim]https://akaalibani.com/news/{slug}[/dim]")
        return True
    except http_requests.HTTPError as exc:
        console.print(f"\n[bold red]  Publish fail:[/bold red] {exc}")
        console.print(f"   [dim]{r.text[:500]}[/dim]")
        return False


# ══════════════════════════════════════════════════════════════════════════════
# 4. CLI — Main Loop
# ══════════════════════════════════════════════════════════════════════════════

def print_banner():
    t = Text()
    t.append("  AKAALIBANI.COM  ", style="bold yellow")
    t.append("— Punjabi News Automation  ", style="dim white")
    t.append("[Vertex AI + Imagen 3]", style="dim cyan")
    console.print(Panel(t, border_style="yellow", padding=(0, 2)))


def print_menu():
    console.print(Rule(style="dim yellow"))
    console.print("  [bold cyan][1][/]  Link paste karo  [dim](news article URL)[/]")
    console.print("  [bold cyan][2][/]  Topic likho       [dim](e.g. 'Canada visa update')[/]")
    console.print("  [bold cyan][q][/]  Bahar niklo")
    console.print(Rule(style="dim yellow"))


def run():
    print_banner()

    while True:
        print_menu()
        choice = Prompt.ask(
            "\n[bold yellow]Apni choice[/]", choices=["1", "2", "q"], default="q"
        )

        if choice == "q":
            console.print("\n[dim]Sat Sri Akal![/dim]\n")
            break

        is_url = choice == "1"

        if is_url:
            user_input = Prompt.ask("\n[bold]News article da link paste karo[/]").strip()
            if not user_input.startswith("http"):
                console.print("[red]Valid URL nahi lagdi. Dobara koshish karo.[/]")
                continue
        else:
            user_input = Prompt.ask("\n[bold]Topic likho[/]").strip()
            if not user_input:
                console.print("[red]Topic khali nahi ho sakda.[/]")
                continue

        preferred_word_count = Prompt.ask(
            "\n[bold]Enter preferred word count for article[/] [dim](e.g., 500)[/]",
            default="700",
        ).strip()
        if not preferred_word_count.isdigit():
            preferred_word_count = "700"

        subjects_input = Prompt.ask(
            "\n[bold]Enter primary subject names for tags[/] [dim](comma separated)[/]",
            default="",
        ).strip()
        subject_names = [s.strip() for s in subjects_input.split(",") if s.strip()]

        # ── Generate article ─────────────────────────────────────────────
        try:
            article = call_gemini(user_input, is_url, int(preferred_word_count), subject_names)
        except SystemExit:
            continue
        except Exception as exc:
            console.print(f"[bold red]Gemini error:[/bold red] {exc}")
            continue

        # ── Preview ──────────────────────────────────────────────────────
        console.print(Rule("[bold yellow]Article Preview[/]", style="yellow"))
        console.print(f"\n  [bold]Title:[/]    {article['title']}")
        console.print(f"  [bold]Slug:[/]     [cyan]{article['slug']}[/]")
        console.print(f"  [bold]Meta:[/]     [dim]{article.get('metaDescription', 'N/A')}[/]")
        console.print(f"  [bold]Sections:[/] {len(article.get('sections', []))}")
        console.print(f"  [bold]Tags:[/]     {', '.join(article.get('tags', []))}")
        console.print(f"  [bold]Search Tags:[/] {', '.join(article.get('search_tags', []))}")

        # Show first section preview
        if article.get("sections"):
            first = article["sections"][0]
            preview = first.get("content", "")[:200] + "..."
            console.print(Panel(
                f"[bold]{first.get('heading', '')}[/]\n\n{preview}",
                title="[dim]First Section Preview[/]",
                border_style="dim",
                padding=(1, 2),
            ))

        # ── Manual category selection ────────────────────────────────────
        console.print("\n[bold yellow]Category chuno:[/]")
        for idx, cat in enumerate(CATEGORIES, start=1):
            console.print(f"  [bold cyan][{idx}][/] {cat}")
        cat_choice = Prompt.ask(
            "\n[bold yellow]Category number[/]",
            choices=[str(i) for i in range(1, len(CATEGORIES) + 1)],
            default="6",
        )
        article["category"] = CATEGORIES[int(cat_choice) - 1]
        console.print(f"  [green]Selected:[/] [cyan]{article['category']}[/]")

        image_payload = _select_image_for_publish(article)

        # ── Confirm ──────────────────────────────────────────────────────
        confirm = Prompt.ask(
            "\n[bold yellow]Sanity te publish kariye?[/] [dim](y/n)[/]",
            choices=["y", "n"],
            default="n",
        )

        if confirm == "y":
            try:
                publish_to_sanity(article, user_input, is_url, image_payload)
            except SystemExit:
                continue
            except Exception as exc:
                console.print(f"[bold red]Publishing error:[/bold red] {exc}")
        else:
            console.print("[dim]Skip kita gaya.[/]")

        # ── Again? ───────────────────────────────────────────────────────
        again = Prompt.ask(
            "\n[dim]Koi hor khabar likhni ae?[/]", choices=["y", "n"], default="y"
        )
        if again == "n":
            console.print("\n[dim]Sat Sri Akal![/dim]\n")
            break


if __name__ == "__main__":
    run()
