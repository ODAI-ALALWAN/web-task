import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './context/DarkModeContext.jsx'
import { Provider } from 'react-redux'
import store from './rtk/Store.js'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>


      <Provider store={store}>

        <BrowserRouter>

          <DarkModeProvider>
            <App />
          </DarkModeProvider>



          <Toaster position="top-right"
          reverseOrder={false}
          containerStyle={{ margin : '10px' }}
          toastOptions={{
          style: {
            fontSize : "16px",
            maxWidth : "500px",
            padding : "16px 24px",
            backgroundColor:"var(--color-bg)",
            color : "var(--color-text)",
            
          },
          }}/>




        </BrowserRouter>

      </Provider>


  </StrictMode>
)
