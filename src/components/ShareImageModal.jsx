import { useEffect, useState, useRef } from 'react'
import { Download, Share2, X } from 'lucide-react'
import { shareReadingImage } from '../api/mainapi'

const ERROR_MESSAGES = {
  400: 'กรุณาทำการดูดวงให้เสร็จสมบูรณ์ก่อนแชร์',
  404: 'ไม่พบข้อมูลการดูดวงนี้',
  503: 'ไม่สามารถสร้างรูปภาพได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง',
}

export default function ShareImageModal({ readingId, isOpen, onClose }) {
  const [mode, setMode] = useState('feed')
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const objectUrlRef = useRef(null)

  useEffect(() => {
    const dialog = document.getElementById('share-image-modal')
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !readingId) return

    let cancelled = false

    const fetchImage = async () => {
      setIsLoading(true)
      setError(null)

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
        setImageUrl(null)
      }

      try {
        const resp = await shareReadingImage(readingId, mode)
        if (cancelled) return
        const url = URL.createObjectURL(resp.data)
        objectUrlRef.current = url
        setImageUrl(url)
      } catch (err) {
        if (cancelled) return
        const status = err?.response?.status
        setError(ERROR_MESSAGES[status] ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchImage()

    return () => { cancelled = true }
  }, [isOpen, mode, readingId])

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  const handleDownload = () => {
    if (!imageUrl) return
    const a = document.createElement('a')
    a.href = imageUrl
    a.download = 'bigbode-reading.png'
    a.click()
  }

  const handleNativeShare = async () => {
    if (!imageUrl || !navigator.canShare) return
    try {
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      const file = new File([blob], 'bigbode-reading.png', { type: 'image/png' })
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] })
      }
    } catch (err) {
      console.error('Share failed', err)
    }
  }

  return (
    <dialog id="share-image-modal" className="modal">
      <div className="modal-box rounded-3xl p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-cinzel text-xl font-bold text-base-content">แชร์การดูดวง</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 mb-5">
          {['feed', 'story'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${
                mode === m
                  ? 'bg-[#B59F84] text-white shadow-md'
                  : 'bg-base-200 text-base-content/60 hover:bg-base-300'
              }`}
            >
              {m === 'feed' ? 'Feed (1:1)' : 'Story (9:16)'}
            </button>
          ))}
        </div>

        <div
          className={`w-full rounded-2xl overflow-hidden bg-base-200 flex items-center justify-center mb-5 ${
            mode === 'feed' ? 'aspect-square' : 'aspect-[9/16]'
          }`}
        >
          {isLoading && (
            <div className="flex flex-col items-center gap-3 opacity-60">
              <span className="loading loading-ring loading-lg text-primary"></span>
              <p className="font-cormorant text-sm animate-pulse">กำลังสร้างรูปภาพ...</p>
            </div>
          )}
          {!isLoading && imageUrl && (
            <img src={imageUrl} alt="BigBode reading share" className="w-full h-full object-cover" />
          )}
          {!isLoading && error && (
            <p className="text-error text-sm text-center px-4 font-cormorant">{error}</p>
          )}
        </div>

        {imageUrl && !isLoading && (
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 py-3 bg-[#B59F84] text-white rounded-full font-bold hover:bg-[#a08a70] shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} />
              ดาวน์โหลด
            </button>
            {navigator.canShare && (
              <button
                onClick={handleNativeShare}
                className="flex-1 py-3 bg-base-200 text-base-content rounded-full font-bold hover:bg-base-300 transition-all flex items-center justify-center gap-2"
              >
                <Share2 size={16} />
                แชร์
              </button>
            )}
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}
