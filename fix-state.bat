@echo off
setlocal

cd /d "%~dp0"

set LOG=fix-log.txt
echo Run started: %DATE% %TIME% > "%LOG%"

call :run_all >> "%LOG%" 2>&1

echo.
type "%LOG%"
echo.
echo ===============================================================
echo  Output is also saved to fix-log.txt in this folder.
echo  We want to end with: "Already up to date." or "Fast-forward"
echo ===============================================================
echo.
echo Press any key to close this window...
pause >nul
endlocal
exit /b 0


:run_all
echo === Where are we? ===
git status --short
git rev-parse --abbrev-ref HEAD

echo.
echo === Force-removing residual rebase / merge state folders ===
if exist ".git\rebase-merge" (
    echo Removing .git\rebase-merge ...
    rmdir /s /q ".git\rebase-merge"
)
if exist ".git\rebase-apply" (
    echo Removing .git\rebase-apply ...
    rmdir /s /q ".git\rebase-apply"
)
if exist ".git\MERGE_HEAD" (
    echo Removing .git\MERGE_HEAD ...
    del /f /q ".git\MERGE_HEAD"
)
if exist ".git\MERGE_MSG" (
    del /f /q ".git\MERGE_MSG"
)
if exist ".git\CHERRY_PICK_HEAD" (
    del /f /q ".git\CHERRY_PICK_HEAD"
)
if exist ".git\index.lock" (
    del /f /q ".git\index.lock"
)
echo Done cleaning state folders.

echo.
echo === Status after cleanup ===
git status

echo.
echo === Fetching latest from origin ===
git fetch origin

echo.
echo === Fast-forwarding main to origin/main ===
git pull --ff-only origin main

echo.
echo === Final status ===
git status
git log -3 --oneline
goto :eof
