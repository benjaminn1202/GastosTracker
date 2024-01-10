const expEdi = new ExpenseEdit();

function ExpenseEdit() {
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
		amount: document.querySelector('#editAmountInput'),
		category: document.querySelector('#editCategoryInput'),
		date: document.querySelector('#editDateInput'),
		time: document.querySelector('#editTimeInput'),
		remarks: document.querySelector('#editRemarksInput'),
	}
	
	// Show/hide expense edit section
	this.ShowExpenseEditSection = (a, b, c, d, e) => {
		mainSection[0].style.display = 'none';
		expenseManipulationSection[1].style.display = 'flex';
		navBar[0].style.display = 'none';
		navBar[2].style.display = 'grid';
		
		console.log(a);
		console.log(b);
		console.log(c);
		console.log(d);
		console.log(e);
		
		entInp.amount.value = a;
		entInp.category.value = b;
		entInp.date.value = c;
		entInp.time.value = d;
		entInp.remarks.value = e;
	};
	this.HideExpenseEditSection = () => {
		mainSection[0].style.display = 'grid';
		expenseManipulationSection[1].style.display = 'none';
		navBar[0].style.display = 'grid';
		navBar[2].style.display = 'none';
		
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
	
	
	// Update expense
	this.UpdateEntry = (id) => {
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
				UPDATE expenses
				SET
					amount = '${amount}',
					category = '${category}',
					date = '${date}',
					time = '${time}',
					remarks = '${remarks}'
				WHERE id = '${id}';
			`);
			
			app.ShowPopup('Expense edit successful!', 'Bottom');
			
			this.HideExpenseEditSection();
			
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
			console.log('Some inputs are not valid. Entry not updated.');
			
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
document.querySelector('#editBackButton').onclick = () => {
	expEdi.HideExpenseEditSection();
};