#!/usr/bin/env python3
"""
Add 8 SEO-optimized articles to BetCalc Pro.
Patches 4 files:
  1. src/components/content/articles-list.tsx
  2. src/app/artigos/[slug]/page.tsx
  3. src/components/content/article-content.tsx (CTA map + content)
  4. src/app/sitemap.ts
"""

import re, sys

BASE = '/home/z/my-project'

# We'll build each file's additions separately, then apply.

# ========== 1. NEW ARTICLE LISTING ENTRIES ==========
new_list_entries = """
  {
    slug: 'como-calcular-probabilidades-odds',
    title: 'Como Calcular Probabilidades a Partir de Odds',
    description: 'Aprenda a converter odds decimais, fracionárias e americanas em probabilidades. Guia prático com exemplos reais e cálculos passo a passo.',
    icon: Calculator,
    category: 'Fundamentos',
    readTime: '10 min',
  },
  {
    slug: 'o-que-e-drawdown',
    title: 'O que é Drawdown e Como Proteger Seu Capital',
    description: 'Entenda o conceito de drawdown, saiba calculá-lo e aprenda estratégias práticas para limitar perdas máximas e proteger seu bankroll.',
    icon: TrendingUp,
    category: 'Gestão',
    readTime: '9 min',
  },
  {
    slug: 'guia-gestao-bankroll-apostas',
    title: 'Guia Completo de Gestão de Bankroll',
    description: 'Bankroll é o dinheiro destinado às apostas. Aprenda as 5 regras de ouro da gestão profissional e como definir o tamanho ideal de cada aposta.',
    icon: TrendingUp,
    category: 'Gestão',
    readTime: '12 min',
  },
  {
    slug: 'sistema-masaniello-pratica',
    title: 'Como Funciona o Sistema Masaniello na Prática',
    description: 'Guia passo a passo do sistema Masaniello: como definir porcentagens alvo, calcular sequências e quando interromper ciclos.',
    icon: BarChart3,
    category: 'Análise',
    readTime: '11 min',
  },
  {
    slug: 'hedging-apostas-guia-completo',
    title: 'Hedging em Apostas: Guia Completo',
    description: 'Aprenda o que é hedging, quando fazer aposta de cobertura, como calcular o lucro garantido e os erros mais comuns.',
    icon: TrendingUp,
    category: 'Gestão',
    readTime: '10 min',
  },
  {
    slug: 'fibonacci-vs-martingale',
    title: 'Fibonacci vs Martingale: Comparativo Completo',
    description: 'Qual progressão é melhor? Compare risco, crescimento do bankroll, requisitos de capital e simulações com números reais.',
    icon: BarChart3,
    category: 'Análise',
    readTime: '13 min',
  },
  {
    slug: 'como-identificar-value-bets',
    title: 'Como Identificar Value Bets: Guia Prático',
    description: 'Value bet é a base do lucro consistente. Aprenda a calcular valor esperado, comparar probabilidades e encontrar oportunidades reais.',
    icon: Lightbulb,
    category: 'Análise',
    readTime: '11 min',
  },
  {
    slug: 'lucro-esperado-vs-retorno',
    title: 'Lucro Esperado vs Retorno: Entenda a Diferença',
    description: 'ROI, yield, lucro esperado e retorno — entenda cada métrica, quando usar e como afetam sua gestão de bankroll a longo prazo.',
    icon: Lightbulb,
    category: 'Fundamentos',
    readTime: '9 min',
  },
"""

# ========== 2. NEW SEO METADATA ENTRIES ==========
new_meta_entries = """
  'como-calcular-probabilidades-odds': {
    title: 'Como Calcular Probabilidades a Partir de Odds',
    description: 'Guia completo para converter odds decimais, fracionárias e americanas em probabilidades com exemplos práticos.',
  },
  'o-que-e-drawdown': {
    title: 'O que é Drawdown e Como Proteger Seu Capital',
    description: 'Entenda o conceito de drawdown, como calculá-lo e estratégias para limitar perdas no bankroll.',
  },
  'guia-gestao-bankroll-apostas': {
    title: 'Guia Completo de Gestão de Bankroll',
    description: 'As 5 regras de ouro da gestão de bankroll, Critério de Kelly e como definir o tamanho ideal de cada aposta.',
  },
  'sistema-masaniello-pratica': {
    title: 'Como Funciona o Sistema Masaniello na Prática',
    description: 'Guia prático do sistema Masaniello: parâmetros, cálculos e estratégias para ciclos de apostas.',
  },
  'hedging-apostas-guia-completo': {
    title: 'Hedging em Apostas: Guia Completo',
    description: 'Aprenda o que é hedging, como calcular aposta de cobertura e quando vale a pena fazer.',
  },
  'fibonacci-vs-martingale': {
    title: 'Fibonacci vs Martingale: Comparativo Completo',
    description: 'Compare as progressões Fibonacci e Martingale em risco, requisitos de capital e resultados.',
  },
  'como-identificar-value-bets': {
    title: 'Como Identificar Value Bets: Guia Prático',
    description: 'Aprenda a calcular valor esperado e identificar value bets com exemplos práticos.',
  },
  'lucro-esperado-vs-retorno': {
    title: 'Lucro Esperado vs Retorno: Entenda a Diferença',
    description: 'Diferença entre ROI, yield, lucro esperado e retorno — qual métrica usar e quando.',
  },
"""

# ========== 3. NEW CTA LINKS ==========
new_cta_entries = """
  'como-calcular-probabilidades-odds': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Converta odds em probabilidades na prática' },
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Defina o tamanho ideal da aposta' },
  ],
  'o-que-e-drawdown': [
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Calcule limites de risco por aposta' },
    { name: 'Recuperação de Capital', href: '/recovery', description: 'Planeje a recuperação após drawdowns' },
  ],
  'guia-gestao-bankroll-apostas': [
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Calcule o tamanho ideal da posição' },
    { name: 'Calculadora Martingale', href: '/martingale', description: 'Teste progressões com bankroll real' },
    { name: 'Calculadora Fibonacci', href: '/fibonacci', description: 'Aplique Fibonacci ao seu bankroll' },
  ],
  'sistema-masaniello-pratica': [
    { name: 'Calculadora Masaniello', href: '/masaniello', description: 'Simule o sistema Masaniello' },
    { name: 'Calculadora de Ciclos', href: '/ciclos', description: 'Masaniello com ciclos de recuperação' },
  ],
  'hedging-apostas-guia-completo': [
    { name: 'Calculadora de Hedging', href: '/hedging', description: 'Calcule coberturas automaticamente' },
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Proteja seu capital com gestão' },
  ],
  'fibonacci-vs-martingale': [
    { name: 'Calculadora Fibonacci', href: '/fibonacci', description: 'Simule a progressão Fibonacci' },
    { name: 'Calculadora Martingale', href: '/martingale', description: 'Simule a progressão Martingale' },
    { name: 'Calculadora de Ciclos', href: '/ciclos', description: 'Compare com ciclos de recuperação' },
  ],
  'como-identificar-value-bets': [
    { name: 'Simulador de Probabilidades', href: '/probability-simulator', description: 'Calcule probabilidades e compare odds' },
    { name: 'Gerador de Estratégias', href: '/strategy-generator', description: 'Crie estratégias com valor esperado' },
    { name: 'Analisador de Sequências', href: '/sequence-analyzer', description: 'Analise seu histórico de apostas' },
  ],
  'lucro-esperado-vs-retorno': [
    { name: 'Gestão de Capital', href: '/bankroll', description: 'Otimize gestão com métricas corretas' },
    { name: 'Calculadora de Hedging', href: '/hedging', description: 'Proteja retornos com cobertura' },
    { name: 'Analisador de Sequências', href: '/sequence-analyzer', description: 'Analise o ROI real das apostas' },
  ],
"""

print("Script structure loaded. Patching files...")

# ========== PATCH FILE 1: articles-list.tsx ==========
f1 = f"{BASE}/src/components/content/articles-list.tsx"
with open(f1, 'r') as fh:
    content1 = fh.read()
# Insert new articles before the closing ]
marker = "  },\n]"
replacement = new_list_entries.rstrip() + ",\n]"
content1 = content1.replace(marker, replacement, 1)
with open(f1, 'w') as fh:
    fh.write(content1)
print(f"  [OK] Patched {f1}")

# ========== PATCH FILE 2: [slug]/page.tsx ==========
f2 = f"{BASE}/src/app/artigos/[slug]/page.tsx"
with open(f2, 'r') as fh:
    content2 = fh.read()
# Insert new meta entries before the closing }
marker2 = "  'introducao-teoria-jogos': {\n    title: 'Introdução à Teoria dos Jogos',\n    description: 'Conheça os conceitos fundamentais da teoria dos jogos e suas aplicações práticas.',\n  },\n}"
replacement2 = """  'introducao-teoria-jogos': {
    title: 'Introdução à Teoria dos Jogos',
    description: 'Conheça os conceitos fundamentais da teoria dos jogos e suas aplicações práticas.',
  },
""" + new_meta_entries.rstrip() + "\n}"
content2 = content2.replace(marker2, replacement2, 1)
with open(f2, 'w') as fh:
    fh.write(content2)
print(f"  [OK] Patched {f2}")

# ========== PATCH FILE 3a: article-content.tsx — CTA map ==========
f3 = f"{BASE}/src/components/content/article-content.tsx"
with open(f3, 'r') as fh:
    content3 = fh.read()
# Insert new CTA entries before the closing }
cta_marker = "  'introducao-teoria-jogos': [\n    { name: 'Gerador de Estratégias', href: '/strategy-generator', description: 'Crie estratégias com teoria dos jogos' },\n    { name: 'Calculadora de Hedging', href: '/hedging', description: 'Estratégias de cobertura de risco' },\n  ],\n}"
cta_replacement = """  'introducao-teoria-jogos': [
    { name: 'Gerador de Estratégias', href: '/strategy-generator', description: 'Crie estratégias com teoria dos jogos' },
    { name: 'Calculadora de Hedging', href: '/hedging', description: 'Estratégias de cobertura de risco' },
  ],
""" + new_cta_entries.rstrip() + "\n}"
content3 = content3.replace(cta_marker, cta_replacement, 1)
with open(f3, 'w') as fh:
    fh.write(content3)
print(f"  [OK] Patched CTA map in {f3}")

# ========== PATCH FILE 4: sitemap.ts ==========
f4 = f"{BASE}/src/app/sitemap.ts"
with open(f4, 'r') as fh:
    content4 = fh.read()
# Add new slugs to articles array
sitemap_marker = "    'introducao-teoria-jogos',\n  ]"
sitemap_replacement = """    'introducao-teoria-jogos',
    'como-calcular-probabilidades-odds',
    'o-que-e-drawdown',
    'guia-gestao-bankroll-apostas',
    'sistema-masaniello-pratica',
    'hedging-apostas-guia-completo',
    'fibonacci-vs-martingale',
    'como-identificar-value-bets',
    'lucro-esperado-vs-retorno',
  ]"""
content4 = content4.replace(sitemap_marker, sitemap_replacement, 1)
with open(f4, 'w') as fh:
    fh.write(content4)
print(f"  [OK] Patched {f4}")

print("\nAll 4 files patched. Now need to add article JSX content to article-content.tsx")
