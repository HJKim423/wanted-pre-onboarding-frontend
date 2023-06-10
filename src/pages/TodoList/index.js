import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../../api/todo";
import { getJWT } from "../../utils/utility";
import { Main } from "../style";
import { AddTodo } from "./style";

const TodoList = () => {
  //   const token = JSON.parse(localStorage.getItem("jwt"));
  const token = getJWT();
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const [modifyId, setModifyId] = useState(0);
  const [modifyText, setModifyText] = useState("");
  const [checkedItems, setCheckedItems] = useState(new Map());

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      getTodoLists();
    }
  }, []);

  useEffect(() => {
    todoLists.map(v => {
      checkedItems.set(v.id, v.isCompleted);
    });
    console.log(checkedItems);
  }, [todoLists]);

  const addNewTodo = async () => {
    await createTodo(newTodo, token);
    setNewTodo("");
    getTodoLists();
  };

  const getTodoLists = async () => {
    const data = await getTodos(token);
    setTodoLists([...data]);
  };

  const updateTodoLists = async item => {
    if (item.todo) {
      await updateTodo(modifyText, item.isCompleted, item.id, token);
      setModifyId(0);
      getTodoLists();
    } else {
      console.log("에러");
    }
  };

  const updateCheckBox = async item => {
    if (item.isCompleted) {
      item.isCompleted = false;
      await updateTodo(item.todo, false, item.id, token);
    } else {
      item.isCompleted = true;
      await updateTodo(item.todo, true, item.id, token);
    }
    setCheckedItems(prev => new Map(prev).set(item.id, item.isCompleted));
    getTodoLists();
  };

  const deleteTodoList = async id => {
    await deleteTodo(id, token);
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
