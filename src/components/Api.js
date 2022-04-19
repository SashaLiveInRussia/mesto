export default class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		// если ошибка, отклоняем промис
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getInitialCards() {
		return fetch(this._baseUrl + '/cards', { headers: this._headers })
			.then(this._checkResponse);
	}

	getUserInfo() {
		return fetch(this._baseUrl + '/users/me', { headers: this._headers })
			.then(this._checkResponse);
	}

	editProfile(profileData) {
		return fetch(this._baseUrl + '/users/me', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(profileData)
		})
			.then(this._checkResponse);
	}

	addCard(cardData) {
		return fetch(this._baseUrl + '/cards', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(cardData)
		})
			.then(this._checkResponse);
	}

	deleteCard(_id) {
		return fetch(this._baseUrl + '/cards/' + _id, {
			method: 'DELETE',
			headers: this._headers,
		})
			.then(this._checkResponse);
	}

	addLike(_id) {
		return fetch(this._baseUrl + '/cards/' + _id + '/likes', {
			method: 'PUT',
			headers: this._headers,
		})
			.then(this._checkResponse);
	}

	deleteLike(_id) {
		return fetch(this._baseUrl + '/cards/' + _id + '/likes', {
			method: 'DELETE',
			headers: this._headers,
		})
			.then(this._checkResponse);
	}

	changeAvatar(profileData) {
		return fetch(this._baseUrl + '/users/me/avatar', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(profileData)
		})
			.then(this._checkResponse);
	}
}
