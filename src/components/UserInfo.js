export default class UserInfo {
	constructor({ selectorName, selectorInfo, selectorAvatar }) {
		this._elementName = document.querySelector(selectorName);
		this._elementInfo = document.querySelector(selectorInfo);
		this._elementAvatar = document.querySelector(selectorAvatar);
	}


	getUserInfo() {
		return {
			name: this._elementName.textContent,
			about: this._elementInfo.textContent,
		}
	}


	setUserInfo({ name, about, avatar, _id }) {
		this._elementName.textContent = name;
		this._elementInfo.textContent = about;
		this._elementAvatar.src = avatar;
		this._id = _id;
	}
}