import Component from './../component/component.js';
import Form from './../form/form.js';
import formTemplate from './../form/form.pug';
import './menu.css';

/**
 * @class Menu
 */
class Menu extends Component {
	/**
	 * @constructor
	 * @param	{Object} options
	 * @param	{HTMLElement} options.el
	 */
	constructor(options) {
		super(options);
		this.el = options.el;
	}

	openMenu() {
		this.el.classList.toggle('menu_open');
	}

	/**
	 * @param  {Object|undefined} data
	 */
	render(data) {
		super.render(data);
		this.form = new Form({
			el: this.el.querySelector('.js-form'),
			template: formTemplate
		});
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

	/**
	 * @param  {HTMLElement} item
	 */
	addItem(item) {
		this.data.items.push(item);
		this.render();
	}

	/**
	* @param  {HTMLElement} item
	* @private
	*/
	_onRemoveClick(item) {
		let index = parseInt(item.parentNode.dataset.index);
		this.trigger('remove', {
			index
		});
	}

	/**
	* @param  {HTMLElement} item
	*/
	removeItem (removedItem) {
		this.data.items = this.data.items.filter((item, index) => {
			return index !== removedItem.index;
		});
		this.render();
	}

	/**
	 * @param  {Event} event
	 * @private
	 */
	_onClick (event) {
		event.preventDefault();
		let item = event.target;

		switch (item.dataset.action) {
		case 'remove':
			this._onRemoveClick(item);
			break;

		case 'pick':
			this.pickItem(item);
			break;

		case 'open':
			this.openMenu();
			break;
		}
	}
}

// Export
export default Menu;
