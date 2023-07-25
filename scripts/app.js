'use strict';

window.addEventListener('DOMContentLoaded', (event) => {
	(function () {
		// Variables
		const navBtn = document?.querySelector('.nav__hamburger');
		const navMenu = document?.querySelector('.nav');
		const bodyEl = document.body;

		// Functions
		const openMenu = () => {
			navBtn?.classList.add('burger--active');
			navMenu?.classList.add('nav--active');
			navBtn?.setAttribute('aria-expanded', 'true');
			navBtn?.setAttribute('aria-label', 'Close menu');
			bodyEl.classList.add('dis-scroll');
		};

		const closeMenu = () => {
			navBtn?.classList.remove('burger--active');
			navMenu?.classList.remove('nav--active');
			navBtn?.setAttribute('aria-expanded', 'false');
			navBtn?.setAttribute('aria-label', 'Open menu');
			bodyEl.classList.remove('dis-scroll');
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

		// Event listener to close the menu when clicking outside
		document.addEventListener('click', (event) => {
			if (!navMenu?.contains(event.target) && event.target !== navBtn) {
				closeMenu();
			}
		});
	})();
});
