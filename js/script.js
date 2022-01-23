let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.close-popup');
let inputNameProfile = document.querySelector('.popup__field-name');
let inputSubNameProfile = document.querySelector('.popup__field-sub-name');
let buttonSave = document.querySelector('.button__save');


buttonSave.addEventListener('click',  function(e) {
    document.querySelector('.profile__name').textContent = inputNameProfile.value;
    document.querySelector('.profile__sub-name').textContent = inputSubNameProfile.value;
    popup.classList.remove('popup__opened');
})

profileEdit.addEventListener('click', function(e) {
    popup.classList.add('popup__opened');
    inputNameProfile.value = document.querySelector('.profile__name').textContent;
    inputSubNameProfile.value = document.querySelector('.profile__sub-name').textContent;
})

popupCLose.addEventListener('click', function(e) {
    popup.classList.remove('popup__opened');
})

