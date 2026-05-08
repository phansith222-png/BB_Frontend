import { create } from "zustand";
import { aiInterpret, cutCard, getAllSpread, getSpreadIdApi, initialRead, pickCard, shuffleCard } from "../api/mainapi";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-toastify";


const useReadStore = create(persist((set, get) => ({
    readingId: null,
    isReversed: false,
    step: "QUESTION",
    deckOrder: [],
    spread: null,
    allSpread: null,
    card: [],
    aiReading: null,
    aiError: false,
    lastAiPayload: null,
    isLoading: false,
    isflipped: false,
    isDaily: false,
    dailyDeckOrder: [],
    dailyCard: {},
    dailyIsreversed: false,
    dailyAi: null,
    dailyAiError: false,
    dailyAiPayload: null,
    lastDrawnDate: null,
    setReadingId: (readingId) => set({ readingId: readingId }),
    setStep: (newStep) => {
        const reset = newStep === "QUESTION"
            ? { aiReading: null, aiError: false, lastAiPayload: null, card: [] }
            : {};
        set({ step: newStep, ...reset });
    },
    setReversed: (value) => set({ isReversed: value }),
    checkDailyReset: () => {
        const today = new Date().toDateString();
        if (get().lastDrawnDate !== today) {
            set({
                dailyCard: {},
                dailyIsreversed: false,
                dailyAi: null,
                dailyAiError: false,
                dailyAiPayload: null,
                isflipped: false,
                lastDrawnDate: null,
                isDaily: false
            });
        }
    },
    clearDaily: () => {
        set({
            dailyCard: {},
            dailyIsreversed: false,
            dailyAi: null,
            dailyAiError: false,
            dailyAiPayload: null,
            isflipped: false,
            lastDrawnDate: null,
            isDaily: false
        });
    },
    startReading: async (body) => {
        set({ isLoading: true })
        try {
            const resp = await initialRead(body)
            set({ readingId: resp.data.readingId })
            return resp
        } finally {
            set({ isLoading: false })
        }
    },
    shuffleCard: async (body) => {
        set({ isLoading: true })
        try {
            const resp = await shuffleCard(body)
            set({ deckOrder: resp.data.deckOrder })
            return resp
        } finally {
            set({ isLoading: false })
        }
    },
    cutCard: async (body) => {
        set({ isLoading: true })
        try {
            const resp = await cutCard(body)
            set({ deckOrder: resp.data.deckOrder })
            return resp
        } finally {
            set({ isLoading: false })
        }
    },
    getAllSpread: async () => {
        set({ isLoading: true })
        try {
            const resp = await getAllSpread()
            console.log(resp)
            set({ allSpread: resp.data.data })
            return resp
        } finally {
            set({ isLoading: false })
        }
    },
    getSpreadId: async (id) => {
        set({ isLoading: true })
        try {
            const resp = await getSpreadIdApi(id)
            set({ spread: resp.data.data || resp.data })
            return resp
        } finally {
            set({ isLoading: false })
        }
    },
    pickCard: async (body) => {
        set({ isLoading: true })
        try {
            const resp = await pickCard(body)
            set({ card: resp.data.card })
            return resp
        } finally {
            set({ isLoading: false })
        }
    },
    aiInterpret: async (body) => {
        set({ isLoading: true, lastAiPayload: body })
        try {
            const resp = await aiInterpret(body)
            set({ aiReading: resp.data, aiError: false })
            return resp
        } catch (error) {
            set({ aiError: true })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    regenerateInterpret: async () => {
        const body = get().lastAiPayload;
        set({ isLoading: true })
        try {
            const resp = await aiInterpret(body)
            set({ aiReading: resp.data, aiError: false })
        } catch {
            set({ aiError: true })
        } finally {
            set({ isLoading: false })
        }
    },
    regenerateDailyAi: async () => {
        const body = get().dailyAiPayload;
        set({ isLoading: true })
        try {
            const resp = await aiInterpret(body)
            set({ dailyAi: resp.data.data, dailyAiError: false })
        } catch {
            set({ dailyAiError: true })
        } finally {
            set({ isLoading: false })
        }
    },
    tarotOftheday: async () => {
        const today = new Date().toDateString();
        if (get().isLoading) {
            console.log("กำลังโหลดไพ่... ห้ามกดซ้ำ!");
            return;
        }
        if (get().lastDrawnDate === today && get().isDaily === true) {
            return;
        }
        set({ isLoading: true })
        try {
            const initResp = await initialRead({
                spreadId: 1,
                question: "ไพ่ประจำวันของฉันวันนี้คืออะไร?",
                isDaily: true
            });
            let rId;
            if (initResp.data?.isAlreadyDrawn) {
                const oldReading = initResp.data.data;
                console.log('oldReading', oldReading)
                const savedCardInfo = oldReading?.deckOrder?.[0];
                console.log('initResp', initResp)
                if (savedCardInfo) {
                    const pickResp = await pickCard({
                        readingId: oldReading.id,
                        selectId: [{
                            id: savedCardInfo.id,
                            isReversed: savedCardInfo.isReversed
                        }]
                    });
                    console.log('pickResp', pickResp)
                    set({
                        dailyCard: pickResp.data.card,
                        dailyIsreversed: savedCardInfo.isReversed,
                        dailyAi: oldReading.aiInterpretation,
                        isDaily: true,
                        isflipped: true,
                        lastDrawnDate: today
                    });
                    return;
                }
                rId = oldReading.id;
            } else {
                rId = initResp.data.data.readingId;
            }
            const shuffleResp = await shuffleCard({
                readingId: rId,
                times: Math.floor(Math.random() * 100) + 1,
                allowReversed: true
            });
            const currentDeck = shuffleResp.data.deckOrder;
            const randomPos = Math.floor(Math.random() * 78) + 1;
            const cutResp = await cutCard({
                readingId: rId,
                position: randomPos
            });
            const finalDeck = cutResp.data.deckOrder;
            const pickResp = await pickCard({
                readingId: rId,
                selectId: [finalDeck[0]]
            });
            const cardData = pickResp.data.card
            const isReversedStatus = finalDeck[0].isReversed
            set({ dailyCard: cardData, dailyIsreversed: isReversedStatus })

            const aiPayload = {
                readingId: rId,
                spreadType: "TarotOfTheDay",
                question: "ไพ่ประจำวันของฉันวันนี้คืออะไร?",
                card: cardData,
            };
            try {
                const aiReadingDaily = await aiInterpret(aiPayload);
                console.log(aiReadingDaily.data.data)
                set({ dailyAi: aiReadingDaily.data.data, dailyAiError: false })
            } catch {
                set({ dailyAiError: true, dailyAiPayload: aiPayload })
            }

            set({ isDaily: true, isflipped: true, lastDrawnDate: today, isLoading: false })
        } catch (error) {
            set({ isLoading: false });
            const errorMessage = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            toast.error(errorMessage);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }
}), {
    name: "tarot-daily-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        dailyCard: state.dailyCard,
        dailyIsreversed: state.dailyIsreversed,
        dailyAi: state.dailyAi,
        dailyAiError: state.dailyAiError,
        dailyAiPayload: state.dailyAiPayload,
        isflipped: state.isflipped,
        lastDrawnDate: state.lastDrawnDate,
        isDaily: state.isDaily
    }),
}))

export default useReadStore
