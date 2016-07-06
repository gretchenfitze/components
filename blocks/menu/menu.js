(function () {
	'use strict';
	/**
	 * @class Menu
	 */
	class Menu {
		/**
		 * @constructor
		 * @param	{Object} options
		 * @param	{HTMLElement} options.el
		 */
		constructor(options) {
			this.el = options.el;
			this.data = Object.assign({}, options.data);
			this.templateEngine = window.templateEngine;

			this.render();
			this.list = this.el.querySelector('.menu__list');

			this._initEvents();
		}

		/**
		* @param  {HTMLElement} item
		*/
		removeItem (item) {
			let index = parseInt(item.parentNode.dataset.index);
			this.trigger('remove', {
				index
			});
			item.parentNode.remove();
		}

		/**
		* @param {HTMLElement} item
		*/
		pickItem(item) {
			let pickedItem = item;
			if (!item.classList.contains('menu__item')) {
				pickedItem = item.parentNode;
			}
			this.trigger('pick', {
				name: pickedItem.firstChild.textContent,
				quantity: pickedItem.childNodes[1].textContent
			});
		}

		openMenu() {
			this.el.classList.toggle('menu_open');
		}

		openForm() {
			this.el.querySelector('.menu__add-goods').classList.toggle('menu__form_open');
		}

		addElement() {
			this.form = this.el.querySelector('form');
			let newElement = {
				name: this.form.elements[0].value,
				quantity: this.form.elements[1].value
			};
			this.data.items.push(newElement);
			this.trigger('add', newElement);
			this.render();
		}

		_initEvents () {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		get _template() {
			return document.querySelector('#menu').innerHTML;
		}

		render() {
			this.el.innerHTML = this.templateEngine(this._template, this.data);
		}

		/**
		 * @param  {Event} event
		 */
		_onClick (event) {
			event.preventDefault();
			let item = event.target;

			switch (item.dataset.action) {
			case 'remove':
				this.removeItem(item);
				break;

			case 'pick':
				this.pickItem(item);
				break;

			case 'open':
				this.openMenu();
				break;

			case 'form':
				this.openForm();
				break;

			case 'add':
				this.addElement();
				break;
			}
		}

		/**
		 * @param  {string} name event type
		 * @param  {Object} data event object
		 */
		trigger(name, data) {
			let widgetEvent = new CustomEvent(name, {
				bubbles: true,
				detail: data
			});
			this.el.dispatchEvent(widgetEvent);

			console.log(name, data);
		}
	}

	window.Menu = Menu;
})(window);
