import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import { store } from './store/store';
import { fetchPositions, getToken } from './store/ActionCreators/ActionCreators';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(getToken());
store.dispatch(fetchPositions());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
