import { linkInput, cardInput, addCard, cardContainer, formElementCard, currentUser, renderLoading } from "..";
import { createCard, deleteCard, likeCard } from "./card";
import { closeModal, openImage } from "./modal";
import { addCardInfo } from "./api";

function cardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  addCardInfo({name: cardInput.value, 
    link: linkInput.value,
  owner: currentUser})
    .then((card) => {
      console.log(card.owner)
      const cardElement = createCard(
        card,
        card.owner,
        deleteCard,
        likeCard, 
        openImage
      );
      cardContainer.prepend(cardElement);
      closeModal(addCard);
      formElementCard.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false);
    });
}

export {cardFormSubmit}