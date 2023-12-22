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
	
	// Change filter
	this.toggleDay = () => {
		this.filter = 'Day';
		document.querySelector('#summaryRangeFilter').classList.remove('active');
		document.querySelector('#summaryDayFilter').classList.add('active');
		// Update day content
	};
	this.toggleRange = () => {
		this.filter = 'Range';
		document.querySelector('#summaryDayFilter').classList.remove('active');
		document.querySelector('#summaryRangeFilter').classList.add('active');
		// Update range content
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
		} else {
			document.querySelector('.rangeSummaryCalendarPickerWindow').style.display = 'none';
			datePicker.rangeFr.style.border = 'unset';
			datePicker.rangeFr.style.padding = '0.5rem';
			datePicker.rangeTo.style.border = 'unset';
			datePicker.rangeTo.style.padding = '0.5rem';
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
				// this.updateDayContent();
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
						// this.updateRangeContent();
				} else {
					popup.ShowPopup('Please enter a valid date range. The "From" date should be equal to or earlier than the "To" date.');
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
	
	// Date setters
	this.setToday = () => {
		let currentDate = new Date();
		let year = currentDate.getFullYear();
		let month = currentDate.getMonth() + 1;
		let day = currentDate.getDate();
		this.day = `${year}-${month}-${day}`;
		datePicker.day.value = this.day;
	};
	this.setYesterday = () => {
		let currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 1);
		let year = currentDate.getFullYear();
		let month = currentDate.getMonth() + 1;
		let day = currentDate.getDate();
		this.day = `${year}-${month}-${day}`;
		datePicker.day.value = this.day;
	};
	this.setThisWeek = () => {
		let today = new Date();
		let dayOfWeek = today.getDay();
		let startDate = new Date(today);
		let endDate = new Date(today);
		startDate.setDate(today.getDate() - dayOfWeek);
		endDate.setDate(startDate.getDate() + 6);	
		let formattedStartDate = startDate.toISOString().split('T')[0];
		let formattedEndDate = endDate.toISOString().split('T')[0];	
		this.range[0] = formattedStartDate;
		this.range[1] = formattedEndDate;
		datePicker.rangeFr.value = this.range[0];
		datePicker.rangeTo.value = this.range[1];
	};
	this.setThisMonth = () => {
		let today = new Date();
		let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
		let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
		let formattedStartDate = firstDayOfMonth.toISOString().split('T')[0];
		let formattedEndDate = lastDayOfMonth.toISOString().split('T')[0];
		this.range[0] = formattedStartDate;
		this.range[1] = formattedEndDate;
		datePicker.rangeFr.value = this.range[0];
		datePicker.rangeTo.value = this.range[1];
	};
	this.setThisYear = () => {
		let today = new Date();
		let firstDayOfYear = new Date(today.getFullYear(), 0, 2);
		let lastDayOfYear = new Date(today.getFullYear() + 1, 0, 1);
		let formattedStartDate = firstDayOfYear.toISOString().split('T')[0];
		let formattedEndDate = lastDayOfYear.toISOString().split('T')[0];
		this.range[0] = formattedStartDate;
		this.range[1] = formattedEndDate;
		datePicker.rangeFr.value = this.range[0];
		datePicker.rangeTo.value = this.range[1];
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
		this.range[0] = formattedStartDate;
		this.range[1] = formattedEndDate;
		datePicker.rangeFr.value = this.range[0];
		datePicker.rangeTo.value = this.range[1];
	};
	this.setLastMonth = () => {
		let today = new Date();
		let firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 2);
		let lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		let formattedStartDate = firstDayOfLastMonth.toISOString().split('T')[0];
		let formattedEndDate = lastDayOfLastMonth.toISOString().split('T')[0];
		this.range[0] = formattedStartDate;
		this.range[1] = formattedEndDate;
		datePicker.rangeFr.value = this.range[0];
		datePicker.rangeTo.value = this.range[1];
	};
	this.setLastYear = () => {
		let today = new Date();
		let firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 2);
		let lastDayOfLastYear = new Date(today.getFullYear(), 0, 1);
		let formattedStartDate = firstDayOfLastYear.toISOString().split('T')[0];
		let formattedEndDate = lastDayOfLastYear.toISOString().split('T')[0];
		this.range[0] = formattedStartDate;
		this.range[1] = formattedEndDate;
		datePicker.rangeFr.value = this.range[0];
		datePicker.rangeTo.value = this.range[1];
	};
	
	// Show/hide more options menu
	this.showMoreMenu = (id) => {
		document.querySelector('#editButton').onclick = () => {
			expEdi.UpdateEntry(id);
		};
	
		let moreMenu = document.querySelector('.tileMoreMenu');
		let dimmer = moreMenu.querySelector('.dimmer');
		let container = moreMenu.querySelector('.container');
		
		let toEdit = container.querySelector('#toEdit');
		let toDetails = container.querySelector('#toDetails');
		let toDelete = container.querySelector('#toDelete');
		
		moreMenu.style.display = 'block';
		dimmer.classList.remove('FadeOut');
		container.classList.remove('HideMoreMenu');
		dimmer.classList.add('FadeIn');
		container.classList.add('ShowMoreMenu');
		
		dimmer.onclick = () => {
			this.hideMoreMenu();
		};
		
		toEdit.onclick = () => {
			this.hideMoreMenu();
			db.ExecuteSql(`
				SELECT *
				FROM expenses
				WHERE id = '${id}'
			`, [], (results) => {
				let rowCount = results.rows.length;
					
				let rs = results.rows.item(0);
				
				let amount = rs.amount;
				let date = rs.date;
				let time = rs.time;
				let category = rs.category;
				let remarks = rs.remarks;
				
				expEdi.ShowExpenseEditSection(amount, category, date, time, remarks);
			});
		};
		toDetails.onclick = () => {
			db.ExecuteSql(`
				SELECT *
				FROM expenses
				WHERE id = '${id}'
			`, [], (results) => {
				let rowCount = results.rows.length;
				
				let rs = results.rows.item(0);
				
				let amount = rs.amount;
				let date = new Date(rs.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });;
				let time = rs.time;
				let category = rs.category.charAt(0).toUpperCase() + rs.category.slice(1);
				let remarks = rs.remarks;
				
				app.Alert(`
				Amount: ${amount}\n
				Category: ${category}\n
				Date: ${date}\n
				Time: ${time}\n
				Remarks: ${remarks}\n
				`);
			});
		};
		toDelete.onclick = () => {
			console.log('ueue');
			this.hideMoreMenu();
			let confirmDeleteDialog = app.CreateYesNoDialog('Delete this entry?');
			confirmDeleteDialog.Show();
			
			confirmDeleteDialog.SetOnTouch((result) => {
				if(result == 'Yes') {
					db.ExecuteSql(`
						DELETE
						FROM expenses
						WHERE id = '${id}'
					`);
					this.updateDayContent();
				} else {
					
				}
			});
		};
	};
	this.hideMoreMenu = () => {
		let moreMenu = document.querySelector('.tileMoreMenu');
		let dimmer = moreMenu.querySelector('.dimmer');
		let container = moreMenu.querySelector('.container');
		
		dimmer.classList.remove('FadeIn');
		container.classList.remove('ShowMoreMenu');
		dimmer.classList.add('FadeOut');
		container.classList.add('HideMoreMenu');
		
		setTimeout(() => {
			moreMenu.style.display = 'none';
		}, 300);
	};
	
	// Update content
	this.updateDayContent = () => {
		document.querySelector('.summarySection').querySelector('.content').innerHTML = '';
		pickerButton.innerHTML = new Date(this.day).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
		
		db.ExecuteSql(`
			SELECT *
			FROM expenses
			WHERE date = '${this.day}';
		`, [], function(results) {
			let rowCount = results.rows.length;
			let rs = results.rows.item(0);
			
			if(rowCount > 0) {
				// createTileGroup(rs.date);
			}
		});
	};
	
	this.updateContent = () => {
		this.range[0] = '2023-12-21';
		this.range[1] = '2023-12-21';
	
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
		
		let ranking = [];
		let totalExpenses = 0;
		
		document.querySelector('.summarySection').querySelector('.content').innerHTML = '';
		let frWord = new Date(this.range[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
		let toWord = new Date(this.range[1]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
		pickerButton.innerHTML = `${frWord} - ${toWord}`;
		
		let unemptyDates = [];
		
		db.ExecuteSql(`
			SELECT *
			FROM expenses
			WHERE date BETWEEN '${this.range[0]}' AND '${this.range[1]}';
		`, [], function(results) {
			let rowCount = results.rows.length;
		
			for(let i=0 ; i<rowCount ; i++) {
				let rs = results.rows.item(i);	
				let found = false;
				
				unemptyDates.forEach((date) => {
					if(date == rs.date) {
						found = true;
					}
				});
		
				if(found == false) {
					unemptyDates.push(rs.date);
				}
			};
			
			
			// Store the total of each categories
			unemptyDates.forEach((date) => {
			
			db.ExecuteSql(`SELECT * FROM expenses WHERE date = '${date}';`, [], (results) => {
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
			console.log("Argh: " + categoryTotal[5][1]);
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
			}
			});
			});
		});
		

		
		
		
		// Get the total expenses
		for(let a=0 ; a<categoryTotal.length ; a++) {
		totalExpenses += categoryTotal[a][1];
		}
		
		// Set the percentage
		categoryPercentage.forEach((element) => {
		let i = 0;
		let catTol = categoryTotal[i][1];
		element[1] = (catTol / totalExpenses) * 100;
		i++;
		
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
		barText2.innerHTML = `${percentage}%`;
		bar.appendChild(healthBarText2);
		
		switch(category) {
			case 'Health':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Leisure':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Home':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Groceries':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Education':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Transportation':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Family':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Fitness':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Food':
				barFluid.style.backgroundColor = 'red';
			break;
			case 'Others':
				barFluid.style.backgroundColor = 'red';
			break;
		}
		
		return bar;
	};
	
	
};

sumSec.updateContent();


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