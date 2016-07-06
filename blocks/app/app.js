(function () {
	'use strict';

	let Menu = window.Menu;

	new Menu({
		el: document.querySelector('.js-menu-list'),
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

	new Menu({
		el: document.querySelector('.js-menu-recipe'),
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
})(window);
