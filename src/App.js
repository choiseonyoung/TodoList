import logo from "./logo.svg";
import "./App.css";
// import TodoMain from "./comps/TodoMain";
// import TodoList from "./comps/TodoList";
// import CompButton from "./comps/CompButton";
// import TodoInput from "./comps/TodoInput";
import { TodoMain, TodoInput, TodoList } from "./comps";
import { MyButton, HomeButton, CompButton } from "./comps";
import { LoginRoute, LoginForm } from "./comps";
import { Route } from "react-router-dom";
import { UserContextProvider } from "./context";
import { AuthRoute } from "./comps";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {/* TodoMain.jsx Layout을 사용하여 TODO 화면을 구현 */}
      <UserContextProvider>
        <LoginRoute>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/">
            <AuthRoute>
              <TodoMain header="할 일" form={<TodoInput />}>
                <TodoList />
                {/* 이렇게 끼워넣으면 children 으로 전달된다 */}
              </TodoMain>
            </AuthRoute>
          </Route>
        </LoginRoute>
      </UserContextProvider>

      {/* <TodoInput />
      <TodoList />
      <MyButton />
      <HomeButton />
      <CompButton onClick={() => alert("집")}>우리집</CompButton> */}
    </div>
  );
}

export default App;
