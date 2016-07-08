(function () {
	'use strict';

  // Import Menu constructor
	let Menu = window.Menu;

	/**
	 * Set Menu listeners for adding and deleting items
	 *
	 * @param  {HTMLElement}
	 */
	function activateMenuListeners(menu) {
		menu.el.addEventListener('remove', function (event) {
			menu.removeItem(event.detail);
		});

		menu.el.addEventListener('add', function (event) {
			menu.addItem(event.detail);
		});

		window.menu = menu;
	}

	/**
	 * Send XMLHttpRequest to get items for new Menu
	 *
	 * @param  {String}
	 */
	function sendDataRequest(path) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', path, false);
		xhr.send();
		if (xhr.status != 200) {
			alert( xhr.status + ': ' + xhr.statusText );
		}
		return JSON.parse(xhr.responseText);
	}


	// Create first menu
	let menuList = new Menu({
		el: document.querySelector('.js-menu-list'),
		template: '#menu',
		data: sendDataRequest('data/shopping-list.json')
	});
	activateMenuListeners(menuList);

	// Create second menu
	let menuRecipe = new Menu({
		el: document.querySelector('.js-menu-recipe'),
		template: '#menu',
		data: sendDataRequest('data/recipe.json')
	});
	activateMenuListeners(menuRecipe);

})();
