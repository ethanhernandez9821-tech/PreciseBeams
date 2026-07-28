// environment-redeploy: 2026-07-28T01:43Z
const TARGET_GUILD_ID = '1531135205795172362';

module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({ error: 'Tracker is not configured' });
  }

  try {
    const discordResponse = await fetch(
      `https://discord.com/api/v10/guilds/${TARGET_GUILD_ID}?with_counts=true`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bot ${token}`
        }
      }
    );

    if (!discordResponse.ok) {
      throw new Error('Discord member count unavailable');
    }

    const guild = await discordResponse.json();
    const memberCount = Number(guild.member_count ?? guild.approximate_member_count);

    if (!Number.isFinite(memberCount)) {
      throw new Error('Invalid Discord member count');
    }

    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return response.status(200).json({ memberCount });
  } catch {
    response.setHeader('Cache-Control', 'no-store');
    return response.status(503).json({ error: 'Member count temporarily unavailable' });
  }
};
