import React from 'react'

function Home() {
  return (
    <div className='min-w-full flex h-200vh flex-col gap-4'>
      <div className='flex w-full justify-center h-full border rounded-2xl border-primary items-center flex-col gap-4'>
        <div>
          <p>Tarot AI that understands you</p>
          <p>เลิกท่องทำแล้วตีความตามความจริง</p>
        </div>
        <button>เข้าสู่ระบบ</button>
      </div>
      <div className='flex w-full items-center justify-center h-full border rounded-2xl border-primary flex-col gap-10'>
        <p>Tarot of The day</p>
        <p>Text + Card</p>
      </div>
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
  )
}

export default Home