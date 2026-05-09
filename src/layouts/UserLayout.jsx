import { useEffect, useState } from 'react';
import Footer from '../components/Footer'
import Headers from '../components/Headers'
import MobileNav from '../components/MobileNav'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion';
function UserLayout() {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname])

  return (
    <div className='bg-neutral/75 min-h-screen w-full'>
      <Headers />
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F5]/80 backdrop-blur-md"
          >
            <span className="loading loading-ring loading-lg text-[#B59F84] w-16 h-16 mb-6"></span>
            <p className="font-cormorant text-2xl text-gray-800 tracking-widest animate-pulse uppercase">
              Connecting ....
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='flex-grow pb-20 md:pb-0'>
        <Outlet />
      </div>
      <Footer />
      <MobileNav />
    </div>
  )
}

export default UserLayout