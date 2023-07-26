'use strict';

document.addEventListener('DOMContentLoaded', () => {
	(function () {
		// Variables
		const navBtn = document?.querySelector('.nav__hamburger');
		const navMenu = document?.querySelector('.nav');
		const navLinks = document?.querySelectorAll('.nav__item a');
		const bodyEl = document.body;

		// Functions

		// Disable scroll when menu is open
		const disableScroll = () => {
			bodyEl.classList.add('dis-scroll');
		};

		// Enable scroll when menu is closed
		const enableScroll = () => {
			bodyEl.classList.remove('dis-scroll');
		};

		const openMenu = () => {
			navBtn?.classList.add('burger--active');
			navMenu?.classList.add('nav--active');
			navBtn?.setAttribute('aria-expanded', 'true');
			navBtn?.setAttribute('aria-label', 'Close menu');
			disableScroll();
		};

		const closeMenu = () => {
			navBtn?.classList.remove('burger--active');
			navMenu?.classList.remove('nav--active');
			navBtn?.setAttribute('aria-expanded', 'false');
			navBtn?.setAttribute('aria-label', 'Open menu');
			enableScroll();
		};

		// Event Listeners

		// Event listener to open, close menu
		navBtn?.addEventListener('click', (event) => {
			event.stopPropagation();

			if (navMenu?.classList.contains('nav--active')) {
				closeMenu();
			} else {
				openMenu();
			}
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
	})();
});
