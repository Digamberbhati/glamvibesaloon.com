import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setIsDropdownOpen(false)
    setActiveDropdown(null)
  }, [location])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const toggleNestedDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const navLinks = [
    { to: "/", text: "Home", current: true },
    { to: "/pricing", text: "Pricing" },
    { to: "/contact", text: "Contact" }
  ]

  const dropdownItems = [
    { text: "Men", isNested: true, items: [
      { to: "/men/haircuts", text: "Haircuts" },
      { to: "/men/styling", text: "Styling" },
      { to: "/men/coloring", text: "Coloring" }
    ]},
    { text: "Women", isNested: true, items: [
      { to: "/women/haircuts", text: "Haircuts" },
      { to: "/women/styling", text: "Styling" },
      { to: "/women/coloring", text: "Coloring" }
    ]},
  ]

  return (
    <nav className="bg-transparent backdrop-blur-sm fixed w-full top-0 z-50 border-gray-200">
      <div className="max-w-screen-xl flex flex-row-reverse sm:flex-row flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">GLANVIBESALOON</span>
        </Link>
        
        <button 
          onClick={toggleMenu} 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 text-white justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200" 
          aria-controls="navbar-multi-level" 
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
        
        <div className={`
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed top-0 left-0 z-40 w-full h-screen p-4 overflow-y-auto transition-transform bg-custom-primary
          md:w-auto md:relative md:translate-x-0 md:h-auto md:bg-transparent md:p-0 md:overflow-visible
        `} id="navbar-multi-level">
          <button 
            onClick={toggleMenu} 
            type="button" 
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center md:hidden"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            {navLinks.map((link, index) => (
              <li key={index} className={`${index === 0 ? 'md:order-1' : ''} ${index === 1 ? 'md:order-3' : ''} ${index === navLinks.length - 1 ? 'md:order-4' : ''}`}>
                <Link 
                  to={link.to} 
                  className={`block py-2 px-3 ${link.current ? 'text-white' : 'text-gray-300 hover:text-white'} rounded md:bg-transparent md:p-0`} 
                  aria-current={link.current ? "page" : undefined}
                >
                  {link.text}
                </Link>
              </li>
            ))}

            <li className="relative md:order-2 order-last">
              <button 
                onClick={toggleDropdown} 
                className="flex items-center justify-between w-full py-2 px-3 text-gray-300 hover:text-white md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
              >
                Services 
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              {/* Dropdown menu */}
              <div className={`${isDropdownOpen ? 'block' : 'hidden'} absolute z-50 font-normal bg-custom-accent divide-y divide-gray-100 rounded-lg shadow w-44 md:left-0`}>
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                  {dropdownItems.map((item, index) => (
                    <li key={index}>
                      {item.isNested ? (
                        <>
                          <button 
                            onClick={() => toggleNestedDropdown(index)} 
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
                          >
                            {item.text}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                          </button>
                          <div className={`${activeDropdown === index ? 'block' : 'hidden'} absolute left-full top-0 z-50 bg-custom-accent divide-y divide-gray-100 rounded-lg shadow w-44`}>
                            <ul className="py-2 text-sm text-gray-700">
                              {item.items.map((nestedItem, nestedIndex) => (
                                <li key={nestedIndex}>
                                  <Link to={nestedItem.to} className="block px-4 py-2 hover:bg-gray-100">{nestedItem.text}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <Link to={item.to} className="block px-4 py-2 hover:bg-gray-100">{item.text}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar