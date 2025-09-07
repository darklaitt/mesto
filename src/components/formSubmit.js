import { nameInput, jobInput, editCard, setProfile, setAvatar, renderLoading } from "..";
import { closeModal } from "./modal";
import { editUserInfo } from "./api";

function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  editUserInfo({name: nameInput.value,
     about: jobInput.value
    })
      .then(({name, about, avatar}) => {
        setProfile({name, description: about})
        setAvatar({image: avatar})
        closeModal(editCard);
      })
      .catch(err => console.log(err))
      .finally(() => {
      renderLoading(false);
    });
}

export {handleFormSubmit}
