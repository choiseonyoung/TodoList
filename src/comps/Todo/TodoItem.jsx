import "../../css/TodoItem.css";
import { useTodoContext } from "../../context";

function TodoItem({ todo }) {
  const { t_id, t_text, t_comp } = todo;
  const { onDeleteClick, onCompClick } = useTodoContext();
  return (
    <div className="todo_item">
      <div className="todo_delete" onClick={onDeleteClick} data-todo-id={t_id}>
        &times;
      </div>
      {/* 중괄호로 묶는 순간 이 코드는 자바스크립트 코드가 된다 */}
      <div
        className={`todo_text ${t_comp && "checked"}`}
        onClick={onCompClick}
        data-todo-id={t_id}
      >
        {t_text}
        {t_id}
      </div>
      {/* 현재 todo의 t_comp 값이 true일 때만 이 tag가 나타나도록 */}
      {t_comp && <div className="check_mark">&#x2713;</div>}
    </div>
  );
}

export default TodoItem;
