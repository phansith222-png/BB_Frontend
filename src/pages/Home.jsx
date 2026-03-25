import { toast } from "react-toastify"
import Bglandingpage from "../assets/bglandingpage.jpg"
import CardOftheday from "../components/CardOftheday"
import useReadStore from "../stores/readStores"
import { motion } from "framer-motion"
function Home() {
  const tarotOftheday = useReadStore(state => state.tarotOftheday)
  const dailyCard = useReadStore(state => state.dailyCard)
  const aireading = useReadStore(state => state.aireading)
  const isloading = useReadStore(state => state.isloading)
  const isflipped = useReadStore(state => state.isflipped)
  const hdlTarotOftheday = async () => {
    try {
      const resp = await tarotOftheday()
    } catch (err) {
      console.dir(err)
      toast.error(err.response?.data.message || err.message)
    }
  }
  return (
    <div className='w-full h-full  flex flex-col gap-4 pt-27 '>
      <div className="w-full mx-auto h-full flex flex-col">
        <section className="w-355 mx-auto">
          <div className="flex mx-auto">
            <div className="z-10 w-full max-w-7xl mx-auto py-60 px-6 flex flex-col flex-1 items-start gap-4">
              <div className="flex gap-2 flex-col">
                <p className="font-bold font-cormorant text-6xl tracking-wider">Intuition Meets Intelligence</p>
                <p className="font-light font-cormorant text-2xl">Stop memorizing. Start connecting. Our sophisticated AI interprets the cards through the lens of your unique journey, in real-time.</p>
              </div>
              <div className="flex gap-4">
                <button className="border btn-ghost btn">Start Your Reading</button>
                <button className="border btn-ghost btn">Explore the Cards</button>
              </div>
            </div>
            <div className="flex-1 relative ">
              <img className=" rounded-l-[100px] h-full w-full object-cover shadow-2xl overflow-hidden transition-transform duration-1000 hover:scale-110" src="https://images.unsplash.com/photo-1770836141377-3ac59bd071a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
          </div>
        </section>
        <section className="w-full bg-primary mx-auto">
          <div className='flex w-full items-center justify-center h-full rounded-2xl border-primary flex-col gap-10'>
            <div className="flex flex-col items-center mt-25">
              <p className="font-semibold font-cormorant text-4xl px-4 tracking-[0.2em] uppercase ">Tarot of The day</p>
              <p className="font-light italic opacity-70 mt-2">Good Morning , sir do you wanna know what is gonna be today ?</p>
            </div>
            <div className=" flex flex-col gap-2 items-center">
              {/* <button className=" btn btn-ghost">Click</button> */}
                <CardOftheday isflipped={isflipped} dailyCard={dailyCard} hdlTarotOftheday={hdlTarotOftheday} />
              
            </div>
          </div>
        </section>
        <section className='border-primary py-32'>
          <div className="flex w-full h-full flex-col gap-20">
            <div className="text-center mb-20 ">
              <h2 className="font-bold font-cormorant text-5xl mb-4">
                ทำไมต้องเรียนรู้กับ <span className="text-primary">BigBen</span>
              </h2>
              <p className="font-light text-gray-500 text-xl">
                เปลี่ยนประสบการณ์การเรียนรู้แบบเดิมที่ต้องท่องจำ ให้กลายเป็นการทำความเข้าใจอย่างลึกซึ้ง...
              </p>
            </div>
            <div className=' flex w-full justify-around'>
              <div className="flex-1 ">
                <motion.div className="flex flexcol justify-center">
                  <div className="w-1/2">
                    <h3 className="text-2xl font-bold mb-3">AI วิเคราะห์ตามบริบท</h3>
                    <p className="font-light text-gray-600 leading-relaxed">
                      BigBen ไม่ได้แค่สุ่มคำทำนาย แต่จะอ่านไพ่ตามคำถามและตำแหน่งที่คุณกำหนด
                      ช่วยให้คุณเข้าใจความเชื่อมโยงอย่างแท้จริง
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="flex-1">
                <motion.div className="flex flexcol justify-center">
                  <div className="w-1/2">
                    <h3 className="text-2xl font-bold mb-3">AI วิเคราะห์ตามบริบท</h3>
                    <p className="font-light text-gray-600 leading-relaxed">
                      BigBen ไม่ได้แค่สุ่มคำทำนาย แต่จะอ่านไพ่ตามคำถามและตำแหน่งที่คุณกำหนด
                      ช่วยให้คุณเข้าใจความเชื่อมโยงอย่างแท้จริง
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="flex-1">
                <motion.div className="flex flexcol justify-center">
                  <div className="w-1/2">
                    <h3 className="text-2xl font-bold mb-3">AI วิเคราะห์ตามบริบท</h3>
                    <p className="font-light text-gray-600 leading-relaxed">
                      BigBen ไม่ได้แค่สุ่มคำทำนาย แต่จะอ่านไพ่ตามคำถามและตำแหน่งที่คุณกำหนด
                      ช่วยให้คุณเข้าใจความเชื่อมโยงอย่างแท้จริง
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 bg-gray-50">
          <div className='flex w-full h-full justify-center items-center rounded-2xl flex-col gap-8 '>
            <p className="text-4xl font-bold font-cinzel tracking-wider">discovery reading more</p>
            <p className="font-light text-gray-500 text-xl">หากท่านมีคำถามในใจหรืออยากเจาะลึกความหมายให้มากกว่าเดิม</p>
            <button className="px-10 py-4 rounded-full bg-secondary text-white hover:bg-primary duration-300 transition-colors">เริ่มเปิดไพ่กับ BigBen</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home