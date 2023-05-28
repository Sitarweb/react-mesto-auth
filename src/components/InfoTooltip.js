import React from "react";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content">
        <img className="tooltip__image" src={props.image} />
        <h2 className="tooltip__title">{props.text}</h2>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
