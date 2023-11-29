import React from 'react'

const Page = () => {
    return (
        <li className='flex flex-col gap-2'>
            <span className='underline font-bold'>Additional Help:</span>
            <ul className='flex flex-col gap-3 '>
                <li className='flex flex-col'>
                    <span className='font-bold'>Tutorial:</span>
                    <span className=''>
                        You can learn from here how to use the this tool from scratch (data upload to data
                        visulization and analytics)
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Help:</span>
                    <span className=''>
                        If you need any help and have suggestion for us contact us
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Download:</span>
                    <span className=''>
                        You can download the dashboard at local machine as SVG format.
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Setting (Language):</span>
                    <span className=''>
                        You can select your preferred language here
                    </span>
                </li>
            </ul>
        </li>
    )
}

export default Page