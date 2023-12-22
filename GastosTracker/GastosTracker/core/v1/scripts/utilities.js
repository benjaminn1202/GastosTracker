function showPopup(message) {
	let popup = document.createElement('div');
	
	popup.innerHTML = `<p>${message}</p>`;
	popup.querySelector('p').style.margin = '0.5rem 0.5rem';
	
	popup.style.display = 'block';
	popup.style.position = 'absolute';
	popup.style.bottom = '3rem';
	popup.style.left = '50%';
	popup.style.transform = 'translateX(-50%)';
	popup.style.backgroundColor = '#ededed';
	popup.style.boxShadow = '0 0 5px 0 rgba(0,0,0,25%)';
	popup.style.fontFamily = 'Arial, sans-serif';
	popup.style.fontSize = '0.95rem';
	popup.style.borderRadius = '1rem';
	popup.style.transition = 'opacity 1s ease-in-out'; // Added transition property
	popup.style.color = '#555';
	popup.style.padding = '0';
	popup.style.width = 'auto';
	popup.style.maxWidth = '90vw';
	popup.style.textAlign = 'center';
	
	document.querySelector('.container').appendChild(popup);
	
	setTimeout(function () {
		popup.style.opacity = '0';
	}, 1500);
	
	setTimeout(function () {
		popup.remove();
	}, 2500);
}