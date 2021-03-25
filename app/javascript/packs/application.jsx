import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from '../components/App'
import store from '../app/store'
import { Provider } from 'react-redux'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})
