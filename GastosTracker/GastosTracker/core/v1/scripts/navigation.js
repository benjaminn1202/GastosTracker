const nav = new Navigation();

function Navigation() {
	this.navState = false;
	
	let wholeNav = document.querySelector('nav');
	let navDimmer = document.querySelector('nav').querySelector('.dimmer');
	let navItemContainer = document.querySelector('nav').querySelector('.container');
	
	let navItem = [
		document.querySelector('#expensesNavItem'),
		document.querySelector('#summaryNavItem'),
		document.querySelector('#aboutNavItem'),
	];
	let mainSection = [
		document.querySelector('.expensesSection'),
		document.querySelector('.summarySection'),
		document.querySelector('.aboutSection'),
	];
	
	// Show/hide whole nav
	this.toggleNav = () => {
		if(this.navState == false) {
			wholeNav.style.display = 'block';
			navDimmer.classList.remove('FadeOut');
			navItemContainer.classList.remove('hideNav');
			navDimmer.classList.add('FadeIn');
			navItemContainer.classList.add('ShowNav');
			navDimmer.onclick = () => {
				this.toggleNav();
			};
			navItem[0].onclick = () => {
				this.changeSection(0);
			};
			navItem[1].onclick = () => {
				this.changeSection(1);
			};
			navItem[2].onclick = () => {
				this.changeSection(2);
			};
			this.navState = true;
		} else {
			navDimmer.classList.remove('FadeIn');
			navItemContainer.classList.remove('ShowNav');
			navDimmer.classList.add('FadeOut');
			navItemContainer.classList.add('HideNav');
			setTimeout(() => {
				wholeNav.style.display = 'none';
			}, 300); 
			this.navState = false;
		}
	};
	
	// Change section
	this.changeSection = (target) => {
		mainSection.forEach((section) => {
			section.style.display = 'none';
		});
		navItem.forEach((navItem) => {
			navItem.classList.remove('activeNavItem');
		});
		this.toggleNav();
		switch(target) {
			case 0:
				mainSection[0].style.display = 'block';
				navItem[0].classList.add('activeNavItem');
				if(expSec.filter == 'Day') {
					expSec.toggleDay();
				} else {
					expSec.toggleRange();
				}
			break;
			case 1:
				mainSection[1].style.display = 'block';
				navItem[1].classList.add('activeNavItem');
				if(sumSec.filter == 'Day') {
					sumSec.toggleDay();
				} else {
					sumSec.toggleRange();
				}
			break;
			case 2:
				mainSection[2].style.display = 'block';
				navItem[2].classList.add('activeNavItem');
			break;
		}
	};
}

document.querySelector('.navigationBar1').querySelector('#hamburgerButton').onclick = () => {
	nav.toggleNav();
};

/*
// NAVIGATION - Showing and hiding the navigation items
const openNavButton = document.querySelector('.navigationBar1').querySelector('#hamburgerButton');
let wholeNav = document.querySelector('nav');
let navDimmer = document.querySelector('nav').querySelector('.dimmer');
let navItemContainer = document.querySelector('nav').querySelector('.container');

openNavButton.onclick = () => {
    showNav();
}
navDimmer.onclick = () => {
    hideNav();
}

function showNav() {
    wholeNav.style.display = 'block';
    navDimmer.classList.remove('FadeOut');
    navItemContainer.classList.remove('hideNav');
    navDimmer.classList.add('FadeIn');
    navItemContainer.classList.add('ShowNav');
}
function hideNav() {
    navDimmer.classList.remove('FadeIn');
    navItemContainer.classList.remove('ShowNav');
    navDimmer.classList.add('FadeOut');
    navItemContainer.classList.add('HideNav');

    setTimeout(() => {
        wholeNav.style.display = 'none';
    }, 300); // Hides the whole nav element after 300ms
}


// NAVIGATION - Navigating through sections
const navItem = [
    document.querySelector('#expensesNavItem'),
    document.querySelector('#summaryNavItem'),
    document.querySelector('#aboutNavItem'),
];
const mainSection = [
    document.querySelector('.expensesSection'),
    document.querySelector('.summarySection'),
    document.querySelector('.aboutSection'),
];

navItem[0].onclick = () => { // Show expenses section
    navItem.forEach(element => {
        element.classList.remove('activeNavItem');
    });
    navItem[0].classList.add('activeNavItem');

    mainSection.forEach(element => {
        element.style.display = 'none';
    });
    mainSection[0].style.display = 'grid';
    
    hideNav();
};
navItem[1].onclick = () => { // Show summary section
    navItem.forEach(element => {
        element.classList.remove('activeNavItem');
    });
    navItem[1].classList.add('activeNavItem');

    mainSection.forEach(element => {
        element.style.display = 'none';
    });
    mainSection[1].style.display = 'grid';
    
    hideNav();
};
navItem[2].onclick = () => { // Show about section
    navItem.forEach(element => {
        element.classList.remove('activeNavItem');
    });
    navItem[2].classList.add('activeNavItem');

    mainSection.forEach(element => {
        element.style.display = 'none';
    });
    mainSection[2].style.display = 'grid';

    hideNav();
};


const navBar = [
    document.querySelector('.navigationBar1'),
    document.querySelector('.navigationBar2'),
    document.querySelector('.navigationBar3'),
];
const expenseManipulationSection = [
    document.querySelector('.expenseEntrySection'),
    document.querySelector('.expenseEditSection'),
];

// NAVIGATION - Show/hide expense entry section
document.querySelector('#expensesEntryButton').onclick = () => {
    showExpenseEntrySection();
};

function showExpenseEntrySection() { // Show expense entry window
    navBar[0].style.display = 'none';
    navBar[1].style.display = 'grid';
    mainSection[0].style.display = 'none';
    expenseManipulationSection[0].style.display = 'flex';
}
function hideExpenseEntrySection() { // Hide expense entry window
    navBar[1].style.display = 'none';
    navBar[0].style.display = 'grid';
    expenseManipulationSection[0].style.display = 'none';
    mainSection[0].style.display = 'grid';
}

// NAVIGATION - Show/hide expense edit section
document.querySelector('#editBackButton').onclick = () => {
    hideExpenseEditSection();
}
document.querySelector('#editButton').onclick = () => {
    hideExpenseEditSection();
}
function showExpenseEditSection() { // Show expense edit window
    navBar[0].style.display = 'none';
    navBar[2].style.display = 'grid';
    mainSection[0].style.display = 'none';
    expenseManipulationSection[1].style.display = 'flex';
}
function hideExpenseEditSection() { // Hide expense edit window
    navBar[2].style.display = 'none';
    navBar[0].style.display = 'grid';
    expenseManipulationSection[1].style.display = 'none';
    mainSection[0].style.display = 'grid';
}


let selectedFilterExpense = 'day';
let selectedFilterSummary = 'day';
const datePicker = [
	document.querySelector('.dayExpenseCalendarPickerWindow'),
	document.querySelector('.rangeExpenseCalendarPickerWindow'),
	document.querySelector('.daySummaryCalendarPickerWindow'),
	document.querySelector('.rangeSummaryCalendarPickerWindow'),
];


// NAVIGATION - Change selected date filter of summary section
document.querySelector('#summaryDayFilter').onclick = () => {
	selectedFilterExpense = 'day';
	document.querySelector('#summaryRangeFilter').classList.remove('active');
	document.querySelector('#summaryDayFilter').classList.add('active');
};
document.querySelector('#summaryRangeFilter').onclick = () => {
	selectedFilterExpense = 'range';
	document.querySelector('#summaryDayFilter').classList.remove('active');
	document.querySelector('#summaryRangeFilter').classList.add('active');
};

// NAVIGATION - Show/close expense day date picker
document.querySelector('.expensesDatePicker').onclick = () => {
	showExpenseDatePicker();
}
document.querySelector('#dayExpenseCalendarPickerCancelButton').onclick = () => {
	closeExpenseDatePicker();
}
document.querySelector('#rangeExpenseCalendarPickerDoneButton').onclick = () => {
	closeExpenseDatePicker();
}
document.querySelector('#rangeExpenseCalendarPickerCancelButton').onclick = () => {
	closeExpenseDatePicker();
}

function showExpenseDatePicker() {
	if(selectedFilterExpense == 'day') { // Show expense day date picker
		datePicker[0].style.display = 'grid';
	}
	else { // Show expense range date picker
		datePicker[1].style.display = 'grid';
	}
};

function closeExpenseDatePicker() {
	if(selectedFilterExpense == 'day') { // Show expense day date picker
		datePicker[0].style.display = 'none';
	}
	else { // Show expense range date picker
		datePicker[1].style.display = 'none';
	}
};

// NAVIGATION - Show/close summary day date picker
document.querySelector('.summaryDatePicker').onclick = () => {
	showSummaryDatePicker();
}
document.querySelector('#daySummaryCalendarPickerDoneButton').onclick = () => {
	closeSummaryDatePicker();
}
document.querySelector('#daySummaryCalendarPickerCancelButton').onclick = () => {
	closeSummaryDatePicker();
}
document.querySelector('#rangeSummaryCalendarPickerDoneButton').onclick = () => {
	closeSummaryDatePicker();
}
document.querySelector('#rangeSummaryCalendarPickerCancelButton').onclick = () => {
	closeSummaryDatePicker();
}

function showSummaryDatePicker() {
	if(selectedFilterExpense == 'day') { // Show expense day date picker
		datePicker[0].style.display = 'grid';
	}
	else { // Show expense range date picker
		datePicker[1].style.display = 'grid';
	}
};

function closeSummaryDatePicker() {
	if(selectedFilterExpense == 'day') { // Show expense day date picker
		datePicker[0].style.display = 'none';
	}
	else { // Show expense range date picker
		datePicker[1].style.display = 'none';
	}
};

// NAVIGATION - Show/hide expense entry category dropdown content
let entryOptionsContainerState = false;
document.querySelector('#entryCategoryDropdown').onclick = () => {
	if(entryOptionsContainerState == false) { // Show entry options container
		showEntryCategoryOptions();
		entryOptionsContainerState = true;
	}
	else { // Show entry options container
		hideEntryCategoryOptions();
		entryOptionsContainerState = false;
	}
};

function showEntryCategoryOptions() {
	document.querySelector('#entryOptionsContainer').style.display = 'block';
}
function hideEntryCategoryOptions() {
	document.querySelector('#entryOptionsContainer').style.display = 'none';
}

*/