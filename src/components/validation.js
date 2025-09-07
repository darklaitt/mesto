const showInputError = ({formElement, inputElement, errorMessage, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError({formElement, inputElement, errorMessage: inputElement.validationMessage, inputErrorClass, errorClass});
  }
  else {
    hideInputError({formElement, inputElement, inputErrorClass, errorClass});
  }
}

const setEventListeners = ({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const submitButton = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity({formElement, inputElement, inputErrorClass, errorClass});
      buttonValidity({formElement, inactiveButtonClass, submitButtonSelector});
    })
  })
  buttonValidity({formElement, inactiveButtonClass, submitButtonSelector});
}

export const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
  });
}

export const clearValidation = (formElement, {submitButtonSelector, inputSelector, inputErrorClass, errorClass, inactiveButtonClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError({formElement, inputElement, inputErrorClass, errorClass});
    console.log(inputElement.validity)
    console.log(formElement.checkValidity());
  })
  buttonValidity({formElement, inactiveButtonClass, submitButtonSelector});
}

const buttonValidity = ({formElement, inactiveButtonClass, submitButtonSelector}) => {
  const submitButton = formElement.querySelector(submitButtonSelector);
  if (!formElement.checkValidity()) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(inactiveButtonClass);
  }
}