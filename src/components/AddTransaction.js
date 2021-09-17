const AddTransaction = ({
	balance, setBalance, income, setIncome, transactions, setTransactions, description, setDescription, 
	amount, setAmount, expenses, setExpenses}) => {
		
	const handleTransaction = () => {		
		const transaction = {
			id: Date.now(),
			description: description,
			amount: amount
		}	
		
		const newTransaction = [...transactions, transaction];
		
		if(description === '' || amount === '') {
			alert('Please enter a description and an amount');
		}else {
			setTransactions(newTransaction);
			setExpenses(parseInt(expenses, 10) + parseInt(transaction.amount, 10)); // have to convert each state to a number because they are both strings by default
			setBalance(parseInt(balance, 10) - parseInt(amount, 10));	
			setDescription('');
			setAmount('');
			
			const localData = {
				balance: parseInt(balance, 10) - parseInt(amount, 10),
				income: parseInt(income, 10),
				expenses: parseInt(expenses, 10) + parseInt(transaction.amount, 10)
			}
			
			const localTransactions = [...transactions, transaction];
			
			localStorage.setItem('balance', JSON.stringify(localData.balance));
			localStorage.setItem('income', JSON.stringify(localData.income));
			localStorage.setItem('expenses', JSON.stringify(localData.expenses));
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
		setTransactions([]);
		setExpenses(0);
		setBalance(parseInt(income, 10));
		localStorage.setItem('transactions', '[]');			
		localStorage.setItem('expenses', 0);		
		localStorage.setItem('balance', income);		
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
										// substring method needed to remove $ sign from item price, allows string to convert to a clean number
										setBalance(parseInt(balance, 10) + parseInt(e.target.previousSibling.textContent.substring(1)));
										setExpenses(parseInt(expenses, 10) - parseInt(e.target.previousSibling.textContent.substring(1)));
										deleteExpense(item.id);
										
										// update local storage objects
										const localData = {
											balance: parseInt(balance, 10) + parseInt(e.target.previousSibling.textContent.substring(1)),
											income: parseInt(income, 10),
											expenses: parseInt(expenses, 10) - parseInt(e.target.previousSibling.textContent.substring(1))
										}
																				
										localStorage.setItem('balance', JSON.stringify(localData.balance));
										localStorage.setItem('income', JSON.stringify(localData.income));
										localStorage.setItem('expenses', JSON.stringify(localData.expenses));																			
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