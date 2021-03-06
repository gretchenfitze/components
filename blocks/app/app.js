import Model from './../model/model.js';
import Menu from './../menu/menu.js';
import menuTemplate from './../menu/menu.pug';
import './app.css';

/**
 * @class App
 */
class App {
	/**
	 * @constructor
	 */
	constructor(options) {
		this.model = new Model({
			url: 'menu',
			id: options.id
		});
		this.menu = new Menu({
			el: document.querySelector(options.el),
			data: {
				title: '',
				items: []
			},
			template: menuTemplate
		});

		this.model.fetch(this.menu.render.bind(this.menu));
		this.activateMenuListener('remove', this._onRemove);
		this.activateMenuListener('add', this._onAdd);
	}

	activateMenuListener(name, func) {
		this.menu.el.addEventListener(name, func.bind(this));
	}

	/**
	 * @param  {event} event
	 * @private
	 */
	_onRemove(event) {
		this.menu.removeItem(event.detail);
		this._saveModelData();
	}

	/**
	 * @param  {event} event
	 * @private
	 */
	_onAdd(event) {
		this.menu.addItem(event.detail);
		this._saveModelData();
	}

	/**
	 * @private
	 */
	_saveModelData() {
		this.model.setData(this.menu.data);
		this.model.save();
	}
}

new App({
	el: '.js-menu-list',
	id: 'shoppinglist'
});

new App({
	el: '.js-menu-recipe',
	id: 'recipe'
});
