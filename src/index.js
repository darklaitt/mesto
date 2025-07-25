import './pages/index.css';
import './vendor/normalize.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, openImage } from './components/modal.js';
import { handleFormSubmit } from './components/formSubmit.js';
import { cardFormSubmit } from './components/cardSubmit.js';

export const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
export const cardContainer = content.querySelector('.places__list');

const popup = document.querySelector('.popup');
export const addCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = addCard.querySelector('.popup__close');

export const editCard = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = editCard.querySelector('.popup__close');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

const formElement = document.querySelector('.popup_type_edit .popup__form');
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');

export const formElementCard = document.querySelector('.popup_type_new-card .popup__form');
export const cardInput = formElementCard.querySelector('.popup__input_type_card-name');
export const linkInput = formElementCard.querySelector('.popup__input_type_url');

export const cardModal = document.querySelector('.popup_type_image');
const closeCardModalButton = cardModal.querySelector('.popup__close');
export const cardModalImage = cardModal.querySelector('.popup__image');
export const cardModalCaption = cardModal.querySelector('.popup__caption')

addButton.addEventListener('click', () => {
  formElementCard.reset();
  openModal(addCard);
});

closeAddButton.addEventListener('click', () => {
  closeModal(addCard);
})

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editCard);
})

closeEditButton.addEventListener('click', () => {
  closeModal(editCard);
})

closeCardModalButton.addEventListener('click', () => {
  closeModal(cardModal);
})

formElement.addEventListener('submit', handleFormSubmit);

formElementCard.addEventListener('submit', cardFormSubmit);

initialCards.forEach(card => {
  cardContainer.append(createCard(card.link, card.name, deleteCard, likeCard, openImage));
});