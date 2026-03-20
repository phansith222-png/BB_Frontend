import Headers from '../components/Headers'
import { Outlet } from 'react-router'
function UserLayout() {
  return (
    <div className='bg-neutral pt-4'>
      <div className='min-h-screen mx-25 gap-10'>
        <Headers />
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout