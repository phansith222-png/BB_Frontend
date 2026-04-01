import { Sparkles, Mail } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { Instagram, LinkIn } from '../icons'

function Footer() {
    return (
        <div className="w-full bg-[#FAF8F5] pt-16 pb-8 px-6 border-t border-[#E9E1D8] font-sans mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">

                {/* ส่วนบน: แบรนด์ และ เมนูนำทาง */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                    {/* โลโก้และคำโปรย */}
                    <div className="flex flex-col gap-3">
                        <h2 className="font-cormorant text-3xl font-bold text-gray-900 tracking-widest flex items-center gap-2 uppercase">
                            <Sparkles className="text-[#B59F84]" size={20} />
                            Bigbode
                        </h2>
                        <p className="font-light text-gray-500 text-sm max-w-xs leading-relaxed">
                            Guided by the stars, interpreted by BigBen. Your personal AI tarot reader.
                        </p>
                    </div>

                    {/* เมนูลัด (Quick Links) */}
                    <div className="flex flex-wrap gap-6 md:gap-10 text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
                        <Link to="/" className="hover:text-[#B59F84] transition-colors duration-300">Home</Link>
                        <Link to="/reading" className="hover:text-[#B59F84] transition-colors duration-300">Reading</Link>
                        <Link to="/journal" className="hover:text-[#B59F84] transition-colors duration-300">Journal</Link>
                        <Link to="/profile" className="hover:text-[#B59F84] transition-colors duration-300">Profile</Link>
                    </div>
                </div>

                {/* เส้นคั่น */}
                <div className="w-full h-px bg-[#E9E1D8]/80"></div>

                {/* ส่วนล่าง: ลิขสิทธิ์ และ โซเชียลมีเดีย */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs font-light text-gray-400 tracking-wider">
                    <p>© 2026 Bigbode. All rights reserved.</p>

                    {/* ไอคอนโซเชียล */}
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-[#B59F84] hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                            <Instagram className="w-[18px] h-[18px]"/>
                        </a>
                        <a href="#" className="hover:text-[#B59F84] hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                            <LinkIn className="w-[30px] h-[30px]"/>
                        </a>
                        <a href="#" className="hover:text-[#B59F84] hover:-translate-y-1 transition-all duration-300" aria-label="Email">
                            <Mail size={18} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer