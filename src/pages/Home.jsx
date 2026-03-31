import { toast } from "react-toastify"
import CardOftheday from "../components/CardOftheday"
import useReadStore from "../stores/readStores"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
function Home() {
  const tarotOftheday = useReadStore(state => state.tarotOftheday)
  const dailyCard = useReadStore(state => state.dailyCard)
  const aireading = useReadStore(state => state.aireading)
  const isLoading = useReadStore(state => state.isLoading)
  const isflipped = useReadStore(state => state.isflipped)
  const checkDailyReset = useReadStore(state => state.checkDailyReset)

  useEffect(() => {
      checkDailyReset();
  }, [checkDailyReset]);
  const hdlTarotOftheday = async () => {
    try {
      const resp = await tarotOftheday()
    } catch (err) {
      console.dir(err)
      toast.error(err.response?.data.message || err.message)
    }
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="w-full min-h-screen flex flex-col text-gray-800 font-sans">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5]/80 backdrop-blur-sm"
          >
            <span className="loading loading-ring loading-lg text-[#B59F84] w-16 h-16 mb-6"></span>
            <p className="font-cormorant text-3xl text-gray-800 tracking-widest animate-pulse uppercase">
              Connecting to the Stars...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="flex-1 flex flex-col items-start gap-6"
            initial="hidden" animate="visible" variants={fadeUp}
          >
            <h1 className="font-bold font-cormorant text-5xl lg:text-7xl tracking-wide text-gray-900 leading-tight">
              Intuition Meets <br /> Intelligence
            </h1>
            <p className="font-light text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Stop memorizing. Start connecting. Our sophisticated AI interprets
              the cards through the lens of your unique journey, in real-time.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="px-8 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors shadow-lg">
                Start Your Reading
              </button>
              <button className="px-8 py-3 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-100 transition-colors">
                Explore the Cards
              </button>
            </div>
          </motion.div>
\
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-3xl lg:rounded-l-[80px] shadow-2xl">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                src="https://images.unsplash.com/photo-1770836141377-3ac59bd071a1?q=80&w=1170&auto=format&fit=crop"
                alt="Tarot Cards"
              />
            </div>
          </motion.div>
        </div>
      </section>
\
      <section className="w-full bg-[#E9E1D8] py-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-10">
          <motion.div 
            className="text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="font-semibold font-cormorant text-4xl lg:text-5xl tracking-[0.2em] uppercase text-gray-900">
              Tarot of The day
            </h2>
            <p className="font-light italic text-gray-600 mt-4 text-lg">
              Good Morning, sir. Do you wanna know what is gonna be today?
            </p>
          </motion.div>

          <motion.div 
            className="w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          >
            <CardOftheday isflipped={isflipped} dailyCard={dailyCard} hdlTarotOftheday={hdlTarotOftheday} />
          </motion.div>
        </div>
      </section>
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <motion.div 
          className="text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <h2 className="font-bold font-cormorant text-4xl lg:text-5xl mb-6 text-gray-900">
            ทำไมต้องเรียนรู้กับ <span className="text-[#B59F84]">BigBen</span>
          </h2>
          <p className="font-light text-gray-500 text-lg lg:text-xl max-w-2xl mx-auto">
            เปลี่ยนประสบการณ์การเรียนรู้แบบเดิมที่ต้องท่องจำ ให้กลายเป็นการทำความเข้าใจอย่างลึกซึ้ง...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            { id: "I", title: "AI วิเคราะห์ตามบริบท", desc: "BigBen ไม่ได้แค่สุ่มคำทำนาย แต่จะอ่านไพ่ตามคำถามและตำแหน่งที่คุณกำหนด ช่วยให้คุณเข้าใจความเชื่อมโยงอย่างแท้จริง" },
            { id: "II", title: "บันทึกและทบทวน", desc: "เก็บทุกคำทำนายไว้ใน Journal ส่วนตัว เพื่อติดตามผลลัพธ์และทบทวนเส้นทางชีวิตของคุณในภายหลัง" },
            { id: "III", title: "เรียนรู้ผ่านการปฏิบัติ", desc: "ไม่ต้องจำคีย์เวิร์ดตายตัว ระบบจะสอนคุณให้เชื่อมโยงสัญลักษณ์บนไพ่กับสถานการณ์จริงอย่างเป็นธรรมชาติ" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center p-10 rounded-[2rem] bg-white border border-gray-100 hover:border-[#B59F84]/30 hover:shadow-2xl hover:shadow-[#B59F84]/5 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-full border border-[#B59F84]/30 flex items-center justify-center mb-8 group-hover:bg-[#B59F84] transition-colors duration-500">
                <span className="font-cormorant text-2xl font-bold text-[#B59F84] group-hover:text-white">{item.id}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h3>
              <p className="font-light text-gray-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#F4F1EA] py-24">
        <motion.div 
          className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-cormorant tracking-widest uppercase text-gray-900">
            Discover <span className="italic text-[#B59F84]">More</span>
          </h2>
          <p className="font-light text-gray-600 text-lg">
            หากมีคำถามในใจ หรืออยากเจาะลึกความหมายให้มากกว่าเดิม
          </p>
          <button className="mt-6 px-12 py-4 rounded-full bg-gray-900 text-white font-light tracking-widest uppercase text-sm hover:bg-[#B59F84] hover:scale-105 duration-500 transition-all shadow-xl">
            เริ่มเปิดไพ่กับ BigBen
          </button>
        </motion.div>
      </section>

    </div>
  );
}
export default Home
//   return (
//     <div className='w-full h-full  flex flex-col gap-4 pt-27 '>
//       <div className="w-full mx-auto h-full flex flex-col">
//         <section className="w-355 mx-auto">
//           <div className="flex mx-auto">
//             <div className="z-10 w-full max-w-7xl mx-auto py-60 px-6 flex flex-col flex-1 items-start gap-4">
//               <div className="flex gap-2 flex-col">
//                 <p className="font-bold font-cormorant text-6xl tracking-wider">Intuition Meets Intelligence</p>
//                 <p className="font-light font-cormorant text-2xl">Stop memorizing. Start connecting. Our sophisticated AI interprets the cards through the lens of your unique journey, in real-time.</p>
//               </div>
//               <div className="flex gap-4">
//                 <button className="border btn-ghost btn">Start Your Reading</button>
//                 <button className="border btn-ghost btn">Explore the Cards</button>
//               </div>
//             </div>
//             <div className="flex-1 relative ">
//               <img className=" rounded-l-[100px] h-full w-full object-cover shadow-2xl overflow-hidden transition-transform duration-1000 hover:scale-110" src="https://images.unsplash.com/photo-1770836141377-3ac59bd071a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
//             </div>
//           </div>
//         </section>
//         <section className="w-full bg-primary mx-auto">
//           <div className='flex w-full items-center justify-center h-full rounded-2xl border-primary flex-col gap-10'>
//             <div className="flex flex-col items-center mt-25">
//               <p className="font-semibold font-cormorant text-4xl px-4 tracking-[0.2em] uppercase ">Tarot of The day</p>
//               <p className="font-light italic opacity-70 mt-2">Good Morning , sir do you wanna know what is gonna be today ?</p>
//             </div>
//             <div className=" flex flex-col gap-2 items-center">
//               {/* <button className=" btn btn-ghost">Click</button> */}
//                 <CardOftheday isflipped={isflipped} dailyCard={dailyCard} hdlTarotOftheday={hdlTarotOftheday} />
              
//             </div>
//           </div>
//         </section>
//         <section className='border-primary py-32'>
//           <div className="flex w-full h-full flex-col gap-20">
//             <div className="text-center mb-20 ">
//               <h2 className="font-bold font-cormorant text-5xl mb-4">
//                 ทำไมต้องเรียนรู้กับ <span className="text-primary">BigBen</span>
//               </h2>
//               <p className="font-light text-gray-500 text-xl">
//                 เปลี่ยนประสบการณ์การเรียนรู้แบบเดิมที่ต้องท่องจำ ให้กลายเป็นการทำความเข้าใจอย่างลึกซึ้ง...
//               </p>
//             </div>
//             <div className=' flex w-full justify-around'>
//               <div className="flex-1 ">
//                 <motion.div className="flex flexcol justify-center">
//                   <div className="w-1/2">
//                     <h3 className="text-2xl font-bold mb-3">AI วิเคราะห์ตามบริบท</h3>
//                     <p className="font-light text-gray-600 leading-relaxed">
//                       BigBen ไม่ได้แค่สุ่มคำทำนาย แต่จะอ่านไพ่ตามคำถามและตำแหน่งที่คุณกำหนด
//                       ช่วยให้คุณเข้าใจความเชื่อมโยงอย่างแท้จริง
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>
//               <div className="flex-1">
//                 <motion.div className="flex flexcol justify-center">
//                   <div className="w-1/2">
//                     <h3 className="text-2xl font-bold mb-3">AI วิเคราะห์ตามบริบท</h3>
//                     <p className="font-light text-gray-600 leading-relaxed">
//                       BigBen ไม่ได้แค่สุ่มคำทำนาย แต่จะอ่านไพ่ตามคำถามและตำแหน่งที่คุณกำหนด
//                       ช่วยให้คุณเข้าใจความเชื่อมโยงอย่างแท้จริง
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>
//               <div className="flex-1">
//                 <motion.div className="flex flexcol justify-center">
//                   <div className="w-1/2">
//                     <h3 className="text-2xl font-bold mb-3">AI วิเคราะห์ตามบริบท</h3>
//                     <p className="font-light text-gray-600 leading-relaxed">
//                       BigBen ไม่ได้แค่สุ่มคำทำนาย แต่จะอ่านไพ่ตามคำถามและตำแหน่งที่คุณกำหนด
//                       ช่วยให้คุณเข้าใจความเชื่อมโยงอย่างแท้จริง
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="py-24 bg-gray-50">
//           <div className='flex w-full h-full justify-center items-center rounded-2xl flex-col gap-8 '>
//             <p className="text-4xl font-bold font-cinzel tracking-wider">discovery reading more</p>
//             <p className="font-light text-gray-500 text-xl">หากท่านมีคำถามในใจหรืออยากเจาะลึกความหมายให้มากกว่าเดิม</p>
//             <button className="px-10 py-4 rounded-full bg-secondary text-white hover:bg-primary duration-300 transition-colors">เริ่มเปิดไพ่กับ BigBen</button>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }

