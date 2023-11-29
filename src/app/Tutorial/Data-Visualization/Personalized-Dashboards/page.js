import React from 'react'

const Page = () => {
    return (
        <>
            <li className='flex flex-col gap-2'>
                <span className='underline font-bold'>Personalized Dashboards:</span>
                <span className=''>
                    <p className='font-medium text-lg'>You can create these dashboards as per your need. You can create
                        maximum 5 personalized dashboards.
                    </p>
                </span>
            </li>
            <li className='flex flex-col gap-2'>
                <span className='underline font-bold'>Personalized Dashboards interactive features:</span>
                <ul className='flex flex-col gap-3 '>
                    <li className='flex flex-col'>
                        <span className=''>Lock/Unlock:</span>
                        <span className=''>
                            You can &apos;lock&apos; dashboard one you decided to not add anymore visulization to
                            that particular personalized dashboards and &apos;unlock&apos; it if you want to add on again to it.
                        </span>
                    </li>
                    <li className='flex flex-col'>
                        <span className='font-bold'>Information:</span>
                        <span className=''>
                            You can see other detailed information about fitness function used for
                            dashboard evaluation for that particular dashboard.
                        </span>
                    </li>
                    <li className='flex flex-col'>
                        <span className='font-bold'>Download:</span>
                        <span className=''>
                            You can download the dashboard at local machine as SVG format.
                        </span>
                    </li>
                    <li className='flex flex-col'>
                        <span className='font-bold'>Delete:</span>
                        <span className=''>
                            You can delete that particular dashboard from the list of personalized
                            dashboards
                        </span>
                    </li>
                </ul>
            </li>
        </>
    )
}

export default Page