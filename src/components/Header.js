
const Header = (props) => {
	const { darkMode, setDarkMode } = props;
	
	const toggleTheme = () => {
		setDarkMode(!darkMode);
		
		if(!darkMode) {			
			localStorage.setItem('colorMode', 'dark-mode');
			document.body.classList.add('dark-mode');
		}else {
			localStorage.setItem('colorMode', 'light-mode');
			document.body.classList.remove('dark-mode');
		}
	}
	
	return (
		<header className="app-header">
			<div className="container">
				<h1>
					<span className="logo">$</span>
					Budget Tracker
				</h1>
				<span className="material-symbols-outlined toggle-theme" onClick={toggleTheme}>bolt</span>
			</div>			
		</header>
	)
}

export default Header;
