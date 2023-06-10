export const saveJWT = jwt => {
  window.localStorage.setItem("jwt", JSON.stringify(jwt));
};
