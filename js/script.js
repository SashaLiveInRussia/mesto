let popup = document.getElementsByClassName('popup');
let profileEdit = document.getElementsByClassName('profile__edit');


function popupOpen() {
    popup.classList.add('.popup-open');
}

function popupClose() {
    popup.classList.remove('.popup-open');
}

profileEdit.addEventListener('click', popupOpen);

