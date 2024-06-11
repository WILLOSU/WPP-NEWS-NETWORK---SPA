//const baseUrl = "http://localhost:3000/news";
const baseUrl = "https://wpp-news-network-api.onrender.com/user";

export const createUserService = (user) => {
  const response = fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })

  return response
}

export const getUserService = (id) => {
  const response = fetch(`${baseUrl}/${id}`)
  return response
}

export const updatedUserService = (_userID, token, userData) => {
  const response = fetch(`${baseUrl}/${_userID}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
  return response
}