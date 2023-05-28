class Auth {
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
  
    signup({ password, email }) {
      return fetch(`${this._url}/signup`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({ password, email }),
      }).then(this._checkResponse);
    }
  
    signin({ password, email }) {
      return fetch(`${this._url}/signin`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({ password, email }),
      }).then(this._checkResponse);
    }
  
    getCurrentUser(jwt) {
      return fetch(`${this._url}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        method: "GET",
      }).then(this._checkResponse);
    }
  }
  
  const auth = new Auth({
    url: "https://auth.nomoreparties.co",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default auth;
  