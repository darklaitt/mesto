import { cardModalImage, cardModalCaption, cardModal } from "..";

function openModal(evt) {
  evt.classList.add('popup_is-animated')
  setTimeout(() => {
    evt.classList.add('popup_is-opened');
  }, 0);
  evt.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeEsc);
}

function closeModal(evt) {
  evt.classList.remove('popup_is-opened');
}

function closeOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    if (document.querySelector('.popup_is-opened')) {
      closeModal(document.querySelector('.popup_is-opened'));
    }
  }
}

function openImage({link: image, name: title}) {
  cardModalImage.src = image;
  cardModalCaption.textContent = title;
  openModal(cardModal);
}

export {openModal, closeModal, closeOverlay, closeEsc, openImage}