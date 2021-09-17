import { useState } from 'react';
const Balance = ({balance, setBalance, income, setIncome, expenses, setExpenses}) => {	
	const [input, setInput] = useState('');
	
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
			const localData = {
				balance: parseInt(input, 10) - parseInt(expenses, 10),
				income: parseInt(input, 10),
				expenses: parseInt(expenses, 10)
			}
			
			localStorage.setItem('balance', JSON.stringify(localData.balance));
			localStorage.setItem('income', JSON.stringify(localData.income));
			localStorage.setItem('expenses', JSON.stringify(localData.expenses));
			
			setIncome(parseInt(input, 10));
			setBalance(parseInt(input, 10) - parseInt(expenses, 10)); 
			// Subtracting input from expenses accounts for if user updates income balance while transactions have already been added, keeps it dynamic
			modal.classList.remove('active');				
		}else {
			alert('Amount is empty');
		}		
	}
	
	return (
		<div className="balance">						
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<h6>Your balance</h6>
						<h2>${balance}</h2>
					</div>
					<div className="col-md-4">
						<h6>Income</h6>
						<h2 className="green">${income}</h2>
						<button className="btn btn-sm btn-primary" onClick={handleModal}>Edit</button>
					</div>
					<div className="col-md-4">
						<h6>Expenses</h6>
						<h2 className="red">${expenses}</h2>
					</div>
				</div>
			</div>
			
			<div className="edit-modal">
				<div className="edit-panel">
					<h3>Income Amount</h3>
					<div className="input-group mb-2">
						<input type="text" className="form-control" placeholder="Enter Amount" value={input} onChange={(e) => setInput(e.target.value)} />
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