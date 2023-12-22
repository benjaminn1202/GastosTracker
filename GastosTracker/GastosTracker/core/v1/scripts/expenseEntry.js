const expEnt = new ExpenseEntry();
const popup = new Popup();

function ExpenseEntry() {
	let expenseManipulationSection = [
		document.querySelector('.expenseEntrySection'),
		document.querySelector('.expenseEditSection')
	];	
	let mainSection = [
 		document.querySelector('.expensesSection'),
	    document.querySelector('.summarySection'),
  		document.querySelector('.aboutSection'),
	];
	let navBar = [
		document.querySelector('.navigationBar1'),
		document.querySelector('.navigationBar2'),
		document.querySelector('.navigationBar3'),
	];
	
	let entInp = {
		amount: document.querySelector('#entryAmountInput'),
		category: document.querySelector('#entryCategoryInput'),
		date: document.querySelector('#entryDateInput'),
		time: document.querySelector('#entryTimeInput'),
		remarks: document.querySelector('#entryRemarksInput'),
	}
	
	// Show/hide expense entry section
	this.ShowExpenseEntrySection = () => {
		mainSection[0].style.display = 'none';
		expenseManipulationSection[0].style.display = 'flex';
		navBar[0].style.display = 'none';
		navBar[1].style.display = 'grid';
	};
	this.HideExpenseEntrySection = () => {
		mainSection[0].style.display = 'grid';
		expenseManipulationSection[0].style.display = 'none';
		navBar[0].style.display = 'grid';
		navBar[1].style.display = 'none';
		
		entInp.amount.value = '';
		entInp.category.value = '';
		entInp.date.value = '';
		entInp.time.value = '';
		entInp.remarks.value = '';
		
		entInp.amount.style.border = 'unset';
		entInp.amount.style.padding = '0.5rem';
		entInp.category.style.border = 'unset';
		entInp.category.style.padding = '0.5rem';
		entInp.date.style.border = 'unset';
		entInp.date.style.padding = '0.5rem';
		entInp.time.style.border = 'unset';
		entInp.time.style.padding = '0.5rem ';
		entInp.remarks.style.border = 'unset';
		entInp.remarks.style.padding = '0.5rem';
		
		if(expSec.filter == "Day") {
			expSec.updateDayContent();
		} else {
			expSec.updateRangeContent();
		}
	};
	
	
	// Submit expense entry form
	this.InsertEntry = () => {
		let amount = entInp.amount.value;
		let category = entInp.category.value;
		let date = entInp.date.value;
		let time = entInp.time.value;
		let remarks = entInp.remarks.value;
		
		let amountValid = !isNaN(amount) && parseFloat(amount) > 0;
		let categoryValid = category !== '';
		let dateValid = !isNaN(new Date(date).getTime());
		let timeValid = time !== '';
		let remarksValid = true;
		
		if (amountValid && categoryValid && dateValid && timeValid && remarksValid) {
			db.ExecuteSql(`
				INSERT INTO expenses (amount, date, time, category, remarks)
				VALUES (${amount}, '${date}', '${time}', '${category}', '${remarks}');
			`);
			
			popup.ShowPopup('Expense entry successful!');
			
			this.HideExpenseEntrySection();
			
			if(amountValid == false) {
				entInp.amount.style.border = '1px solid red';
				entInp.amount.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.amount.style.border = 'unset';
				entInp.amount.style.padding = '0.5rem';
			}
			
			if(categoryValid == false) {
				entInp.category.style.border = '1px solid red';
				entInp.category.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.category.style.border = 'unset';
				entInp.category.style.padding = '0.5rem';
			}
			
			if(dateValid == false) {
				entInp.date.style.border = '1px solid red';
				entInp.date.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.date.style.border = 'unset';
				entInp.date.style.padding = '0.5rem';
			}
			
			if(timeValid == false) {
				entInp.time.style.border = '1px solid red';
				entInp.time.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.time.style.border = 'unset';
				entInp.time.style.padding = '0.5rem ';
			}
			
			if(remarksValid == false) {
				entInp.remarks.style.border = '1px solid red';
				entInp.remarks.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.remarks.style.border = 'unset';
				entInp.remarks.style.padding = '0.5rem';
			}	
		} else {
			console.log('Some inputs are not valid. Entry not inserted.');
			
			if(amountValid == false) {
				entInp.amount.style.border = '1px solid red';
				entInp.amount.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.amount.style.border = 'unset';
				entInp.amount.style.padding = '0.5rem';
			}
			
			if(categoryValid == false) {
				entInp.category.style.border = '1px solid red';
				entInp.category.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.category.style.border = 'unset';
				entInp.category.style.padding = '0.5rem';
			}
			
			if(dateValid == false) {
				entInp.date.style.border = '1px solid red';
				entInp.date.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.date.style.border = 'unset';
				entInp.date.style.padding = '0.5rem';
			}
			
			if(timeValid == false) {
				entInp.time.style.border = '1px solid red';
				entInp.time.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.time.style.border = 'unset';
				entInp.time.style.padding = '0.5rem ';
			}
			
			if(remarksValid == false) {
				entInp.remarks.style.border = '1px solid red';
				entInp.remarks.style.padding = 'calc(0.5rem - 1px)';
			} else {
				entInp.remarks.style.border = 'unset';
				entInp.remarks.style.padding = '0.5rem';
			}
		}
	};
}




// Show/hide expense entry section
document.querySelector('#expensesEntryButton').onclick = () => {
	expEnt.ShowExpenseEntrySection();
};
document.querySelector('#entryBackButton').onclick = () => {
	expEnt.HideExpenseEntrySection();
};


// Submit entry form
document.querySelector('#entryButton').onclick = () => {
	expEnt.InsertEntry();
};