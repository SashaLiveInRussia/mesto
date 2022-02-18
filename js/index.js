const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Тамбовская область',
	  link: 'https://images.unsplash.com/photo-1583004515822-8991eea039a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2235&q=80'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
 ];

const popupEdit = document.querySelector('.popup_profil');
const profileEdit = document.querySelector('.profile__edit');
const closePopupBut = document.querySelectorAll('.popup__close-popup');
const inputNameProfile = document.querySelector('[name="login"]');
const inputSubNameProfile = document.querySelector('[name="profession"]');
const profilName = document.querySelector('.profile__name');
const profilSubName = document.querySelector('.profile__sub-name');
const formEdit = document.querySelector('[name="edit-form"]');

const popupAdd = document.querySelector('.popup_add-image');
const butttonAddImage = document.querySelector('.profile__add-button');
const popupCardName = document.querySelector('.popup__name-card');
const popupCardLink = document.querySelector('.popup__link-card');
const popupFormImage = document.querySelector('[name="form-image"]');

const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImageView = document.querySelector('.popup_image-view');

const template = document.querySelector('.template__element');
const cards = document.querySelector('.elements');

// функция закрытия по ESC
function closeESC(evt, popup) {
	if (evt.key === 'Escape') {
	  closePopup(popup);
	};
 };
 
 // Функция закрытия попапа по оверлею
 function closePopupBack(evt, popup) {
	if (evt.target === evt.currentTarget) {
	  closePopup(popup);
	};
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
 
//функция обработчиков всех полей попапов
 const setEventListeners = (object, formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
	const buttonElement = formElement.querySelector(object.submitButtonSelector);
	toggleButtonState(object, inputList, buttonElement);
	inputList.forEach((inputElement) => {
	  inputElement.addEventListener('input', function () {
		isValid(object, formElement, inputElement);
		toggleButtonState(object, inputList, buttonElement);
	  });
	});
 };

// функция обработчиков форм попапов
const enableValidation = (object) => {
	const formList = Array.from(document.querySelectorAll(object.formSelector));
	formList.forEach((formElement) => {
	  formElement.addEventListener('submit', function (evt) {
		 evt.preventDefault();
	  });
	}); 
	  // const fieldsetList = Array.from(document.querySelectorAll(object.sectionSelector));
	  formList.forEach((fieldSet) => {
	setEventListeners(object, fieldSet);
	});
 };

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

 enableValidation({
	formSelector: '.form',
	inputSelector: '.popup__field',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_off',
	inputErrorClass: 'popup__field_error',
	errorClass: 'popup__field-error_active',
	sectionSelector: '.popup'
});




// инициализируем фото
function renderinitialCards() {
	initialCards.forEach(addCardAppend);
 }
 renderinitialCards()

// функция открытия попапа
function openPopup(popup) {
	popup.classList.add('popup_opened');
	popup.addEventListener('click', event => closePopupBack(event, popup)); 
	popup.addEventListener('keydown', event => closeESC(event, popup));
 }
 
 // функция закрытия попапа
 function closePopup(popup) {
	popup.classList.remove('popup_opened');
	popup.removeEventListener('click', event => closePopupBack(event, popup));
	popup.removeEventListener('keydown', event => closeESC(event, popup));
 }

// кнопки закрытия попапа
closePopupBut.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup))
 })

// открытие попапа добавления карточки
 butttonAddImage.addEventListener('click', function() {
	openPopup(popupAdd)
 })

// функция создания карточки 
function addCard(dataImage) {
	const cardContent = template.content.cloneNode(true);
	const cardElement = cardContent.querySelector('.element');
	const createImage = cardElement.querySelector('.element__img');
	const createTitle = cardElement.querySelector('.element__title');
	createImage.src = dataImage.link;
	createImage.alt = dataImage.name;
	createTitle.textContent = dataImage.name;
	addCardEvent(cardElement, dataImage);
	return cardElement
 }

// карточки добавляются в начало
function addCardPrepend(card) {
	cards.prepend(addCard(card))
}

// карточки добавляются в конец
function addCardAppend(card) {
	cards.append(addCard(card))
}
 
// передача названий и ссылок из формы карточкам
function saveAddCard(e) {
	e.preventDefault();
	const cardInfo = {
	  name: popupCardName.value,
	  link: popupCardLink.value
	}
	addCardPrepend(cardInfo);
	closePopup(popupAdd);
	popupFormImage.reset()
}

// кнопка сохранения карточки
popupFormImage.addEventListener('submit', saveAddCard);

// удаление карточки
function deleteCard(e) {
	e.target.closest('.element').remove()
}

// обработчики событий для карточки
function addCardEvent(cardElement, dataImage) {
	cardElement.querySelector('.element__like').addEventListener('click', likeToggle);
	cardElement.querySelector('.element__img').addEventListener('click', () => openImage(dataImage));
	cardElement.querySelector('.element__delete').addEventListener('click', deleteCard);
}

//функция открытия фото в большом размере
function openImage(dataImage) {
	popupImage.src = dataImage.link
	popupImage.alt = dataImage.name
	popupImageTitle.textContent = dataImage.name
	openPopup(popupImageView)
}


// функция переключения лайка
function likeToggle(e) {
  e.target.classList.toggle('element__like_active');
}


// функция сохранения изменений в имени профиля
function saveNameProfil(e) {
	e.preventDefault();
	profilName.textContent = inputNameProfile.value;
	profilSubName.textContent = inputSubNameProfile.value;
	closePopup(popupEdit);
}

// редактирование профиля
formEdit.addEventListener('submit', saveNameProfil);

// открытие попапа редактирования профиля 
profileEdit.addEventListener('click', function () {
	inputNameProfile.value = profilName.textContent;
	inputSubNameProfile.value = profilSubName.textContent;
	openPopup(popupEdit)
});
