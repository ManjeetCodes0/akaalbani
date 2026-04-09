# ──────────────────────────────────────────────────────────────────────────────
# ਆਕਾਲ ਬਾਣੀ — GCP Cloud Run Deployment Script (Windows PowerShell)
# Project: portfolio-dev-490208
# Region:  us-central1 (Mumbai — closest to Punjab/India audience)
#
# Usage:
#   .\deploy.ps1 setup    # One-time setup (APIs, Secret Manager, Artifact Registry)
#   .\deploy.ps1 build    # Build & push image only
#   .\deploy.ps1 deploy   # Build + deploy to Cloud Run  (default)
# ──────────────────────────────────────────────────────────────────────────────
param(
    [ValidateSet("setup", "build", "deploy")]
    [string]$Action = "deploy"
)

$ErrorActionPreference = "Stop"

$PROJECT_ID   = "portfolio-dev-490208"
$SERVICE_NAME = "akaalbani"
$REGION       = "us-central1"
$REPO         = "akaalbani"
$IMAGE        = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/app"

# ── 1. One-time setup ─────────────────────────────────────────────────────────
function Invoke-Setup {
    Write-Host "==> Enabling required GCP APIs..." -ForegroundColor Cyan
    gcloud services enable `
        run.googleapis.com `
        cloudbuild.googleapis.com `
        artifactregistry.googleapis.com `
        secretmanager.googleapis.com `
        --project $PROJECT_ID

    Write-Host "==> Creating Artifact Registry repository..." -ForegroundColor Cyan
    # Ignore error if repo already exists
    gcloud artifacts repositories create $REPO `
        --repository-format=docker `
        --location=$REGION `
        --project $PROJECT_ID 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "    (Repository already exists - skipping)" -ForegroundColor Yellow
    }

    Write-Host "==> Creating secret for SANITY_API_WRITE_TOKEN..." -ForegroundColor Cyan
    gcloud secrets create sanity-write-token `
        --replication-policy="automatic" `
        --project $PROJECT_ID 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "    (Secret already exists - skipping creation)" -ForegroundColor Yellow
    }

    # Prompt for the token value securely
    $token = Read-Host "Enter your SANITY_API_WRITE_TOKEN" -AsSecureString
    $plainToken = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
    )
    $plainToken | gcloud secrets versions add sanity-write-token `
        --data-file=- `
        --project $PROJECT_ID

    Write-Host "==> Granting Cloud Run service account access to the secret..." -ForegroundColor Cyan
    $PROJECT_NUMBER = gcloud projects describe $PROJECT_ID --format="value(projectNumber)"
    gcloud secrets add-iam-policy-binding sanity-write-token `
        --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" `
        --role="roles/secretmanager.secretAccessor" `
        --project $PROJECT_ID

    Write-Host ""
    Write-Host "==> Setup complete! Now run:  .\deploy.ps1 deploy" -ForegroundColor Green
}

# ── 2. Build & push image via Cloud Build ─────────────────────────────────────
function Invoke-Build {
    Write-Host "==> Building image with Cloud Build..." -ForegroundColor Cyan
    gcloud builds submit . `
        --tag $IMAGE `
        --project $PROJECT_ID

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Cloud Build failed."
    }
    Write-Host "==> Image pushed: $IMAGE" -ForegroundColor Green
}

# ── 3. Deploy to Cloud Run ────────────────────────────────────────────────────
function Invoke-Deploy {
    Invoke-Build

    Write-Host "==> Deploying to Cloud Run..." -ForegroundColor Cyan
    gcloud run deploy $SERVICE_NAME `
        --image $IMAGE `
        --platform managed `
        --region $REGION `
        --project $PROJECT_ID `
        --allow-unauthenticated `
        --port 8080 `
        --memory 512Mi `
        --cpu 1 `
        --min-instances 0 `
        --max-instances 5 `
        --set-env-vars "NODE_ENV=production"

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Cloud Run deployment failed."
    }

    Write-Host ""
    Write-Host "==> Deployed! Service URL:" -ForegroundColor Green
    gcloud run services describe $SERVICE_NAME `
        --region $REGION `
        --project $PROJECT_ID `
        --format="value(status.url)"
}

# ── Entry point ───────────────────────────────────────────────────────────────
switch ($Action) {
    "setup"  { Invoke-Setup  }
    "build"  { Invoke-Build  }
    "deploy" { Invoke-Deploy }
}
