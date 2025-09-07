import './pages/index.css';
import './vendor/normalize.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, openImage } from './components/modal.js';
import { handleFormSubmit } from './components/formSubmit.js';
import { cardFormSubmit } from './components/cardSubmit.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCard, getUserInfo } from './components/api.js';
import { avatarFormSubmit } from './components/avatarSubmit.js';

export const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
export const cardContainer = content.querySelector('.places__list');

export const addCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = addCard.querySelector('.popup__close');

export const editCard = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = editCard.querySelector('.popup__close');

const formEditAvatar = document.querySelector('.popup_type_edit_avatar .popup__form');
export const editAvatar = document.querySelector('.popup_type_edit_avatar');
const editAvatarButton = document.querySelector('.profile__image-edit')
const closeEditAvatar = editAvatar.querySelector('.popup__close')
export const avatarInput = editAvatar.querySelector('.popup__input_type_avatar')

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const formElement = document.querySelector('.popup__form');
const submitButton = formElement.querySelector('.popup__button');

export const editFormElement = document.querySelector('.popup_type_edit .popup__form');
export const editSubmitButton = editFormElement.querySelector('.popup__button');
export const nameInput = editFormElement.querySelector('.popup__input_type_name');
export const jobInput = editFormElement.querySelector('.popup__input_type_description');

export const formElementCard = document.querySelector('.popup_type_new-card .popup__form');
export const cardSubmitButton = formElementCard.querySelector('.popup__button');
export const cardInput = formElementCard.querySelector('.popup__input_type_card-name');
export const linkInput = formElementCard.querySelector('.popup__input_type_url');

export const cardModal = document.querySelector('.popup_type_image');
const closeCardModalButton = cardModal.querySelector('.popup__close');
export const cardModalImage = cardModal.querySelector('.popup__image');
export const cardModalCaption = cardModal.querySelector('.popup__caption')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const setProfile = ({name, description}) => {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

export const setAvatar = ({image}) => {
  profileImage.style.backgroundImage = `url(${image})`;
}

export function renderLoading(isLoading) {
    submitButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
}
 
addButton.addEventListener('click', () => {
  formElementCard.reset();
  clearValidation(formElementCard, validationConfig);
  openModal(addCard);
});

closeAddButton.addEventListener('click', () => {
  closeModal(addCard);
})

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editFormElement, validationConfig);
  openModal(editCard);
})

closeEditButton.addEventListener('click', () => {
  closeModal(editCard);
})

editAvatarButton.addEventListener('click', () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openModal(editAvatar);
})

closeEditAvatar.addEventListener('click', () => {
  closeModal(editAvatar);
})

closeCardModalButton.addEventListener('click', () => {
  closeModal(cardModal);
})

editFormElement.addEventListener('submit', handleFormSubmit);

formElementCard.addEventListener('submit', cardFormSubmit);

formEditAvatar.addEventListener('submit', avatarFormSubmit);

export let currentUser;
Promise.all([getUserInfo(), getInitialCard()])
  .then(([user, cards]) => {
    currentUser = user;
    setProfile({name: user.name, description: user.about});
    setAvatar({image: user.avatar})
    cards.forEach((card) => {
      cardContainer.append(createCard(card, user, deleteCard, likeCard, openImage));
    })
  })
  .catch(err => console.log(err))

enableValidation(validationConfig);