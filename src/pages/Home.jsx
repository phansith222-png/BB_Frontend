import Bglandingpage from "../assets/bglandingpage.jpg"

function Home() {
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
            <div className="flex-1 relative">
              <img className=" rounded-l-[100px] h-full w-full object-cover overflow-hidden transition-transform duration-1000 hover:scale-110" src="https://images.unsplash.com/photo-1770836141377-3ac59bd071a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
          </div>
        </section>
        <section className="w-full bg-primary mx-auto">
          <div className='flex w-full items-center justify-center h-full rounded-2xl border-primary flex-col gap-10'>
            <div className="flex flex-col items-center mt-25">
              <p className="font-semibold font-cormorant text-4xl px-4 tracking-[0.2em] uppercase ">Tarot of The day</p>
              <p className="font-light italic opacity-70 mt-2">Good Morning , sir do you wanna know what is gonna be today ?</p>
            </div>
            <div className=" flex flex-col gap-2">
              {/* <button className=" btn btn-ghost">Click</button> */}
              <div className="hover-3d">
                <figure className="w-60">
                  <img src="https://www.sacred-texts.com/tarot/pkt/img/ar03.jpg" alt="" />
                </figure>
              </div>
            </div>
            <div className="flex gap-2">
              <p>ความอุดมสมบูรณ์</p>
              <p>ธรรมชาติ</p>
              <p>ความเป็นแม่</p>
            </div>
            <div>
              <p>AI Text</p>
            </div>
          </div>
        </section>
        <div className='flex w-full h-full justify-center items-center border rounded-2xl border-primary flex-col gap-20'>
          <div>
            <p>ทำไมต้องเรียนรู้กับ BigBen</p>
          </div>
          <div className=' flex w-full justify-around'>
            <div>
              <p>content 1</p>
            </div>
            <div>
              <p>content 2</p>
            </div>
            <div>
              <p>content 3</p>
            </div>
          </div>
        </div>
        <div className='flex w-full h-full justify-center items-center border rounded-2xl border-primary flex-col '>
          <p>discovery reading more</p>
          <p>หากท่านมีคำถามในใจหรืออยากเจาะลึกความหมายให้มากกว่าเดิม</p>
          <button>เริ่มเปิดไพ่กับ BigBen</button>
        </div>
      </div>
    </div>
  )
}

export default Home