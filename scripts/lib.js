// Disable and enable scroll
function toggleScroll(disableScroll) {
	const body = document.body;
	if (disableScroll) {
		// Disable scroll
		const scrollBarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		body.style.overflow = 'hidden';
		body.style.paddingRight = scrollBarWidth + 'px';
	} else {
		// Enable scroll
		body.style.overflow = 'auto';
		body.style.paddingRight = '0';
	}
}

// Show and hide element
function toggleElement(element) {
	const show = element.classList.contains('show');
	if (show) {
		element.classList.remove('show');
		toggleScroll(false);
	} else {
		element.classList.add('show');
		toggleScroll(true);
	}
}
