const abo = new AboutSection();

function AboutSection() {
	let instagramLink = 'https://www.instagram.com/benjaminn1202';
	let facebookLink = 'https://www.facebook.com/benjaminn1202';
	let githubLink = 'https://github.com/benjaminn1202';
	
	this.toGithub = () => {
		app.OpenUrl(githubLink);
	}
	this.toFacebook = () => {
		app.OpenUrl(facebookLink);
	}
	this.toInstagram = () => {
		app.OpenUrl(instagramLink);
	}
};

document.querySelector('#github').onclick = () => {
	abo.toGithub();
}
document.querySelector('#facebook').onclick = () => {
	abo.toFacebook();
}
document.querySelector('#instagram').onclick = () => {
	abo.toInstagram();
}