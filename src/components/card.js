import { cardTemplate } from "..";
import { likeCardAPI, dislikeCardAPI, deleteCardAPI } from "./api";

function createCard(card, user, deleteCard, likeCard, openImage) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-button_counter');
  
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;
  cardTitleElement.textContent = card.name;

  likeCounter.textContent = card.likes.length;

  if (card.likes.includes(user.id)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (user.id !== card.owner.id) {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', () =>  deleteCard(card, deleteButton));

  likeButton.addEventListener('click', () => likeCard(card, user, likeButton, likeCounter));

  cardImageElement.addEventListener('click', () => {
    openImage({link: card.link, name: card.name})
  });

  return cardElement;
}

function deleteCard(card, deleteButton) {
  deleteCardAPI({cardId: card.id})
  .then(() => {
    deleteButton.parentElement.remove();
  })
  .catch(err => console.log(err));
}

function likeCard(card, user, likeButton, likeCounter) {
  if (!card.likes.includes(user.id)) {
    likeCardAPI({cardId: card.id, userId: user.id,  currentLikes: card.likes})
    .then((updatedCard) => {
      card.likes = updatedCard.likes;
      likeCounter.textContent = card.likes.length;
      likeButton.classList.add('card__like-button_is-active');
    })
  }
  else {
    dislikeCardAPI({cardId: card.id, userId: user.id, currentLikes: card.likes})
    .then((updatedCard) => {
      card.likes = updatedCard.likes;
      likeCounter.textContent = card.likes.length;
      likeButton.classList.remove('card__like-button_is-active');
    })
  }
}

export {createCard, deleteCard, likeCard};