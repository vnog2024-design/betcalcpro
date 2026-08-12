#!/usr/bin/env python3
"""Inject 8 article JSX contents into article-content.tsx"""

BASE = '/home/z/my-project'
TARGET = f"{BASE}/src/components/content/article-content.tsx"

# All 8 articles data - combined here to avoid exec issues
A = {}

A['como-calcular-probabilidades-odds'] = {
    'title': 'Como Calcular Probabilidades a Partir de Odds',
    'category': 'Fundamentos',
    'readTime': '10 min',
    'icon': 'Calculator',
}

A['o-que-e-drawdown'] = {
    'title': 'O que é Drawdown e Como Proteger Seu Capital',
    'category': 'Gestão',
    'readTime': '9 min',
    'icon': 'TrendingUp',
}

A['guia-gestao-bankroll-apostas'] = {
    'title': 'Guia Completo de Gestão de Bankroll',
    'category': 'Gestão',
    'readTime': '12 min',
    'icon': 'TrendingUp',
}

A['sistema-masaniello-pratica'] = {
    'title': 'Como Funciona o Sistema Masaniello na Prática',
    'category': 'Análise',
    'readTime': '11 min',
    'icon': 'BarChart3',
}

A['hedging-apostas-guia-completo'] = {
    'title': 'Hedging em Apostas: Guia Completo',
    'category': 'Gestão',
    'readTime': '10 min',
    'icon': 'TrendingUp',
}

A['fibonacci-vs-martingale'] = {
    'title': 'Fibonacci vs Martingale: Comparativo Completo',
    'category': 'Análise',
    'readTime': '13 min',
    'icon': 'BarChart3',
}

A['como-identificar-value-bets'] = {
    'title': 'Como Identificar Value Bets: Guia Prático',
    'category': 'Análise',
    'readTime': '11 min',
    'icon': 'Lightbulb',
}

A['lucro-esperado-vs-retorno'] = {
    'title': 'Lucro Esperado vs Retorno: Entenda a Diferença',
    'category': 'Fundamentos',
    'readTime': '9 min',
    'icon': 'Lightbulb',
}

print(f"Loaded {len(A)} article metadata entries")

# Read JSX content from individual files
for slug in A:
    jsx_file = f"{BASE}/scripts/jsx/{slug}.txt"
    with open(jsx_file, 'r') as f:
        A[slug]['jsx'] = f.read().strip()

print(f"Loaded JSX for all {len(A)} articles")

# Build insertion
entries = []
for slug, data in A.items():
    entry = f"  '{slug}': {{\n"
    entry += f"    title: '{data['title']}',\n"
    entry += f"    category: '{data['category']}',\n"
    entry += f"    readTime: '{data['readTime']}',\n"
    entry += f"    icon: {data['icon']},\n"
    entry += f"    content: (\n      {data['jsx']}\n    ),\n"
    entry += f"  }}"
    entries.append(entry)

insertion = ",\n\n".join(entries)

# Read target file
with open(TARGET, 'r') as f:
    content = f.read()

# Insert before the closing } of the articles Record
# Pattern: last article ends with ),  }, then }
marker = "    ),\n  },\n}"

if marker in content:
    content = content.replace(marker, f"    ),\n  }},\n\n  {insertion},\n}}", 1)
    with open(TARGET, 'w') as f:
        f.write(content)
    print(f"[OK] Injected {len(A)} article JSX contents")
    print(f"File size: {len(content)} chars")
else:
    print("[ERROR] Could not find insertion marker!")
    idx = content.rfind('},\n}')
    print(f"Last '}},\\n}}' at: {idx}")
