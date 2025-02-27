import classes from '../static/SummaryLi.module.css'

export default function SummaryLi({category, color, cost}) {
    return (
        <>
            <li class="pb-3 sm:pb-4 mb-3 mr-4">
                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-shrink-0">
                        <span className={classes.dot} style={{backgroundColor: color}}></span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xl text-gray-900 truncate dark:text-white">
                            {category}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-xl text-base font-semibold text-gray-900 dark:text-white">
                        ${cost}
                    </div>
                </div>
            </li>
        </>
    )
}