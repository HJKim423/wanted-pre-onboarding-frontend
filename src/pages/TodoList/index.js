import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../../api/todo";
import { Main } from "../Signup/style";
import { AddTodo } from "./style";

const TodoList = () => {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");

  const addNewTodo = () => {
    const res = createTodo(newTodo);
    console.log(createTodo(newTodo));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin");
    }
  }, []);
  return (
    <Main>
      <div>TODOLIST</div>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
        </label>
      </li>

      <AddTodo>
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button data-testid="new-todo-add-button" onClick={addNewTodo}>
          추가
        </button>
      </AddTodo>
    </Main>
  );
};

export default TodoList;
