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
  const [checkedItems, setCheckedItems] = useState(new Map());

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin");
    }
    getTodoLists();
  }, []);

  const addNewTodo = async () => {
    await createTodo(newTodo);
    setNewTodo("");
    getTodoLists();
  };

  const getTodoLists = async () => {
    const data = await getTodos();
    setTodoLists([...data]);
  };

  const updateTodoLists = async item => {
    if (item.todo) {
      await updateTodo(modifyText, item.isCompleted, item.id);
      setModifyId(0);
      getTodoLists();
    } else {
      console.log("에러");
    }
  };

  const updateCheckBox = async item => {
    if (item.isCompleted) {
      item.isCompleted = false;
      await updateTodo(item.todo, false, item.id);
    } else {
      item.isCompleted = true;
      await updateTodo(item.todo, true, item.id);
    }
    setCheckedItems(prev => new Map(prev).set(item.id, item.isCompleted));
    getTodoLists();
  };

  useEffect(() => {
    todoLists.map(v => {
      checkedItems.set(v.id, v.isCompleted);
    });
    console.log(checkedItems);
  }, [todoLists]);

  const deleteTodoList = async id => {
    await deleteTodo(id);
    getTodoLists();
  };

  const handleModifyButton = item => {
    setModifyId(item.id);
    setModifyText(item.todo);
  };

  return (
    <Main>
      <div>TODOLIST</div>
      {todoLists.map((item, index) => (
        <li key={index}>
          {item.id === modifyId ? (
            // 수정 시
            <>
              <label>
                <input
                  type="checkbox"
                  checked={checkedItems.get(item.id)}
                  onChange={() => updateCheckBox(item)}
                />
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
            // 비수정시
            <>
              <label>
                <input
                  type="checkbox"
                  checked={checkedItems.get(item.id)}
                  onChange={() => updateCheckBox(item)}
                />
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
