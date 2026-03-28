import { Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-7xl px-6 w-full '>
                        {filteredCards.map((e) => (
                            <TarotCard
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                img_url={e.img_url}
                                reverse_Mean={e.reverse_Mean}
                                upright_Mean={e.upright_Mean}
                            />
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Library