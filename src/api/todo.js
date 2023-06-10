import request from "./core";
const token = JSON.parse(localStorage.getItem("jwt"));

export const createTodo = async todo => {
  const url = `/todos`;
  await request
    .post(
      url,
      { todo },
      {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }
    )
    .then(res => {
      console.log(res.data);
      return JSON.stringify(res.data.body);
    });
};
