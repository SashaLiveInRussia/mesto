class Card {
    constructor(data, templateSelector) {
        this.data = data;
        this.templateSelector = templateSelector;

        this.popupImage = document.querySelector('.popup__image');
        this.popupImageTitle = document.querySelector('.popup__image-title');
        this.popupImageView = document.querySelector('.popup_image-view');

        this._likeToggle = this._likeToggle.bind(this);
        this._openImage = this._openImage.bind(this);
        this._deleteCard = this._deleteCard.bind(this);

        this._initCard();
        this._setEventListeners();
    }

    _initCard() {
        this.cardElement = this.templateSelector.content.cloneNode(true).querySelector('.element');
        const cardImage = this.cardElement.querySelector('.element__img');
        const cardTitle = this.cardElement.querySelector('.element__title');

        cardImage.src = this.data.link;
        cardImage.alt = this.data.name;
        cardTitle.textContent = this.data.name;
    }

    _setEventListeners() {
        this.cardElement.querySelector('.element__like').addEventListener('click', this._likeToggle);
        this.cardElement.querySelector('.element__img').addEventListener('click', this._openImage);
        this.cardElement.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    }

    _likeToggle(e) {
        e.target.classList.toggle('element__like_active');
    }

    _openImage() {
        this.popupImage.src = this.data.link
        this.popupImage.alt = this.data.name
        this.popupImageTitle.textContent = this.data.name

        this.openPopup(this.popupImageView)
    }

    _deleteCard(e) {
        e.target.closest('.element').remove()
    }

    getCard() {
        return this.cardElement
    }
}

export default Card;