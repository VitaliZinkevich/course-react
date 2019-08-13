import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// setup Redux
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

// import async staff for redux
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

// import reducers 
import combinedReducer from './redux/reducer'

// import auth aws services
import Amplify from 'aws-amplify';
import amplifyConfig from './amplify.config';

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: amplifyConfig.REGION,
		userPoolId: amplifyConfig.USER_POOL_ID,
		identityPoolId: amplifyConfig.IDENTITY_POOL_ID,
		userPoolWebClientId: amplifyConfig.APP_CLIENT_ID
	},
	API: {
		endpoints: [
			{
				name: 'testApiCall',
				endpoint: 'https://07r6ox7iib.execute-api.us-east-1.amazonaws.com/dev/hello',
				region: 'us-east-1'
			},
			{
				name: 'createOrder',
				endpoint: 'https://6rdltt91gc.execute-api.us-east-1.amazonaws.com/dev/order',
				region: 'us-east-1'
			},
			// {
			// 	name: 'addOrder',
			// 	endpoint: 'https://whd5793u70.execute-api.us-east-1.amazonaws.com/dev/todos',
			// 	region: 'us-east-1'
			// },
			// {
			// 	name: 'delOrder',
			// 	endpoint: 'https://whd5793u70.execute-api.us-east-1.amazonaws.com/dev/todos',
			// 	region: 'us-east-1'
			// }

		]
	}
});

const store = createStore(combinedReducer, applyMiddleware(promise(),thunk,/* logger*/));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
