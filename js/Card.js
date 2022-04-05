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
		this._likeButton.addEventListener('click', this._likeToggle);
		this._img.addEventListener('click', this._openImage);
		this._deleteButton.addEventListener('click', this._deleteCard);
	}

	_likeToggle() {
		this._likeButton.classList.toggle('element__like_active');
	}

	_openImage() {
		this.popupImage.src = this.data.link
		this.popupImage.alt = this.data.name
		this.popupImageTitle.textContent = this.data.name

		this.openPopup(this.popupImageView)
	}

	_deleteCard() {
		this.cardElement.remove();
		this.cardElement = null;
	}

	getCard() {
		this._initCard();
		this._likeButton = this.cardElement.querySelector('.element__like');
		this._img = this.cardElement.querySelector('.element__img');
		this._deleteButton = this.cardElement.querySelector('.element__delete');
		this._setEventListeners();
		return this.cardElement;
	}


}

export default Card;