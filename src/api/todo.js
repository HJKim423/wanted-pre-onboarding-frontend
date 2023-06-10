import request from "./core";

export const createTodo = async (todo, token) => {
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

export const getTodos = async token => {
  const url = `/todos`;
  const res = await request.get(url, {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateTodo = async (todo, isCompleted, id, token) => {
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

export const deleteTodo = async (id, token) => {
  const url = `/todos/${id}`;
  const res = await request.delete(url, {
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });
  return res.data;
};
