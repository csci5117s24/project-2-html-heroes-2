import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function SetUpBudget() {
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [savingsTarget, setSavingsTarget] = useState(0);

    /*  set monthlyIncomt input field 
        max input value of 999,999,999,999
        no negative inputs
        sets savings to be less than monthly income
        */
    function handleSetMonthlyIncome2(e) {
        let inputVal = parseFloat(e.target.value)
        inputVal = Math.round(inputVal * 100) / 100;
        let min = parseFloat(savingsTarget)
        let max = 999999999999
        if (inputVal < 0 || undefined) { // set monthlyIncome to 0 if negative or undefined
            inputVal = 0;
        }
        if (inputVal < min) {
            setSavingsTarget(inputVal); // set savings to be less than monthly income
        }
        if (inputVal > max) {           // set monthly income to max if too big
            inputVal = max;
        }
        setMonthlyIncome(inputVal)
    }

    /*  setsavingsAmount from input field
        ensure savings is no larger than monthly income / set savings to monthly income
        ensure savings is not less than 0 / set savings to 0
        */
    function handleSetSavingsTarget2(e) {
        let inputVal = parseFloat(e.target.value)
        inputVal = Math.round(inputVal * 100) / 100;
        let max = parseFloat(monthlyIncome)
        if (inputVal > max) {
            inputVal = max
        } else if (inputVal < 0) {
            inputVal = 0;
        }
        setSavingsTarget(inputVal);
    }

    const handleSave = async () => {
        if (monthlyBudget < 0 || isNaN(monthlyBudget)) {
            window.alert("Your Budget should be positive and not NaN")
        } else {
            await fetch("/api/budget/" + encodeURIComponent(monthlyBudget), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(),
            });
            setMonthlyIncome(0);
            setSavingsTarget(0);
            navigate("/dashboard1");
        }
    };

    const handleDiscard = () => {
        navigate("/dashboard1");
    };

    const navigate = useNavigate();

    let monthlyBudget = monthlyIncome
        ? monthlyIncome - (savingsTarget ?? 0)
        : 0;

    const rate = monthlyIncome
        ? (savingsTarget ?? 0) / monthlyIncome * 100
        : 0;

    // ensure Saving Numbers look correct (not NaN and two decimal places)
    let savings;
    if (isNaN(savingsTarget)) {
        savings = 0;
    } else {
        savings = savingsTarget;
    }
    savings = parseFloat(savings).toFixed(2)

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
                <div class="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
                    <div class="flex items-stretch justify-center flex-wrap lg:flex-nowrap">
                        <div className="w-full md:w-1/2 h-auto">
                            <div class="p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div class="flex justify-center mb-7">
                                    <img class="bg-white w-12 h-12 rounded-full" src="category-icon/budget.svg" alt="Neil image" />
                                </div>
                                <h1 class="mb-9 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Update Your budget</h1>
                                <h2 class="mb-9 text-center text-xl tracking-tight text-gray-900 dark:text-white">We subtract our savings target from your income to set your monthly budget</h2>
                                <div class="flex mb-6">
                                    <div>
                                        <p class="mb-2 flex justify-center text-xl tracking-tight text-gray-900 dark:text-white">Monthly income</p>
                                        <div class="flex mb-6 justify-center">
                                            <p class="dark:bg-gray-800 text-3xl font-bold dark:text-white border-b border-gray-400 border-b-1 appearance-none text-gray-900 leading-tight focus:outline-none focus:shadow-outline">$</p>
                                            <input
                                                class="dark:bg-gray-800 w-64 mx-auto text-center text-3xl font-bold flex justify-center dark:text-white border-b border-gray-400 border-b-1 appearance-none w-full text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                                type="number"
                                                name="description"
                                                onChange={handleSetMonthlyIncome2}
                                                value={monthlyIncome}
                                                placeholder=""
                                            />
                                        </div>

                                    </div>
                                    <div>
                                        <p class="ml-9 mr-9 text-4xl tracking-tight text-gray-900 dark:text-white">-</p>
                                    </div>
                                    <div>
                                        <p class="mb-2 flex justify-center text-xl tracking-tight text-gray-900 dark:text-white">Savings target</p>
                                        <div class="flex mb-6 justify-center">
                                            <p class="dark:bg-gray-800 text-3xl font-bold dark:text-white border-b border-gray-400 border-b-1 appearance-none text-gray-900 leading-tight focus:outline-none focus:shadow-outline">$</p>
                                            <input
                                                class="dark:bg-gray-800 w-64 mx-auto text-center text-3xl font-bold flex justify-center dark:text-white border-b border-gray-400 border-b-1 appearance-none w-full text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                                type="number"
                                                name="description"
                                                onChange={handleSetSavingsTarget2}
                                                placeholder=""
                                                value={savingsTarget}
                                            />
                                        </div>
                                        <p class="mb-2 mt-2 flex justify-center text-l tracking-tight text-gray-900 dark:text-white">{Number(rate).toFixed(2)} % of your monthly income</p>
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
                                        >${monthlyBudget.toFixed(2)}</p>
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
                        <div class="ml-0 md:ml-2 mt-3 md:mt-0 w-full md:w-1/2">
                            <div class="p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h1 class="mb-9 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Potential Savings</h1>
                                <h2 class="mb-9 text-center text-xl tracking-tight text-gray-900 dark:text-white">If you set aside $ {savings} each month, you will get</h2>
                                <div class="flex mb-6 justify-center">
                                    <p class="font-bold mb-2 mr-9 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">$ {savings * 12}</p>
                                    <p class="font-bold mb-2 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">in 1 year</p>
                                </div>
                                <div class="flex mb-6 justify-center">
                                    <p class="font-bold mb-2 mr-9 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">$ {savings * 24}</p>
                                    <p class="font-bold mb-2 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">in 2 years</p>
                                </div>
                                <div class="flex mb-6 justify-center">
                                    <p class="font-bold mb-2 mr-9 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">$ {savings * 36}</p>
                                    <p class="font-bold mb-2 flex justify-center text-xl tracking-tight text-green-600 dark:text-green">in 3 years</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}