import { Search, X, Inbox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TarotCard from '../components/TarotCard'
import useCardStore from '../stores/cardStores'

function Library() {
    const getCards = useCardStore(state => state.getCard)
    const cards = useCardStore(state => state.card)

    const [searchbar, setSearchbar] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        getCards()
    }, [])
    // console.log('searchbar', searchbar)


    const handleSearchChange = (e) => {

        setSearchbar(e.target.value)
    }
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    const clearCategory = () => {
        setSelectedCategory("");
    };

    const filteredCards = cards.filter((card) => {
        const matchesSearch = card.name.toLowerCase().includes(searchbar.toLowerCase())
        let matchesCategory = true;
        if (selectedCategory !== "") {
            if (selectedCategory === "MAJOR") {
                matchesCategory = card.type === "MAJOR"
            } else {
                matchesCategory = card.suit === selectedCategory
            }
        }
        return matchesSearch && matchesCategory
    })
    const cardAnimation = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
    };
    const clearSearch = () => {
        setSearchbar("");
    }
    const getCategoryLabel = (cat) => {
        switch (cat) {
            case "MAJOR": return "Major Arcana";
            case "WANDS": return "Suit of Wands";
            case "CUPS": return "Suit of Cups";
            case "SWORDS": return "Suit of Swords";
            case "PENTACLES": return "Suit of Pentacles";
            default: return "";
        }
    };
    return (
        <div className='pt-30 min-h-screen w-full'>
            <div className=' flex flex-col justify-center w-full items-center'>
                <div className='flex flex-col w-full max-w-5xl'>
                    <div className="flex flex-col md:flex-row gap-2 items-stretch ">
                        <div className="relative flex-2 ">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchbar}
                                onChange={handleSearchChange}
                                className="block w-full pl-10 pr-3 py-2.5  border border-gray-200 rounded-md bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Search by name, keyword, or suit.."
                            />
                            {searchbar && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <div className="relative flex-1 min-w-[180px]">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="block w-full px-3 py-2.5 border border-gray-200 rounded-md bg-white text-sm text-gray-600 appearance-none focus:outline-none cursor-pointer">
                                <option value="">All Categories</option>
                                <option value="MAJOR">Major Arcana</option>
                                <option value="WANDS">Suit of Wands</option>
                                <option value="CUPS">Suit of Cups</option>
                                <option value="PENTACLES">Suit of Pentacles</option>
                                <option value="SWORDS">Suit of Swords</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {selectedCategory && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            <div className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded text-xs text-gray-500">
                                <span>{getCategoryLabel(selectedCategory)}</span>
                                <button onClick={clearCategory} className="hover:text-red-500 transition-colors focus:outline-none">
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex justify-center'>
                    <motion.div layout className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl w-full '>
                        <AnimatePresence mode="popLayout">
                            {filteredCards.length > 0 ? (
                                
                                    filteredCards.map((e) => (
                                        <motion.div
                                            layout key={e.id} variants={cardAnimation} initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="w-full">
                                            <TarotCard
                                                key={e.id}
                                                id={e.id}
                                                name={e.name}
                                                img_url={e.img_url}
                                                reverse_Mean={e.reverse_Mean}
                                                upright_Mean={e.upright_Mean}
                                            />
                                        </motion.div>
                                    ))
                                
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                        <Inbox className="h-10 w-10 text-gray-400" />
                                    </div>
                                    <h3 className="font-cormorant text-3xl font-bold text-gray-800 mb-2">No cards found</h3>
                                    <p className="text-gray-500 font-light">
                                        We couldn't find any cards matching "{searchbar}".
                                    </p>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Library