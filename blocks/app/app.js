(function () {
	'use strict';

	let Menu = window.Menu;

	new Menu({
		el: document.querySelector('.js-menu'),
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
})(window);
