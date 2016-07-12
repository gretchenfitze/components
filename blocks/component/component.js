(function () {
	'use strict';

	/**
	 * @class Component
	 */
	class Component {
		/**
		 * @constructor
		 * @param	{Object} options
		 * @param	{HTMLElement} options.el
		 */
		constructor(options) {
			this.templateEngine = window.templateEngine;
			this.el = options.el;
			this.data = Object.assign({}, options.data);
			this._template = document.querySelector(options.template).innerHTML;

			this.render();
			this._initEvents();
		}

		/**
		 * @private
		 */
		_initEvents () {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		render(data) {
			if (data) {
				this.data = data;
			}
			this.el.innerHTML = this.templateEngine(this._template, this.data);
		}

		/**
		 * @param	{string} name event type
		 * @param	{Object} data event object
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

	// Export
	window.Component = Component;
})();
