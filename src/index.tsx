import React from 'react';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import ReactDOM from 'react-dom/client';
import {store} from './store';
import App from './components/app/app.tsx';
import {checkAuthAction, fetchOffersAction, fetchFavoritesAction} from './store/api-actions.ts';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavoritesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>
);
