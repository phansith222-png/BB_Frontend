import { Link } from "react-router"
import useUserStore from "../stores/userStores"
import Avatar from "./Avatar"

function Headers() {
    const logout = useUserStore(state => state.logout)
    const profile = useUserStore(state=>state.profile)
    const { user, userInfo } = profile || {}
    return (
        <div className="fixed top-0 left-0 w-full z-50 justify-between items-center border-b h-25  border-primary backdrop-blur-md  ">
            <div className="max-w-[1440px] mx-auto flex h-24 px-10  my-auto items-center">
                <p className="flex-1 font-cinzel text-4xl hover:opacity-70 transition tracking-widest">BigBode</p>

                <div className="flex flex-1 justify-center gap-14 font-cormorant font-bold uppercase">
                    <Link to='/' className="btn btn-ghost hover:text-primary transition-colors text-2xl tracking-widest">Home</Link>
                    <Link to='/reading' className="btn btn-ghost hover:text-primary transition-colors text-2xl tracking-widest">Reading</Link>
                    <Link to='/library' className="btn btn-ghost hover:text-primary transition-colors text-2xl tracking-widest">Library</Link>
                </div>
                <div className="flex justify-end flex-1 items-center">
                    {user ? (
                        <div className="dropdown dropdown-end hover:opacity-90 transition">
                            <div tabIndex={0} role="button" className="btn btn-circle bg-secondary/10">
                                <Avatar imgSrc={userInfo?.profileImage}/>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-2xl space-y-2">
                                <li><Link to='/profile' className="btn btn-ghost text-xl font-cormorant">
                                    <span className="text-lg font-cormorant font-medium">My Library & Profile</span>
                                </Link></li>
                                <li><button onClick={logout} className="btn btn-outline btn-secondary btn-sm rounded-xl w-full hover:bg-secondary hover:text-white transition-all font-cormorant tracking-wider text-sm">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to='/login' className="btn px-8 py-2 font-bold border border-primary text-2xl tracking-widest font-cormorant btn-ghost hover:bg-primary hover:text-white transition-all duration-300">
                            Get Start
                        </Link>)}

                </div>
            </div>
        </div>
    )
}

export default Headers