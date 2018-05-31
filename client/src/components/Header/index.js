import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

export class Header extends Component {
	state = {
		showNav: false
	};
	render() {
		return (
			<header>
				<div className="open_nav">
					<FontAwesome
						name="bars"
						style={{
							color: '#ffffff',
							cursor: 'pointer',
							padding: '10px'
						}}
					/>
				</div>

				<Link to="/" className="logo">
					The BookWorm
				</Link>
			</header>
		);
	}
}

export default Header;
