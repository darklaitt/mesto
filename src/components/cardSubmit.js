import { linkInput, cardInput, addCard, cardContainer, formElementCard } from "..";
import { createCard, deleteCard, likeCard } from "./card";
import { closeModal, openImage } from "./modal";

function cardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard(linkInput.value, cardInput.value, deleteCard, likeCard, openImage);
  cardContainer.prepend(newCard);
  closeModal(addCard);
  formElementCard.reset();
}

export {cardFormSubmit}