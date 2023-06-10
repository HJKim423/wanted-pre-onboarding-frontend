import request from "./core";
const token = JSON.parse(localStorage.getItem("jwt"));

export const createTodo = async todo => {
  const url = `/todos`;
  const res = await request.post(
    url,
    { todo },
    {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getTodos = async () => {
  const url = `/todos`;
  const res = await request.get(url, {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateTodo = async (todo, isCompleted, id) => {
  const url = `/todos/${id}`;
  const res = await request.put(
    url,
    { todo, isCompleted },
    {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteTodo = async id => {
  const url = `/todos/${id}`;
  const res = await request.delete(url, {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });
  return res.data;
};
