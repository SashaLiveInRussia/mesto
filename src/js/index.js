import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

import '../pages/index.css';

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

const profileEdit = document.querySelector('.profile__edit');
const inputNameProfile = document.querySelector('[name="name"]');
const inputSubNameProfile = document.querySelector('[name="info"]');
const butttonAddImage = document.querySelector('.profile__add-button');

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

const popupImage = new PopupWithImage('.popup_image-view');
const popupAddCard = new PopupWithForm('.popup_add-image', saveAddCard);
const popupEdit = new PopupWithForm('.popup_profil', saveNameProfile);
const userInfo = new UserInfo({selectorName: '.profile__name', selectorInfo: '.profile__sub-name'});

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEdit.setEventListeners();

// инициализируем фото
function renderInitialCards() {
	initialCards.forEach(dataCard => {
		cards.append(initCard(dataCard));
	});
}

// создание карточки
function initCard(dataCard) {
	const card = new Card({
		data: dataCard,
		handleCardClick: (data) => {
			popupImage.open(data);
		}
	}, template);
	return card.getCard();
}

renderInitialCards()

// открытие попапа добавления карточки
butttonAddImage.addEventListener('click', function () {
	popupAddCard.open();
})

// карточки добавляются в начало
function addCardPrepend(dataCard) {
	cards.prepend(initCard(dataCard));
}

// передача названий и ссылок из формы карточкам
function saveAddCard(data) {
	addCardPrepend(data);
	popupAddCard.close();
}

// функция сохранения изменений в имени профиля
function saveNameProfile(data) {
	userInfo.setUserInfo(data);
	popupEdit.close();
}

// открытие попапа редактирования профиля 
profileEdit.addEventListener('click', function () {	
	const {name, info} = userInfo.getUserInfo();
	inputNameProfile.value = name;
	inputSubNameProfile.value = info;

	formValidatorEdit.validateButton();
	popupEdit.open();
});
