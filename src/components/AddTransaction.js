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
	
	// Delete individual expense
	const deleteExpense = (id) => {
		const filterItems = transactions.filter((element, index) => {
		  return element.id !== id;		  
		})				
		
		setTransactions(filterItems);
		localStorage.setItem('transactions', JSON.stringify(filterItems));		
	}	
	
	// Delete all expenses modal prompt
	const deleteAllExpensesPrompt = () => {
		const modal = document.querySelector('.delete-all-modal');
		modal.classList.add('active');	
	}
	
	// Delete all expenses
	const deleteAllExpenses = () => {
		const localExpenseData = 0;
		const localBalanceData = parseFloat(income);
		const modal = document.querySelector('.delete-all-modal');
		modal.classList.remove('active');	
		
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
	const handleExpenseModal = () => {
		const modal = document.querySelector('.edit-modal');
		modal.classList.add('active');
		//modal.querySelector('h3').innerHTML = 'Expense Amount';
	}
	
	const closeModal = () => {
		const modal = document.querySelector('.delete-all-modal');
		modal.classList.remove('active');
	}
	
	//useEffect(() => {
		//handleExpenseDate();
	//}, [transactions])
	
	return (
		<>
		<div className="col-md-6">
			<div className="add-transaction">
				<h5>Add new transaction</h5>
				<p className="mt-3 mb-1">Description</p>
				<input type="text" className="form-control mb-2" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} />
				<p className="mb-1">Amount</p>
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
										<button className="btn btn-sm btn-primary edit-item">Edit</button>
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
									</div>
								</div>																					
							</div>
						</div>
					)
				})}
				
				{transactions.length > 1 && (
					<button className="btn btn-sm btn-danger mt-2 float-right" onClick={deleteAllExpensesPrompt}>Delete all expenses</button>
				)}
				
				<div className="delete-all-modal">
					<div className="delete-all-modal__message">
						<h3>Do you really want to delete all expenses?</h3>
						<button className="btn btn-sm btn-primary" onClick={deleteAllExpenses}>Yes</button>
						<button className="btn btn-sm btn-danger" onClick={closeModal}>No</button>
					</div>					
				</div>
			</div>
		</div>
		</>
	)
}

export default AddTransaction;