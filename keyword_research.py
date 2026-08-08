"""
Outil de recherche de mots-clés SEO — Clean&Fresh Toulouse
Utilise Google Autocomplete (gratuit, sans API key)
À lancer depuis votre ordinateur via lancer_keyword_research.bat
"""

import requests
import json
import pandas as pd
import time
import random
import urllib3
urllib3.disable_warnings()

# Headers qui imitent un vrai navigateur (indispensable)
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
    "Accept": "*/*",
    "Referer": "https://www.google.fr/",
}

# ============================================================
# VOS MOTS-CLÉS DE DÉPART — modifiez librement
# ============================================================
SEED_KEYWORDS = [
    "nettoyage tapis toulouse",
    "nettoyage canapé toulouse",
    "nettoyage matelas toulouse",
    "nettoyage vitres toulouse",
    "nettoyage moquette toulouse",
    "nettoyage appartement toulouse",
    "entreprise nettoyage toulouse",
    "nettoyage à domicile toulouse",
    "pressing tapis toulouse",
    "shampouineuse canapé toulouse",
    "nettoyage auto toulouse",
    "nettoyage terrasse toulouse",
    "nettoyage haute pression toulouse",
    "nettoyage fin de bail toulouse",
    "nettoyage professionnel toulouse",
]

SUFFIXES = [
    "prix", "tarif", "pas cher", "devis", "domicile",
    "professionnel", "urgent", "avis", "entreprise",
    "particulier", "rapide", "gratuit",
]

MAX_KEYWORDS = 600


def google_suggest(query: str) -> list:
    """Interroge Google Autocomplete et retourne les suggestions."""
    try:
        url = "http://suggestqueries.google.com/complete/search"
        params = {
            "output": "firefox",
            "q": query,
            "hl": "fr",
            "gl": "fr",
            "ie": "utf-8",
            "oe": "utf-8",
        }
        r = requests.get(url, params=params, headers=HEADERS, timeout=6, verify=False)
        if r.status_code == 200:
            data = json.loads(r.text)
            return data[1] if len(data) > 1 else []
    except Exception as e:
        pass
    return []


def research(seed: str) -> list:
    """Génère toutes les suggestions pour un mot-clé seed."""
    keywords = set([seed])

    # Suggestions directes
    results = google_suggest(seed)
    keywords.update(results)
    print(f"   Base: {len(results)} suggestions")

    # Avec suffixes
    for suffix in SUFFIXES:
        results = google_suggest(f"{seed} {suffix}")
        keywords.update(results)
        time.sleep(random.uniform(0.15, 0.35))

    # Lettres a-z pour maximum de variations
    for letter in "abcdefghijklmnopqrstuvwxyz":
        results = google_suggest(f"{seed} {letter}")
        keywords.update(results)
        if len(keywords) >= MAX_KEYWORDS:
            break
        time.sleep(random.uniform(0.1, 0.2))

    return list(keywords)


def main():
    all_results = []
    total = len(SEED_KEYWORDS)

    for i, seed in enumerate(SEED_KEYWORDS, 1):
        print(f"\n[{i}/{total}] Recherche pour : {seed}")
        kws = research(seed)
        print(f"   → {len(kws)} mots-clés trouvés au total")
        for kw in kws:
            all_results.append({"seed": seed, "keyword": kw.strip().lower()})
        time.sleep(random.uniform(0.5, 1.2))

    # Nettoyage et dédoublonnage
    df = pd.DataFrame(all_results)
    df = df.drop_duplicates(subset="keyword")
    df = df[df["keyword"].str.len() > 5]
    df = df.sort_values(["seed", "keyword"]).reset_index(drop=True)

    # Export CSV (Excel-compatible)
    output_file = "keywords_cleanetfresh.csv"
    df.to_csv(output_file, index=False, encoding="utf-8-sig", sep=";")

    print(f"\n{'='*50}")
    print(f"✅ {len(df)} mots-clés uniques exportés dans : {output_file}")
    print(f"{'='*50}")
    print("\nAperçu :")
    print(df.head(30).to_string(index=False))


if __name__ == "__main__":
    main()
