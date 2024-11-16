import { Alert, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SignInPage } from '@toolpad/core/SignInPage';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ACCOUNTANT, ADMIN, CUSTOMER, DELIVERY_DRIVER, EXECUTIVE, EXT_CUT_SEC_EMP, INT_CUT_SEC_EMP, SALESMAN, STORE_KEEPER, VERIFIER } from '..';

export function dashboard_redirect(view){
  switch(view){
    case ADMIN:
    case STORE_KEEPER : return '/materials'
    case SALESMAN: return "/delivery/"
    case EXECUTIVE: return "/materials/material/"
    case VERIFIER: return "/sales/delivery/"
    case ACCOUNTANT: return "/transactions/transaction/"
    case DELIVERY_DRIVER: return "/sales/delivery/"
    case CUSTOMER: return "/sales/delivery/"
    case INT_CUT_SEC_EMP: 
    case EXT_CUT_SEC_EMP: return "/production/cutbatch/"
    
  }
  
}


function login(username, password, setState, setPath,) {
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${process.env.REACT_APP_API}/user/authenticate/`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const accessToken = response.access;
        const refreshToken = response.refresh;
        const profile = response.profile
  
        // Store tokens in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('profile', profile);

        const view = jwtDecode(accessToken)['type'];
        setPath(dashboard_redirect(view))
        
        
        console.log('Login successful, tokens stored.');
      } else if (xhr.readyState === 4) {
        setState(state => { return {...state, failAlert : 'Incorrect Credentials'}})
        console.log('Login failed:', xhr.responseText);
      }
    };
  
    const data = JSON.stringify({
      username: username,
      password: password,
    });
  
    xhr.send(data);
  }


  
  

function LoginPage({setPath, setSession}) {

  const theme = useTheme();
  const [state, setState] = useState({ successAlert : false, failAlert : false })
  console.error(theme.palette)
  console.log(theme.palette.background.default)

  const providers = [{ id: 'credentials', name: 'Email and Password' }];

  useEffect(() =>{
    setSession({})
    const header = document.querySelector('.css-v3s1iz')
  if(header) header.style.marginTop = '0 !important'
  })
  

  const signIn = async (provider, formData) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        login(formData.get('email'), formData.get('password'), setState, setPath)
        


        resolve();
      }, 300);
    });
    return promise;
  };

  return (
    <div className='flex h-[80vh] justify-center items-center'>
      <Snackbar sx ={{zIndex : 2100}} open={state.successAlert} autoHideDuration={3000} onClose={() => setState(state => { return {...state, successAlert : false}})}><Alert severity="success">{state.successAlert}</Alert></Snackbar>
      <Snackbar sx ={{zIndex : 2100}} open={state.failAlert} autoHideDuration={3000} onClose={() => setState(state => { return {...state, failAlert : false}})}><Alert severity="error">{state.failAlert}</Alert></Snackbar>


<SignInPage sx = {{paddingTop : '0'}} signIn={signIn} providers={providers} />
 
    </div>
  );
}

export default LoginPage;