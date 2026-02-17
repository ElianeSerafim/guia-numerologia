import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getLoginUrl } from './const';

describe('getLoginUrl', () => {
  const originalEnv = { ...import.meta.env };

  beforeEach(() => {
    // Resetar window.location.origin para teste
    delete (window as any).location;
    (window as any).location = { origin: 'https://localhost:3000' };
  });

  afterEach(() => {
    // Restaurar ambiente original
    Object.assign(import.meta.env, originalEnv);
  });

  it('deve gerar URL de login válida com variáveis de ambiente corretas', () => {
    // Configurar variáveis de ambiente para teste
    import.meta.env.VITE_OAUTH_PORTAL_URL = 'https://api.manus.im';
    import.meta.env.VITE_APP_ID = 'test-app-id';

    const url = getLoginUrl();

    // Validar que a URL é válida
    expect(() => new URL(url)).not.toThrow();

    // Validar que contém os parâmetros corretos
    const urlObj = new URL(url);
    expect(urlObj.hostname).toBe('api.manus.im');
    expect(urlObj.pathname).toBe('/app-auth');
    expect(urlObj.searchParams.get('appId')).toBe('test-app-id');
    expect(urlObj.searchParams.get('redirectUri')).toBe('https://localhost:3000/api/oauth/callback');
    expect(urlObj.searchParams.get('type')).toBe('signIn');
    expect(urlObj.searchParams.get('state')).toBeTruthy();
  });

  it('deve lançar erro se VITE_OAUTH_PORTAL_URL não estiver configurada', () => {
    import.meta.env.VITE_OAUTH_PORTAL_URL = '';
    import.meta.env.VITE_APP_ID = 'test-app-id';

    expect(() => getLoginUrl()).toThrow('OAuth portal URL não está configurada');
  });

  it('deve lançar erro se VITE_APP_ID não estiver configurada', () => {
    import.meta.env.VITE_OAUTH_PORTAL_URL = 'https://api.manus.im';
    import.meta.env.VITE_APP_ID = '';

    expect(() => getLoginUrl()).toThrow('App ID não está configurado');
  });

  it('deve incluir redirectUri com window.location.origin correto', () => {
    import.meta.env.VITE_OAUTH_PORTAL_URL = 'https://api.manus.im';
    import.meta.env.VITE_APP_ID = 'test-app-id';

    const url = getLoginUrl();
    const urlObj = new URL(url);
    
    expect(urlObj.searchParams.get('redirectUri')).toBe('https://localhost:3000/api/oauth/callback');
  });

  it('deve codificar state em base64', () => {
    import.meta.env.VITE_OAUTH_PORTAL_URL = 'https://api.manus.im';
    import.meta.env.VITE_APP_ID = 'test-app-id';

    const url = getLoginUrl();
    const urlObj = new URL(url);
    const state = urlObj.searchParams.get('state');

    // Validar que state é base64 válido
    expect(() => atob(state!)).not.toThrow();
    
    // Validar que state decodificado é a redirectUri
    expect(atob(state!)).toBe('https://localhost:3000/api/oauth/callback');
  });
});
