export const saveJWT = jwt => {
  window.localStorage.setItem("jwt", JSON.stringify(jwt));
};

export const getJWT = () => {
  return JSON.parse(window.localStorage.getItem("jwt"));
};
