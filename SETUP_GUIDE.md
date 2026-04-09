# 🚀 Akaalibani News Hub - Complete Setup Guide

## Overview

You now have a **fully functional news automation system** with:
- ✅ Interactive Terminal CLI
- ✅ 11 News Categories
- ✅ Vertex AI (Gemini) Rewriting via GCP
- ✅ Sanity CMS Publishing
- ✅ SQLite Logging

---

## Step 1: Get API Keys (5-10 minutes)

### A. Sanity Project ID & Write Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click your **Akaalibani project**
3. **Settings** → Copy your **Project ID** (e.g., `abc123def456`)
4. **API** → **Tokens** → **Add Token**
   - Name: `cli-write`
   - Role: Select **Editor**
   - Copy the token (won't be shown again!)

### B. Google Cloud (Vertex AI) Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (or create one)
3. **Enable APIs:**
   - Enable "Vertex AI API"
   - Enable "Cloud Generative AI API"
4. **Create Service Account:**
   - Go to **Service Accounts** → **Create Service Account**
   - Name: `akaalibani-news`
   - Grant role: **Vertex AI Service Agent** and **Generative Language API Service User**
5. **Create & Download Key:**
   - Click the service account → **Keys** → **Add Key** → **Create new key**
   - Choose **JSON** format
   - Save as `gcp-key.json` in project root (`E:/Github Hosting/akaalbani/`)
6. **Get Project ID:**
   - Go to **Project Settings** → Copy your **Project ID**

---

## Step 2: Create `.env` File (2 minutes)

**Location:** `E:/Github Hosting/akaalbani/.env`

**Open Notepad or VS Code and paste:**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your-sanity-write-token-here
GCP_PROJECT_ID=your-gcp-project-id-here
GCP_LOCATION=us-central1
```

**Replace:**
- `your-sanity-project-id-here` → Your actual Sanity Project ID
- `your-sanity-write-token-here` → Your actual Sanity token
- `your-gcp-project-id-here` → Your actual GCP Project ID (from Google Cloud Console)

**Also place:**
- `gcp-key.json` → In project root (`E:/Github Hosting/akaalbani/gcp-key.json`)

**Save and close.**

---

## Step 3: Verify Everything Works (2 minutes)

Open PowerShell and run:

```powershell
cd "E:/Github Hosting/akaalbani/scripts/news_discovery"
python check_setup.py
```

**Expected output:**
```
[OK] Python 3.13
[OK] feedparser
[OK] google.generativeai
[OK] Found .env
[OK] All keys found
[OK] All checks passed! Ready to run: python cli.py
```

If you see errors, follow the instructions to fix them.

---

## Step 4: Launch the CLI (1 minute)

```powershell
python cli.py
```

You should see:

```
┌────────┐
│ ਆਕਾਲ ਬਾਣੀ │
│ Akaalibani News Hub │
└────────┘

Main Menu
1. Fetch from RSS (Category-based)
2. Custom Topic (Direct AI Search)
0. Exit

Enter your choice: _
```

---

## Step 5: Try It! (5 minutes)

### First Test: Publish 1 Article

**Select Option 1:**
```
Enter your choice: 1
```

**Select Category 11 (Tech-AI):**
```
Select category (or 0 to go back): 11
```

**Wait for articles to load** (30 seconds)

**Select Article 1:**
```
Select article number (or 0 to go back): 1
```

**Wait while it:**
1. Extracts article text
2. Sends to Gemini (2-3 sec)
3. Rewrites to Punjabi
4. Shows preview

**Publish:**
```
Publish this article to Sanity? (y/n): y
```

**Success!** Check Sanity Studio — article should appear in Posts section.

---

## Step 6: Batch Mode (Optional)

For publishing many articles at once:

```powershell
# Discover 20 articles
python discover.py

# Rewrite 5 of them
python rewrite_cli.py --limit 5

# Preview before publishing
python publish_cli.py --dry-run

# Publish for real
python publish_cli.py
```

---

## 📚 Documentation

Read these files in order:

1. **QUICKSTART.md** — 5-minute overview
2. **CLI_GUIDE.md** — Step-by-step workflows
3. **COMMANDS.md** — All CLI commands
4. **README.md** — Full technical documentation

---

## ❓ Troubleshooting

### "Missing required environment variable"

```powershell
# Check that .env exists
Test-Path "E:/Github Hosting/akaalbani/.env"

# If not, create it with your keys
```

### "No module named 'feedparser'"

```powershell
pip install -r requirements.txt
```

### "Failed to extract article content"

- The article might be paywalled
- Try a different article from the list
- Or select a different category

### "Publishing failed"

```powershell
# Retry with slower delays
python publish_cli.py --delay 2.0
```

### Unicode errors on Windows

The setup guide already includes UTF-8 fix in `cli.py`. If still having issues:

```powershell
$env:PYTHONIOENCODING = "utf-8"
python cli.py
```

---

## 🎯 Common Workflows

### Workflow 1: Single Article via CLI

```
python cli.py → Option 1 → Select category → Select article → Publish
⏱️ Time: 1-2 minutes
```

### Workflow 2: Research Custom Topic

```
python cli.py → Option 2 → Enter topic → Select category → Publish
⏱️ Time: 1-3 minutes (Gemini research time)
```

### Workflow 3: Batch All Categories

```
python discover.py
python rewrite_cli.py
python publish_cli.py --dry-run
python publish_cli.py
⏱️ Time: 30-45 minutes
```

### Workflow 4: Retry Failed

```
python publish_cli.py --retry
⏱️ Time: 2-5 minutes
```

---

## 📁 File Structure

```
akaalbani/
├── .env                                    (YOUR API KEYS - KEEP SECRET!)
└── scripts/news_discovery/
    ├── cli.py                             (Interactive interface - START HERE)
    ├── discover.py                        (Batch scraping)
    ├── rewrite_cli.py                     (Batch rewriting)
    ├── publish_cli.py                     (Batch publishing)
    ├── check_setup.py                     (Verify setup)
    ├── requirements.txt                   (Dependencies)
    ├── QUICKSTART.md                      (5-min guide)
    ├── CLI_GUIDE.md                       (Workflows)
    ├── COMMANDS.md                        (Command reference)
    └── README.md                          (Full documentation)
```

---

## 🔐 Security Notes

- **Keep `.env` secret** — Never share or commit to git
- **Keep `gcp-key.json` secret** — Never share or commit to git (already ignored)
- **Rotate tokens regularly** — Get new ones from Sanity/Google Cloud every 3 months
- **Check git ignores** — Both `.env` and `gcp-key.json` are already ignored in `.gitignore`

---

## ✅ Verification Checklist

- [ ] Python 3.9+ installed
- [ ] `pip install -r requirements.txt` completed
- [ ] Sanity Project ID & Write Token in `.env`
- [ ] GCP Project ID & Location in `.env`
- [ ] `gcp-key.json` downloaded and placed in project root
- [ ] `python check_setup.py` shows all [OK]
- [ ] `python cli.py` launches without errors
- [ ] Select Option 1 and see category list
- [ ] Published 1 test article to Sanity
- [ ] Article appears in Sanity Studio Posts

---

## 🚀 Ready to Start?

```powershell
cd "E:/Github Hosting/akaalbani/scripts/news_discovery"
python check_setup.py    # Verify
python cli.py            # Launch!
```

---

## 💬 Quick Reference

| What | Where | Command |
|------|-------|---------|
| **Interactive CLI** | Easy for users | `python cli.py` |
| **Batch discover** | Scale RSS | `python discover.py` |
| **Batch rewrite** | Scale Gemini | `python rewrite_cli.py` |
| **Batch publish** | Scale Sanity | `python publish_cli.py` |
| **Verify setup** | Troubleshoot | `python check_setup.py` |
| **Documentation** | Learn | `cat README.md` |

---

## 🎉 You're All Set!

Your Akaalibani News Hub is ready to use.

**Start with:** `python cli.py`

**Questions?** Check the documentation files in `scripts/news_discovery/`

**Happy publishing!** ਖੁਸ਼ ਰਹੋ! 🙏
