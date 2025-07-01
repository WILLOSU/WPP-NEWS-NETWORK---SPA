// const baseUrl = "http://localhost:3000/news";
const baseUrl = "https://wpp-news-network-api.onrender.com/news";

export const getAllNewsService = async (offset, limit) => {
  try {
    const response = await fetch(`${baseUrl}?offset=${offset}&limit=${limit}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNewsFromSearchService = async (offset, limit, title) => {
  try {
    const response = await fetch(
      `${baseUrl}/search?title=${title}&offset=${offset}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNewsByUserService = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/byUser`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const createNewNewsService = async (token, newNews) => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newNews),
    });
    return response;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const updatedNewsService = async (token, updatedNews, newsID) => {
  try {
    const response = await fetch(`${baseUrl}/${newsID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNews),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likeTheNewsService = async (newsId, token) => {
  try {
    const response = fetch(`${baseUrl}/like/${newsId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addCommentsTheNewsService = async (newsId, token, input) => {
  try {
    const response = await fetch(`${baseUrl}/comment/${newsId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCommentsTheNewsService = async (
  newsId,
  commentId,
  token
) => {
  try {
    const response = fetch(`${baseUrl}/comment/${newsId}/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteNewsService = async (newsID, token) => {
  try {
    const response = fetch(`${baseUrl}/${newsID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const moderateNewsService = async (newsId, token, status) => {
  try {
    const response = await fetch(`${baseUrl}/moderate/${newsId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const hardDeleteNewsService = async (newsId, token) => {
  try {
    const response = await fetch(`${baseUrl}/hard/${newsId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNewsForAdminViewService = async (
  token,
  offset,
  limit,
  statuses = []
) => {
  try {
    let url = `${baseUrl}/admin`;

    if (statuses.length > 0) {
      url += `?status=${statuses.join(",")}`;
    }

    if (limit && offset) {
      url += `${
        statuses.length > 0 ? "&" : "?"
      }offset=${offset}&limit=${limit}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

// CORRIGIDO: Para inativar, usa o endpoint moderate
export const inactiveNewsService = async (newsID, token) => {
  try {
    const response = await fetch(`${baseUrl}/moderate/${newsID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "inactive" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// Para PUBLICAR - usa o endpoint moderate que já existe
export const publishNewsService = async (newsID, token) => {
  try {
    const response = await fetch(`${baseUrl}/moderate/${newsID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "published" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// NOVA FUNÇÃO: Wrapper que decide qual função usar baseado no role
export const getNewsService = async (token, user, offset = 0, limit = 5) => {
  try {
    // Se for admin, busca todas as notícias (incluindo pending, inactive, etc)
    if (user?.role === "admin") {
      return await getNewsForAdminViewService(token, offset, limit);
    }
    // Se for usuário comum, busca apenas as publicadas
    else {
      return await getAllNewsService(offset, limit);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ALIAS para compatibilidade (se algum arquivo usar este nome)
export const getAllNewsForAdminService = getNewsForAdminViewService;
