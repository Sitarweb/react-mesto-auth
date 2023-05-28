import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "../components/Card.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <button
            className="profile__avatar-edit"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Ваше фото"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__info-paragraph">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
