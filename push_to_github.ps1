param(
    [Parameter(Mandatory=$true)]
    [string]$Username
)

$gitPath = "C:\Program Files\Git\cmd\git.exe"
if (-not (Test-Path $gitPath)) {
    $gitPath = "git"
}

$repoUrl = "https://github.com/$Username/deepsea-guardian.git"

Write-Host "Linking repository to $repoUrl ..." -ForegroundColor Cyan
& $gitPath remote remove origin 2>$null
& $gitPath remote add origin $repoUrl
& $gitPath branch -M main

Write-Host "Pushing code to GitHub..." -ForegroundColor Green
& $gitPath push -u origin main

Write-Host "`nSUCCESS! Your repository is live at:" -ForegroundColor Yellow
Write-Host "https://github.com/$Username/deepsea-guardian" -ForegroundColor Hyperlink
