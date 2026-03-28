import React, { useEffect } from 'react'
import EditprofileForm from '../components/EditprofileForm'
import useUserStore from '../stores/userStores'
import Avatar from '../components/Avatar'
import SavedReading from '../components/savedReading'

function Profile() {
  const getProfile = useUserStore(state => state.getProfile)
  const profile = useUserStore(state => state.profile)

  const { user, userInfo } = profile || {}
  console.log('userInfo', userInfo)
  console.log('user', user)
  useEffect(() => {
    getProfile()
  }, [])


  return (
    <div className='max-w-6xl mx-auto py-30 px-8'>
      <div className='mb-8 mx-auto'>
        <p className='font-cormorant font-medium tracking-[0.2em] text-4xl mb-6 text-slate-800 uppercase italic'>
          Welcome, {userInfo?.firstName || 'User'}
        </p>
        <div className='bg-primary/80 h-32 rounded-t-3xl shadow-inner'></div>
      </div>
      <div className='flex justify-between items-end px-4 mb-12'>
        <div className='flex items-center gap-8'>
          <div className='-mt-16'> {/* ดัน Avatar ขึ้นไปทับแถบสี */}
            <div className='w-32 h-32 rounded-full ring-8 ring-white shadow-xl bg-gray-300 flex items-center justify-center overflow-hidden'>
              <Avatar imgSrc={userInfo?.profileImage} />
            </div>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-3xl font-bold text-slate-800'>
              {userInfo?.firstName} {userInfo?.lastName}
            </h1>
            <p className='text-lg text-gray-400 font-light tracking-wide'>{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => document.getElementById('editprofile-form').showModal()}
          className='btn btn-ghost border border-slate-200 rounded-2xl px-10 hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-sm'
        >
          Edit Profile
        </button>
      </div>
      <div className='mx-13'>
        <div className='flex gap-16 py-6 border-b border-slate-50'>
          <div className='flex flex-col gap-2 flex-1'>
            <span className='text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold'>Firstname</span>
            <span className='text-xl font-medium text-slate-700 font-cormorant'>{userInfo?.firstName}</span>
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <span className='text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold'>Lastname</span>
            <span className='text-xl font-medium text-slate-700 font-cormorant'>{userInfo?.lastName}</span>
          </div>
        </div>
        <div className='flex gap-16 py-6 border-b border-slate-50'>
          <div className='flex flex-col gap-2 flex-1'>
            <span className='text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold'>Zodiac</span>
            <span className='text-xl font-medium text-slate-700 font-cormorant'>{userInfo?.zodiac}</span>
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <span className='text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold'>Date of Birth</span>
            <span className='text-xl font-medium text-slate-700 font-cormorant'>{userInfo?.dateOfBirth}</span>
          </div>
        </div>
        <div className='flex gap-16 py-6 border-b border-slate-50'>
          <div className='flex flex-col gap-2 flex-1'>
            <span className='text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold'>Mobile</span>
            <span className='text-xl font-medium text-slate-700 font-cormorant'>{user?.mobile}</span>
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <span className='text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold'>Email Address</span>
            <span className='text-xl font-medium text-slate-700 font-cormorant'>{user?.email}</span>
          </div>
        </div>
      </div>
      <div className='mx-13 flex flex-col gap-10'>
        <div >
          <h2 className='font-bold text-2xl tracking-[0.15em] uppercase text-slate-800 mb-8 border-l-4 border-primary pl-4'>saved-reading</h2>
        </div>
        <div className='flex flex-col gap-4'>
          <SavedReading />
        </div>
      </div>
      <dialog id='editprofile-form' className='modal'>
        <div className='modal-box'>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <EditprofileForm />
        </div>
      </dialog>
    </div>
  )
}

export default Profile