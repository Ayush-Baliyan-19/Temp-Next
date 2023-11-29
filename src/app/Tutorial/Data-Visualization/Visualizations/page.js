import React from 'react'

const Page = () => {
    return (
        <li className='flex flex-col gap-2'>
            <span className='underline font-bold'>Each visualization interactive features:</span>
            <span className=''>
                The preprocessed data uploaded by user. It represent total number of row and columns of
                uploaded data.
            </span>
            <ul className='flex flex-col gap-3 '>
                <li className='flex flex-col'>
                    <span className='font-bold'>Add to personalized dashboard:</span>
                    <span className=''>
                        You can add the given visualization to the current
                        unlocked (or create new) personalized dashboard.
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Download:</span>
                    <span className=''>
                        You can download the visualization at local machine as SVG format
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Zoom:</span>
                    <span className=''>
                        You can change the data attributes present in a selected visualization individually
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Delete:</span>
                    <span className=''>
                        You can delete that particular Visualization from dashboard
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Hover:</span>
                    <span className=''>
                        You can hope on a visulization to see interactive options
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Single click:</span>
                    <span className=''>
                        You can make a single click to visulization to modify/look into its covered data
                        attributes importance present of left side of screen.
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Information:</span>
                    <span className=''>
                        You can see other detailed information and learning about that particular
                        visulization (link will be given in pop up to learn more details)
                    </span>
                </li>
            </ul>
        </li>
    )
}

export default Page