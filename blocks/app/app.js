(function () {
	'use strict';

  // Import Menu constructor
	let Menu = window.Menu;

	function activateMenuListeners(menu) {
		menu.el.addEventListener('remove', function (event) {
			menu.removeItem(event.detail);
		});

		menu.el.addEventListener('add', function (event) {
			menu.addItem(event.detail);
		});

		window.menu = menu;
	}

	let menuList = new Menu({
		el: document.querySelector('.js-menu-list'),
		template: '#menu',
		data: {
			title: 'Список покупок',
			items: [
				{
					name: 'Хлеб',
					quantity: '2 батона'
				},
				{
					name: 'Молоко',
					quantity: '1 л'
				},
				{
					name: 'Сыр',
					quantity: '300 г'
				},
			]
		}
	});

	activateMenuListeners(menuList);

	let menuRecipe = new Menu({
		el: document.querySelector('.js-menu-recipe'),
		template: '#menu',
		data: {
			title: 'Рецепт',
			items: [
				{
					name: 'Творог',
					quantity: '350 г'
				},
				{
					name: 'Яйцо куриное',
					quantity: '2 штуки'
				},
				{
					name: 'Пшеничная мука',
					quantity: '6 столовых ложек'
				},
				{
					name: 'Сахар',
					quantity: '2 столовые ложки'
				},
				{
					name: 'Подсолнечное масло',
					quantity: '5 столовых ложек'
				},
			]
		}
	});

	activateMenuListeners(menuRecipe);

})();
