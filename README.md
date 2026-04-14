# 4 Cadeiras – Website Oficial

Site oficial do projeto musical 4 Cadeiras — Segunda Edição, Lisboa 2026.

## 🚀 Deploy no Cloudflare Pages

### Opção 1 — Direto (sem GitHub)
1. Acesse: https://dash.cloudflare.com
2. Vá em **Pages** → **Create a project** → **Direct Upload**
3. Faça upload da pasta `4cadeiras-site/` completa
4. O site já vai estar live no URL do Cloudflare
5. Em **Custom Domains**, adicione: `4cadeiras.com`

### Opção 2 — Via GitHub (recomendado para updates futuros)
1. Crie repositório no GitHub: `4cadeiras-site`
2. Faça upload de todos os arquivos desta pasta
3. No Cloudflare Pages → **Connect to Git**
4. Selecione o repositório
5. Build settings: deixe em branco (site estático)
6. Deploy!

## 📁 Estrutura
```
4cadeiras-site/
├── index.html      # Site completo (imagens embutidas em base64)
├── _redirects      # Cloudflare routing
├── _headers        # Headers de segurança e cache
├── robots.txt      # SEO
├── sitemap.xml     # SEO
└── README.md       # Este arquivo
```

## ✏️ Atualizar Conteúdo
- **Fotos dos artistas**: Substituir os placeholders no index.html
- **Links Instagram**: Buscar por `instagram.com/` e atualizar handles
- **Visualizações YouTube**: Buscar por `200.000` e atualizar
- **Data do evento**: Buscar por `2026` nas seções de ingressos
- **Galeria**: Substituir os `gal-slot` por imagens reais

## 🌐 Idiomas
Seletor de idiomas: 🇧🇷 Português BR / 🇵🇹 Português PT / 🇺🇸 English
