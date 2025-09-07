import { avatarInput, editAvatar, renderLoading, setAvatar } from "..";
import { editAvatarInfo } from "./api";
import { closeModal } from "./modal";


function avatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true)

  editAvatarInfo({avatar: avatarInput.value})
    .then(({avatar}) => {
      setAvatar({image: avatar});
      closeModal(editAvatar);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false);
    });
}

export {avatarFormSubmit}