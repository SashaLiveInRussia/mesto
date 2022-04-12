class Card {
	constructor({data, handleCardClick}, templateSelector) {
		this.data = data;
		this.template = document.querySelector(templateSelector);

		this._likeToggle = this._likeToggle.bind(this);
		this._openImage = this._openImage.bind(this);
		this._deleteCard = this._deleteCard.bind(this);
		this._handleCardClick = handleCardClick;
	}

	_initCard() {
		this.cardElement = this.template.content.cloneNode(true).querySelector('.element');
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
		this._handleCardClick(this.data);
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