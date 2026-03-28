import { CalendarFold, ChevronRight } from "lucide-react"

function SavedReading() {
    return (
        <div className="border border-slate-200 flex items-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 gap-4">
            <div className="flex-1 flex items-center gap-2">
                <CalendarFold size={20} className="text-blue-500" />
                <p className="text-sm font-semibold text-secondary">23/01/2545</p>
            </div>
            <div className="flex-1 flex-grow min-w-0">
                <p className="font-medium ">เรื่องความรักจะเป็นยังไง ?</p>
               <p className="text-sm italic text-gray-500">Note: What the hell
                </p> 
            </div>
            <div className="flex-1 justify-end flex">
                <button className="hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors">
                    <ChevronRight size={20} />
                     </button>
            </div>
        </div>
    )
}

export default SavedReading