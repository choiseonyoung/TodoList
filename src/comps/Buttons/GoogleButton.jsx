import "../../css/GoogleButton.css";
import { useEffect, useRef } from "react";
import { useUserContext } from "../../context";
import { useHistory } from "react-router-dom";

function GoogleButton() {
  const buttonRef = useRef();
  const { setUser } = useUserContext();
  const history = useHistory();

  const googleResponse = (result) => {
    const profile = result.getBasicProfile();
    const email = profile.getEmail();
    const id = profile.getId();
    const name = profile.getName();
    const image = profile.getImageUrl();
    const Token = result.getAuthResponse().id_token;

    setUser({
      userid: email,
      login_source: "GOOGLE",
    });
    alert(email + " 님 반갑습니다 !");
    history.replace("/");
  };

  /**
   * public/index.html 파일에 script를 import 한다
   * src="https://apis.google.com/js/api:client.js"
   */
  const googleSDK_init = () => {
    if (!window.gapi) {
      // * window에 gapi 가 있는지 검사
      alert("Google API NOT Found");
      // * F5 계속 누르면 ~ 이게 뜰 것
      return;
    }

    // google에 API가 활성화되고
    // 활성화된 API 중에서 auth2가 loading(사용할 준비가 되면)
    // gapi : google cloud service를 JS에서 사용하기 위한 객체 도구
    // gapi의 load() 함수를 사용하여 auth2 객체 초기화하기
    // 이때 google로부터 부여받은 client_id를 입력한다
    window.gapi.load("auth2", async () => {
      // load() 함수에 의해서 auth2 객체가 초기화 된다
      // auth2 객체 : google cloud service를 사용한 oAuth2 인증 시스템에 접근할 수 있는 객체
      // => google로 로그인을 구현하기 위한 초기화 절차
      // * 이게 실행되면 react 프로젝트 어디서든지 구글 로그인을 확인해 볼 수 있다
      const auth2 = await window.gapi.auth2.init({
        // * 초기화시키기
        client_id:
          "25572880857-ghl9be0u1s0jq2uku9t01v8ql1vamt6u.apps.googleusercontent.com",
        scope: "profile email",
      });
      if (auth2?.isSignedIn.get()) {
        // * 구글로부터 로그인을 이미 한 적이 있으면 true가 됨
        console.log("로그인이 이미 된 상태");
        // 원하는 곳으로 redirect
      }

      // 버튼을 클릭했을 때
      // google 로그인 창이 뜨도록 하는 click event 핸들러 설정
      // buttonRef가 ref로 설정된 컴포넌트(button 등)에 클릭 이벤트를 설정하고
      // 해당하는 컴포넌트를 클릭하면 google 로그인 창이 뜨도록 설정하기
      // google login 창이 popup 되고, id를 선택하여,
      // 정상적으로 로그인이 수행되면 로그인 이후 작동되는 callback 함수를 3번째 매개변수로 설정한다
      // google login 창이 popup 된 후 그냥 창을 닫거나
      // 또는 정상적으로 로그인이 수행되지 않았을 때 실행되는 함수를 4번째 매개변수로 설정한다
      // 1번째 매개변수 : 누구를 클릭했을 때
      // 2번째 매개변수 : 옵션
      // 3번째 매개변수 : 로그인이 성공했을 때 실행할 함수
      // 4번째 매개변수 : 로그인이 실패했을 때 실행할 함수
      await auth2.attachClickHandler(
        buttonRef.current,
        {},
        googleResponse,
        (err) => alert(JSON.stringify(err))
      );
      //   * 이미 init 해버렸기 때문에 {} 공백을 넣으면 됨
    });
  };

  useEffect(googleSDK_init, []);

  const logout = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2?.disconnect();
    alert("Logout OK !!");
  };

  return (
    <div id="buttonWrapper">
      <div id="myGoogleBtn" ref={buttonRef}>
        {/* * 앞에 id는 css만 쓸 수 있는 아이디, 뒤에 id는 react에서 사용하는 아이디 */}
        <span className="icon"></span>
        <span className="buttonText">Google 로그인</span>
        <span className="buttonText" onClick={logout}>
          {/* * 임시로 사용하는 코드 */}
          Google 로그아웃
        </span>
      </div>
    </div>
  );
}

export default GoogleButton;
