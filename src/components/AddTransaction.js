const AddTransaction = ({
	balance, setBalance, income, setIncome, transactions, setTransactions, description, setDescription, 
	amount, setAmount, expenses, setExpenses, error, setError}) => {
		
	const handleTransaction = () => {		
		const transaction = {
			id: Date.now(),
			description: description,
			amount: amount
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
						<div key={item.id}>
							<p className="form-control">{item.description} <span className="badge badge-primary">${item.amount}</span>
								<span className="bg-danger badge remove-item" onClick={
									(e) => {
										const localBalanceData = parseFloat(balance) + parseFloat(e.target.previousSibling.textContent.substring(1));
										const localIncomeData = parseFloat(income);
										const localExpenseData = parseFloat(expenses) - parseFloat(e.target.previousSibling.textContent.substring(1));
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
								}>X</span>
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