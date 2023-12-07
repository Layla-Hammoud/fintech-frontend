import {BrowserRouter,Route,Routes} from 'react-router-dom'
import React from 'react'

import SideBar from '../Layouts/SideBar/SideBar'
import TransactionTable from '../Components/TransactionTable/TransactionTable'
import PromotionPage from '../Pages/promotionPage'
import SavingSection from '../Components/SavingModal/SavingSection.js'
import SavingPage from '../Pages/Login.js'
import GridUser from '../Components/GridUser/GridUser'
import GridTransaction from '../Components/GridTransaction/GridTransaction'
const AppRoutes = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<SideBar/>} >
   <Route path='users' element={<GridUser/>} />
   <Route path='history' element={<TransactionTable/>} />
   <Route path='transaction' element={<GridTransaction/>}/>
   <Route path='/promotions' element={<PromotionPage/>}></Route>
   <Route path='/EditModal' element={<SavingPage/>}></Route>
   <Route path='/SavingSection' element={<SavingPage/>}></Route>

   </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default AppRoutes;
