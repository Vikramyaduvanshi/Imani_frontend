
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Authprovider } from './context/Authcontext.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Provider} from "react-redux"
import { store } from './redux/store.js';
import { ToastProvider } from './context/ToastContext.jsx';
createRoot(document.getElementById('root')).render(
 

<BrowserRouter>

 <Provider store={store} >
   <Authprovider>
    <ToastProvider>
       <App />
    </ToastProvider>
  </Authprovider>
 </Provider>


</BrowserRouter>

 
)
