
const Header = (props) => {
	const { darkMode, setDarkMode, gradientMode, setGradientMode } = props;
	
	const toggleTheme = () => {
		setDarkMode(!darkMode);
		
		if(!darkMode) {			
			localStorage.setItem('colorMode', 'dark-mode');
			document.body.classList.add('dark-mode');
			//document.body.classList.remove('gradient-mode');
		}else {
			localStorage.setItem('colorMode', 'light-mode');
			document.body.classList.remove('dark-mode');
		}
	}
	
	const toggleGradientTheme = () => {
		if(!gradientMode) {
			localStorage.setItem('colorMode', 'gradient-mode');
			document.body.classList.remove('dark-mode');
			document.body.classList.add('gradient-mode');
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
				{/* <span className="material-symbols-outlined toggle-gradient-theme" onClick={toggleGradientTheme}>bolt</span> */}
			</div>			
		</header>
	)
}

export default Header;
