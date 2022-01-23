let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');


function popupOpen() {
    popup.classList.add('popup-open');
}

function popupClose() {
    popup.classList.remove('popup-open');
}

profileEdit.addEventListener('click', popupOpen);

