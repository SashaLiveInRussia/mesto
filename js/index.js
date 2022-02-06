let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let closePopup = document.querySelector('.popup__close-popup');
let inputNameProfile = document.querySelector('[name="login"]');
let inputSubNameProfile = document.querySelector('[name="profession"]');
let profilName = document.querySelector('.profile__name');
let profilSubName = document.querySelector('.profile__sub-name');
let formEdit = document.querySelector('[name="edit-form"]');

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

/* function likeToggle(e) {
  e.target.classList.toggle('element__like_active');
} // функция переключения лайка

likeElements.forEach(function (like) {
  like.addEventListener('click', likeToggle)
}); // переключение лайка при клике


 popup.addEventListener('click', function(e) {
	if(e.target === e.currentTarget) {
		popupCLose()
	}
}) */