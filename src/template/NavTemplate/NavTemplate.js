import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom';
import './index.css'


const NavLayout = (props) => {
	return (
		<Fragment>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-dark  bg__nav ">
					<Link className="navbar-brand nav__left" to="/">Fooding Củ Chi</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse nav__right" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link className="nav-link pd__items" to="/home">Home </Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link pd__items" to="/myfood">Product</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link pd__items" to="/new">Features</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
			{props.children}
		</Fragment>
	)
}
export const NavTemplate = (props) => {
	return <Route path={props.path} {...props.exact} render={(propsComponent) => {
		return (
			<NavLayout>
				<props.component {...propsComponent} />
			</NavLayout>
		)
	}} />

}