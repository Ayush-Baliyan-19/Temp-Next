import React from 'react'

const Page = () => {
  return (
    <>
        <li className='flex flex-col gap-2'>
                    <span className='underline font-bold'>Best Dashboards:</span>
                    <span className=''>
                        <p className='font-medium text-lg'>These are 5 dashboards that are initially recommended using metadata and
                            user preference
                        </p>
                    </span>
                </li>
                <li className='flex flex-col gap-2'>
                    <span className='underline font-bold'>Best Dashboards interactive features:</span>
                    <ul className='flex flex-col gap-3 '>
                        <li className='flex flex-col'>
                            <span className=' font-bold'>Save:</span>
                            <span className=''>
                                You can delete that particular Visualization from dashboard
                            </span>
                        </li>
                        <li className='flex flex-col'>
                            <span className=' font-bold'>Information:</span>
                            <span className=''>
                                You can see other detailed information about fitness function used for
                                dashboard evaluation for that particular dashboard.
                            </span>
                        </li>
                        <li className='flex flex-col'>
                            <span className=' font-bold'>Download:</span>
                            <span className=''>
                                You can download the dashboard at local machine as SVG format.
                            </span>
                        </li>
                        <li className='flex flex-col'>
                            <span className=' font-bold'>Delete:</span>
                            <span className=''>
                                You can delete that particular dashboard from the list of best recommended
                                dashboards
                            </span>
                        </li>
                    </ul>
                </li>
    </>
  )
}

export default Page