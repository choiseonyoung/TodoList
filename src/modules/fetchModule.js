const fetchOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // * headers에 content-type이라는 방식으로 application/json ~
    // 로그인이 아닌 일반적인 POST 방식에서 ~
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  credentials: "include",
};

const fetchLogin = async (userid, password) => {
  // 이미 선언된 fetchOption에 body 속성 추가하기
  fetchOption.body(JSON.stringify({ userid, password }));

  // * 현재 버전에서 fetch를 하기 위해 필요한 최소한의 설정들
  const response = await fetch(
    "http://localhost:8080/users/login",
    fetchOption
  );
  // * login이라는 곳에 아무런 옵션 필요없이 getter 방식으로 요청.
  // passport 방식에서는 getter 방식으로 로그인, 조인 등을 사용못함
  // 그래서 모든 걸 post 방식으로 한다

  if (response.ok) {
    const resultUser = await response.json();
    return resultUser;
  }
};

const fetchUser = async () => {
  const response = await fetch("http://localhost:8080/users", fetchOption);
  if (response.ok) {
    const resultUser = response.json();
    return resultUser;
  } else {
    return [];
  }
};

export { fetchLogin, fetchUser };
