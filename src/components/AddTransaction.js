import { useState } from 'react';

const AddTransaction = ({
	balance, setBalance, income, setIncome, transactions, setTransactions, description, setDescription, 
	amount, setAmount, expenses, setExpenses, error, setError}) => {
	
	const [input, setInput] = useState('');
	const [expenseId, setExpenseId] = useState(''); // used to check the expense id based on deleting expense or editing expense
	
	// Add date to expense item
	const handleDate = () => {
		let today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear();
		
		today = mm + '/' + dd + '/' + yyyy;
		
		return today;
	}
	
	// Add new transaction
	const handleTransaction = () => {		
		const transaction = {
			id: Date.now(),
			description: description,
			amount: amount,
			date: handleDate()
		}	
		
		const newTransaction = [...transactions, transaction];
		
		if(description === '' || amount === '') {
			setError('Enter a description and amount');
			document.querySelector('.error-message').classList.add('active');
			
			setTimeout(()=> {
				document.querySelector('.error-message').classList.remove('active');				
			}, 3000);
		}else {			
			const localBalanceData = parseFloat(balance) - parseFloat(amount);
			const localIncomeData = parseFloat(income)
			const localExpenseData = parseFloat(expenses) + parseFloat(transaction.amount);
			
			// Update balance, income, expenses values
			setTransactions(newTransaction);
			setExpenses(localExpenseData.toFixed(2)); // have to convert each state to a number because they are both strings by default
			setBalance(localBalanceData.toFixed(2));	
			setDescription('');
			setAmount('');
			
			const localData = {
				balance: localBalanceData.toFixed(2),
				income: localIncomeData.toFixed(2),
				expenses: localExpenseData.toFixed(2)
			}
			
			const localTransactions = [...transactions, transaction];
			
			localStorage.setItem('balance', localData.balance);
			localStorage.setItem('income', localData.income);
			localStorage.setItem('expenses', localData.expenses);
			localStorage.setItem('transactions', JSON.stringify(localTransactions));
			
			const successIcon = document.querySelector('.transaction-success');
			successIcon.classList.add('active');
			setTimeout(()=> {
				successIcon.classList.remove('active');
			},1500);
		}								
	}	
	
	// Delete individual expense
	const deleteExpense = (id) => {
		const filterItems = transactions.filter((element, index) => {
		  return element.id !== id;		  
		});
			
		setTransactions(filterItems);
		localStorage.setItem('transactions', JSON.stringify(filterItems));		
	}	
	
	// Delete all expenses modal prompt
	const deleteAllExpensesPrompt = () => {
		const modal = document.querySelector('.delete-modal');
		const modalMessage = document.querySelector('.delete-modal__message--all');
		modal.classList.add('active');	
		modalMessage.classList.add('active');	
	}
	
	// Delete all expenses
	const deleteAllExpenses = () => {
		const localExpenseData = 0;
		const localBalanceData = parseFloat(income);
		const modal = document.querySelector('.delete-modal');
		modal.classList.remove('active');	
		
		setTransactions([]);
		setExpenses(localExpenseData.toFixed(2));
		setBalance(localBalanceData.toFixed(2));
		
		localStorage.setItem('transactions', '[]');			
		localStorage.setItem('expenses', localExpenseData.toFixed(2));		
		localStorage.setItem('balance', localBalanceData.toFixed(2));		
	}
	
	// Close delete modal
	const closeDeleteModal = () => {
		const modal = document.querySelector('.delete-modal');
		const modalMessageOne = document.querySelector('.delete-modal__message--single');
		const modalMessageTwo = document.querySelector('.delete-modal__message--all');
		modal.classList.remove('active');
		modalMessageOne.classList.remove('active');	
		modalMessageTwo.classList.remove('active');	
	}
	
	// Toggle auto tags list
	const handleTags = () => {
		const tagsInput = document.querySelector('.auto-tags__input');
		const tagsList = document.querySelector('.auto-tags__list');
		const tagsMessage = document.querySelector('.auto-tags__message');
		
		if(tagsInput.checked) {
			tagsList.classList.add('active');
			tagsMessage.innerText = 'Hide tags?';
		}else {
			tagsList.classList.remove('active');
			tagsMessage.innerText = 'Show tags?';
		}
	}
	
	// Auto populate description from auto tag
	const handlePopulate = (e) => {
		setDescription(e.target.innerText);
	}
	
	// Edit expense modal
	const handleExpenseModal = () => {
		const modal = document.querySelector('.edit-expense-modal');
		modal.classList.add('active');
	}
	
	// Close expense modal
	const closeExpenseModal = () => {
		const modal = document.querySelector('.edit-expense-modal');
		modal.classList.remove('active');
	}
	
	// also prob need to clear expense value from edit panel on save or modal close
	// find the expenseId and apply update to that id
	const updateExpense = () => {
		const modal = document.querySelector('.edit-expense-modal');
		const orgExpenseAmount = document.querySelector(`.expense-list__item--${expenseId} .expense-list__amount`).innerText;
		const removeDollarSign = orgExpenseAmount.substring(1); // remove dollar sign from amount so it can convert to a number
		const orgExpenseAmountNumberConversion = parseFloat(removeDollarSign);
		const expenseModalAmount = document.querySelector('.edit-expense-amount').value;
		const expenseModalAmountNumberConversion = parseFloat(expenseModalAmount);
		const currentExpenseDifference = orgExpenseAmountNumberConversion - expenseModalAmountNumberConversion; // clicked expense item amount minus expense modal amount
		
		// NOTE: do income - expenses to get the balance
		// NOTE: Need to rethink all the logic here
		
		if(input !== '') {
			// Apply updated expense amount number to ui item
			//document.querySelector(`.expense-list__item--${expenseId} .expense-list__amount`).innerText = '$' + expenseModalAmount;
			//console.log(currentExpenseDifference)
			//console.log(parseFloat(updatedExpenseAmount) - parseFloat(orgExpenseAmountNumberConversion));
			
			// we need the difference between old expense amount and new expense amount 			
			//const globalExpensesUpdate = parseFloat(expenses) + expenseDifference;
			
			//const localBalanceData = parseFloat(input) + parseFloat(expenses);
			//const localIncomeData = parseFloat(input);
			//const localExpenseData =  parseFloat(input) + parseFloat(expenses);
			
			/*const localData = {
				balance: localBalanceData.toFixed(2),
				income: localIncomeData.toFixed(2),
				expenses: localExpenseData.toFixed(2)
			}*/
			
			//setExpenses(globalExpensesUpdate);	
			
			//let updatedBalance = income - expenses;
			
			// update localStorage			
			//localStorage.setItem('balance', localData.balance);
			//localStorage.setItem('income', localData.income);
			//localStorage.setItem('expenses', localData.expenses);
			
			//setIncome(localIncomeData.toFixed(2));
			//setBalance(localBalanceData.toFixed(2)); 
			
			//modal.classList.remove('active');	
			//setInput('');
		}else {
			setError('Enter an expense amount');
			document.querySelector('.error-message').classList.add('active');
			
			setTimeout(()=> {
				document.querySelector('.error-message').classList.remove('active');				
			}, 3000);
		}
		
		
		// The code below is the original code that is used to update the balance and expenses
		// reference for edit expense logic
		
		/* if(input !== ''){
			const localBalanceData = parseFloat(input) - parseFloat(expenses);
			const localIncomeData = parseFloat(input);
			const localExpenseData = parseFloat(expenses);
			
			const localData = {
				balance: localBalanceData.toFixed(2),
				income: localIncomeData.toFixed(2),
				expenses: localExpenseData.toFixed(2)
			}
			
			localStorage.setItem('balance', localData.balance);
			localStorage.setItem('income', localData.income);
			localStorage.setItem('expenses', localData.expenses);
			
			setIncome(localIncomeData.toFixed(2));
			setBalance(localBalanceData.toFixed(2)); 
			
			modal.classList.remove('active');				
		}else {
			setError('Enter an expense amount');
			document.querySelector('.error-message').classList.add('active');
			
			setTimeout(()=> {
				document.querySelector('.error-message').classList.remove('active');				
			}, 3000);
		} */	
	}
	
	return (
		<>
		<div className="col-md-6">
			<div className="add-transaction">
				<h5>Add new transaction</h5>
				<div className="auto-tags">
					<div className="auto-tags__info">
						<input type="checkbox" className="auto-tags__input" onClick={handleTags} />
						<p className="auto-tags__message">Show tags?</p>
					</div>
					
					<div className="auto-tags__list">
						<span className="badge badge-primary" onClick={handlePopulate}>Stella Nova</span>
						<span className="badge badge-primary" onClick={handlePopulate}>Starbucks</span>
						<span className="badge badge-primary" onClick={handlePopulate}>Natural Grocers</span>
						<span className="badge badge-primary" onClick={handlePopulate}>Uptown</span>
					</div>
				</div>
				
				<p className="mt-3 mb-1">Description</p>
				<input type="text" className="form-control mb-2 transaction-description" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} />
				<p className="mb-1">Amount</p>
				<input type="number" className="form-control" placeholder="Enter amount..." value={amount} onChange={(e) => setAmount(e.target.value)} />
				<button className="btn btn-primary btn-sm mt-3" onClick={handleTransaction}>Add transaction</button>
				<span className="material-symbols-outlined transaction-success">priority</span>
			</div>						
		</div>
		
		<div className="col-md-6">
			<div className="expense-list clearfix">
				<h5>Expense List</h5>
				{transactions.length < 1 && (
					<p>There are currently no transactions</p>
				)}
				{transactions.map((item, index) => {
					return (
						<div key={item.id} className={`expense-list__item expense-list__item--${item.id}`}>	
							<div className="form-control clearfix">								
								<div className="expense-list__item--info">
									<span className="current-date badge">{item.date}</span>
									<div className="expense-list__item--description">
										{item.description} 
										<span className="badge badge-primary expense-list__amount">
											${item.amount}
										</span>	
									</div>
								</div>
								<div className="btn-wrapper">	
									<div className="btn-group">
										<button className="btn btn-sm btn-primary edit-item" onClick={(e)=> {
											//setExpenseId(item.id);
											//handleExpenseModal();
											// get the value amount of the expense item
											//console.log(e.target.closest('.expense-list__item').firstChild.querySelector('.expense-list__amount').innerText);
											//console.log(e.target.closest('.expense-list__item').firstChild.classList);
											//console.log(item.id);											
										}}>Edit</button>
										<button className="btn btn-sm bg-danger remove-item" onClick={
											(e) => {
												const deleteModal = document.querySelector('.delete-modal');
												const deleteMessage = document.querySelector('.delete-modal__message--single');
												const deleteModalConfirm = document.querySelector('.delete-modal__message--single .btn-confirm');
												
												deleteModal.classList.add('active');
												deleteMessage.classList.add('active');
												
												// delete expense confirmation
												deleteModalConfirm.addEventListener('click', () => {
													if(deleteMessage.classList.contains('active')) {
														const localBalanceData = parseFloat(balance) + parseFloat(e.target.closest('.form-control').querySelector('.expense-list__amount').textContent.substring(1));
														const localIncomeData = parseFloat(income);
														const localExpenseData = parseFloat(expenses) - parseFloat(e.target.closest('.form-control').querySelector('.expense-list__amount').textContent.substring(1));
														// substring method needed to remove $ sign from item price, allows string to convert to a clean number
														
														setBalance(localBalanceData.toFixed(2));
														setExpenses(localExpenseData.toFixed(2));
														deleteExpense(item.id);
														
														// update local storage objects
														const localData = {
															balance: localBalanceData.toFixed(2),
															income: localIncomeData.toFixed(2),
															expenses: localExpenseData.toFixed(2)
														}
														
														localStorage.setItem('balance', localData.balance);
														localStorage.setItem('income', localData.income);
														localStorage.setItem('expenses', localData.expenses);	
														
														// buffer needed, otherwise code above might not fire off
														setTimeout( () => {
															deleteModal.classList.remove('active');
															deleteMessage.classList.remove('active');
														}, 100);														
													}
												})																																								
											}
										}>Delete</button>	
									</div>
								</div>																					
							</div>
						</div>
					)
				})}
				
				{transactions.length > 1 && (
					<button className="btn btn-sm btn-danger mt-2 float-right" onClick={deleteAllExpensesPrompt}>Delete all expenses</button>
				)}
				
				<div className="edit-expense-modal">
					<div className="edit-expense-panel">
						<h3>Expense Amount</h3>
						<div className="input-group mb-2">
							<input type="number" className="form-control edit-expense-amount" placeholder="Enter Amount" value={input} onChange={(e) => setInput(e.target.value)} />
							<div className="input-group-append">
								<button className="btn btn-sm btn-primary" onClick={updateExpense}>Update</button>
							</div>						
						</div>
						<span className="close-icon bg-danger" onClick={closeExpenseModal}>X</span>
					</div>
				</div>
				
				<div className="delete-modal">
					<div className="delete-modal__message delete-modal__message--single">
						<h3>Do you really want to delete this expense?</h3>
						<button className="btn btn-sm btn-primary btn-confirm">Yes</button>
						<button className="btn btn-sm btn-danger" onClick={closeDeleteModal}>No</button>
					</div>
					
					<div className="delete-modal__message delete-modal__message--all">
						<h3>Do you really want to delete all expenses?</h3>
						<button className="btn btn-sm btn-primary" onClick={deleteAllExpenses}>Yes</button>
						<button className="btn btn-sm btn-danger" onClick={closeDeleteModal}>No</button>
					</div>					
				</div>
			</div>
		</div>
		</>
	)
}

export default AddTransaction;