'use strict';

document.addEventListener('DOMContentLoaded', () => {
	/***** Function for navigation menu and links *****/
	(function () {
		/***** Variables *****/
		const navBtn = document?.querySelector('.nav__hamburger');
		const navMenu = document?.querySelector('.nav');
		const navLinks = document?.querySelectorAll('.nav__item a');
		const scrollBtns = document?.querySelectorAll(
			'a[href="#menu"], a[href="#contact"]',
		);
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

		// Scroll to element on link click
		const scrolToElementOnClick = (event, element, offset = 0) => {
			event.preventDefault();

			const target = element.getAttribute('href');
			const targetElement = document.querySelector(target);
			const top = targetElement.offsetTop;

			window.scrollTo({
				top: top - offset,
				behavior: 'smooth',
			});
		};

		// Set the active link in the navigation menu
		const setActiveLink = (link) => {
			const activeLinks = document.querySelectorAll('nav li.active-link');
			activeLinks.forEach((activeLink) => {
				if (activeLink !== link) {
					// Remove focus from the previous active link
					activeLink.querySelector('a').blur();
				}
				activeLink.classList.remove('active-link');
			});

			link.classList.add('active-link');
		};

		// Update the active navigation menu link on scro20
		const handleScroll = () => {
			const sections = document.querySelectorAll('section, header');
			const scrollPosition = window.scrollY;

			let activeLink = null;

			sections.forEach((section) => {
				const sectionTop = section.offsetTop;
				const sectionBottom = sectionTop + section.offsetHeight;

				if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
					activeLink = document.querySelector(
						`nav li a[href='#${section.id}']`,
					);
				}
			});

			if (activeLink) {
				setActiveLink(activeLink.parentElement);
			}
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

		// Event listener to scroll to section and close the menu when menu link is clicked
		navLinks?.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.stopPropagation();
				closeMenu();
				scrolToElementOnClick(event, link, 30);

				setActiveLink(link.parentElement);
			});
		});

		// Event listener to scroll to particular section on button clicked
		scrollBtns?.forEach((btn) => {
			btn.addEventListener('click', (event) => {
				event.stopPropagation();
				btn.blur();
				scrolToElementOnClick(event, btn, 30);
			});
		});

		// Event listener to attach the scroll event to the window
		window.addEventListener('scroll', handleScroll);
	})();

	/***** Function for drinks and food menu *****/
	(function () {
		/***** Variables *****/
		const menuBtns = document.querySelectorAll('.menu__btn');
		let drinksMenuGenerated = true;
		let foodMenuGenerated = false;

		// Drinks and food menu data
		const menuItems = {
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
		};

		/***** Functions *****/

		// Menu category item HTML template
		const generateMenuCategoryItem = (categoryData) => {
			const { name, description, price } = categoryData;

			const html = `
				<div class='category__item'>
					<div class='category__item-content'>
						<h4 class='heading-4'>${name}</h4>
						<p>${description}</p>
					</div>	
					<div class='category__item-prices'>
						${price.map((item) => `<span>&euro;${item.toFixed(2)}</span>`).join(' ')}
					</div>
				</div>
			`;
			return html;
		};

		// Menu category HTML template
		const generateMenuCategory = (categories) => {
			let html = ``;

			for (const category in categories) {
				const items = categories[category];
				html += `
				<div class='category'>
					<h3 class='heading-3 text-center'>
						${category.charAt(0).toUpperCase() + category.slice(1)}
					</h3>
					${items.map((item) => generateMenuCategoryItem(item)).join(' ')}
				</div>
			`;
			}

			return html;
		};

		// Menu HTML template
		const generateMenu = (menuItem) => {
			const menuCard = document.querySelector('.menu__card');

			// Remove previous generated menu
			menuCard.innerHTML = '';

			let html = `
				${
					menuItem.sizes
						? `<div class='sizes'>
					<span>Regular</span>
					<span>Large</span>
				</div>`
						: ''
				}
				${generateMenuCategory(menuItem.categories)}
			`;

			return menuCard.insertAdjacentHTML('afterbegin', html);
		};

		// Show drinks menu by default
		generateMenu(menuItems['drinks']);

		// Show food or drinks menu on button click
		const showMenuOnClick = (e) => {
			e.stopPropagation();
			const target = e.target;

			// Get the aria-label attribute of the button was clicked
			const ariaLabel = target.getAttribute('aria-label');

			// Remove active class from all buttons
			menuBtns.forEach((btn) => btn.classList.remove('btn--active'));

			// Add active class to the clicked button
			target.classList.add('btn--active');

			// Check if the aria-label exist and show menu
			if (ariaLabel) {
				// Check which menu to generate based on the clicked button
				if (ariaLabel.toLowerCase() === 'drinks') {
					if (!drinksMenuGenerated) {
						generateMenu(menuItems[ariaLabel.toLowerCase()]);
						drinksMenuGenerated = true;
						foodMenuGenerated = false;
					}
				} else if (ariaLabel.toLowerCase() === 'food') {
					if (!foodMenuGenerated) {
						generateMenu(menuItems[ariaLabel.toLowerCase()]);
						drinksMenuGenerated = false;
						foodMenuGenerated = true;
					}
				}
			}
		};

		/***** Event listeners *****/
		menuBtns.forEach((btn) => btn.addEventListener('click', showMenuOnClick));
	})();
});
