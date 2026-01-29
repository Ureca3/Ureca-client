type OAuthProvider = 'google' | 'naver' | 'kakao';

const COOKIE_PREFIX = 'oauth_state_';

export function setOAuthStateCookie(provider: OAuthProvider, state: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_PREFIX}${provider}=${encodeURIComponent(state)}; Path=/; SameSite=Lax`;
}
