function Popup() {
	this.ShowPopup = (msg) => {
		let popup = document.querySelector('.popup');
		let popupMsg = popup.querySelector('p');
		
		if (popup.style.display !== 'block') {
			popupMsg.innerHTML = msg;
			popup.style.display = 'block';
			popup.style.filter = 'opacity(100%)';
			
			setTimeout(() => {
			popup.classList.add('PopupFadeOut');
			}, 2000);
			
			setTimeout(() => {
			popup.classList.remove('PopupFadeOut');
			popup.style.display = 'none';
			popup.style.filter = 'opacity(0%)';
			}, 3500);
		}
	};
};