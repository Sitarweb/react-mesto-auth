import React from "react";

function ImagePopup(props) {
  // Попап увеличения картинки карточки
  return (
    <section
      className={`popup popup_images ${
        props.selectedCard != null ? "popup_is-opened" : ""
      } `}
    >
      <div className="popup__content-image">
        <figure className="popup__figure">
          <img
            src={props.selectedCard?.link}
            alt={props.selectedCard?.name}
            className="popup__image"
          />
          <figcaption className="popup__subtitle">
            {props.selectedCard?.name}
          </figcaption>
        </figure>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
