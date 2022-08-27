import { useEffect } from 'react';

const AddTransaction = ({
	balance, setBalance, income, setIncome, transactions, setTransactions, description, setDescription, 
	amount, setAmount, expenses, setExpenses, error, setError}) => {
	
	const handleDate = () => {
		let today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear();
		
		today = mm + '/' + dd + '/' + yyyy;
		
		return today;
	}
	
	const handleTransaction = () => {		
		const transaction = {
			id: Date.now(),
			description: description,
			amount: amount,
			date: handleDate()
		}	
		
		const newTransaction = [...transactions, transaction];
		
		if(description === '' || amount === '') {
			setError('🚫 Enter a description and amount');
			document.querySelector('.error-message').classList.add('active');
			
			setTimeout(()=> {
				document.querySelector('.error-message').classList.remove('active');				
			}, 3000);
		}else {			
			const localBalanceData = parseFloat(balance) - parseFloat(amount);
			const localIncomeData = parseFloat(income)
			const localExpenseData = parseFloat(expenses) + parseFloat(transaction.amount);
			
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
		}								
	}	
	
	const deleteExpense = (id) => {
		const filterItems = transactions.filter((element, index) => {
		  return element.id !== id;		  
		})				
		
		setTransactions(filterItems);
		localStorage.setItem('transactions', JSON.stringify(filterItems));		
	}	
	
	const deleteAllExpenses = () => {
		const localExpenseData = 0;
		const localBalanceData = parseFloat(income);
		
		setTransactions([]);
		setExpenses(localExpenseData.toFixed(2));
		setBalance(localBalanceData.toFixed(2));
		
		localStorage.setItem('transactions', '[]');			
		localStorage.setItem('expenses', localExpenseData.toFixed(2));		
		localStorage.setItem('balance', localBalanceData.toFixed(2));		
	}
	
	// May just need to write a separate modal for edit button on expenses
	// instead of trying to repurpose the same one
	// need the text to be different "Expense Amount" instead of "Income Amount"
	const handleModal = () => {
		const modal = document.querySelector('.edit-modal');
		modal.classList.add('active');
		//modal.querySelector('h3').innerHTML = 'Expense Amount';
	}
	
	// gonna have to save date in localStorage as well ** I dont think I actually need this function anymore
	const handleExpenseDate = () => {
		let today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear();
		
		today = mm + '/' + dd + '/' + yyyy;
		
		//const expenseItem = document.querySelector('.expense-list__item');
		const expenseList = document.querySelector('.expense-list');
		const expenseItems = expenseList.querySelectorAll('.expense-list__item');
		
		if(expenseList) {			
			// do nothing
			if(expenseItems.length < 1) {
				console.log('no items')
			}
			// Add date to first item, if there is only one item 
			if(expenseItems.length === 1) {
				console.log('1 item')
				// need to perform a check that says if string 'no date' exists in innerHTML then apply current date'
				// basically need to account for dates already added from localStorage when hooked up
				// if date exists don't add it, could check if current-date.innerHTML is empty, if so add todays date otherwise do nothing
				expenseItems[0].querySelector('.current-date').innerHTML = today;
			}
			// Add date to last item, if there is more than one item
			if(expenseItems.length > 1) {
				console.log('More than 1 item');
				// need to perform a check that says if string 'no date' exists in innerHTML then apply current date'
				// basically need to account for dates already added from localStorage when hooked up
				// if date exists don't add it, could check if current-date.innerHTML is empty, if so add todays date otherwise do nothing
				expenseItems[expenseItems.length - 1].querySelector('.current-date').innerHTML = today;
			}
		}
	}
	
	//useEffect(() => {
		//handleExpenseDate();
	//}, [transactions])
	
	return (
		<>
		<div className="col-md-6">
			<div className="add-transaction">
				<h5>Add new transaction</h5>
				<p className="mt-3">Description</p>
				<input type="text" className="form-control mb-2" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} />
				<p>Amount</p>
				<input type="number" className="form-control" placeholder="Enter amount..." value={amount} onChange={(e) => setAmount(e.target.value)} />
				<button className="btn btn-primary btn-sm mt-3" onClick={handleTransaction}>Add transaction</button>
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
						<div key={item.id} className="expense-list__item">
							<p className="form-control clearfix">
								{item.description} 
								<span className="badge badge-primary expense-list__amount">
									${item.amount}
								</span>								
								<button className="btn btn-sm btn-primary edit-item" onClick={handleModal}>Edit</button>
								<button className="btn btn-sm bg-danger remove-item" onClick={
									(e) => {
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
									}
								}>Delete</button>
								<span className="current-date">{item.date}</span>
							</p>
						</div>
					)
				})}
				
				{transactions.length > 1 && (
					<button className="btn btn-sm btn-danger mt-2 float-right" onClick={deleteAllExpenses}>Delete all expenses</button>
				)}
			</div>
		</div>
		</>
	)
}

export default AddTransaction;