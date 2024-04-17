export default function SummaryLi({svg_src, category, cost}) {
    return (
        <>
            <li class="pb-3 sm:pb-4 mb-3 mr-4">
                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={svg_src} alt="Neil image" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {category}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        ${cost}
                    </div>
                </div>
            </li>
        </>
    )
}