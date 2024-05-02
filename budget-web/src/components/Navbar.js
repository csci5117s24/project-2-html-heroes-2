// https://tailwindcomponents.com/component/responsive-tailwind-css-navbar-2
import React, { useEffect, useState } from 'react';

function Navbar() {
    const [user1, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu() {
        console.log('toggleMenu');
        setShowMenu(!showMenu);
    }

    async function fetchAuthDetails() {
        fetch('/.auth/me')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data != null) {
                    setUser(data?.clientPrincipal.userId);
                }
            })
            .catch(function (err) {
                console.error('Error fetching auth details:', err);
            });
    }

    useEffect(() => {
        fetchAuthDetails();
    }, [user1]);


    return (
        <header className="bg-gray-800">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-white font-bold text-xl">
                        <img src={"/logo.png"} alt="logo" className="w-10 h-10 mr-3" />
                        <a href="/">Budget Tracker</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            { user1 ?
                                <>
                                    <li><a href="/dashboard1" className="text-white">Dashboard</a></li>
                                    <li><a href="/adv-summary" className="text-white">Advanced Spending Summary</a></li>
                                    <li><a href="/.auth/logout" className="text-white">Log out</a></li>
                                </>
                                :
                                <>
                                    <li><a href="/.auth/login/github" className="text-white">Log in</a></li>
                                </>
                            }
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="outline-none mobile-menu-button">
                            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {showMenu &&
                    <div className="md:hidden">
                        <ul className="mt-4 space-y-4">
                            { user1 ?
                                <>
                                    <li><a href="/dashboard1" className="block px-4 py-2 text-white bg-gray-900 rounded">Dashboard</a></li>
                                    <li><a href="/adv-summary" className="block px-4 py-2 text-white bg-gray-900 rounded">Advanced Spending Summary</a></li>
                                    <li><a href="/.auth/logout" className="block px-4 py-2 text-white bg-gray-900 rounded">Log out</a></li>
                                </>
                                :
                                <>
                                    <li><a href="/.auth/login/github" className="block px-4 py-2 text-white bg-gray-900 rounded">Log in</a></li>
                                </>
                            }
                        </ul>
                    </div>
                }
            </nav>
        </header>

    )
}

export default Navbar;