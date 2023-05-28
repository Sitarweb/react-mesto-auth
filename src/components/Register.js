import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
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
    props.onRegister({
      password: userData.password,
      email: userData.email,
    });
  }

  return (
    <div className="sign">
      <h2 className="sign__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
        <Link className="sign__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
