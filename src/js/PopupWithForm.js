import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleSubmitForm) {
        super(selector);

        this._handleSubmitForm = handleSubmitForm.bind(this);
        this._form = this._popup.querySelector('.form');
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__field');
    
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmitForm(this._getInputValues())
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}