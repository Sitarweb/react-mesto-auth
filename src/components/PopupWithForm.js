import React from "react";

// Данная функция является шаблоном для собрания попапов проекта

function PopupWithForm(props) {
  // children - здесь храниться доп. разметка каждого попапа(input, span) , isOpen - функция открытия попапа, onClose - функция закрытия
  return (
    <section
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="form"
          name={`${props.name}-form`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="form__button-save" type="submit">
            {props.buttonText || "Сохранить"}
          </button>
        </form>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
