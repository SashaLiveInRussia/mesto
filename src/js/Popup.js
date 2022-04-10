export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._buttonCLose = this._popup.querySelector('.popup__close-popup');

        this._handleEscClose = this._handleEscClose.bind(this);
        this._closePopupBack = this._closePopupBack.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        console.log(123)
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }        
    }
    
    _closePopupBack(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonCLose.addEventListener('click', this.close)
        this._popup.addEventListener('mousedown', this._closePopupBack)
    }
}

