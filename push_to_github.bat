@echo off
title Push TalentPulse to GitHub
color 0b
echo ======================================================================
echo              TALENTPULSE - GITHUB & VERCEL SETUP HELPER
echo ======================================================================
echo.
echo Checking Git status in this folder...
echo.

git init
git add .
git commit -m "Initial release of TalentPulse candidate engagement platform"
git branch -M main

echo.
echo ----------------------------------------------------------------------
echo All project files are prepared and committed!
echo ----------------------------------------------------------------------
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/yourname/talentpulse.git): "

if "%REPO_URL%"=="" (
    echo.
    echo No URL entered. You can link your repository manually later:
    echo 1. git remote add origin ^<your-github-repo-url^>
    echo 2. git push -u origin main
) else (
    git remote remove origin 2>nul
    git remote add origin %REPO_URL%
    echo Pushing code to GitHub...
    git push -u origin main
    echo.
    echo Done! Your code is now live on GitHub.
)

echo.
echo Press any key to exit...
pause >nul
