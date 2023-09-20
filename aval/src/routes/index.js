import { Routes, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Customers from '../pages/Customers'
import New from '../pages/New'
import Home from '../pages/Home/Home';
import Sobre from '../pages/About/Sobre';
import Cardapio from '../pages/Card/Cardapio';
import Private from './Private'

function RoutesApp(){
  return(
    <Routes>
      <Route path="/register" element={ <SignUp/> } />
      <Route path="/dashboard" element={ <Private><Dashboard/></Private> } />
      <Route path="/profile" element={ <Private><Profile/></Private> } />
      <Route path="/customers" element={<Private><Customers/></Private>} />
      <Route path="/new" element={<Private><New/></Private>} />
      <Route path="/new/:id" element={<Private><New/></Private>} />
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/galeria" element={<SignIn/>} />
      <Route path="/cardapio" element={<Cardapio />} />
    </Routes>
  )
}

export default RoutesApp;