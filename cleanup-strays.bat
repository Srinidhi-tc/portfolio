@echo off
REM ---------------------------------------------------------------
REM  Deletes three stray asset files that aren't used by any code.
REM  All files are listed as untracked in git, so deleting them
REM  has no git history impact.
REM ---------------------------------------------------------------
cd /d "%~dp0"

echo.
echo === Deleting stray files in src\assets\ ===
echo.

set "F1=src\assets\Sri_ capstone_2026_ppt.mp4"
set "F2=src\assets\VolleyBallToy.png"
set "F3=src\assets\work.jpg"

if exist "%F1%" (
    del /f /q "%F1%"
    echo Removed: %F1%
) else (
    echo Not found: %F1%
)

if exist "%F2%" (
    del /f /q "%F2%"
    echo Removed: %F2%
) else (
    echo Not found: %F2%
)

if exist "%F3%" (
    del /f /q "%F3%"
    echo Removed: %F3%
) else (
    echo Not found: %F3%
)

echo.
echo Done. You can now run push-changes.bat to push everything.
echo.
pause
