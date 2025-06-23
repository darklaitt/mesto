// @todo: DOM узлы
const content = document.querySelector('.content');
const cardContainer = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardImage, cardTitle) {

  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__title').textContent = cardTitle;

  // @todo: Функция удаления карточки
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  })

  // @todo: Вывести карточки на страницу
  cardContainer.append(cardElement);  
}

initialCards.forEach((card) => {
  addCard(card.link, card.name);
})