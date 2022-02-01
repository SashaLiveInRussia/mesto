let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let closePopup = document.querySelector('.popup__close-popup');
let inputNameProfile = document.querySelector('.popup__field_edit-name');
let inputSubNameProfile = document.querySelector('.popup__field_edit-prof');
let profilName = document.querySelector('.profile__name');
let profilSubName = document.querySelector('.profile__sub-name');
let like = document.querySelector('.element__like');

let buttonSave = document.querySelector('.popup__button-save');

function popupOpen(e) {
	popup.classList.add('popup__opened');
	inputNameProfile.value = profilName.textContent;
	inputSubNameProfile.value = profilSubName.textContent;
}

function popupCLose(e) {
	popup.classList.remove('popup__opened');
}

function popupCloseBackground(e) {
	if(!e.defaultPrevented) {
		 popupCLose();
	}
}

function formSubmitHandler(e) {
	e.preventDefault();
	profilName.textContent = inputNameProfile.value;
	profilSubName.textContent = inputSubNameProfile.value;
	popupCLose;
}

buttonSave.addEventListener('submit', formSubmitHandler);

profileEdit.addEventListener('click', popupOpen);

closePopup.addEventListener('click', popupCLose);

popup.addEventListener('click', popupCloseBackground); 

const likeElements = document.querySelectorAll('.element__like');

function likeToggle(event) {
  console.log(event);
  event.target.classList.toggle('element__like_active');
}

likeElements.forEach(function (like) {
  like.addEventListener('click', likeToggle)
});