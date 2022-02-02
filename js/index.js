let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let popupBackground = document.querySelector('.popup__area');
let closePopup = document.querySelector('.popup__close-popup');
let inputNameProfile = document.querySelector('.popup__field_edit-name');
let inputSubNameProfile = document.querySelector('.popup__field_edit-prof');
let profilName = document.querySelector('.profile__name');
let profilSubName = document.querySelector('.profile__sub-name');
let like = document.querySelector('.element__like');
let formEdit = document.querySelector('[name="edit-form"]');
const likeElements = document.querySelectorAll('.element__like');

function popupOpen(e) {
	popup.classList.add('popup_opened');
	inputNameProfile.value = profilName.textContent;
	inputSubNameProfile.value = profilSubName.textContent;
} // функция открытия попапа

function popupCLose(e) {
	popup.classList.remove('popup_opened');
} // функция закрытия попапа

function formSubmitHandler(e) {
	e.preventDefault();
	profilName.textContent = inputNameProfile.value;
	profilSubName.textContent = inputSubNameProfile.value;
	popupCLose();
} // функция сохранения изменений в имени профиля

formEdit.addEventListener('submit', formSubmitHandler); // редактирование профиля

profileEdit.addEventListener('click', popupOpen); // открытие попапа

closePopup.addEventListener('click', popupCLose); // закрытие попапа
popupBackground.addEventListener('click', popupCLose); // закрытие кликом на фон 

function likeToggle(e) {
  e.target.classList.toggle('element__like_active');
} // функция переключения лайка

likeElements.forEach(function (like) {
  like.addEventListener('click', likeToggle)
}); // переключение лайка при клике
