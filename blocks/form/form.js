(function () {
	'use strict';

	// Import Component constructor
	let Component = window.Component;

	/**
	 * @class Form
	 */
	class Form extends Component {
		/**
		 * @constructor
		 * @param	{Object} options
		 * @param	{HTMLElement} options.el
		 */
		constructor(options) {
			super(options);
			this.inputs = this.el.querySelector('form');
		}

		openForm() {
			this.el.querySelector('.menu__add-goods').classList.toggle('menu__form_open');
		}

		/**
		 * @param	{Event} event
		 * @private
		 */
		_onClick(event) {
			event.preventDefault();
			let item = event.target;

			switch (item.dataset.action) {
			case 'form':
				this.openForm();
				break;
			case 'add':
				this.trigger('add', {
					name: this.inputs.elements[0].value,
					quantity: this.inputs.elements[1].value
				});
				this.inputs.reset();
				break;
			}
		}
	}

	// Export
	window.Form = Form;
})();
