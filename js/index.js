import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const dataValidation = {
	formSelector: '.form',
	inputSelector: '.popup__field',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_off',
	inputErrorClass: 'popup__field_error',
	errorClass: 'popup__input-error_active',
};

const formValidatorEdit = new FormValidator(dataValidation, document.querySelector('form[name="edit-form"]'));
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(dataValidation, document.querySelector('form[name="form-image"]'));
formValidatorAdd.enableValidation();

const template = document.querySelector('.template__element');
const cards = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');

// функция закрытия по ESC
function closeESC(evt,) {
	if (evt.key === 'Escape') {
		const popup = document.querySelector('.popup_opened');
		closePopup(popup);
	};
};

// Функция закрытия попапа по оверлею
function closePopupBack(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.target);
	};
};

popups.forEach(popup => {
	popup.addEventListener('mousedown', closePopupBack)
});

// инициализируем фото
function renderInitialCards() {
	initialCards.forEach(dataCard => {
		const card = new Card(dataCard, template);
		card.openPopup = openPopup;
		cards.append(card.getCard());
	});
}

renderInitialCards()

// функция открытия попапа
function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeESC);
}

// функция закрытия попапа
function closePopup(popup) {
	popup.classList.remove('popup_opened');
	formValidatorAdd.resetForm();
	formValidatorEdit.resetForm();
	document.removeEventListener('keydown', closeESC);
}

// кнопки закрытия попапа
closePopupBut.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup))
})

// открытие попапа добавления карточки
butttonAddImage.addEventListener('click', function () {
	openPopup(popupAdd);
})

// карточки добавляются в начало
function addCardPrepend(dataCard) {
	const card = new Card(dataCard, template);
	card.openPopup = openPopup;
	cards.prepend(card.getCard())
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
	openPopup(popupEdit)
	inputNameProfile.value = profilName.textContent;
	inputSubNameProfile.value = profilSubName.textContent;
	formValidatorEdit.validateButton();
});
