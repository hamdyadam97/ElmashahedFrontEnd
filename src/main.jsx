import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './assets/css/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import  store  from './app/store'
import { Provider } from 'react-redux'
import { AuthProvider } from './contexts/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
   <Provider store={store}>
  <StrictMode>
      <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>
   </Provider>
)
