import { useState } from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import AddTransaction from './components/AddTransaction';

function App() {
  // MAYBE TODO add functionality for decimal numbers (floating point numbers)
  
  const getLocalTransactions = () => {
    const data = localStorage.getItem('transactions');
    if(data) {
      return JSON.parse(data);
    }else {
      return [];
    }
  }
  
  const getLocalBalance = () => {
    const data = localStorage.getItem('balance');
    
    if(data) {
      return JSON.parse(data);
    }else {
      return 0;
    }
  }
  
  const getLocalIncome = () => {
    const data = localStorage.getItem('income');
    
    if(data) {
      return JSON.parse(data);
    }else {
      return 0;
    }
  }

  const getLocalExpenses = () => {
    const data = localStorage.getItem('expenses');
    
    if(data) {
      return JSON.parse(data);
    }else {
      return 0;
    }
  }
  
  const [balance, setBalance] = useState(getLocalBalance);
  const [income, setIncome] = useState(getLocalIncome);
  const [transactions, setTransactions] = useState(getLocalTransactions);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState(getLocalExpenses);
  
  return (
    <div className="App">
      <Header />
      
      <div className="content">
        <div className="container">
          <Balance 
            balance={balance} setBalance={setBalance} 
            income={income} setIncome={setIncome}
            expenses={expenses} setExpenses={setExpenses}
          />
          
          <div className="row mt-5">
            <AddTransaction 
              balance={balance} setBalance={setBalance} 
              income={income} setIncome={setIncome}
              transactions={transactions} setTransactions={setTransactions} 
              description={description} setDescription={setDescription}
              amount={amount} setAmount={setAmount}
              expenses={expenses} setExpenses={setExpenses}
            />
          </div>
        </div>        
      </div>
    </div>
  );
}

export default App;