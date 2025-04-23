import { useState, memo } from 'react';
import { Link } from 'react-router-dom';

// Memoized to prevent unnecessary re-renders
const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Home', href: '/', isRoute: true },
    { title: 'About Avenues', href: '/avenues-education', isRoute: true },
    { title: 'Avenues Schooling', href: '/avenues-schooling', isRoute: true },
    { title: 'Avenues Activities', href: '#avenuesActivities', isRoute: false },
    { title: 'Contact', href: '#contact', isRoute: false },
    { title: 'Admission', href: '/admission', isRoute: true },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="flex items-center justify-between w-full px-6 py-2">
        {/* Logo */}
        <div className="text-2xl font-bold bg-gradient-to-r from-[#4195d1] to-[#406ab4] text-transparent bg-clip-text">
          <img
            src="/logo.png"
            alt="Global School Academy"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex justify-center text-blue flex-1 space-x-8">
          {menuItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.title}
                to={item.href}
                className="text-blue transition-all duration-300 hover:-translate-y-1 inline-block"
              >
                {item.title}
              </Link>
            ) : (
              <a
                key={item.title}
                href={item.href}
                className="text-blue transition-all duration-300 hover:-translate-y-1 inline-block"
                onClick={(e) => handleScroll(e, item.href)}
              >
                {item.title}
              </a>
            )
          )}
        </div>

        {/* Admission Button - Desktop */}
        <Link to="/admission">
        <button className="hidden md:block px-6 py-2 bg-gradient-to-r from-[#00833e] via-[#6cb33f] to-[#406ab4] text-white rounded-lg shadow-md hover:opacity-90 transition-all duration-300 text-base">
          Admission
        </button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <div className="flex flex-col space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm overflow-hidden md:hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {menuItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.title}
                to={item.href}
                className="block bg-blue bg-clip-text transition-all duration-300 text-sm hover:translate-x-1"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ) : (
              <a
                key={item.title}
                href={item.href}
                className="block bg-blue bg-clip-text transition-all duration-300 text-sm hover:translate-x-1"
                onClick={(e) => handleScroll(e, item.href)}
              >
                {item.title}
              </a>
            )
          )}
          <button
            className="w-full text-left px-4 py-2 bg-gradient-to-r from-[#00833e] via-[#6cb33f] to-[#406ab4] text-white rounded-lg shadow-md hover:opacity-90 transition-all duration-300 text-sm"
          >
            Admission
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
