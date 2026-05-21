@echo off
echo === Staging all changes ===
git add -A

echo === Committing ===
git commit -m "redesign: Heart of Insomnia editorial layout + new assets"

echo === Pushing to origin/main ===
git push origin main

echo === Done ===
pause
