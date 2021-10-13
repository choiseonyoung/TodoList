[upgrade] react-todo-v5에서 구글 로그인 기능만 구현하기 위해 복제 + 깃허브에 배포하기

# todoList에 login 부착하기

- todoList를 실행하면 로그인이 되었나 확인하고
- login이 되었으면 todoList 화면을 보여주고
- login이 되어있지 않으면 login 화면으로 redirect하여 로그인을 수행하도록 한다

## 두개의 화면을 조건에 따라 달리 보여주기

- react-router-dom을 사용하여 화면을 달리 보여주기 실행
- recat-router-dom을 사용하지 않고도 구현할 수 있겠지만, redirect 등의 수행을 하기에는 recat-router-dom을 사용하는 것이 다소 편리하다

* yarn add react-router-dom

## 로그인을 수행한 후 로그인정보(user)를 유지하기 위하여

- User 정보를 관리할 Context를 생성

## git page에 deploy 하기

- git-hub를 사용하여 react 프로젝트 공개하기
- git page는 static 방식의 web hosting

1. git repository 만들기 : TodoList
2. local project를 repository로 설정하기 : git init
3. local project push 준비 : git add .
4. local project commit 하기 : git commit -m first
5. 원격, local repository 연결하기 : git remote add ....
6. git push origin master
