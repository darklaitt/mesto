import { cardTemplate, cardContainer } from "..";

function createCard(cardImage, cardTitle, deleteCard, likeCard, openImage) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');

  cardImageElement.src = cardImage;
  cardImageElement.alt = cardTitle;
  cardTitleElement.textContent = cardTitle;

  deleteButton.addEventListener('click', deleteCard);

  cardContainer.addEventListener('click', likeCard);

  cardImageElement.addEventListener('click', () => {
    openImage(cardImage, cardTitle)
  });

  return cardElement;
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

export {createCard, deleteCard, likeCard};