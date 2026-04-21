export async function onRequestPost({ request, env }) {
  try {
    const webhook = env.APPS_SCRIPT_BRIEFING_URL;
    if (!webhook) return json({ ok: false, error: 'APPS_SCRIPT_BRIEFING_URL ausente.' }, 500);

    const payload = await request.json();
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!res.ok) {
      return json({ ok: false, error: data?.error || 'Apps Script retornou erro.' }, 502);
    }

    return json({ ok: true, result: data });
  } catch (err) {
    return json({ ok: false, error: err?.message || 'Erro interno.' }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
  });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
    },
  });
}
