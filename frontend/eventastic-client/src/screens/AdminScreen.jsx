
import { Routes, Route } from 'react-router-dom';
import { PageContainer } from '../components/styles/layouts.styled'
import AdminSideBar from '../components/admin/AdminSideBar'
import AdminVenuePage from '../components/admin/pages/AdminVenuePage'
import AdminReviewsPage from '../components/admin/pages/AdminReviewsPage'
import AdminHostRequestPage from '../components/admin/pages/AdminHostRequestPage'

const AdminScreen = () => {
  return (
    <PageContainer maxWidth='false' direction='row'>
    <AdminSideBar/>
    <Routes>
        <Route exact path='/admin/createVenues' element={<AdminVenuePage/>}/>
        <Route exact path='/admin/approveReviews' element={<AdminReviewsPage/>}/>
        <Route exact path='/admin/approveHosts' element={<AdminHostRequestPage/>}/>
    </Routes>
    </PageContainer>
  )
} 

export default AdminScreen