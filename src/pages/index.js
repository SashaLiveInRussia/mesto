import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css';
import Section from '../components/Section.js';

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

const popupImage = new PopupWithImage('.popup_image-view');
const popupAddCard = new PopupWithForm('.popup_add-image', saveAddCard);
const popupEdit = new PopupWithForm('.popup_profil', saveNameProfile);
const userInfo = new UserInfo({selectorName: '.profile__name', selectorInfo: '.profile__sub-name'});

// карточки добавляются в начало
function addCard(item) {
	const card = initCard(item);
	cardList.addItem(card);
}

const cardList = new Section({
	items: initialCards,
	renderer: addCard
}, '.elements');

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEdit.setEventListeners();

// создание карточки
function initCard(dataCard) {
	const card = new Card({
		data: dataCard,
		handleCardClick: (data) => {
			popupImage.open(data);
		}
	}, '.template__element');
	return card.getCard();
}

cardList.renderItems()

// открытие попапа добавления карточки
butttonAddImage.addEventListener('click', function () {
	popupAddCard.open();
})

// передача названий и ссылок из формы карточкам
function saveAddCard(data) {
	addCard(data);
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
