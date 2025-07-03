import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
// in main.jsx or index.css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <App />
  </BrowserRouter>
)
