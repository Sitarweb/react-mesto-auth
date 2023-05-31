import React from "react";

function Login({onLogin}) {
  const [userData, setUserData] = React.useState({
    password: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      password: userData.password,
      email: userData.email,
    });
  }

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email || ""}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={40}
        />
        <input
          className="sign__input sign__input_password"
          type="password"
          name="password"
          placeholder="Пароль"
          value={userData.password || ""}
          onChange={handleChange}
          autoComplete="off"
          required
          minLength={3}
          maxLength={40}
        />
        <button className="sign__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
