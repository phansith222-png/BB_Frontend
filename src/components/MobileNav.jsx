import { NavLink, useLocation } from "react-router"
import { motion } from "framer-motion"
import { Home, Star, BookOpen } from "lucide-react"

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/reading", icon: Star, label: "Reading" },
  { to: "/library", icon: BookOpen, label: "Library" },
]

function MobileNav() {
  const location = useLocation()

  const activeIndex = tabs.findLastIndex(tab =>
    tab.to === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(tab.to)
  )

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-primary/30 flex items-stretch justify-around h-16"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((tab, index) => {
        const Icon = tab.icon
        const isActive = index === activeIndex
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === "/"}
            className="relative flex flex-col items-center justify-center gap-0.5 flex-1"
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              size={20}
              className={`transition-colors duration-200 ${isActive ? "text-accent" : "text-base-content/40"}`}
            />
            <span
              className={`text-[10px] font-cormorant font-bold tracking-widest uppercase transition-colors duration-200 ${isActive ? "text-accent" : "text-base-content/40"}`}
            >
              {tab.label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export default MobileNav
