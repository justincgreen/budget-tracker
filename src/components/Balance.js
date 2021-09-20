import { useState } from 'react';
const Balance = ({balance, setBalance, income, setIncome, expenses, setExpenses, error, setError}) => {	
	const [input, setInput] = useState('');
	const displayBalance = parseFloat(balance);
	const displayIncome = parseFloat(income);
	const displayExpenses = parseFloat(expenses);
	
	const handleModal = () => {
		const modal = document.querySelector('.edit-modal');
		modal.classList.add('active');
	}
	
	const closeModal = () => {
		const modal = document.querySelector('.edit-modal');
		modal.classList.remove('active');
	}
	
	const saveIncome = () => {
		const modal = document.querySelector('.edit-modal');
		
		if(input !== ''){
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
			setError('🚫 Enter an income amount');
			document.querySelector('.error-message').classList.add('active');
			
			setTimeout(()=> {
				document.querySelector('.error-message').classList.remove('active');				
			}, 3000);
		}		
	}
	
	return (
		<div className="balance">						
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<h6>Your balance</h6>
						<h2>${displayBalance.toLocaleString('en', {minimumFractionDigits: 2})}</h2>
					</div>
					<div className="col-md-4">
						<h6>Income</h6>
						<h2 className="green">${displayIncome.toLocaleString('en', {minimumFractionDigits: 2})}</h2>
						<button className="btn btn-sm btn-primary" onClick={handleModal}>Edit</button>
					</div>
					<div className="col-md-4">
						<h6>Expenses</h6>
						<h2 className="red">${displayExpenses.toLocaleString('en', {minimumFractionDigits: 2})}</h2>
					</div>
				</div>
			</div>
			
			<div className="edit-modal">
				<div className="edit-panel">
					<h3>Income Amount</h3>
					<div className="input-group mb-2">
						<input type="number" className="form-control" placeholder="Enter Amount" value={input} onChange={(e) => setInput(e.target.value)} />
						<div className="input-group-append">
							<button className="btn btn-sm btn-primary" onClick={saveIncome}>Save</button>
						</div>						
					</div>
					<span className="close-icon bg-danger" onClick={closeModal}>X</span>
				</div>
			</div>
		</div>
	)
}

export default Balance;