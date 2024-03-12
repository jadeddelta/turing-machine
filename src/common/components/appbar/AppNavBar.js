import React, { Component } from 'react';
import {
	grey,
	cyan
} from "@material-ui/core/colors";

class AppNavBar extends Component {
	render() {
		return (
		<div style={{backgroundColor: cyan[500], width: "100%", height: 50}}>
			<p style={{color: grey[50], fontSize: 24, paddingTop: 7, paddingLeft: 10, fontFamily: 'Roboto'}}>
				Turing Machine Simulator
			</p>
		</div>
		)
	}
}

export default AppNavBar;