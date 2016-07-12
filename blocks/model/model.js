(function() {
	'use strict';

	const BASE_URL = 'https://learnjs-components.firebaseio.com/';

	class Model {
		constructor(options) {
			this.data = options.data || {};
			this.url = options.url;
			this.id = options.id;
			this._getResponse = this._getResponse.bind(this);
		}

		getData () {
			return this.data;
		}

		setData (data) {
			this.data = data;
		}

		/**
		 * Загрузка данных с сервера
		 * @param	{Function} resolve
		 * @return {XMLHttpRequest}
		 */
		fetch(resolve) {
			let req = this._makeRequest('GET');

			req.onreadystatechange = () => {
				if (this._getResponse(req)) {
					resolve(this.getData());
				}
			};

			req.send();
			return req;
		}

		save() {
			let req = this._makeRequest('PUT');

			req.onreadystatechange = this._getResponse(req);

			let reqString = JSON.stringify(this.getData());
			req.send(reqString);
		}

		/**
		 * Создание объекта запроса
		 * @param {string} method - HTTP method
		 * @return {XMLHttpRequest}
		 * @private
		 */
		_makeRequest (method) {
			let xhr = new XMLHttpRequest();

			xhr.open(method, BASE_URL + this.url + '/' + this.id + '.json', false);

			return xhr;
		}

		/**
		 * Преобразование тескта ответа в данные
		 * @param {string} responseText
		 * @return {Object}
		 */
		parse (responseText) {
			return JSON.parse(responseText);
		}

		/**
		 * @param  {XMLHttpRequest} req
		 * @return {boolean}
     * @private
		 */
		_getResponse(req) {
			if (req.readyState != 4) return false;

			if (req.status != 200) {
				console.log(req.status + ': ' + req.statusText);
				return false;
			} else {
				let data = this.parse(req.responseText);
				this.data = data;
				return true;
			}
		}

	}

	//export
	window.Model = Model;
})();
