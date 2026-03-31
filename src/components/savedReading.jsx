import { CalendarFold, ChevronRight, Trash2 } from "lucide-react"
import { useEffect } from "react"
import useSaveReadingstore from "../stores/saveReadingStores"

function SavedReading(props) {
    const { id,readingId, note, createdAt, question, aiInterpret,handleViewDetail,deleteDetail } = props
    

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('th-TH')
        : "ไม่มีวันทื่"

    
    return (
        <div  className="border border-base-200 flex items-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 gap-4">
            <div className="flex-1 flex items-center gap-2">
                <CalendarFold size={20} className="text-primary" />
                <p className="text-sm font-semibold text-secondary">{formattedDate}</p>
            </div>
            <div className="flex-1 flex-grow min-w-0">
                <p className="font-medium ">{question} ?</p>
                <p className="text-sm italic text-gray-500">Note: {note || "ไม่มีบันทึกเพิ่มเติม"}
                </p>
            </div>
            <div className="flex-1 justify-end flex">
                <button 
                    onClick={()=>deleteDetail(readingId)}
                    className=" cursor-pointer p-2 text-base-content/30 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                    <Trash2 size={20} />
                </button>
                <button onClick={()=>handleViewDetail(readingId)} className="cursor-pointer ext-base-content/40 hover:text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}

export default SavedReading