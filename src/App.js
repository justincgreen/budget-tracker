import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Balance from './components/Balance';
import AddTransaction from './components/AddTransaction';
import ErrorMessage from './components/ErrorMessage';

function App() {  
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
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [gradientMode, setGradientMode] = useState(false);
  
  useEffect(() => {
    // Light, dark, & gradient mode local storage functionality when app loads
    const localData = localStorage.getItem('colorMode');
    
    if(localData === 'light-mode') {
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('gradient-mode');
    }
    
    if(localData === 'dark-mode') {
      document.body.classList.remove('gradient-mode');
      document.body.classList.add('dark-mode');      
    }
    
    // Testing gradient mode idea
    //if(localData === 'gradient-mode') {
      //document.body.classList.remove('dark-mode');
      //document.body.classList.add('gradient-mode');      
    //}
  }, [darkMode]);
  
  return (
    <div className="App">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} gradientMode={gradientMode} setGradientMode={setGradientMode} />
      
      <div className="content">
        <div className="container">
          <Balance 
            balance={balance} setBalance={setBalance} 
            income={income} setIncome={setIncome}
            expenses={expenses} setExpenses={setExpenses}
            error={error} setError={setError}
          />
          
          <div className="row mt-5">
            <AddTransaction 
              balance={balance} setBalance={setBalance} 
              income={income} setIncome={setIncome}
              transactions={transactions} setTransactions={setTransactions} 
              description={description} setDescription={setDescription}
              amount={amount} setAmount={setAmount}
              expenses={expenses} setExpenses={setExpenses}
              error={error} setError={setError}
            />
          </div>
        </div>  
        
        <ErrorMessage error={error} />     
      </div>
      
      <Footer />
    </div>
  );
}

export default App;