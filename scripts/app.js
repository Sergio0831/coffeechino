'use strict';

document.addEventListener('DOMContentLoaded', () => {
	/***** Variables *****/
	const navBtn = document?.querySelector('.nav__hamburger');
	const navMenu = document?.querySelector('.nav');
	const navLinks = document?.querySelectorAll('.nav__item a');
	const bodyEl = document.body;

	/***** Functions *****/

	// Add or remove scroll based on menu is open or closed
	const toggleScroll = () => {
		if (navMenu.classList.contains('nav--active')) {
			bodyEl.classList.add('dis-scroll');
		} else {
			bodyEl.classList.remove('dis-scroll');
		}
	};

	// Toggle nav menu on button click
	const toggleMenu = () => {
		navBtn?.classList.toggle('burger--active');
		navMenu?.classList.toggle('nav--active');
		navBtn?.setAttribute(
			'aria-expanded',
			navMenu.classList.contains('nav--active'),
		);
		navBtn.setAttribute(
			'aria-label',
			navMenu.classList.contains('nav--active') ? 'Close menu' : 'Open menu',
		);
		toggleScroll();
	};

	// Close menu function
	const closeMenu = () => {
		navBtn?.classList.remove('burger--active');
		navMenu?.classList.remove('nav--active');
		navBtn?.setAttribute('aria-expanded', 'false');
		navBtn?.setAttribute('aria-label', 'Open menu');
		toggleScroll();
	};

	/***** Event Listeners *****/

	// Event listener to open, close menu
	navBtn?.addEventListener('click', (event) => {
		event.stopPropagation();
		toggleMenu();
	});

	// Event listener to close the menu when clicked outside
	document.addEventListener('click', (event) => {
		if (!navMenu?.contains(event.target) && event.target !== navBtn) {
			closeMenu();
		}
	});

	// Event listener to close the menu when menu link is clicked
	navLinks?.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.stopPropagation();
			closeMenu();
		});
	});

	// Menu data
	const menuItems = [
		{
			drinks: {
				sizes: true,
				categories: {
					coffee: [
						{
							name: 'Espresso',
							description: 'Espresso machine or coffee maker',
							price: [2.5, 3],
						},
						{
							name: 'Americano',
							description: 'Espresso shot',
							price: [3.2, 3.5],
						},
						{
							name: 'Cappuccino',
							description: 'Regular, Flavoured',
							price: [3.5, 3.7],
						},
						{
							name: 'Late',
							description: 'Regular, Flavoured',
							price: [3.5, 3.7],
						},
					],
					tea: [
						{
							name: 'Black Tea',
							description: 'Earl Gray, Irish Breakfast',
							price: [2.7],
						},
						{
							name: 'Green Tea',
							description: 'Jasmine, Matcha',
							price: [2.9],
						},
					],
					other: [
						{
							name: 'Hot Chocolate',
							description: 'Marshmallows, cream',
							price: [3.8, 4.2],
						},
						{
							name: 'Smoothies',
							description: 'Mixed Berry, Mango-Pineapple, Banana',
							price: [4.6, 5.1],
						},
					],
				},
			},
			food: {
				sizes: false,
				categories: {
					sandwiches: [
						{
							name: 'Classic BLT',
							description: 'Bacon, Lettuce, Tomato',
							price: [8.5],
						},
						{
							name: 'Turkey and Swiss',
							description: 'Turkey, Swiss cheese',
							price: [8.5],
						},
						{
							name: 'Ham and Cheese',
							description: 'Tomato, Mozzarella, Basil',
							price: [8.5],
						},
						{
							name: 'Chicken Caesar Wrap',
							description: 'Crispy chicken, Cucumber, Tomato',
							price: [8.5],
						},
					],
					salads: [
						{
							name: 'Caesar Salad',
							description: 'Romaine lettuce, Caesar Dressing',
							price: [9.5],
						},
						{
							name: 'Greek Salad',
							description: 'Mixed veg, Greek Dressing',
							price: [10.5],
						},
					],
					pastries: [
						{
							name: 'Muffins',
							description: 'Blueberry, Chocolate Chip, Banana Nut',
							price: [2.75],
						},
						{
							name: 'Cake Slices',
							description: 'Carrot, Red Velvet, Chocolate',
							price: [4.0],
						},
					],
				},
			},
		},
	];
});
