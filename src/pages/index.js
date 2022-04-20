import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css';
import Section from '../components/Section.js';
import Api from '../components/Api.js';


const profileEdit = document.querySelector('.profile__edit');
const inputCardId = document.querySelector('[name="_id"]');
const inputNameProfile = document.querySelector('[name="name"]');
const inputSubNameProfile = document.querySelector('[name="about"]');
const butttonAddImage = document.querySelector('.profile__add-button');
const butttonEditAvatar = document.querySelector('.profile__edit-avatar');

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

const formValidatorAvatar = new FormValidator(dataValidation, document.querySelector('form[name="form-avatar"]'));
formValidatorAvatar.enableValidation();


const popupImage = new PopupWithImage('.popup_image-view');
const popupAddCard = new PopupWithForm('.popup_add-image', saveAddCard);
const popupEdit = new PopupWithForm('.popup_profil', saveNameProfile);
const popupQuestion = new PopupWithForm('.popup_question', confirmDelete);
const popupAvatar = new PopupWithForm('.popup_edit-avatar', avatarChange);
const userInfo = new UserInfo({ selectorName: '.profile__name', selectorInfo: '.profile__sub-name', selectorAvatar: '.profile__avatar' });

let cardList;

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
	headers: {
		authorization: 'adaf3729-939a-4351-9992-562ebfc14bb0',
		'Content-Type': 'application/json'
	}
});

function initUserInfo() {
	return api.getUserInfo()
		.then(userInfoApi => {
			userInfo.setUserInfo({
				_id: userInfoApi._id,
				name: userInfoApi.name,
				about: userInfoApi.about,
				avatar: userInfoApi.avatar
			});
		})
		.catch(error => {
			console.error(error);
		})
}

initUserInfo()
	.then(() => initCards())

function initCards() {
	api.getInitialCards()
		.then(cards => {
			cardList = new Section({
				items: cards.reverse(),
				renderer: addCard
			}, '.elements');

			cardList.renderItems();
		})
		.catch(error => {
			console.error(error);
		})
}


function addCard(item) {
	const card = initCard(item);
	cardList.addItem(card);
}

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEdit.setEventListeners();
popupQuestion.setEventListeners();
popupAvatar.setEventListeners();


let cardDeleteConfirm;

// создание карточки
function initCard(dataCard) {
	const card = new Card({
		data: dataCard,
		userId: userInfo._id,

		handleCardClick: (data) => {
			popupImage.open(data);
		},
		handleDeleteClick: (data) => {
			cardDeleteConfirm = card;
			popupQuestion.open();
		},
		handleLikeClick: (data, isLiked) => {
			const fetch = isLiked ? api.deleteLike(data._id) : api.addLike(data._id);

			fetch
				.then(cardApi => {
					card.updateLikes(cardApi.likes);
				})
				.catch(error => {
					console.error(error);
				})
		}
	}, '.template__element');

	return card.getCard();
}


// открытие попапа добавления карточки
butttonAddImage.addEventListener('click', function () {
	popupAddCard.open();
	formValidatorAdd.validateButton();
})

// передача названий и ссылок из формы карточкам
function saveAddCard(data) {
	formValidatorAdd.setTextButton('Сохранение...');

	api.addCard(data)
		.then(cardApi => {
			addCard(cardApi);
			popupAddCard.close();
		})
		.catch(error => {
			console.error(error);
		})
		.finally(() => {
			formValidatorAdd.setTextButton(formValidatorAdd.buttonElementText);
		})
}

// функция сохранения изменений в имени профиля
function saveNameProfile(data) {
	formValidatorEdit.setTextButton('Сохранение...');

	api.editProfile(data)
		.then(userInfoApi => {
			userInfo.setUserInfo(userInfoApi);
			popupEdit.close();
		})
		.catch(error => {
			console.error(error);
		})
		.finally(() => {
			formValidatorEdit.setTextButton(formValidatorEdit.buttonElementText);
		})
}

// открытие попапа редактирования профиля 
profileEdit.addEventListener('click', function () {
	const { name, about } = userInfo.getUserInfo();
	inputNameProfile.value = name;
	inputSubNameProfile.value = about;

	formValidatorEdit.validateButton();
	popupEdit.open();
});

butttonEditAvatar.addEventListener('click', function () {
	popupAvatar.open();
});

function confirmDelete() {
	console.log(cardDeleteConfirm);
	api.deleteCard(cardDeleteConfirm.data._id)
		.then(() => {
			popupQuestion.close();
			cardDeleteConfirm.remove();
			cardDeleteConfirm = null;
		})
		.catch(error => {
			console.error(error);
		});
}

function avatarChange(data) {
	formValidatorAvatar.setTextButton('Сохранение...');

	api.changeAvatar(data)
		.then(userInfoApi => {
			formValidatorAvatar.setTextButton(formValidatorAvatar.buttonElementText);
			userInfo.setUserInfo(userInfoApi);
			popupAvatar.close();
		})
		.catch(error => {
			formValidatorAvatar.setTextButton(formValidatorAvatar.buttonElementText);
			console.error(error);
		})
}