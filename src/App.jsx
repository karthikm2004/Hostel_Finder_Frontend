import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import Home from './pages/Home'
import Auth from './pages/Auth'
import UserProfile from './users/pages/UserProfile'
import HostelFilter from './pages/HostelFilter'
import HostelDetails from './pages/HostelDetails'
import Sidebar from './owner/components/Sidebar'
import Preloader from './components/Preloader'
import Pnf from './components/Pnf'
import AdminDashboard from './admin/pages/AdminDashboard'
import AddHostel from './owner/pages/AddHostel'
import OwnerAuth from './owner/pages/OwnerAuth'
import OwnerProtect from './owner/components/OwnerProtect'
import HostelList from './owner/pages/HostelList'
import UserProtect from './users/components/UserProtect'
import AuthProtect from './users/components/AuthProtect'
import Favorites from './users/pages/Favorites'
import HostelBooking from './pages/HostelBooking'
import UserBooking from './users/pages/UserBooking'
import OwnerBookings from './owner/pages/OwnerBookings'
import HostelMange from './admin/pages/HostelMange'
import UserManagement from './admin/pages/UserManagement'
import AllBooking from './owner/pages/AllBooking'

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500) // Reduced loading time to 1.5s for better UX
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<UserProtect> {loading ? <Preloader /> : <Home />}</UserProtect>} />
        <Route path='/signin' element={<Auth />} />
        <Route path='/signup' element={<AuthProtect><Auth signup /></AuthProtect>} />
        <Route path='/user-profile' element={<UserProtect><UserProfile /></UserProtect>} />
        <Route path='/hostel-filter' element={<UserProtect><HostelFilter /></UserProtect>} />
        <Route path='/hostel-details/:id' element={<HostelDetails />} />
        <Route path='/favorite-hostels' element={<Favorites />} />
        <Route path='/hostel-booking' element={<HostelBooking />} />
        <Route path='/hostel-booking' element={<UserBooking />} />


        <Route path='/owner-profile' element={<OwnerProtect><Sidebar /> </OwnerProtect>} />
        <Route path='/add-hostel' element={<OwnerProtect><AddHostel /></OwnerProtect>} />
        <Route path='/owner-hostelList' element={<OwnerProtect><HostelList /></OwnerProtect>} />
        <Route path='/owner-signin' element={<OwnerAuth />} />
        <Route path='/owner-signup' element={<OwnerAuth OwnerSignup />} />
        <Route path='/owner-booking' element={<OwnerBookings />} />
        <Route path='/all-bookings' element={<AllBooking/>}/>


        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/hostel-manage' element={<HostelMange/>}/>
        <Route path='/user-manage' element={<UserManagement/>}/>

        <Route path='/*' element={<Pnf />} />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App