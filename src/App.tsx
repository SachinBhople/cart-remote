import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'

import Checkout from './pages/Checkout'
import { Provider } from 'react-redux'
import reduxStore from './redux/store'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Product from './pages/Product'
import Succses from './pages/Succses'
import Test from './pages/Test'

const App = () => (

  <Routes>
    <Route path='/' element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path='pro' element={<Product />} />
      <Route path='test' element={<Test />} />
      <Route path='product/:id' element={<ProductDetails />} />
      <Route path='cart' element={<Cart />} />
      <Route path='success' element={<Succses />} />
      <Route path='checkout' element={<Checkout />} />
    </Route>
    <Route path='*' element={<h1>Page Not Found</h1>} />
  </Routes>

)
export default App
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<React.StrictMode>
  <BrowserRouter>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </BrowserRouter>
</React.StrictMode>)



