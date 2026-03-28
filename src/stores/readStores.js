import { create } from "zustand";
import { aiInterpret, cutCard, initialRead, pickCard, shuffleCard } from "../api/mainapi";


const useReadStore = create((set, get) => ({
    readingId: null,
    deckOrder: [],
    card: [],
    aiReading: null,
    isLoading: false,
    isflipped: false,
    isDaily: false,
    dailyCard: {},
    dailyIsreversed:false,
    dailyAi:null,
    startReading: async (body) => {
        const resp = await initialRead(body)
        set({ readingId: resp.data.readingId })
        return resp
    },
    shuffleCard: async (body) => {
        const resp = await shuffleCard(body)
        set({ deckOrder: resp.data.deckOrder })
        return resp
    },
    cutCard: async (body) => {
        const resp = await cutCard(body)
        set({ deckOrder: resp.data.deckOrder })
        return resp
    },
    pickCard: async (body) => {
        const resp = await pickCard(body)
        set({ card: resp.data.card })
        return resp
    },
    aiInterpret: async (body) => {
        const resp = await aiInterpret(body)
        set({ aiInterpret: resp.data })
        return resp
    },
    tarotOftheday: async () => {
        console.log(get().isDaily)
        set({ isLoading: true })
        try {
            const initResp = await initialRead({
                spreadId: 1,
                question: "ไพ่ประจำวันของฉันวันนี้คืออะไร?",
                isDaily: get().isDaily
            });
            const rId = initResp.data.data.readingId
            const shuffleResp = await shuffleCard({
                readingId: rId,
                times: Math.floor(Math.random() * 100) + 1,
                allowReversed: true
            });
            // console.log('shuffleResp', shuffleResp)
            const currentDeck = shuffleResp.data.deckOrder;
            // console.log('currentDeck', currentDeck)
            const randomPos = Math.floor(Math.random() * 78) + 1;
            await cutCard({
                readingId: rId,
                position: randomPos
            });
            const pickResp = await pickCard({
                readingId: rId,
                selectId: [currentDeck[0]]
            });
            // console.log('pickResp', pickResp.data.card)
            const cardData = pickResp.data.card
            const isReversedStatus = currentDeck[0].isReversed
            // console.log(typeof(isReversedStatus))
            set({ dailyCard: cardData,dailyIsreversed:isReversedStatus})
            const aiReadingDaily = await aiInterpret({
                readingId: rId,
                spreadType: "TarotOfTheDay",
                question: "ไพ่ประจำวันของฉันวันนี้คืออะไร?",
                card: cardData,
            });
            console.log(aiReadingDaily.data.data)
            set({dailyAi:aiReadingDaily.data.data})
            set({isDaily: true})
            set({ isLoading: false, isflipped: true })
        } catch (error) {
            set({ isLoading: false });
            console.error("Sequence Error:", error);
            throw error;
        }
    }
}))

export default useReadStore