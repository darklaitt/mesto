const config = {
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
}

const checkRes = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

const getInitialCard = () => {
  return fetch(`${config.baseUrl}/cards`, 
    {
      method: "GET"
    })
    .then(checkRes)

}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users`, 
    {
      method: "GET"
    })
    .then(checkRes)
    .then(usersArray => {
      if (usersArray.length > 0) {
        return usersArray[0];
      }
      throw new Error('Пользователь не найден');
    });
} 

const editUserInfo = ({name, about}) => {
  return fetch(`${config.baseUrl}/users/cf8a`, 
    {
      method: 'PATCH',
      headers: config.headers,
    body: JSON.stringify({
    name,
    about
      })
    })
  .then(checkRes)
}

const addCardInfo = ({name, link, owner}) => {
  return fetch(`${config.baseUrl}/cards`, 
    {
      method: 'POST',
      headers: config.headers,
    body: JSON.stringify({
      name,
      link,
      likes: [],
      owner,
      createdAt: new Date().toISOString(), 
    })
  })
  .then(checkRes)
}

const likeCardAPI = ({cardId, userId, currentLikes}) => { 
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        likes: [...currentLikes, userId]
      })
  })
  .then(checkRes)
}

const dislikeCardAPI = ({cardId, userId, currentLikes}) => { 
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        likes: currentLikes.filter(id => id !== userId)
      })
  })
  .then(checkRes)
}

const deleteCardAPI = ({cardId}) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkRes)
}

const editAvatarInfo = ({avatar}) => {
  return fetch(`${config.baseUrl}/users/cf8a/`, 
    {
      method: 'PATCH',
      headers: config.headers,
    body: JSON.stringify({
      avatar
      })
    })
  .then(checkRes)
}

export {getInitialCard, getUserInfo, editUserInfo, addCardInfo, likeCardAPI, dislikeCardAPI, deleteCardAPI, editAvatarInfo}