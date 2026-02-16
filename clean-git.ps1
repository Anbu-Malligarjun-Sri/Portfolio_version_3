Set-Location "c:\MY_FOLDER\Projects\Portfolio\portfolio-v3"

Write-Host "=== Step 1: Creating orphan branch ==="
git checkout --orphan fresh-start 2>&1
Write-Host "Exit code: $LASTEXITCODE"

Write-Host "=== Step 2: Adding all files ==="
git add -A 2>&1
Write-Host "Exit code: $LASTEXITCODE"

Write-Host "=== Step 3: Committing ==="
git commit -m "Initial commit - portfolio v3" 2>&1
Write-Host "Exit code: $LASTEXITCODE"

Write-Host "=== Step 4: Deleting old main ==="
git branch -D main 2>&1
Write-Host "Exit code: $LASTEXITCODE"

Write-Host "=== Step 5: Renaming to main ==="
git branch -m main 2>&1
Write-Host "Exit code: $LASTEXITCODE"

Write-Host "=== Step 6: Setting remote ==="
git remote add origin https://github.com/Anbu-Malligarjun-Sri/Portfolio_version_2.git 2>&1
Write-Host "Exit code: $LASTEXITCODE"

Write-Host "=== Step 7: Force pushing ==="
git push -f origin main 2>&1
Write-Host "Exit code: $LASTEXITCODE"

Write-Host "=== DONE ==="
