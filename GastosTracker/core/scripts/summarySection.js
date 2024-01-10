const sumSec = new SummarySection();

function SummarySection() {
	this.filter = 'Day';
	this.day = '';
	this.range = ['', ''];
	
	let datePicker = {
		day: document.querySelector('#daySummaryCalendarPickerInput'),
		rangeFr: document.querySelector('#rangeSummaryCalendarPickerFromInput'),
		rangeTo: document.querySelector('#rangeSummaryCalendarPickerToInput'),
	};
	
	let pickerButton = document.querySelector('.summaryDatePicker');
	
	// On start
	this.onStart = () => {
		let td = new Date();
		let d = td.toISOString().split('T')[0];
		datePicker.day.value = d;
		this.day = d;
		
		let today = new Date();
		let dayOfWeek = today.getDay();
		let startDate = new Date(today);
		let endDate = new Date(today);
		startDate.setDate(today.getDate() - dayOfWeek);
		endDate.setDate(startDate.getDate() + 6);
		let formattedStartDate = startDate.toISOString().split('T')[0];
		let formattedEndDate = endDate.toISOString().split('T')[0];
		let r0 = formattedStartDate;
		let r1 = formattedEndDate;
		datePicker.rangeFr.value = r0;
		datePicker.rangeTo.value = r1;
		this.range[0] = r0;
		this.range[1] = r1;
		
		this.updateContent(this.day, this.day);
	};
	
	// Change filter
	this.toggleDay = () => {
		this.filter = 'Day';
		document.querySelector('#summaryRangeFilter').classList.remove('active');
		document.querySelector('#summaryDayFilter').classList.add('active');
		this.updateContent(this.day, this.day);
	};
	this.toggleRange = () => {
		this.filter = 'Range';
		document.querySelector('#summaryDayFilter').classList.remove('active');
		document.querySelector('#summaryRangeFilter').classList.add('active');
		this.updateContent(this.range[0], this.range[1]);
	};
	
	// Show/hide date picker windows
	this.showDatePicker = () => {
		if(this.filter == 'Day') {
			document.querySelector('.daySummaryCalendarPickerWindow').style.display = 'grid';
		} else {
			document.querySelector('.rangeSummaryCalendarPickerWindow').style.display = 'grid';
		}
	};
	this.hideDatePicker = () => {
		if(this.filter == 'Day') {
			document.querySelector('.daySummaryCalendarPickerWindow').style.display = 'none';
			datePicker.day.style.border = 'unset';
			datePicker.day.style.padding = '0.5rem';
			
			datePicker.day.value = this.day;
		} else {
			document.querySelector('.rangeSummaryCalendarPickerWindow').style.display = 'none';
			datePicker.rangeFr.style.border = 'unset';
			datePicker.rangeFr.style.padding = '0.5rem';
			datePicker.rangeTo.style.border = 'unset';
			datePicker.rangeTo.style.padding = '0.5rem';
			
			datePicker.rangeFr.value = this.range[0];
			datePicker.rangeTo.value = this.range[1];
		}
	};
	
	// Apply date filter
	this.applyFilter = () => {
		if(this.filter == 'Day') {
			let date = document.querySelector('#daySummaryCalendarPickerInput').value;
			let dateObject = new Date(date);
			
			if (!isNaN(dateObject.getTime())) {
				let formattedDate = dateObject.toISOString().split('T')[0];
				this.day = formattedDate;
				datePicker.day.style.border = 'unset';
				datePicker.day.style.padding = '0.5rem';
				datePicker.day.value = this.day;
				this.hideDatePicker();
				this.updateContent(this.day, this.day);
			}
			else {
				datePicker.day.style.border = '1px solid red';
				datePicker.day.style.padding = 'calc(0.5rem - 1px)';
			}
		} else {	
			let dateFrom = document.querySelector('#rangeSummaryCalendarPickerFromInput').value;
			let dateTo = document.querySelector('#rangeSummaryCalendarPickerToInput').value;
			
			datePicker.rangeFr.style.border = 'unset';
			datePicker.rangeFr.style.padding = '0.5rem';
			datePicker.rangeTo.style.border = 'unset';
			datePicker.rangeTo.style.padding = '0.5rem';
			
			if(dateFrom.trim() !== '' && dateTo.trim() !== '') {
				let dateObjectFrom = new Date(dateFrom);
				let dateObjectTo = new Date(dateTo);
				
				if(!isNaN(dateObjectFrom.getTime())) {
					let formattedDate = dateObjectFrom.toISOString().split('T')[0];
					this.range[0] = formattedDate;
					datePicker.rangeFr.style.padding = '0.5rem';
			
						if(!isNaN(dateObjectTo.getTime()) && dateObjectTo >= dateObjectFrom) {
						let formattedDate1 = dateObjectTo.toISOString().split('T')[0];
						this.range[1] = formattedDate1;
						datePicker.rangeTo.style.padding = '0.5rem';
						this.hideDatePicker();
						this.updateContent(this.range[0], this.range[1]);
				} else {
					app.ShowPopup('Please enter a valid date range. The "From" date should be equal to or earlier than the "To" date.', 'Bottom');
					datePicker.rangeTo.style.border = '1px solid red';
					datePicker.rangeTo.style.padding = 'calc(0.5rem - 1px)';
				}
			} else {
				datePicker.rangeFr.style.border = '1px solid red';
				datePicker.rangeFr.style.padding = 'calc(0.5rem - 1px)';
			}
			
				if(dateFrom.trim() !== '' && !isNaN(dateObjectTo.getTime())) {
					let formattedDate1 = dateObjectTo.toISOString().split('T')[0];
					this.range[1] = formattedDate1;
					datePicker.rangeTo.style.padding = '0.5rem';
				} else if (dateFrom.trim() !== '') {
					datePicker.rangeTo.style.border = '1px solid red';
					datePicker.rangeTo.style.padding = 'calc(0.5rem - 1px)';
				}
			} else {
				if(dateFrom.trim() === '') {
					datePicker.rangeFr.style.border = '1px solid red';
					datePicker.rangeFr.style.padding = 'calc(0.5rem - 1px)';
				}
				if(dateTo.trim() === '') {
					datePicker.rangeTo.style.border = '1px solid red';
					datePicker.rangeTo.style.padding = 'calc(0.5rem - 1px)';
				}
			}	
		}
	};
	
// 'Day' setters (Today and Yesterday)
this.setToday = () => {
	let today = new Date();
	let d = today.toISOString().split('T')[0];
	datePicker.day.value = d;
};
this.setYesterday = () => {
	let today = new Date();
	today.setDate(today.getDate() - 1);
	let d = today.toISOString().split('T')[0];
	datePicker.day.value = d;
};

// 'Range' setters (This week, last week, this month, etc.)
this.setThisWeek = () => {
    let today = new Date();
    let dayOfWeek = today.getDay();
    let startDate = new Date(today);
    let endDate = new Date(today);

    startDate.setDate(today.getDate() - dayOfWeek);
    endDate.setDate(startDate.getDate() + 6);

    let formattedStartDate = startDate.toISOString().split('T')[0];
    let formattedEndDate = endDate.toISOString().split('T')[0];

    let r0 = formattedStartDate;
    let r1 = formattedEndDate;
    
    datePicker.rangeFr.value = r0;
    datePicker.rangeTo.value = r1;
};

this.setThisMonth = () => {
	let today = new Date();
	let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
	let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
	let formattedStartDate = firstDayOfMonth.toISOString().split('T')[0];
	let formattedEndDate = lastDayOfMonth.toISOString().split('T')[0];
	let r0 = formattedStartDate;
	let r1 = formattedEndDate;
	datePicker.rangeFr.value = r0;
	datePicker.rangeTo.value = r1;
};
this.setThisYear = () => {
	let today = new Date();
	let firstDayOfYear = new Date(today.getFullYear(), 0, 2);
	let lastDayOfYear = new Date(today.getFullYear() + 1, 0, 1);
	let formattedStartDate = firstDayOfYear.toISOString().split('T')[0];
	let formattedEndDate = lastDayOfYear.toISOString().split('T')[0];
	let r0 = formattedStartDate;
	let r1 = formattedEndDate;
	datePicker.rangeFr.value = r0;
	datePicker.rangeTo.value = r1;
};
this.setLastWeek = () => {
	let today = new Date();
	let dayOfWeek = today.getDay();
	let endDate = new Date(today);
	endDate.setDate(today.getDate() - dayOfWeek - 1);
	let startDate = new Date(endDate);
	startDate.setDate(endDate.getDate() - 6);
	let formattedStartDate = startDate.toISOString().split('T')[0];
	let formattedEndDate = endDate.toISOString().split('T')[0];
	let r0 = formattedStartDate;
	let r1 = formattedEndDate;
	datePicker.rangeFr.value = r0;
	datePicker.rangeTo.value = r1;
};
this.setLastMonth = () => {
	let today = new Date();
	let firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 2);
	let lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	let formattedStartDate = firstDayOfLastMonth.toISOString().split('T')[0];
	let formattedEndDate = lastDayOfLastMonth.toISOString().split('T')[0];
	let r0 = formattedStartDate;
	let r1 = formattedEndDate;
	datePicker.rangeFr.value = r0;
	datePicker.rangeTo.value = r1;
};
this.setLastYear = () => {
	let today = new Date();
	let firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 2);
	let lastDayOfLastYear = new Date(today.getFullYear(), 0, 1);
	let formattedStartDate = firstDayOfLastYear.toISOString().split('T')[0];
	let formattedEndDate = lastDayOfLastYear.toISOString().split('T')[0];
	let r0 = formattedStartDate;
	let r1 = formattedEndDate;
	datePicker.rangeFr.value = r0;
	datePicker.rangeTo.value = r1;
};
	
	// Update content
	this.updateContent = (d1, d2) => {
		let frWord = '';
		let toWord = '';
		
		let r0 = '';
		let r1 = '';
		
		if(this.filter == 'Day') {
			r0 = d1;
			r1 = d1;
			frWord = new Date(d1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
			toWord = new Date(d1).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
			pickerButton.innerHTML = `${frWord}`;
		} else {
			r0 = d1;
			r1 = d2;
			frWord = new Date(d1).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
			toWord = new Date(d2).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
			pickerButton.innerHTML = `${frWord} - ${toWord}`;
		}
	
		document.querySelector('.summarySection').querySelector('.content').innerHTML = '';
		let barGroup = document.createElement('div');
		barGroup.classList.add('barGroup');
		barGroup.classList.add('ShowTileGroup');
		document.querySelector('.summarySection').querySelector('.content').appendChild(barGroup);
		
		let categoryTotal = [
			['Health',0],
			['Leisure',0],
			['Home',0],
			['Groceries',0],
			['Education',0],
			['Transportation',0],
			['Family',0],
			['Fitness',0],
			['Food',0],
			['Other',0],
		];
		
		let categoryPercentage = [
			['Health',0],
			['Leisure',0],
			['Home',0],
			['Groceries',0],
			['Education',0],
			['Transportation',0],
			['Family',0],
			['Fitness',0],
			['Food',0],
			['Other',0],
		];
		
		let totalExpenses = 0;
		
		db.ExecuteSql(`
			SELECT *
			FROM expenses
			WHERE date BETWEEN '${r0}' AND '${r1}';
		`, [], function(results) {
			let rowCount = results.rows.length;
		
			for(let i=0 ; i<rowCount ; i++) {
				let rs = results.rows.item(i);
				
				let amount = rs.amount;
				let category = rs.category.charAt(0).toUpperCase() + rs.category.slice(1);
				
				switch(category) {
				case 'Health':
				categoryTotal[0][1] += amount;
				break;
				case 'Leisure':
				categoryTotal[1][1] += amount;
				break;
				case 'Home':
				categoryTotal[2][1] += amount;
				break;
				case 'Groceries':
				categoryTotal[3][1] += amount;
				break;
				case 'Education':
				categoryTotal[4][1] += amount;
				break;
				case 'Transportation':
				categoryTotal[5][1] += amount;
				break;
				case 'Family':
				categoryTotal[6][1] += amount;
				break;
				case 'Fitness':
				categoryTotal[7][1] += amount;
				break;
				case 'Food':
				categoryTotal[8][1] += amount;
				break;
				case 'Others':
				categoryTotal[9][1] += amount;
				break;
				}
			};
			
			// Get the total expenses
			categoryTotal.forEach((element) => {
				totalExpenses += element[1];
			});
			
			// Set the percentage
			let index = 0;
			categoryPercentage.forEach((catPer) => {
				let catTol = categoryTotal[index];
				index++;
				let percentage = (catTol[1] / totalExpenses) * 100;
				catPer[1] = percentage.toFixed(2);
			});
			
			// Sort the categories from highest to lowest
			categoryTotal.sort((a, b) => b[1] - a[1]);
			categoryPercentage.sort((a, b) => b[1] - a[1]);
			
			if(rowCount > 0) {
				let len = categoryTotal.length;
				for(let a=0 ; a<len ; a++) {
					let cat = categoryTotal[a][0];
					let tot = categoryTotal[a][1];
					let per = categoryPercentage[a][1];
					
					let bar = createBar(cat, tot, per);
					barGroup.appendChild(bar);
				}
			} else {
				let tileGroup = document.createElement('div');
				tileGroup.classList.add('dateGroup');
				tileGroup.style.display = 'grid';
				tileGroup.style.justifyItems = 'center';
				
				let h1 = document.createElement('h1');
				h1.innerHTML = 'No expenses found.';
				tileGroup.classList.add('ShowTileGroup');
				h1.style.textAlign = 'center';
				h1.style.fontSize = '1rem';
				h1.style.fontFamily = 'prompt-light';
				h1.style.marginBottom = '0.5rem';
				h1.style.color = '#999999';
				h1.style.justifySelf = 'center';
				h1.style.width = '90%';
				
				let img = document.createElement('img');
				img.src = '../core/resources/images/notFound.svg';
				img.style.width = '90%';
				img.style.marginTop = '1rem';
				img.style.marginBottom = '1rem';
				img.style.textAlign = 'center';
				
				tileGroup.appendChild(img);
				tileGroup.appendChild(h1);
				document.querySelector('.summarySection').querySelector('.content').appendChild(tileGroup);
			}
		});
		
		
	};
	
	// Create bar
	let createBar = (category, total, percentage) => {
		let bar = document.createElement("div");
		bar.className = "bar";
		
		let barFluid = document.createElement("div");
		bar.appendChild(barFluid);
		
		let barText1 = document.createElement("h1");
		barText1.innerHTML = `${category} (PHP ${total})`;
		bar.appendChild(barText1);
		
		let barText2 = document.createElement("h1");
		barText2.className = "barText2";
		
		if(!isNaN(percentage)) {
			barText2.innerHTML = `${percentage}%`;
		} else {
			barText2.innerHTML = `0%`;
		}
		
		bar.appendChild(barText2);
		
		switch(category) {
			case 'Health':
				barFluid.style.backgroundColor = '#F35454';
			break;
			case 'Leisure':
				barFluid.style.backgroundColor = '#8A2BE2';
			break;
			case 'Home':
				barFluid.style.backgroundColor = '#58ABAB';
			break;
			case 'Groceries':
				barFluid.style.backgroundColor = '#6B8E23';
			break;
			case 'Education':
				barFluid.style.backgroundColor = '#747ED5';
			break;
			case 'Transportation':
				barFluid.style.backgroundColor = '#395FD2';
			break;
			case 'Family':
				barFluid.style.backgroundColor = '#FB95C8';
			break;
			case 'Fitness':
				barFluid.style.backgroundColor = '#FFA07A';
			break;
			case 'Food':
				barFluid.style.backgroundColor = '#B8D271';
			break;
			case 'Others':
				barFluid.style.backgroundColor = '#808080';
			break;
		}
		
		return bar;
	};
	
	
};


// Change filter to 'Day' and 'Range'
document.querySelector('#summaryDayFilter').onclick = () => {
	sumSec.toggleDay();
};
document.querySelector('#summaryRangeFilter').onclick = () => {
	sumSec.toggleRange();
};

// Show date picker windows for expenses section (Day or Range)
document.querySelector('.summaryDatePicker').onclick = () => {
	sumSec.showDatePicker();
};

// Close day picker windows when cancel is clicked for expenses section (Day or Range)
document.querySelector('#daySummaryCalendarPickerCancelButton').onclick = () => {
	sumSec.hideDatePicker();
};
document.querySelector('#rangeSummaryCalendarPickerCancelButton').onclick = () => {
	sumSec.hideDatePicker();
};

// Apply date filters after clicking done
document.querySelector('#daySummaryCalendarPickerDoneButton').onclick = () => {
	sumSec.applyFilter();
};
document.querySelector('#rangeSummaryCalendarPickerDoneButton').onclick = () => {
	sumSec.applyFilter();
};

// Day and Range setters
document.querySelector('#daySummaryCalendarPickerTodayButton').onclick = () => {
	sumSec.setToday();
};
document.querySelector('#daySummaryCalendarPickerYesterdayButton').onclick = () => {
	sumSec.setYesterday();
};
document.querySelector('#rangeSummaryCalendarPickerWeekButton').onclick = () => {
	sumSec.setThisWeek();
};
document.querySelector('#rangeSummaryCalendarPickerMonthButton').onclick = () => {
	sumSec.setThisMonth();
};
document.querySelector('#rangeSummaryCalendarPickerYearButton').onclick = () => {
	sumSec.setThisYear();
};
document.querySelector('#rangeSummaryCalendarPickerLastWeekButton').onclick = () => {
	sumSec.setLastWeek();
};
document.querySelector('#rangeSummaryCalendarPickerLastMonthButton').onclick = () => {
	sumSec.setLastMonth();
};
document.querySelector('#rangeSummaryCalendarPickerLastYearButton').onclick = () => {
	sumSec.setLastYear();
};