export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  
  // Validar se as variáveis de ambiente estão configuradas
  if (!oauthPortalUrl) {
    console.error('VITE_OAUTH_PORTAL_URL não está configurada');
    throw new Error('OAuth portal URL não está configurada. Verifique as variáveis de ambiente.');
  }
  
  if (!appId) {
    console.error('VITE_APP_ID não está configurada');
    throw new Error('App ID não está configurado. Verifique as variáveis de ambiente.');
  }
  
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  } catch (error) {
    console.error('Erro ao construir URL de login:', error);
    throw new Error(`URL de login inválida: ${oauthPortalUrl}/app-auth`);
  }
};
