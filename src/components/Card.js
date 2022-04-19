class Card {
	constructor({ data, userId, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
		this.data = data;
		this.userId = userId;
		this.template = document.querySelector(templateSelector);

		this._likeToggle = this._likeToggle.bind(this);
		this._openImage = this._openImage.bind(this);
		this._deleteCard = this._deleteCard.bind(this);
		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._handleLikeClick = handleLikeClick;
	}

	remove() {
		this.cardElement.remove();
		this.cardElement = null;
	}

	getCard() {
		this._initCard();
		this._likeButton = this.cardElement.querySelector('.element__like');
		this._img = this.cardElement.querySelector('.element__img');
		this._deleteButton = this.cardElement.querySelector('.element__delete');
		this.updateLikes(this.data.likes);
		this._setEventListeners();
		return this.cardElement;
	}

	updateLikes(likes) {
		const likeElement = this.cardElement.querySelector('.element__like-number');
		likeElement.textContent = likes.length;
		this.data.likes = likes;

		if (likes.some(like => like._id === this.userId)) {
			this._likeButton.classList.add('element__like_active');
		} else {
			this._likeButton.classList.remove('element__like_active');
		}
	}

	_initCard() {
		this.cardElement = this.template.content.cloneNode(true).querySelector('.element');
		const cardImage = this.cardElement.querySelector('.element__img');
		const cardTitle = this.cardElement.querySelector('.element__title');

		this.cardElement.dataset.id = this.data._id;

		if (this.data.owner._id !== this.userId) {
			const deleteElement = this.cardElement.querySelector('.element__delete');
			deleteElement.remove();
		}

		cardImage.src = this.data.link;
		cardImage.alt = this.data.name;
		cardTitle.textContent = this.data.name;
	}

	_setEventListeners() {
		this._likeButton.addEventListener('click', this._likeToggle);
		this._img.addEventListener('click', this._openImage);

		if (this._deleteButton) {
			this._deleteButton.addEventListener('click', this._deleteCard);
		}
	}

	_likeToggle() {
		const isLiked = this.data.likes.some(like => like._id === this.userId);
		this._handleLikeClick(this.data, isLiked);
	}

	_openImage() {
		this._handleCardClick(this.data);
	}

	_deleteCard() {
		this._handleDeleteClick(this.data)
	}
}

export default Card;