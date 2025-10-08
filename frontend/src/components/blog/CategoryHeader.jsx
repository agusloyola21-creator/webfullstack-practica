import React, { useRef, useEffect, useState } from 'react';

import { NavLink, useNavigate, useLocation } from "react-router-dom";


const CategoryHeader = ({ categories }) => {
    const location = useLocation()

    // Referencia al input
    const inputRef = useRef(null);

    useEffect(() => {
        const searchInput = inputRef.current;
        if (!searchInput) return

        const searchContainer = searchInput.parentElement;
        const searchIcon = searchContainer.querySelector('svg');

        // Funciones para focus y blur
        const handleFocus = () => {
            searchContainer.classList.add('w-64', 'bg-white');
            searchContainer.classList.remove('w-48');

            searchIcon.classList.add('text-color_logo');
            searchIcon.classList.remove('text-gray-400');
        };

        const handleBlur = () => {
            searchContainer.classList.add('w-48');
            searchContainer.classList.remove('w-64', 'bg-white');

            searchIcon.classList.add('text-gray-400');
            searchIcon.classList.remove('text-color_logo');
        };

        // Añadir event listeners

        searchInput.addEventListener('focus', handleFocus);
        searchInput.addEventListener('blur', handleBlur);

        // Limpieza
        return () => {
            searchInput.removeEventListener('focus', handleFocus);
            searchInput.removeEventListener('blur', handleBlur);
        };
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchTerm.trim()) {
            // Redirige a la ruta con query param o path param
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            // También podrías usar: 
            // navigate(`/search/${searchTerm}`);
        }
    };
    const classNavLink = ({ isActive }) => `text-lg inline-flex mx-4 text-sm font-medium leading-6 text-gray-900 ${isActive ? 'underline_custom' : "relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:bg-color_logo "} `
    return (
        <div className="w-full flex justify-between mb-[80px]">
            {/* List Categories */}
            <div className="w-full overflow-x-auto">
                <div className="flex space-x-10 px-4 py-2 whitespace-nowrap">
                    <NavLink to="/Blog" className={`${location.pathname}` === '/Blog' ? "bg-transparent text-color_logo underline_custom" : "bg-transparent text-black relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:bg-color_logo"}>All</NavLink>
                    {categories && categories.map((category, index) => (
                        <NavLink to={`/by_category/${category.slug}`} key={index} className={`${location.pathname}` === `/by_category/${category.slug}` ?
                            "bg-transparent text-color_logo underline_custom" :
                            "bg-transparent text-black relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:bg-color_logo"}>{category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {/* Search bar */}
            <form onSubmit={handleSearch} id="input-reset" className="relative w-48 transition-all duration-300">
                <input
                    type="text"
                    placeholder="Search..."
                    id="searchInput"
                    ref={inputRef}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border
                    rounded-full outline-none transition-all border-gray-300"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-400 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </form>

        </div>
    )
}

export default CategoryHeader