'use strict';

document.addEventListener('DOMContentLoaded', () => {
	/***** Navigation menu and links *****/
	{
		/***** Variables *****/
		const navBtn = document?.querySelector('.nav__hamburger');
		const navMenu = document?.querySelector('.nav');
		const navLinks = document?.querySelectorAll('.nav__item a');
		const scrollBtns = document?.querySelectorAll(
			'a[href="#menu"], a[href="#contact"]',
		);
		const backToTopBtn = document?.querySelector('.top-btn');

		/***** Functions *****/

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
			toggleScroll(navMenu.classList.contains('nav--active'));
		};

		// Close menu function
		const closeMenu = () => {
			navBtn?.classList.remove('burger--active');
			navMenu?.classList.remove('nav--active');
			navBtn?.setAttribute('aria-expanded', 'false');
			navBtn?.setAttribute('aria-label', 'Open menu');
			toggleScroll(false);
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
			const sections = document.querySelectorAll('section');
			const scrollPosition = window.scrollY;

			let activeLink = null;

			sections.forEach((section) => {
				const sectionTop = section.offsetTop - 100;
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

		// Show back to top button
		const showToTopBtn = () => {
			window.scrollY > window.innerHeight
				? backToTopBtn.classList.add('visible')
				: backToTopBtn.classList.remove('visible');
		};

		// Scroll to top
		const scrollToTop = (e) => {
			e.preventDefault();
			backToTopBtn.blur();
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		};

		/***** Event Listeners *****/

		// Event listener to open, close menu
		addClickEventListener(navBtn, (e) => {
			e.stopPropagation();
			toggleMenu();
		});

		// Event listener to close the menu when clicked outside
		addClickEventListener(document, (e) => {
			if (!navMenu?.contains(e.target) && e.target !== navBtn) {
				if (navMenu.classList.contains('nav--active')) {
					closeMenu();
					e.stopPropagation();
				}
			}
		});

		// Event listener to scroll to section and close the menu when menu link is clicked
		navLinks?.forEach((link) => {
			addClickEventListener(link, (event) => {
				event.stopPropagation();
				closeMenu();
				scrolToElementOnClick(event, link, 50);

				setActiveLink(link.parentElement);
			});
		});

		// Event listener to scroll to particular section on button clicked
		scrollBtns?.forEach((btn) => {
			addClickEventListener(btn, (e) => {
				e.stopPropagation();
				btn.blur();
				scrolToElementOnClick(e, btn, 50);
			});
		});

		// Event listener to attach the scroll event to the window and ahow back to top button
		window.addEventListener('scroll', () => {
			handleScroll();
			showToTopBtn();
		});

		// Event listener to scroll back to top when back to top button is clicked
		addClickEventListener(backToTopBtn, scrollToTop);
	}

	/***** Drinks and food menu *****/
	{
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
		menuBtns.forEach((btn) => addClickEventListener(btn, showMenuOnClick));
	}

	/***** Testimonials *****/
	{
		/***** Variables *****/
		const testimonialsSlider = document?.querySelector('.splide');

		/* Testimonials data */
		const testimonialsData = [
			{
				image: 'assests/images/testimonials/erik.webp',
				name: 'Erik Lamela',
				review:
					"I can't say enough about the exceptional service at Coffee Chino. The staff is incredibly friendly, knowledgeable, and passionate. They always go the extra mile to ensure I have a memorable experience. It's the kind of place that makes you feel like a valued customer.",
			},
			{
				image: 'assests/images/testimonials/sarah.webp',
				name: 'Sarah Marie',
				review:
					'The combination of delicious food and incredible coffee at Coffee Chino is unbeatable. From their mouth watering pastries to their expertly crafted lattes, every visit is a delightful experience. It has become my favourite spot to indulge in a moment of pure bliss.',
			},
			{
				image: 'assests/images/testimonials/john.webp',
				name: 'John Lee',
				review:
					"I'm a coffee enthusiast, and I must say, Coffee Chino has impressed me with their dedication to quality. The attention to detail in their brewing process and the rich, aromatic flavours of their coffee are unparalleled. It's a true haven for coffee lovers.",
			},
			{
				image: 'assests/images/testimonials/emily.webp',
				name: 'Emily Walsh',
				review:
					'The coffee at Coffee Chino is truly exceptional. Every cup is a perfect balance of flavours, leaving me craving for more. The cosy atmosphere and friendly staff make it my go-to spot for a relaxing coffee break.',
			},
			{
				image: 'assests/images/testimonials/mike.webp',
				name: 'Mike Doe',
				review:
					"The cosy ambience at Coffee Chino always makes me feel right at home. The warm lighting, comfortable seating, and welcoming staff create the perfect atmosphere to unwind and enjoy a great cup of coffee. It's my sanctuary in the bustling city.",
			},
		];

		/***** Functions *****/

		// Testimonial card html template
		const generateTestimonialCard = (testimonial) => {
			const { image, name, review } = testimonial;
			const html = `
				<article class="testimonial splide__slide">
					<div class="testimonial__person">
						<img src=${image} alt=${name} loading="lazy" width="100" height="100">
						<h3 class="heading-4">${name}</h3>
					</div>
					<p class="testimonial__review">
						&ldquo; ${review} &rdquo;
					</p>
                </article>
			`;

			return html;
		};

		// Insert testimonials to list
		const generateTestimonials = (testimonials) => {
			const testimonialsList = document?.getElementById('testimonials__list');

			testimonials.forEach((testimonial) => {
				const html = generateTestimonialCard(testimonial);
				testimonialsList.insertAdjacentHTML('afterbegin', html);
			});
		};

		generateTestimonials(testimonialsData);

		/* Initialize slider */
		const splide = new Splide(testimonialsSlider, {
			perPage: 2,
			perMove: 1,
			drag: true,
			pagination: false,
			gap: 'min(3vw, 5rem)',
			classes: {
				arrows: 'splide__arrows',
				arrow: 'splide__arrow',
				prev: 'splide__arrow--prev',
				next: 'splide__arrow--next',
			},
			breakpoints: {
				820: {
					perPage: 1,
				},
			},
		});
		splide.mount();
	}

	/***** Image gallery *****/
	{
		/***** Variables *****/
		const lightbox = document.querySelector('.lightbox');
		const lightboxImage = document.querySelector('.lightbox__image');
		const lightboxImages = document.querySelectorAll('.gallery__image');
		const totalImages = lightboxImages.length;
		const lightBoxTotal = document.querySelector('.lightbox__image-total');
		const lightboxCloseBtn = document.querySelector('.lightbox__btn--close');
		const lightboxBtnNext = document.querySelector('.lightbox__btn--next');
		const lightboxBtnPrev = document.querySelector('.lightbox__btn--prev');

		let currentImageIndex = 0;
		lightBoxTotal.textContent = `0${totalImages}`;

		/***** Functions *****/
		const updateLightboxImage = (index) => {
			const lightboxCurrent = document.querySelector(
				'.lightbox__image-current',
			);

			lightboxImage.src = lightboxImages[index].getAttribute('data-imagesrc');
			lightboxImage.alt = lightboxImages[index].alt;
			lightboxImage.srcset = `assests/images/gallery/lightbox/gallery-${
				index + 1
			}-large-460.webp 460w, 
                        assests/images/gallery/lightbox/gallery-${
													index + 1
												}-large-820.webp 820w,
                        assests/images/gallery/lightbox/gallery-${
													index + 1
												}-large.webp`;
			lightboxCurrent.textContent = `0${index + 1}`;
			currentImageIndex = index;

			// Disbale prev button when first image
			if (index === 0) {
				lightboxBtnPrev.disabled = true;
			} else {
				lightboxBtnPrev.disabled = false;
			}

			// Disbale next button when last image
			if (index === lightboxImages.length - 1) {
				lightboxBtnNext.disabled = true;
			} else {
				lightboxBtnNext.disabled = false;
			}
		};

		/***** Event listeners *****/

		// Open lightbox image on click gallery image
		lightboxImages.forEach((image, index) => {
			addClickEventListener(image, (e) => {
				e.stopPropagation();
				toggleElement(lightbox);
				currentImageIndex = index;
				updateLightboxImage(currentImageIndex);
			});
		});

		// Close lightbox on click close button
		addClickEventListener(lightboxCloseBtn, (e) => {
			e.stopPropagation();
			toggleElement(lightbox);
		});

		// Prev image on click prev button
		addClickEventListener(lightboxBtnPrev, () => {
			if (currentImageIndex > 0) {
				currentImageIndex--;
				updateLightboxImage(currentImageIndex);
			}
		});

		// Next image on click next button
		addClickEventListener(lightboxBtnNext, () => {
			if (currentImageIndex < totalImages - 1) {
				currentImageIndex++;
				updateLightboxImage(currentImageIndex);
			}
		});

		// Close lightbox when click outside of lightbox image
		addClickEventListener(document, (e) => {
			if (e.target === lightbox) {
				toggleElement(lightbox);
			}
		});

		// Close the lightbox when the "Escape" key is pressed
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				toggleElement(lightbox);
			}
		});
	}

	/***** Form *****/
	{
		/***** Variables *****/
		const submitBtn = document.querySelector('.btn__submit');
		const form = document.querySelector('.contact__form');
		const modal = document.querySelector('.modal');
		const closeBtn = document.querySelector('.modal__close');

		// The modal content message template
		const modalMessageTemplate = (status, message) => `
        		<h4 class="heading-4">${
							status === 'success'
								? 'Thank you for getting in touch with us!'
								: 'Something went wrong'
						}</h4>
        		<p>${message}</p>
				`;

		/***** Functions *****/

		// Show spinner and disable submit button while form is sending
		const showSpinnerAndDisableButton = (button) => {
			const spinner = document.createElement('span');
			spinner.className = 'spinner';
			button.innerHTML = '';
			button.appendChild(spinner);
			button.setAttribute('disabled', true);
		};

		// Hide spinner and enable submit button when form has been send
		const hideSpinnerAndEnableButton = (button, buttonText) => {
			const spinner = document.querySelector('.spinner');
			if (spinner) {
				spinner.remove();
			}
			button.innerHTML = buttonText;
			button.removeAttribute('disabled');
		};

		// Form submit
		const formSubmit = async (e) => {
			e.preventDefault();
			// Get data from forms input
			const formData = new FormData(form);
			// Show spinner and disable button
			const buttonText = submitBtn.innerHTML;
			showSpinnerAndDisableButton(submitBtn);

			try {
				const response = await fetch('mail.php', {
					method: 'POST',
					body: formData,
				});

				const data = await response.json();
				const modalMessage = document.querySelector('.modal__message');

				modalMessage.innerHTML = modalMessageTemplate(
					data.status,
					data.message,
				);

				// Show modal
				toggleElement(modal);
			} catch (error) {
				const modalMessage = document.querySelector('.modal__message');
				modalMessage.innerHTML = modalMessageTemplate(
					'error',
					'An error occurred while sending the email. Please try later.',
					'The message was not sent. Please try again.',
				);
				toggleElement(modal);
			} finally {
				// Hide spinner and enable button
				hideSpinnerAndEnableButton(submitBtn, buttonText);
			}

			// Reset form
			form.reset();
		};

		/***** Event listeners *****/

		// Form submit
		form.addEventListener('submit', formSubmit);

		// Close modal on close modal button click
		addClickEventListener(closeBtn, (e) => {
			e.stopPropagation();
			toggleElement(modal);
		});

		// Close modal when click outside of modal content
		addClickEventListener(document, (e) => {
			if (e.target === modal) {
				toggleElement(modal);
			}
		});
	}
});
