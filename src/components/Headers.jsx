import { Link } from "react-router"

function Headers() {
  return (
    <div className="flex w-full justify-between items-center bor border h-25 px-7 border-primary rounded-2xl ">
        <div className="flex flex-1 gap-9">
            <p className="font-cinzel text-4xl">BigBode</p>
        </div>
        <div className="flex justify-center gap-9 flex-1 font-cormorant font-bold ">

            <Link to='/' className="btn btn-ghost hover: text-2xl">Home</Link>
            <Link to='/reading' className="btn btn-ghost text-2xl">Reading</Link>
            <Link to='/profile' className="btn btn-ghost text-2xl">Library</Link>
        </div>
        <div className="flex justify-end flex-1">
            <Link to='login' className="btn text-2xl font-cormorant btn-ghost">Get Start</Link>
        </div>
    </div>
  )
}

export default Headers