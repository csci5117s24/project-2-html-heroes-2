import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function SetUpBudget() {
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [savingsTarget, setSavingsTarget] = useState(0);

    const handleSave = async () => {
        if (monthlyBudget < 0) {
            window.alert("Your Budget should be positive")
        } else {
            await fetch("/api/budget/"+ encodeURIComponent(monthlyBudget), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(),
              });
              setMonthlyIncome(0);
              setSavingsTarget(0);
            navigate("/dashboard_tyler");
        }
    };

    const handleDiscard = () => {
        navigate("/dashboard_tyler");
    };

    const navigate = useNavigate();

    const monthlyBudget = monthlyIncome && savingsTarget
        ? monthlyIncome - savingsTarget
        : 0;
    
    const rate = monthlyIncome && savingsTarget
    ? savingsTarget / monthlyIncome * 100
    : 0;


    return (
        <>
            <header class="bg-white shadow">
                <div class="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                        Set up your own budget
                    </h1>
                </div>
            </header>
            <main>
                <div class="flex">
                    <div class="flex mr-0 justify-center mx-auto max-w-9xl py-6 sm:px-6 lg:px-8">
                        <div class="max-w-4xl mr-0 justify-center p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex justify-center mb-7">
                                <img class="bg-white w-12 h-12 rounded-full" src="category-icon/budget.svg" alt="Neil image" />
                            </div>
                            <h1 class="mb-9 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Update Your budget</h1>
                            <h2 class="mb-9 text-center text-xl tracking-tight text-gray-900 dark:text-white">We subtract our savings target from your income to set your monthly budget</h2>
                            <div class="flex mb-6">
                                <div>
                                    <p class="mb-2 flex justify-center text-xl tracking-tight text-gray-900 dark:text-white">Monthly income</p>
                                    <input
                                        class="dark:bg-gray-800 w-64 mx-auto text-center text-3xl font-bold flex justify-center dark:text-white border-b border-gray-400 border-b-1 appearance-none w-full text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        name="description"
                                        onChange={(e) => setMonthlyIncome(e.target.value)}
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <p class="ml-9 mr-9 text-4xl tracking-tight text-gray-900 dark:text-white">-</p>
                                </div>
                                <div>
                                    <p class="mb-2 flex justify-center text-xl tracking-tight text-gray-900 dark:text-white">Savings target</p>
                                    <input
                                        class="dark:bg-gray-800 w-64 mx-auto text-center text-3xl font-bold flex justify-center dark:text-white border-b border-gray-400 border-b-1 appearance-none w-full text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        name="description"
                                        onChange={(e) => setSavingsTarget(e.target.value)}
                                        placeholder=""
                                    />
                                    <p class="mb-2 mt-2 flex justify-center text-l tracking-tight text-gray-200 dark:text-white">{Number(rate).toFixed(2)} % of your monthly income</p>

                                </div>
                            </div>
                            <div class="flex mb-8 justify-center">
                                <div>
                                    <p class="ml-9 mr-9 text-4xl tracking-tight text-gray-900 dark:text-white">=</p>
                                </div>
                                <div>
                                    <p class="mb-2 flex text-center justify-center text-xl tracking-tight text-gray-900 dark:text-white">Monthly budget</p>
                                    <p
                                        class="dark:bg-gray-800 w-64 mx-auto text-center text-3xl font-bold flex justify-center dark:text-white appearance-none text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                    >{monthlyBudget}</p>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <button
                                    class="mr-3 px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none"
                                    onClick={handleSave}
                                >
                                    save
                                </button>
                                <button
                                    class="px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none"
                                    onClick={handleDiscard}
                                >
                                    Dicard
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex ml-0 justify-center mx-auto max-w-5xl py-6 sm:px-6 lg:px-8">
                        <div class="max-w-4xl ml-0 justify-center p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h1 class="mb-9 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Potential Savings</h1>
                            <h2 class="mb-9 text-center text-xl tracking-tight text-gray-900 dark:text-white">If you set aside $ {savingsTarget} each month, you will get</h2>
                            <div class="flex mb-6 justify-center">
                                <p class="font-bold mb-2 mr-9 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">$ {savingsTarget * 12}</p>
                                <p class="font-bold mb-2 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">in 1 year</p>
                            </div>
                            <div class="flex mb-6 justify-center">
                                <p class="font-bold mb-2 mr-9 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">$ {savingsTarget * 24}</p>
                                <p class="font-bold mb-2 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">in 2 years</p>
                            </div>
                            <div class="flex mb-6 justify-center">
                                <p class="font-bold mb-2 mr-9 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">$ {savingsTarget * 36}</p>
                                <p class="font-bold mb-2 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">in 3 years</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}