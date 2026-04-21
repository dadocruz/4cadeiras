export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const folderId = (url.searchParams.get('folderId') || '').trim();
    const key = env.GOOGLE_API_KEY;

    if (!key) return json({ ok: false, error: 'GOOGLE_API_KEY ausente.' }, 500);
    if (!folderId) return json({ ok: false, error: 'folderId e obrigatorio.' }, 400);

    const q = `'${folderId}' in parents and trashed=false`;
    const apiUrl = new URL('https://www.googleapis.com/drive/v3/files');
    apiUrl.searchParams.set('key', key);
    apiUrl.searchParams.set('q', q);
    apiUrl.searchParams.set('orderBy', 'modifiedTime desc');
    apiUrl.searchParams.set('fields', 'files(id,name,mimeType,modifiedTime,webViewLink,webContentLink)');
    apiUrl.searchParams.set('pageSize', '50');

    const res = await fetch(apiUrl.toString());
    const data = await res.json();
    if (!res.ok) return json({ ok: false, error: data?.error?.message || 'Falha ao consultar Google Drive.' }, 502);

    return json({ ok: true, files: data.files || [] });
  } catch (err) {
    return json({ ok: false, error: err?.message || 'Erro interno.' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
