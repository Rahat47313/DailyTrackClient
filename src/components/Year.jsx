import { Fragment } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

const months = [
  {
    name: 'January',
    days: [
      { date: '2021-12-27' },
      { date: '2021-12-28' },
      { date: '2021-12-29' },
      { date: '2021-12-30' },
      { date: '2021-12-31' },
      { date: '2022-01-01', isCurrentMonth: true },
      { date: '2022-01-02', isCurrentMonth: true },
      { date: '2022-01-03', isCurrentMonth: true },
      { date: '2022-01-04', isCurrentMonth: true },
      { date: '2022-01-05', isCurrentMonth: true },
      { date: '2022-01-06', isCurrentMonth: true },
      { date: '2022-01-07', isCurrentMonth: true },
      { date: '2022-01-08', isCurrentMonth: true },
      { date: '2022-01-09', isCurrentMonth: true },
      { date: '2022-01-10', isCurrentMonth: true },
      { date: '2022-01-11', isCurrentMonth: true },
      { date: '2022-01-12', isCurrentMonth: true, isToday: true },
      { date: '2022-01-13', isCurrentMonth: true },
      { date: '2022-01-14', isCurrentMonth: true },
      { date: '2022-01-15', isCurrentMonth: true },
      { date: '2022-01-16', isCurrentMonth: true },
      { date: '2022-01-17', isCurrentMonth: true },
      { date: '2022-01-18', isCurrentMonth: true },
      { date: '2022-01-19', isCurrentMonth: true },
      { date: '2022-01-20', isCurrentMonth: true },
      { date: '2022-01-21', isCurrentMonth: true },
      { date: '2022-01-22', isCurrentMonth: true },
      { date: '2022-01-23', isCurrentMonth: true },
      { date: '2022-01-24', isCurrentMonth: true },
      { date: '2022-01-25', isCurrentMonth: true },
      { date: '2022-01-26', isCurrentMonth: true },
      { date: '2022-01-27', isCurrentMonth: true },
      { date: '2022-01-28', isCurrentMonth: true },
      { date: '2022-01-29', isCurrentMonth: true },
      { date: '2022-01-30', isCurrentMonth: true },
      { date: '2022-01-31', isCurrentMonth: true },
      { date: '2022-02-01' },
      { date: '2022-02-02' },
      { date: '2022-02-03' },
      { date: '2022-02-04' },
      { date: '2022-02-05' },
      { date: '2022-02-06' },
    ],
  },
  {
    name: 'February',
    days: [
      { date: '2021-12-27' },
      { date: '2021-12-28' },
      { date: '2021-12-29' },
      { date: '2021-12-30' },
      { date: '2021-12-31' },
      { date: '2022-01-02' },
      { date: '2022-01-03' },
      { date: '2022-01-01' },
      { date: '2022-01-04' },
      { date: '2022-01-05' },
      { date: '2022-01-06' },
      { date: '2022-01-07' },
      { date: '2022-01-08' },
      { date: '2022-01-09' },
      { date: '2022-01-10' },
      { date: '2022-01-11' },
      { date: '2022-01-12' },
      { date: '2022-01-13' },
      { date: '2022-01-14' },
      { date: '2022-01-15' },
      { date: '2022-01-16' },
      { date: '2022-01-17' },
      { date: '2022-01-18' },
      { date: '2022-01-19' },
      { date: '2022-01-20' },
      { date: '2022-01-21' },
      { date: '2022-01-22' },
      { date: '2022-01-23' },
      { date: '2022-01-24' },
      { date: '2022-01-25' },
      { date: '2022-01-26' },
      { date: '2022-01-27' },
      { date: '2022-01-28' },
      { date: '2022-01-29' },
      { date: '2022-01-30' },
      { date: '2022-01-31' },
      { date: '2022-02-01' },
      { date: '2022-02-02' },
      { date: '2022-02-03' },
      { date: '2022-02-04' },
      { date: '2022-02-05' },
      { date: '2022-02-06' },
    ],
  },
  {
    name: 'March',
    days: [
      { date: '2021-12-27' },
      { date: '2021-12-28' },
      { date: '2021-12-29' },
      { date: '2021-12-30' },
      { date: '2021-12-31' },
      { date: '2022-01-02' },
      { date: '2022-01-03' },
      { date: '2022-01-01' },
      { date: '2022-01-04' },
      { date: '2022-01-05' },
      { date: '2022-01-06' },
      { date: '2022-01-07' },
      { date: '2022-01-08' },
      { date: '2022-01-09' },
      { date: '2022-01-10' },
      { date: '2022-01-11' },
      { date: '2022-01-12' },
      { date: '2022-01-13' },
      { date: '2022-01-14' },
      { date: '2022-01-15' },
      { date: '2022-01-16' },
      { date: '2022-01-17' },
      { date: '2022-01-18' },
      { date: '2022-01-19' },
      { date: '2022-01-20' },
      { date: '2022-01-21' },
      { date: '2022-01-22' },
      { date: '2022-01-23' },
      { date: '2022-01-24' },
      { date: '2022-01-25' },
      { date: '2022-01-26' },
      { date: '2022-01-27' },
      { date: '2022-01-28' },
      { date: '2022-01-29' },
      { date: '2022-01-30' },
      { date: '2022-01-31' },
      { date: '2022-02-01' },
      { date: '2022-02-02' },
      { date: '2022-02-03' },
      { date: '2022-02-04' },
      { date: '2022-02-05' },
      { date: '2022-02-06' },
    ],
  },
  {
    name: 'April',
    days: [
      { date: '2021-12-27' },
      { date: '2021-12-28' },
      { date: '2021-12-29' },
      { date: '2021-12-30' },
      { date: '2021-12-31' },
      { date: '2022-01-02' },
      { date: '2022-01-03' },
      { date: '2022-01-01' },
      { date: '2022-01-04' },
      { date: '2022-01-05' },
      { date: '2022-01-06' },
      { date: '2022-01-07' },
      { date: '2022-01-08' },
      { date: '2022-01-09' },
      { date: '2022-01-10' },
      { date: '2022-01-11' },
      { date: '2022-01-12' },
      { date: '2022-01-13' },
      { date: '2022-01-14' },
      { date: '2022-01-15' },
      { date: '2022-01-16' },
      { date: '2022-01-17' },
      { date: '2022-01-18' },
      { date: '2022-01-19' },
      { date: '2022-01-20' },
      { date: '2022-01-21' },
      { date: '2022-01-22' },
      { date: '2022-01-23' },
      { date: '2022-01-24' },
      { date: '2022-01-25' },
      { date: '2022-01-26' },
      { date: '2022-01-27' },
      { date: '2022-01-28' },
      { date: '2022-01-29' },
      { date: '2022-01-30' },
      { date: '2022-01-31' },
      { date: '2022-02-01' },
      { date: '2022-02-02' },
      { date: '2022-02-03' },
      { date: '2022-02-04' },
      { date: '2022-02-05' },
      { date: '2022-02-06' },
    ],
  },
  // More months...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Year() {
  return (
    <div>
      <div className="">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
          {months.map((month) => (
            <section key={month.name} className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{month.name}</h2>
              <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500 dark:text-gray-400">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 dark:bg-gray-600 text-sm shadow ring-1 ring-gray-200 dark:ring-gray-700">
                {month.days.map((day, dayIdx) => (
                  <button
                    key={day.date}
                    type="button"
                    className={classNames(
                      day.isCurrentMonth ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
                      dayIdx === 0 && 'rounded-tl-lg',
                      dayIdx === 6 && 'rounded-tr-lg',
                      dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                      dayIdx === month.days.length - 1 && 'rounded-br-lg',
                      'py-1.5 hover:bg-gray-100 focus:z-10'
                    )}
                  >
                    <time
                      dateTime={day.date}
                      className={classNames(
                        day.isToday && 'bg-gray-900 dark:bg-white font-semibold text-white dark:text-black',
                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full'
                      )}
                    >
                      {day.date.split('-').pop().replace(/^0/, '')}
                    </time>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
