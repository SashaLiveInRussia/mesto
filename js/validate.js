const dataValidation = {
	formSelector: '.form',
	inputSelector: '.popup__field',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_off',
	inputErrorClass: 'popup__field_error',
	errorClass: 'popup__input-error_active',
};

// функция демонстрации сообщения об ошибке 
const showInputError = (object, formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(object.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(object.errorClass);
};

// функция скрытия сообщения об ошибке
const hideInputError = (object, formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(object.inputErrorClass);
	errorElement.classList.remove(object.errorClass);
	errorElement.textContent = '';
};

// функция проверки на валидность
const isValid = (object, formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(object, formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(object, formElement, inputElement);
	}
};

// функция обработчиков форм попапов
const enableValidation = (object) => {
	const formList = Array.from(document.querySelectorAll(object.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
		const buttonElement = formElement.querySelector(object.submitButtonSelector);
		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', function () {
				isValid(object, formElement, inputElement);
				toggleButtonState(object, inputList, buttonElement);
			});
		});
	});
};

enableValidation(dataValidation);

// проверка на валидность полей 
function hasInvalidInput(inputList) {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
}

// включение и отключение кнопки
function toggleButtonState(object, inputList, buttonElement) {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(object.inactiveButtonClass);
		buttonElement.setAttribute('disabled', true);
	} else {
		buttonElement.classList.remove(object.inactiveButtonClass);
		buttonElement.removeAttribute('disabled');
	}
}

// проверка кнопки по форме 
function validateButton(formElement) {
	const inputList = Array.from(formElement.querySelectorAll(dataValidation.inputSelector));
	const buttonElement = formElement.querySelector(dataValidation.submitButtonSelector);
	toggleButtonState(dataValidation, inputList, buttonElement);
}