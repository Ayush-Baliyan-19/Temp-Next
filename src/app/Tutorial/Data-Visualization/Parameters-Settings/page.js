import React from 'react'

const Page = () => {
    return (
        <li className='flex flex-col gap-2'>
            <span className='underline font-bold'>Parameters Setting:</span>
            <ul className='flex flex-col gap-3 '>
                <li className='flex flex-col'>
                    <span className='font-bold'>Data Attributes importance:</span>
                    <span className=''>
                        The user importance value represents the importance of
                        particular data attributes during dashboard recommendations
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Selected Visualizations:</span>
                    <span className=''>
                        Users can select the desired visualizations to be present in the
                        recommended dashboard.
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>No of Visualizations:</span>
                    <span className=''>
                        Users can set the range of visualization to be present in a
                        recommended dashboard.
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>User Type:</span>
                    <span className=''>
                        Based on previous knowledge and experience in data analysis an user can
                        select it&apos;s type. The user types are three types Novices, beginner and experts.
                    </span>
                </li>
                <li className='flex flex-col'>
                    <span className='font-bold'>Genetic Algorithm Parameters:</span>
                    <span className=''>
                        It represent the operations that are performed to optimize
                        dashboard recommendation
                    </span>
                </li>
            </ul>
        </li>
    )
}

export default Page