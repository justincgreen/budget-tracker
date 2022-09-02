
const Header = () => {
	const toggleTheme = () => {
		document.body.classList.toggle('dark-theme');	
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
