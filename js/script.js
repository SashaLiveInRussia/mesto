let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let closePopup = document.querySelector('.popup__close-popup');
let inputNameProfile = document.querySelector('.popup__field_edit-name');
let inputSubNameProfile = document.querySelector('.popup__field_edit-prof');
let profilName = document.querySelector('.profile__name');
let profilSubName = document.querySelector('.profile__sub-name')

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



