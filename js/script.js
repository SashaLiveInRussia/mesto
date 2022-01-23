let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close-popup');
let inputNameProfile = document.querySelector('.popup__field-name');
let inputSubNameProfile = document.querySelector('.popup__field-sub-name');
let buttonSave = document.querySelector('.popup__button-save');


buttonSave.addEventListener('click',  function(e) {
    e.preventDefault();
    document.querySelector('.profile__name').textContent = inputNameProfile.value;
    document.querySelector('.profile__sub-name').textContent = inputSubNameProfile.value;
    popup.classList.remove('popup__opened');
})

profileEdit.addEventListener('click', function(e) {
    popup.classList.add('popup__opened');
    inputNameProfile.value = document.querySelector('.profile__name').textContent;
    inputSubNameProfile.value = document.querySelector('.profile__sub-name').textContent;
})

popup.addEventListener('submit', formSubmitHandler); 

popupCLose.addEventListener('click', function(e) {
    popup.classList.remove('popup__opened');
})

