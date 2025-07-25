import { nameInput, profileTitle, jobInput, profileDescription, editCard } from "..";
import { closeModal } from "./modal";

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editCard);
}

export {handleFormSubmit}
