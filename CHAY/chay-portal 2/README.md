# Chay Portal

Portal operacional de marketing para o projeto Chay Frentas.

## Estrutura

- `public/index.html`: frontend principal.
- `functions/api/calendar.js`: consulta eventos do Google Calendar.
- `functions/api/drive.js`: lista arquivos do Google Drive por pasta.
- `functions/api/briefing.js`: recebe briefing e encaminha para Apps Script.
- `GOOGLE_APPS_SCRIPT.gs`: script para salvar briefings no Google Sheets.
- `wrangler.toml`: base de configuração Cloudflare.

## Deploy no Cloudflare Pages

1. Crie um repositório no GitHub e envie esta pasta.
2. No Cloudflare Pages: `Create project` -> `Connect to Git`.
3. Build settings:
- Framework preset: `None`
- Build command: *(vazio)*
- Build output directory: `public`
4. Em `Settings -> Environment variables`, adicione:
- `GOOGLE_API_KEY`
- `GOOGLE_CALENDAR_ID`
- `APPS_SCRIPT_BRIEFING_URL`

## Apps Script

1. Abra `script.google.com`.
2. Crie um projeto vinculado a uma planilha.
3. Cole o conteúdo de `GOOGLE_APPS_SCRIPT.gs`.
4. Publique como `Web app` (acesso para quem tem o link).
5. Copie a URL e salve em `APPS_SCRIPT_BRIEFING_URL` no Cloudflare.

## Configurações locais no portal

Na aba `Configuracoes` do portal, cole os IDs das pastas do Drive.
Os IDs ficam salvos no navegador (`localStorage`).
