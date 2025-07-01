// const baseUrl = "http://localhost:3000/news";
const baseUrl = "https://wpp-news-network-api.onrender.com/user";


export const createUserService = (user) => {
  const response = fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
};

// --- ALTERAÇÃO: Adicionado 'token' como parâmetro e o header Authorization ---
export const getUserService = (id, token) => {
  const response = fetch(`${baseUrl}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
// --- Fim da ALTERAÇÃO ---

export const updatedUserService = (_userID, token, userData) => {
  const response = fetch(`${baseUrl}/${_userID}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return response;
};