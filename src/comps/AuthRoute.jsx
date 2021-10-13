import { useUserContext } from "../context";
import { useHistory } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { fetchUser } from "../modules/fetchModule";

function AuthRoute({ children }) {
  const { user, setUser } = useUserContext();
  const history = useHistory();

  const fetchCallback = useCallback(async () => {
    if (!window.gapi) {
      alert("google API Not Found !!");
      history.replace("/login");
      // * API가 없을 때는 /login 으로 점프하도록
    }

    await window.gapi.auth2.init({
      // * 초기화시키기
      client_id:
        "25572880857-ghl9be0u1s0jq2uku9t01v8ql1vamt6u.apps.googleusercontent.com",
      scope: "profile email",
    });

    // gapi(google API)로부터 auth2 객체 조회하기
    const auth2 = await window?.gapi?.auth2.getAuthInstance();
    if (!auth2) {
      history.replace("/login");
    }

    // 현재 로그인되어있는 사용자 정보 getter
    const googleUser = await auth2.currentUser.get();
    const profile = await googleUser?.getBasicProfile();

    if (!profile) {
      history.replace("/login");
    }

    const user = {
      userid: profile.getEmail(),
      name: profile.getName(),
      image: profile.getImageUrl(),
      Token: googleUser.getAuthResponse().id_token,
    };
    setUser(user);
  }, [history, setUser]);
  useEffect(fetchCallback, [fetchCallback]);
  return <>{children}</>;
}

export default AuthRoute;
