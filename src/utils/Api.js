class Api {
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
    }
    /** Метод определяет прошёл запрос успешно или нет */
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
    /** Метод загружает информацию о пользователе с сервера */
    _getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
    /** Метод загружает карточки с сервера */
    _getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
    /** Метод возвращает промисы GET запросов */
    getAllNeededData() {
      return Promise.all([this._getUserInfo(), this._getInitialCards()]);
    }
    /** Метод сохраняет на сервере отредактированные данные о пользователе */
    patchUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(this._checkResponse);
    }
    /** Метод добавляет на сервер новую карточку */
    postNewCard(data) {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._checkResponse);
    }
    /** Метод удаляет с сервера карточку */
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      }).then(this._checkResponse);
    }
    /** Метод ставит лайк */
    _putLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: "PUT",
      }).then(this._checkResponse);
    }
    /** Метод удаляет лайк */
    _deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: "DELETE",
      }).then(this._checkResponse);
    }
  
    changeLikeCardStatus(cardId, isLiked) {
      return isLiked ? this._deleteLike(cardId) : this._putLike(cardId);
    }
  
    /** Метод сохраняет на сервере обновленный аватар профиля */
    patchUserAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify({
          avatar: data.link,
        }),
      }).then(this._checkResponse);
    }
  }
  
  const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-60",
    headers: {
      authorization: "4de0a39e-3417-42f5-abc3-6ae009a02a8f",
      "Content-Type": "application/json",
    },
  });
  
  export default api;
  