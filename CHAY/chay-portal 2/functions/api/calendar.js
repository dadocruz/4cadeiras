export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const max = Number(url.searchParams.get('max') || 10);
    const key = env.GOOGLE_API_KEY;
    const calId = env.GOOGLE_CALENDAR_ID;

    if (!key || !calId) {
      return json({ ok: false, error: 'GOOGLE_API_KEY ou GOOGLE_CALENDAR_ID ausente.' }, 500);
    }

    const apiUrl = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events`);
    apiUrl.searchParams.set('key', key);
    apiUrl.searchParams.set('singleEvents', 'true');
    apiUrl.searchParams.set('orderBy', 'startTime');
    apiUrl.searchParams.set('timeMin', new Date().toISOString());
    apiUrl.searchParams.set('maxResults', String(Math.min(Math.max(max, 1), 25)));

    const res = await fetch(apiUrl.toString());
    const data = await res.json();
    if (!res.ok) {
      return json({ ok: false, error: data?.error?.message || 'Falha ao consultar Google Calendar.' }, 502);
    }

    const events = (data.items || []).map((item) => ({
      id: item.id,
      title: item.summary || 'Sem titulo',
      when: item.start?.dateTime || item.start?.date || null,
      location: item.location || '',
      htmlLink: item.htmlLink || '',
    }));

    return json({ ok: true, events });
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
