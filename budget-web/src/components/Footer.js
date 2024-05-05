import { useEffect, useState } from "react";

function Footer() {
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


    return (
        // https://flowbite.com/docs/components/footer/
        <footer class="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <div className="flex items-center font-bold text-xl">
                <img src={"/logo.png"} alt="logo" className="w-10 h-10 mr-3" />
                <a href="/">Budget Tracker</a>
            </div>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                { user1 ?
                    <>
                        <li><a href="/dashboard1" className="hover:underline me-4 md:me-6">Dashboard</a></li>
                        <li><a href="/adv-summary" className="hover:underline me-4 md:me-6">Advanced Spending Summary</a></li>
                        <li><a href="/.auth/logout" className="hover:underline me-4 md:me-6">Log out</a></li>
                    </>
                    :
                    <>
                        <li><a href="/.auth/login/github" className="hover:underline me-4 md:me-6">Log in</a></li>
                    </>
                }
            </ul>
        </footer>
    );
}

export default Footer;