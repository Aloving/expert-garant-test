export const saveToken = (token: string) => {
  if (window) {
    window.localStorage.setItem("token", token);
  }
};

export const getToken = () => {
  if (window) {
    return window.localStorage.getItem("token");
  }

  return "";
};

export const clearToken = () => {
  if (window) {
    window.localStorage.removeItem("token");
  }
};
