const expSec = new ExpensesSection();

document.body.onload = () => {
	expSec.onStart();
	sumSec.onStart();
	
	db.ExecuteSql(`
		SELECT *
		FROM settings
	`, [], (results) => {
		let rowCount = results.rows.length;
		
		if(rowCount > 0) {
			setTimeout(() => {
				document.querySelector('.expensesSection').style.display = 'block';
				document.querySelector('.navigationBar1').style.display = 'grid';
			}, 250);
		} else {
			document.querySelector('.expensesSection').style.display = 'none';
			document.querySelector('.navigationBar1').style.display = 'none';
			document.querySelector('.welcomeSection').style.display = 'grid';
			
			document.querySelector('#contBtn').onclick = () => {
				setTimeout(() => {
					db.ExecuteSql(`
						INSERT INTO settings (firstLaunch)
						VALUES (0);
					`);
				
					document.querySelector('.welcomeSection').style.display = 'none';
					document.querySelector('.expensesSection').style.display = 'block';
					document.querySelector('.navigationBar1').style.display = 'grid';
				}, 100);
			};
		}
	});
}

function ExpensesSection() {
	this.filter = 'Day';
	this.day = '';
	this.range = ['', ''];
	
	let datePicker = {
		day: document.querySelector('#dayExpenseCalendarPickerInput'),
		rangeFr: document.querySelector('#rangeExpenseCalendarPickerFromInput'),
		rangeTo: document.querySelector('#rangeExpenseCalendarPickerToInput'),
	};
	
	let pickerButton = document.querySelector('.expensesDatePicker');
	
	// Sets the day/range variable to current day/week
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
		
		this.updateDayContent();
	};
	
	// Change filter (Day or Range)
	this.toggleDay = () => {
		this.filter = 'Day';
		document.querySelector('#expensesDayFilter').classList.add('active');
		document.querySelector('#expensesRangeFilter').classList.remove('active');
		this.updateDayContent();
	};
	this.toggleRange = () => {
		this.filter = 'Range';
		document.querySelector('#expensesDayFilter').classList.remove('active');
		document.querySelector('#expensesRangeFilter').classList.add('active');
		this.updateRangeContent();
	};
	
	// Apply filter
	this.applyFilter = () => {
		if(this.filter == 'Day') {
			let date = document.querySelector('#dayExpenseCalendarPickerInput').value;
			let dateObject = new Date(date);
			
			if (!isNaN(dateObject.getTime())) {
				let formattedDate = dateObject.toISOString().split('T')[0];
				this.day = formattedDate;
				datePicker.day.style.border = 'unset';
				datePicker.day.style.padding = '0.5rem';
				datePicker.day.value = this.day;
				this.hideDatePicker();
				this.updateDayContent();
			}
			else {
				datePicker.day.style.border = '1px solid red';
				datePicker.day.style.padding = 'calc(0.5rem - 1px)';
			}
		} else {	
			let dateFrom = document.querySelector('#rangeExpenseCalendarPickerFromInput').value;
			let dateTo = document.querySelector('#rangeExpenseCalendarPickerToInput').value;
			
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
						this.updateRangeContent();
				} else {
					app.ShowPopup('Please enter a valid date range. The "From" date should be equal to or earlier than the "To" date.');
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
	
	// Show hide expense date picker windows
	this.showDatePicker = () => {
		if(this.filter == 'Day') {
			document.querySelector('.dayExpenseCalendarPickerWindow').style.display = 'grid';
		} else {
			document.querySelector('.rangeExpenseCalendarPickerWindow').style.display = 'grid';
		}
	};
	this.hideDatePicker = () => {
		if(this.filter == 'Day') {
			document.querySelector('.dayExpenseCalendarPickerWindow').style.display = 'none';
			datePicker.day.style.border = 'unset';
			datePicker.day.style.padding = '0.5rem';
			
			datePicker.day.value = this.day;
		} else {
			document.querySelector('.rangeExpenseCalendarPickerWindow').style.display = 'none';
			datePicker.rangeFr.style.border = 'unset';
			datePicker.rangeFr.style.padding = '0.5rem';
			datePicker.rangeTo.style.border = 'unset';
			datePicker.rangeTo.style.padding = '0.5rem';
			
			datePicker.rangeFr.value = this.range[0];
			datePicker.rangeTo.value = this.range[1];
		}
	};
	
	// Update 'Day' and 'Range' content (tiles)
	this.updateDayContent = () => {
		document.querySelector('.expensesSection').querySelector('.content').innerHTML = '';
		pickerButton.innerHTML = new Date(this.day).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
		
		db.ExecuteSql(`
			SELECT *
			FROM expenses
			WHERE date = '${this.day}';
		`, [], function(results) {
			let rowCount = results.rows.length;
			let rs = results.rows.item(0);
			
			if(rowCount > 0) {
				createTileGroup(rs.date);
			}
			else {
				let tileGroup = document.createElement('div');
				tileGroup.classList.add('dateGroup');
				tileGroup.style.display = 'grid';
				tileGroup.style.justifyItems = 'center';
				
				let h1 = document.createElement('h1');
				h1.innerHTML = 'No expenses found.';
				tileGroup.classList.add('ShowTileGroup');
				h1.style.textAlign = 'center';
				
				let img = document.createElement('img');
				img.src = '../core/resources/images/notFound.svg';
				img.style.width = '90%';
				img.style.marginTop = '1rem';
				img.style.marginBottom = '1rem';
				img.style.textAlign = 'center';
				
				tileGroup.appendChild(img);
				tileGroup.appendChild(h1);
				document.querySelector('.expensesSection').querySelector('.content').appendChild(tileGroup);
			}
		})
	};
	
	this.updateRangeContent = () => {
		document.querySelector('.expensesSection').querySelector('.content').innerHTML = '';
		let frWord = new Date(this.range[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
		let toWord = new Date(this.range[1]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
		pickerButton.innerHTML = `${frWord} - ${toWord}`;
		
		db.ExecuteSql(`
			SELECT *
			FROM expenses
			WHERE date BETWEEN '${this.range[0]}' AND '${this.range[1]}'
			ORDER BY date DESC;
		`, [], function(results) {
			let rowCount = results.rows.length;
			let unemptyDates = [];
		
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
			if(unemptyDates.length > 0) {
				unemptyDates.forEach((date) => {
					createTileGroup(date);
				});
			} else {
				let tileGroup = document.createElement('div');
				tileGroup.classList.add('dateGroup');
				tileGroup.style.display = 'grid';
				tileGroup.style.justifyItems = 'center';
				
				let h1 = document.createElement('h1');
				h1.innerHTML = 'No expenses found.';
				tileGroup.classList.add('ShowTileGroup');
				h1.style.textAlign = 'center';
				
				let img = document.createElement('img');
				img.src = '../core/resources/images/notFound.svg';
				img.style.width = '90%';
				img.style.marginTop = '1rem';
				img.style.marginBottom = '1rem';
				img.style.textAlign = 'center';
				
				tileGroup.appendChild(img);
				tileGroup.appendChild(h1);
				document.querySelector('.expensesSection').querySelector('.content').appendChild(tileGroup);
			}
		});
	}
	
	let createTileGroup = (date) => {
		let tileGroup = document.createElement('div');
		tileGroup.classList.add('dateGroup');
		
		let targetDateWordFormat = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
		
		let h1 = document.createElement('h1');
		h1.innerHTML = targetDateWordFormat;
		
		tileGroup.appendChild(h1);
		document.querySelector('.expensesSection').querySelector('.content').appendChild(tileGroup);
		tileGroup.classList.add('ShowTileGroup');
		
		db.ExecuteSql(`SELECT * FROM expenses WHERE date = '${date}';`, [], (results) => {
			let rowCount = results.rows.length;
		
			for(let i=rowCount-1 ; i>=0 ; i--) {
				let rs = results.rows.item(i);
				let amount = rs.amount;
				let date = rs.date;
				let time = rs.time;
				let category = rs.category.charAt(0).toUpperCase() + rs.category.slice(1);
				let remarks = rs.remarks;
				let id = rs.id;
				
				let tile = createTile(amount, category, date, time, remarks, id);
				tileGroup.appendChild(tile);
			}
		});
	};
	
	// Create a single tile
	let createTile = (amount, category, date, time, remarks, id) => {
		let tileElement = document.createElement('div');
		tileElement.className = 'tile';
		tileElement.onclick = () => {
			expSec.showMoreMenu(id)
		};
		
		let categoryIcon = document.createElement('img');
		categoryIcon.className = 'categoryIcon';
		
		switch(category) {
			case 'Health':
				categoryIcon.src = 'resources/images/categories/healthIcon.svg';
			break;
			case 'Leisure':
				categoryIcon.src = 'resources/images/categories/leisureIcon.svg';
			break;
			case 'Home':
				categoryIcon.src = 'resources/images/categories/homeIcon.svg';
			break;
			case 'Groceries':
				categoryIcon.src = 'resources/images/categories/groceryIcon.svg';
			break;
			case 'Education':
				categoryIcon.src = 'resources/images/categories/educationIcon.svg';
			break;
			case 'Transportation':
				categoryIcon.src = 'resources/images/categories/transportationIcon.svg';
			break;
			case 'Family':
				categoryIcon.src = 'resources/images/categories/familyIcon.svg';
			break;
			case 'Fitness':
				categoryIcon.src = 'resources/images/categories/fitnessIcon.svg';
			break;
			case 'Food':
				categoryIcon.src = 'resources/images/categories/foodIcon.svg';
			break;
			default:
				categoryIcon.src = 'resources/images/categories/othersIcon.svg';
			break;
		}
		
		let categoryText = document.createElement('h2');
		categoryText.className = 'categoryText';
		categoryText.textContent = category;
		
		let amountText = document.createElement('h2');
		amountText.className = 'amountText';
		amountText.textContent = `PHP ${amount}`;
		
		tileElement.appendChild(categoryIcon);
		tileElement.appendChild(categoryText);
		tileElement.appendChild(amountText);

		return tileElement;
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
};




// Change filter to 'Day' and 'Range'
document.querySelector('#expensesDayFilter').onclick = () => {
	expSec.toggleDay();
};
document.querySelector('#expensesRangeFilter').onclick = () => {
	expSec.toggleRange();
};

// Show date picker windows for expenses section (Day or Range)
document.querySelector('.expensesDatePicker').onclick = () => {
	expSec.showDatePicker();
};

// Close day picker windows when cancel is clicked for expenses section (Day or Range)
document.querySelector('#dayExpenseCalendarPickerCancelButton').onclick = () => {
	expSec.hideDatePicker();
};
document.querySelector('#rangeExpenseCalendarPickerCancelButton').onclick = () => {
	expSec.hideDatePicker();
};

// Apply date filters after clicking done
document.querySelector('#dayExpenseCalendarPickerDoneButton').onclick = () => {
	expSec.applyFilter();
};
document.querySelector('#rangeExpenseCalendarPickerDoneButton').onclick = () => {
	expSec.applyFilter();
};

// Day and Range setters
document.querySelector('#dayExpenseCalendarPickerTodayButton').onclick = () => {
	expSec.setToday();
};
document.querySelector('#dayExpenseCalendarPickerYesterdayButton').onclick = () => {
	expSec.setYesterday();
};
document.querySelector('#rangeExpenseCalendarPickerWeekButton').onclick = () => {
	expSec.setThisWeek();
};
document.querySelector('#rangeExpenseCalendarPickerMonthButton').onclick = () => {
	expSec.setThisMonth();
};
document.querySelector('#rangeExpenseCalendarPickerYearButton').onclick = () => {
	expSec.setThisYear();
};
document.querySelector('#rangeExpenseCalendarPickerLastWeekButton').onclick = () => {
	expSec.setLastWeek();
};
document.querySelector('#rangeExpenseCalendarPickerLastMonthButton').onclick = () => {
	expSec.setLastMonth();
};
document.querySelector('#rangeExpenseCalendarPickerLastYearButton').onclick = () => {
	expSec.setLastYear();
};