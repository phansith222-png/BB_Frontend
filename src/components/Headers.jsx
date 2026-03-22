import { Link } from "react-router"

function Headers() {
    return (
        <div className="fixed top-0 left-0 w-full z-50 justify-between items-center border-b h-25  border-primary backdrop-blur-md  ">
            <div className="max-w-[1440px] mx-auto flex h-24 px-10  my-auto items-center">
                <p className="flex-1 font-cinzel text-4xl hover:opacity-70 transition tracking-widest">BigBode</p>

                <div className="flex flex-1 justify-center gap-9 font-cormorant font-bold uppercase">
                    <Link to='/' className="btn btn-ghost hover:text-primary transition-colors text-2xl tracking-widest">Home</Link>
                    <Link to='/reading' className="btn btn-ghost hover:text-primary transition-colors text-2xl tracking-widest">Reading</Link>
                    <Link to='/profile' className="btn btn-ghost hover:text-primary transition-colors text-2xl tracking-widest">Library</Link>
                </div>
                <div className="flex justify-end flex-1">
                    <Link to='/login' className="btn px-8 py-2 font-bold border border-primary text-2xl tracking-widest font-cormorant btn-ghost hover:bg-primary hover:text-white transition-all duration-300">Get Start</Link>
                </div>
            </div>
        </div>
    )
}

export default Headers