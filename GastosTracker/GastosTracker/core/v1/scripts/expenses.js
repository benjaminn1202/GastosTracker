// selectedFilterExpense is from navigation.js
let expensesSelectedDay = '';
let expensesSelectedRange = ['', ''];

// Functions to get the dates
function getCurrentWeek() {
  let today = new Date();
  let dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  let startDate = new Date(today);
  let endDate = new Date(today);

  startDate.setDate(today.getDate() - dayOfWeek); // Start of the week (Sunday)
  endDate.setDate(today.getDate()); // Current day

  let formattedStartDate = startDate.toISOString().split('T')[0];
  let formattedEndDate = endDate.toISOString().split('T')[0];

  expensesSelectedRange[0] = formattedStartDate;
  expensesSelectedRange[1] = formattedEndDate;
}



document.body.onload = () => {
	let currentDate = new Date();
	let currentDateWordFormat = '';
	
	let year = currentDate.getFullYear();
	let month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
	let day = currentDate.getDate();
	
	// month: 'long' or 'short'
	let options = { month: 'long', day: 'numeric', year: 'numeric' };
	let date = new Date(currentDate);
	currentDateWordFormat = date.toLocaleDateString('en-US', options);
	
	expensesSelectedDay = `${year}-${month}-${day}`;
	document.querySelector('#dayExpenseCalendarPickerInput').value = expensesSelectedDay;
	document.querySelector('.expensesDatePicker').innerHTML = currentDateWordFormat;
	
	getCurrentWeek();
	document.querySelector('#dayExpenseCalendarPickerInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
	document.querySelector('#dayExpenseCalendarPickerInput').value = expensesSelectedDay;
	document.querySelector('#rangeExpenseCalendarPickerFromInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
	document.querySelector('#rangeExpenseCalendarPickerFromInput').value = expensesSelectedRange[0];
	document.querySelector('#rangeExpenseCalendarPickerToInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
	document.querySelector('#rangeExpenseCalendarPickerToInput').value = expensesSelectedRange[1];

	document.querySelector('.expensesSection').querySelector('.content').innerHTML = '';
	createTileDateGroup(expensesSelectedDay);
};



function expensesRangeUpdate() {
	let expenseFrom = document.querySelector('#rangeExpenseCalendarPickerFromInput').value;
	let expenseTo = document.querySelector('#rangeExpenseCalendarPickerToInput').value;
	
	db.ExecuteSql(`
		SELECT *
		FROM expenses
		WHERE date BETWEEN '${expenseFrom}' AND '${expenseTo}';
	`, [], function(results) {
		let rowCount = results.rows.length;
		let unemptyDates = [];
		
		// 1. Get all unique dates
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
		
		unemptyDates.forEach((date) => {
			console.log(date);
			createTileDateGroup(date);
		});
		
		// createTileDateGroup('2023-12-19');
	});
}



function createTileDateGroup(targetDate) {
	let dateGroup = document.createElement('div');
	dateGroup.classList.add('dateGroup');
	
	let options = { month: 'long', day: 'numeric', year: 'numeric' };
	let targetDate1 = new Date(targetDate);
	targetDateWordFormat = targetDate1.toLocaleDateString('en-US', options);
	
	let h1 = document.createElement('h1');
	h1.innerHTML = targetDateWordFormat;
	
	dateGroup.appendChild(h1);
	document.querySelector('.expensesSection').querySelector('.content').appendChild(dateGroup);
	
	db.ExecuteSql(`SELECT * FROM expenses WHERE date = '${targetDate}';`, [], (results) => {
		let rowCount = results.rows.length;
		
		for(let i=0 ; i<rowCount ; i++) {
			let rs = results.rows.item(i);
			let amount = rs.amount;
			let date = rs.date;
			let category = rs.category.charAt(0).toUpperCase() + rs.category.slice(1);
			let remarks = rs.remarks;

			let tile = createTile(amount, targetDate, category, remarks);
			dateGroup.appendChild(tile);
		}
	});
}

function createTile(amount, date, category, remarks) {
	let tileDiv = document.createElement('div');
	tileDiv.classList.add('tile');
	tileDiv.onclick = showExpenseEditSection;
	
	let categoryIcon = document.createElement('img');
	categoryIcon.classList.add('categoryIcon');
	categoryIcon.src = 'resources/images/category-icon-template.svg';
	
	let categoryText = document.createElement('h2');
	categoryText.classList.add('categoryText');
	categoryText.textContent = category;
	
	let amountText = document.createElement('h2');
	amountText.classList.add('amountText');
	amountText.textContent = 'PHP ' + amount.toFixed(2);
	
	let commentIcon = document.createElement('img');
	commentIcon.classList.add('commentIcon');
	commentIcon.src = 'resources/images/remarks-icon.svg';
	commentIcon.onclick = () => {
		console.log('remarks');
	}
	
	tileDiv.appendChild(categoryIcon);
	tileDiv.appendChild(categoryText);
	tileDiv.appendChild(amountText);
	tileDiv.appendChild(commentIcon);
	
	return tileDiv;
}


document.querySelector('#expensesDayFilter').onclick = () => {
	selectedFilterExpense = 'day';
	document.querySelector('#expensesRangeFilter').classList.remove('active');
	document.querySelector('#expensesDayFilter').classList.add('active');
	document.querySelector('.expensesSection').querySelector('.content').innerHTML = '';
	createTileDateGroup(expensesSelectedDay);
};
document.querySelector('#expensesRangeFilter').onclick = () => {
	selectedFilterExpense = 'range';
	document.querySelector('#expensesDayFilter').classList.remove('active');
	document.querySelector('#expensesRangeFilter').classList.add('active');
	document.querySelector('.expensesSection').querySelector('.content').innerHTML = '';
	expensesRangeUpdate();
};

document.querySelector('#dayExpenseCalendarPickerDoneButton').onclick = () => {
	let date = document.querySelector('#dayExpenseCalendarPickerInput').value;
	
	let dateObject = new Date(date);
	
	if (!isNaN(dateObject.getTime())) {
		let formattedDate = dateObject.toISOString().split('T')[0];
		expensesSelectedDay = formattedDate;
		document.querySelector('#dayExpenseCalendarPickerInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
		document.querySelector('.expensesSection').querySelector('.content').innerHTML = '';
		createTileDateGroup(expensesSelectedDay);
		closeExpenseDatePicker();
	}
	else {
		document.querySelector('#dayExpenseCalendarPickerInput').style.boxShadow = 'inset 0 0 5px 0 rgba(255, 0, 0, 50%)';
	}
};

document.querySelector('#dayExpenseCalendarPickerCancelButton').onclick = () => {
	document.querySelector('#dayExpenseCalendarPickerInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
	document.querySelector('#dayExpenseCalendarPickerInput').value = expensesSelectedDay;
	closeExpenseDatePicker();
};
document.querySelector('#rangeExpenseCalendarPickerCancelButton').onclick = () => {
	document.querySelector('#rangeExpenseCalendarPickerFromInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
	document.querySelector('#rangeExpenseCalendarPickerFromInput').value = expensesSelectedRange[0];
	document.querySelector('#rangeExpenseCalendarPickerToInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
	document.querySelector('#rangeExpenseCalendarPickerToInput').value = expensesSelectedRange[1];
	closeExpenseDatePicker();
};

document.querySelector('#rangeExpenseCalendarPickerDoneButton').onclick = () => {
  let dateFrom = document.querySelector('#rangeExpenseCalendarPickerFromInput').value;
  let dateTo = document.querySelector('#rangeExpenseCalendarPickerToInput').value;

  let dateObjectFrom = new Date(dateFrom);
  let dateObjectTo = new Date(dateTo);

  if (!isNaN(dateObjectFrom.getTime())) {
    let formattedDate = dateObjectFrom.toISOString().split('T')[0];
    expensesSelectedRange[0] = formattedDate;
    document.querySelector('#rangeExpenseCalendarPickerFromInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';

    if (!isNaN(dateObjectTo.getTime()) && dateObjectTo >= dateObjectFrom) {
      let formattedDate1 = dateObjectTo.toISOString().split('T')[0];
      expensesSelectedRange[1] = formattedDate1;
      document.querySelector('#rangeExpenseCalendarPickerToInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
      document.querySelector('.expensesSection').querySelector('.content').innerHTML = '';
      expensesRangeUpdate();
      closeExpenseDatePicker();
    } else {
      app.ShowPopup('Invalid date range. "From" should be equal or not less than "To".','Bottom');
      document.querySelector('#rangeExpenseCalendarPickerToInput').style.boxShadow = 'inset 0 0 5px 0 rgba(255, 0, 0, 50%)';
    }
  } else {
    document.querySelector('#rangeExpenseCalendarPickerFromInput').style.boxShadow = 'inset 0 0 5px 0 rgba(255, 0, 0, 50%)';

    if (!isNaN(dateObjectTo.getTime())) {
      let formattedDate1 = dateObjectTo.toISOString().split('T')[0];
      expensesSelectedRange[1] = formattedDate1;
      document.querySelector('#rangeExpenseCalendarPickerToInput').style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 25%)';
    } else {
      document.querySelector('#rangeExpenseCalendarPickerToInput').style.boxShadow = 'inset 0 0 5px 0 rgba(255, 0, 0, 50%)';
    }
  }
};