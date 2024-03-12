import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import MuiThemeProviderV0 from 'material-ui/styles/MuiThemeProvider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
	cyan,
	pink
} from '@material-ui/core/colors';

import App from '../common/containers/AppContainer';
import PageNotFound from '../common/components/PageNotFound';
import rootReducer from '../common/reducers';
import { resizeScreenAndTapeAction } from '../common/actions/guiActions';
import { initMachineAction, loadMachineAction } from '../common/actions/machineActions';

const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(rootReducer, applyMiddleware(thunk));

window.addEventListener('resize', () => {
	store.dispatch(resizeScreenAndTapeAction(window.innerWidth, false));
});

window.addEventListener('beforeunload', (e) => {
	let state = store.getState();
	if (state.anyChangeInTrial || state.anyChangeInNormal) {
		e.returnValue = true;
		return true;
	}
});

if (preloadedState && preloadedState.constructor === Object && Object.keys(preloadedState).length > 0) {
	store.dispatch(loadMachineAction(preloadedState));
} else {
	store.dispatch(initMachineAction());
}

const theme = createMuiTheme({
	palette: {
		primary: {
			main: cyan[500]
		},
		secondary: {
			main: pink[400]
		}
	}
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<MuiThemeProviderV0>
				<Router history={createBrowserHistory()}>
					<div>
						<Route exact path="/" component={App} />
						<Route exact path="/:id" component={App} />
						<Route exact path="/error/404" component={PageNotFound} />
					</div>
				</Router>
			</MuiThemeProviderV0>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('container')
);

