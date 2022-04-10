export default class UserInfo {
    constructor({selectorName, selectorInfo}) {
        this._elementName = document.querySelector(selectorName);
        this._elementInfo = document.querySelector(selectorInfo);
    }


    getUserInfo() {
        return {
            name: this._elementName.textContent,
            info: this._elementInfo.textContent,
        }
    }


    setUserInfo({name, info}) {
        this._elementName.textContent = name;
        this._elementInfo.textContent = info;
    }
}