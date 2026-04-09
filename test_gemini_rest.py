import json
from google.oauth2 import service_account
import google.auth.transport.requests
import requests

key_file = "E:/Github Hosting/akaalbani/gcp-tts-key.json"

credentials = service_account.Credentials.from_service_account_file(
    key_file,
    scopes=["https://www.googleapis.com/auth/cloud-platform"]
)

auth_request = google.auth.transport.requests.Request()
credentials.refresh(auth_request)

project_id = "gen-lang-client-0231592028"
location = "us-central1"

# Try calling Gemini via REST API
model = "gemini-1.5-flash"
url = f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/publishers/google/models/{model}:generateContent"

headers = {
    "Authorization": f"Bearer {credentials.token}",
    "Content-Type": "application/json",
}

body = {
    "contents": [
        {
            "role": "user",
            "parts": [
                {
                    "text": "Hello"
                }
            ]
        }
    ],
    "generationConfig": {
        "maxOutputTokens": 100,
    }
}

print(f"Testing {model}...")
try:
    resp = requests.post(url, headers=headers, json=body, timeout=30)
    print(f"Status: {resp.status_code}")
    if resp.status_code in (200, 201):
        data = resp.json()
        print(f"[OK] Model works!")
        print(f"Response: {json.dumps(data, indent=2)[:300]}")
    else:
        print(f"Error: {resp.text[:500]}")
except Exception as e:
    print(f"Request failed: {e}")
