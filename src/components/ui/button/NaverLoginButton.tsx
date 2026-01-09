"use client";

export const NaverLoginButton =()=> {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/oauth/callback/naver"
    );
    const state = crypto.randomUUID();

    const url =
      `https://nid.naver.com/oauth2.0/authorize` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&state=${state}`;

    window.location.href = url;
  };

  return (
    <button
      onClick={handleLogin}
      className="
        flex items-center justify-center gap-3
        w-full max-w-sm
        h-12
        rounded-md
        bg-[#03C75A]
        text-white font-semibold
        transition-colors
        hover:bg-[#02b152]
        active:bg-[#029e4a]
      "
    >
      {/* N 아이콘 */}
      <span
        className="
          flex items-center justify-center
          w-6 h-6
          bg-white text-[#03C75A]
          font-extrabold
          rounded-sm
        "
      >
        N
      </span>

      <span>네이버로 로그인</span>
    </button>
  );
}
