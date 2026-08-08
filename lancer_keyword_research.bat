@echo off
chcp 65001 >nul
echo ========================================
echo  Recherche mots-cles SEO - Clean^&Fresh
echo ========================================
echo.

echo Installation des dependances...
pip install pandas requests --quiet

echo.
echo Lancement de la recherche de mots-cles...
echo (peut prendre 1-2 minutes)
echo.

python keyword_research.py

echo.
echo ========================================
echo Termine ! Ouvrez keywords_cleanetfresh.csv
echo ========================================
pause
