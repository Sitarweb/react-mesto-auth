import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  // Попап редактирования профиля
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="profile-form-nickname"
        type="text"
        id="name-input"
        className="form__input form__input_mean_name"
        placeholder={"Имя профиля"}
        value={name || ""}
        autoComplete="off"
        minLength={2}
        maxLength={40}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <span className="form__input-error name-input-error"></span>
      <input
        name="profile-form-job"
        type="text"
        id="job-input"
        className="form__input form__input_mean_job"
        placeholder={"Описание профиля"}
        value={description || ""}
        autoComplete="off"
        minLength={2}
        maxLength={200}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <span className="form__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
