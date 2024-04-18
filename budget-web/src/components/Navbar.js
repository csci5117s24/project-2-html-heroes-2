// https://tailwindcomponents.com/component/responsive-tailwind-css-navbar-2
import React, { useEffect, useState } from 'react';

function Navbar() {
    const [user1, setUser] = useState(null);

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

    if (user1 === null) {

        return (
            <header class="bg-gray-800">
                <nav class="container mx-auto px-6 py-3">
                    <div class="flex items-center justify-between">
                        <div class="text-white font-bold text-xl">
                            <a href="/">Logo</a>
                        </div>
                        <div class="hidden md:block">
                            <ul class="flex items-center space-x-8">
                                <li><a href="/.auth/login/github" class="text-white">Log in</a></li>
                            </ul>
                        </div>
                        <div class="md:hidden">
                            <button class="outline-none mobile-menu-button">
                                <svg class="w-6 h-6 text-white" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="mobile-menu hidden md:hidden">
                        <ul class="mt-4 space-y-4">
                            <li><a href="/" class="block px-4 py-2 text-white bg-gray-900 rounded">Home</a></li>
                            <li><a href="/" class="block px-4 py-2 text-white bg-gray-900 rounded">About</a></li>
                            <li><a href="/" class="block px-4 py-2 text-white bg-gray-900 rounded">Services</a></li>
                            <li><a href="/" class="block px-4 py-2 text-white bg-gray-900 rounded">Contact</a></li>
                        </ul>
                    </div>

                </nav>
            </header>

        )
    } else {

        return (
            <>
                <header class="bg-gray-800">
                    <nav class="container mx-auto px-6 py-3">
                        <div class="flex items-center justify-between">
                            <div class="text-white font-bold text-xl">
                                <a href="/">Logo</a>
                            </div>
                            <div class="hidden md:block">
                                <ul class="flex items-center space-x-8">
                                    <li><a href="/" class="text-white">Dashboard</a></li>
                                    <li><a href="/" class="text-white">Advanced Spending Summary</a></li>
                                    <li><a href="/" class="text-white">Set up your budget plan</a></li>
                                    <li><a href="/.auth/logout" class="text-white">Log out</a></li>
                                </ul>
                            </div>
                            <div class="md:hidden">
                                <button class="outline-none mobile-menu-button">
                                    <svg class="w-6 h-6 text-white" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="mobile-menu hidden md:hidden">
                            <ul class="mt-4 space-y-4">
                                <li><a href="/" class="block px-4 py-2 text-white bg-gray-900 rounded">Home</a></li>
                                <li><a href="/" class="block px-4 py-2 text-white bg-gray-900 rounded">About</a></li>
                                <li><a href="/" class="block px-4 py-2 text-white bg-gray-900 rounded">Services</a></li>
                                <li><a href="/" class="block px-4 py-2 text-white bg-gray-900 rounded">Contact</a></li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </>
        )
    }
}

export default Navbar;