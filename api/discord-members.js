module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const discordResponse = await fetch(
      'https://discord.com/api/v10/invites/EGCcdVVV7?with_counts=true&with_expiration=true',
      { headers: { Accept: 'application/json' } }
    );

    if (!discordResponse.ok) {
      throw new Error('Discord member count unavailable');
    }

    const invite = await discordResponse.json();
    const memberCount = Number(invite.approximate_member_count);

    if (!Number.isFinite(memberCount)) {
      throw new Error('Invalid Discord member count');
    }

    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return response.status(200).json({ memberCount });
  } catch {
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({ error: 'Member count temporarily unavailable' });
  }
};
