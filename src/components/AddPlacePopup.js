import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="card-form-title"
        type="text"
        id="mesto-input"
        className="form__input form__input_card_title"
        placeholder={"Название"}
        value={name}
        autoComplete="off"
        minLength={2}
        maxLength={30}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <span className="form__input-error mesto-input-error"></span>
      <input
        name="card-form-link"
        type="url"
        id="url-input"
        className="form__input form__input_card_link"
        placeholder={"Ссылка на картинку"}
        value={link}
        autoComplete="off"
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <span className="form__input-error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
