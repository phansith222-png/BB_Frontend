import Footer from '../components/Footer'
import Headers from '../components/Headers'
import { Outlet } from 'react-router'
function UserLayout() {
  return (
    <div className='bg-neutral/75 min-h-screen w-full'>
        <Headers />
        <div className='flex-grow'>
        <Outlet />
        </div>
        <Footer/>
    </div>
  )
}

export default UserLayout