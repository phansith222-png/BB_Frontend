import React, { useEffect } from 'react'
import EditprofileForm from '../components/EditprofileForm'
import useUserStore from '../stores/userStores'
import Avatar from '../components/Avatar'
import SavedReading from '../components/savedReading'
import useSaveReadingstore from '../stores/saveReadingStores'
import Journal from '../components/Journal'

function Profile() {
  const getProfile = useUserStore(state => state.getProfile)
  const profile = useUserStore(state => state.profile)
  // const getHistory = useSaveReadingstore(state=> state.getHistory)
  const getSavedReading = useSaveReadingstore(state => state.getSavedReading)
  const getJournal = useSaveReadingstore(state => state.getJournal)
  const deleteJournal = useSaveReadingstore(state => state.deleteJournal)
  const saveRead = useSaveReadingstore(state => state.saveRead)
  const { user, userInfo } = profile || {}

  console.log('saveRead', saveRead)
  useEffect(() => {
    getProfile();
    getSavedReading();
  }, [saveRead])

  const handleViewDetail = (id) =>{
    getJournal(id)
    document.getElementById('Journal-form').showModal()
  }
  const deleteDetail = (id) =>{
    deleteJournal(id)
  }
  return (
    <div className='w-full min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans flex flex-col items-center'>
      <div className='w-full max-w-6xl flex flex-col gap-8'>
        <div className='border-b border-base-300 pb-4'>
          <h1 className='text-3xl font-bold font-cormorant text-base-content'>Settings</h1>
        </div>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
          <div className='w-full lg:w-1/3 bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300'>
            <div className='flex flex-col items-center border-b border-base-200 pb-6 mb-6'>
              <div className='w-32 h-32 rounded-full overflow-hidden bg-base-200 ring-4 ring-primary/20 mb-4'>
                <Avatar imgSrc={userInfo?.profileImage} />
              </div>
              <h2 className='text-2xl font-bold font-cormorant text-base-content text-center'>
                {userInfo?.firstName || 'Seeker'} {userInfo?.lastName || ''}
              </h2>
              <p className='text-sm text-base-content/60 mt-1 uppercase tracking-widest'>
                {userInfo?.zodiac || ' - '}
              </p>
            </div>
            <div className='w-full flex flex-col gap-4 text-sm'>
              <div className='flex justify-between items-center'>
                <span className='text-base-content/50 uppercase tracking-wider text-xs font-bold'>Date of Birth</span>
                <span className='font-medium text-base-content'>{userInfo?.dateOfBirth || '-'}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-base-content/50 uppercase tracking-wider text-xs font-bold'>Mobile</span>
                <span className='font-medium text-base-content'>{user?.mobile || '-'}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-base-content/50 uppercase tracking-wider text-xs font-bold'>Email</span>
                <span className='font-medium text-base-content'>{user?.email || '-'}</span>
              </div>
            </div>
          </div>
          <div className='w-full lg:w-2/3 bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300'>
            <h3 className="text-xl font-bold uppercase tracking-widest text-base-content/80 mb-6">Basic Info</h3>
            <EditprofileForm />
          </div>

        </div>
        <div className='w-full mt-10 p-8 lg:p-10 bg-base-100 rounded-3xl border border-base-300 shadow-sm'>
          <h2 className='font-bold text-2xl uppercase font-cormorant text-base-content mb-8 flex items-center gap-3'>
            <span className="w-1.5 h-8 bg-primary rounded-full inline-block"></span>
            Saved Readings
          </h2>
          <div className='flex flex-col gap-4'>
            {saveRead && (saveRead.map((e) => (
              <SavedReading key={e.id} id={e.id} readingId={e.reading.id} note={e.note} createdAt={e.createdAt} question={e.reading.question} aiInterpret={e.reading.aiInterpretation} deleteDetail={deleteDetail} handleViewDetail={handleViewDetail} />
            )))}
          </div>

        </div>

      </div>
      <dialog id="Journal-form" className="modal ">
        <div className="modal-box rounded-3xl p-8 bg-black/50  backdrop-blur-sm ">
          <Journal/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
    // <div className='w-full min-h-screen pt-28 pb-6 px-8 font-sans'>
    //   <div className='ml-13 w-full mx-auto'>
    //     <p className='font-cormorant font-bold text-4xl md:text-5xl mb-8 text-base-content tracking-wider text-center md:text-left uppercase'>
    //       Welcome, {userInfo?.firstName || 'Seeker'}
    //     </p>
    //   </div>
    //   <div className=' px-13 py-5  bg-gradient-to-r from-base-300 to-primary/60 rounded-t-lg shadow-xl border border-base-300 overflow-hidden mb-12'>
    //     <div className='h-32 md:h-40  w-full relative'>
    //       </div>
    //       <div className='w-32 h-32 rounded-full ring-8 ring-base-100 bg-base-200 shadow-lg flex items-center justify-center overflow-hidden'>
    //         <Avatar imgSrc={userInfo?.profileImage} />
    //       </div>
    //       <div className='text-center md:text-left mb-2 mt-4 md:mt-0'>
    //         <h1 className='text-3xl md:text-4xl font-bold text-base-content font-cormorant'>
    //           {userInfo?.firstName} {userInfo?.lastName}
    //         </h1>
    //         <p className='text-lg text-gray-400 font-light tracking-wide mt-1'>{user?.email}</p>
    //       </div>
    //       <button
    //         onClick={() => document.getElementById('editprofile-form').showModal()}
    //         className='btn btn-outline border border-accent rounded-2xl px-10 hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-sm'
    //       >
    //         Edit Profile
    //       </button>
    //   </div>
    //   <div className='mx-13 flex flex-wrap flex-col'>
    //     <div className='flex gap-16 py-6 border-b border-slate-50'>
    //       <div className='flex flex-col gap-2 flex-1'>
    //         <span className='text-lg uppercase tracking-[0.3em] text-slate-400 font-bold'>Firstname</span>
    //         <span className='text-2xl font-bold text-secondary font-cormorant'>{userInfo?.firstName || "-" }</span>
    //       </div>
    //       <div className='flex flex-col gap-2 flex-1'>
    //         <span className='text-lg uppercase tracking-[0.3em] text-slate-400 font-bold'>Lastname</span>
    //         <span className='text-2xl font-bold text-secondary font-cormorant'>{userInfo?.lastName || "-"}</span>
    //       </div>
    //     </div>
    //     <div className='flex gap-16 py-6 border-b border-slate-50'>
    //       <div className='flex flex-col gap-2 flex-1'>
    //         <span className='text-lg uppercase tracking-[0.3em] text-slate-400 font-bold'>Zodiac</span>
    //         <span className='text-2xl font-bold text-secondary font-cormorant'>{userInfo?.zodiac || "-"}</span>
    //       </div>
    //       <div className='flex flex-col gap-2 flex-1'>
    //         <span className='text-lg uppercase tracking-[0.3em] text-slate-400 font-bold'>Date of Birth</span>
    //         <span className='text-2xl font-bold text-secondary font-cormorant'>{userInfo?.dateOfBirth || "-"}</span>
    //       </div>
    //     </div>
    //     <div className='flex gap-16 py-6 border-b border-slate-50'>
    //       <div className='flex flex-col gap-2 flex-1'>
    //         <span className='text-lg uppercase tracking-[0.3em] text-slate-400 font-bold'>Mobile</span>
    //         <span className='text-2xl font-bold text-secondary font-cormorant'>{user?.mobile || "-"}</span>
    //       </div>
    //       <div className='flex flex-col gap-2 flex-1'>
    //         <span className='text-lg uppercase tracking-[0.3em] text-slate-400 font-bold'>Email Address</span>
    //         <span className='text-2xl font-bold text-secondary font-cormorant'>{user?.email || "-"}</span>
    //       </div>
    //     </div>
    //   </div>
    //   <div className=' border border-base-300 flex flex-col gap-10 p-8 md:p-12'>
    //     <div >
    //       <h2 className='font-bold text-2xl uppercase text-base-content mb-8 border-l-4 border-primary pl-4'>
    //         saved-reading
    //       </h2>
    //     </div>
    //     <div className='flex flex-col gap-4'>
    //       {saveRead && (saveRead.map((e)=>(
    //         <SavedReading key={e.id} id={e.id} note={e.note} createdAt={e.createdAt} question={e.reading.question} aiInterpret ={e.reading.aiInterpretation}/>
    //       )))}
    //     </div>
    //   </div>
    //   <dialog id='editprofile-form' className='modal'>
    //     <div className='modal-box'>
    //       <form method="dialog">
    //         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    //       </form>
    //       <EditprofileForm />
    //     </div>
    //   </dialog>
    // </div>
  )
}

export default Profile