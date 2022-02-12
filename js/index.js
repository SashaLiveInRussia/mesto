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

// инициализируем фото
function renderinitialCards() {
	initialCards.forEach(addCardAppend);
 }
 renderinitialCards()

// функция открытия попапа
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

// функция закрытия попапа
function closePopup(popup) {
	popup.classList.remove('popup_opened');
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