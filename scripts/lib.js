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
