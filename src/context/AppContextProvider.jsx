import { useState, createContext, useContext, useRef } from "react";

const AppContext = createContext();

export const useTodoContext = () => useContext(AppContext);

function AppContextProvider({ children }) {
  const [todo, setTodo] = useState({
    t_id: 0,
    t_text: "방가방가",
    t_comp: false,
  });
  const [todoList, setTodoList] = useState([]);

  const nextId = useRef(0);
  const inputId = useRef();

  const onChange = (e) => {
    const t_text = e.target.value;
    setTodo({ ...todo, t_text, t_id: nextId.current });
  };

  // 리스트에 추가하기
  const todoInsert = () => {
    if (todo.t_text === "") {
      window.alert("할 일을 입력하세요");
      inputId.current.focus();
      return;
    }
    setTodoList([...todoList, todo]);
    nextId.current++;
    todoClear();
  };

  // 입력창 clear
  const todoClear = () => {
    setTodo({ t_id: nextId.current, t_text: "", t_comp: false });
  };

  // 입력된 todo를 todoList에 추가하기
  const onClick = () => todoInsert();

  // 입력박스에서 Enter 키가 눌려지면
  const onKeyPress = (e) => {
    // e.keyCode === 13
    if (e.key === "Enter") {
      todoInsert();
    } else if (e.key === "Escape") {
      todoClear();
    }
  };

  const onDeleteClick = (e) => {
    if (window.confirm("삭제할까요?")) {
      // data-todo-id 라고 저장하면 앞에 data-는 dataset으로 변경,
      // todo-id는 lower Camel case(첫글자가 소문자)로 변경되어 todoId 변수에서 getter 할 수 있다
      const t_id = Number(e.target.dataset.todoId);

      // 배열 요소 중에서 t_id가 일치하는 요소 삭제하기
      // 원래 배열 요소를 filtering 하는데
      // t_id 값이 dataset의 todoId와 일치하지 않는 것만
      // 새로운 배열로 만들어라
      const _todoList = todoList.filter((todo) => todo.t_id !== t_id);
      // !== 타입은 비교하지 마라 != 타입까지 비교
      setTodoList(_todoList);
    }
  };

  const onCompClick = (e) => {
    const t_id = Number(e.target.dataset.todoId);
    // 배열 요소중에 조건에 맞는 값이 있으면 그 값이 몇번째 요소인지 index를 return한다
    // (map을 써서 할 수도 있지만 이렇게 하는 방법도 있다 ~)
    const index = todoList.findIndex((todo) => todo.t_id === t_id);
    // 찾았으면 ~~~
    // 해당 요소만 따로 추출하여 selectTodo에 담기
    const selectTodo = todoList[index];
    const _todoList = [...todoList];
    _todoList[index] = {
      ...selectTodo,
      t_comp: !selectTodo.t_comp,
    };
    setTodoList(_todoList);
  };

  const propsStore = {
    todo,
    todoList,
    inputId,
    onChange,
    onClick,
    onKeyPress,
    onDeleteClick,
    onCompClick,
  };

  // Provider를 합성패턴으로 선언하여 필요한 곳에서 끌어올려 사용할 수 있도록 한다

  return (
    <AppContext.Provider value={propsStore}>{children}</AppContext.Provider>
  );
}

export default AppContextProvider;
