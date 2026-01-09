export const login = async (
    provider: string,
    code: string
  ) => {
    try {
      //나중에 query param이 아니라 post body에만 넣어서 전송하도록 백도 같이 수정
      const result = await fetch(`http://localhost:8080/api/auth/login/${provider}?code=${code}`,{
          method: "POST"
        });
      if (!result.ok) {
        throw new Error("OAuth login failed");
      }
      const data = await result.json();
      console.log("성공");
      //localStorage.setItem("accessToken", data.accessToken);
      
      //로그인 완료 후 이동
      //router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };