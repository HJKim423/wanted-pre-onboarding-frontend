import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../../api/todo";
import { Main } from "../Signup/style";
import { AddTodo } from "./style";

const TodoList = () => {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const [modifyId, setModifyId] = useState(0);
  const [modifyText, setModifyText] = useState("");

  const addNewTodo = async () => {
    await createTodo(newTodo);
    setNewTodo("");
    getTodoLists();
  };

  const getTodoLists = async () => {
    const data = await getTodos();
    setTodoLists([todoLists, ...data]);
  };

  const updateTodoLists = async item => {
    if (item.todo) {
      const data = await updateTodo(modifyText, true, item.id);
      console.log(item, data);
      setModifyId(0);
      getTodoLists();
    }
  };

  const deleteTodoList = async id => {
    await deleteTodo(id);
    getTodoLists();
  };

  const handleModifyButton = item => {
    setModifyId(item.id);
    setModifyText(item.todo);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin");
    }
    getTodoLists();
  }, []);

  return (
    <Main>
      <div>TODOLIST</div>
      {todoLists.map((item, index) => (
        <li key={index}>
          {item.id === modifyId ? (
            // 수정 시
            <>
              <label>
                {item.isCompleted ? (
                  <input
                    type="checkbox"
                    checked
                    onChange={() => updateTodo(item.todo, false, item.id)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    onClick={() => updateTodo(item.todo, true, item.id)}
                  />
                )}
                <input
                  data-testid="modify-input"
                  value={modifyText || item.todo}
                  onChange={e => setModifyText(e.target.value)}
                />
              </label>
              <button
                data-testid="submit-button"
                onClick={() => updateTodoLists(item)}
              >
                제출
              </button>
              <button
                data-testid="cancel-button"
                onClick={() => setModifyId(0)}
              >
                취소
              </button>
            </>
          ) : (
            // 비수정
            <>
              <label>
                {item.isCompleted ? (
                  <input
                    type="checkbox"
                    checked
                    onChange={() => updateTodo(item.todo, false, item.id)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    onClick={() => updateTodo(item.todo, true, item.id)}
                  />
                )}
                <span>{item.todo}</span>
              </label>
              <button
                data-testid="modify-button"
                onClick={() => handleModifyButton(item)}
              >
                수정
              </button>
              <button
                data-testid="delete-button"
                onClick={() => deleteTodoList(item.id)}
              >
                삭제
              </button>
            </>
          )}
        </li>
      ))}

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
