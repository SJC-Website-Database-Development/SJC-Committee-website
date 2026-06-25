export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');

  if (provider !== 'github') {
    return new Response('Unsupported provider', { status: 400 });
  }

  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set('scope', 'repo,user');
  authUrl.searchParams.set('redirect_uri', 'https://stjoeph.net/api/auth/callback/github');

  return Response.redirect(authUrl.toString(), 302);
}