import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './pages/layout';
import reportWebVitals from './reportWebVitals';



export const GUEST = -1;
export const ADMIN = 0;
export const SALESMAN = 1;
export const INT_CUT_SEC_EMP = 2;
export const EXT_CUT_SEC_EMP = 3;
export const CUSTOMER = 4;
export const VERIFIER = 5;
export const STORE_KEEPER = 6;
export const DELIVERY_DRIVER = 7;
export const ACCOUNTANT = 9;
export const EXECUTIVE = 10;




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
