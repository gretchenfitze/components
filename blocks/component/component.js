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
		this.el = options.el;
		this.data = Object.assign({}, options.data);
		this._template = options.template;
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
		this.el.innerHTML = this._template(this.data);
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
export default Component;
