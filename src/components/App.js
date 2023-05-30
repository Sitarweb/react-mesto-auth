import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import auth from "../utils/Auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function App() {
  const navigate = useNavigate();

  // Переменные внутреннего состояния
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [infoTooltipPopup, setInfoTooltipPopup] = React.useState(false);
  const [infoTooltipText, setInfoTooltipText] = React.useState("");
  const [email, setEmail] = React.useState("");

  // Фунции изменения внутреннего состояния (открытие попапов)
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  // Фунция изменений внутренних состояний (закрытие попапов)
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopup(false);
  };

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAllNeededData()
        .then(([dataForUserInfo, dataForCards]) => {
          setCurrentUser(dataForUserInfo);
          setCards(dataForCards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .patchUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        setEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .patchUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .postNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister({ password, email }) {
    auth
      .signup({ password, email })
      .then(() => {
        setRegistered(true);
        setInfoTooltipPopup(true);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch((err) => {
        setRegistered(false);
        setInfoTooltipPopup(true);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function handleLogin({ password, email }) {
    auth
      .signin({ password, email })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setRegistered(false);
        setInfoTooltipPopup(true);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getCurrentUser(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Header}
                  email={email}
                  link="/sign-in"
                  text="Выйти"
                  onSignOut={handleSignOut}
                />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />

                <ProtectedRoute loggedIn={loggedIn} component={Footer} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header email="" link="/sign-in" text="Войти" />
                <Register onRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header email="" link="/sign-up" text="Регистрация" />
                <Login onLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          name="infoTooltip"
          isOpen={infoTooltipPopup}
          image={registered ? success : fail}
          text={infoTooltipText}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
