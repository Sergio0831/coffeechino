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
});
