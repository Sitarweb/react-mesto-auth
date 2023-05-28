import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import urn from "../images/urn.svg";

function Card(props) {
  // Шаблон по которому создается карточка

  const currentUser = React.useContext(CurrentUserContext);

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="elements__card">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="elements__image"
        onClick={handleClick}
      />
      {isOwn && (
        <img
          className="elements__urn"
          alt="Урна"
          src={urn}
          onClick={handleDeleteClick}
        />
      )}
      <div className="elements__text">
        <h3 className="elements__title">{props.card.name}</h3>
        <div className="elements__like-info">
          <button
            className={`elements__heart-button ${
              isLiked && "elements__heart-button_active"
            }`}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
