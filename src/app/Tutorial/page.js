// Page.js
"use client"

import React from 'react';
const Page = () => {
    return (
        <div className="flex flex-col text-secondary pt-5 h-screen font-sans gap-5">
            <h1 className='text-5xl font-bold'>Introduction</h1>
            <p className='font-medium text-lg'>The system &apos;simple-vis&apos; is designed and developed for automatic recommendation of dashboards that
                can be easily understand by the user based on user type feature of system (as per his knowledge and
                experience)
            </p>
            <p className='font-medium text-lg'>The System have following unique features:
            </p>
            <ul className=' flex flex-col gap-5 font-medium text-lg'>
                <li className='flex flex-col gap-2'>
                    <span className='underline font-bold'>Simple and Fast:</span>
                    <span className=''>
                        Our System is simple and fast
                    </span>
                </li>
                <li className='flex flex-col gap-2'>
                    <span className='underline font-bold'>Completely Automatic:</span>
                    <span className=''>
                        Our System is Completely automatic
                    </span>
                </li>
                <li className='flex flex-col gap-2'>
                    <span className='underline font-bold'>User preferences based dashboard recommendation:</span>
                    <span className=''>
                        Use can get tailored dashboard based on their preference
                    </span>
                </li>
                <li className='flex flex-col gap-2'>
                    <span className='underline font-bold'>Interactive user interface:</span>
                    <span className=''>
                        In the dashboard user have many options to create their own personalized dashboard using re-run GA and best dashboards
                    </span>
                </li>
                <li className='flex flex-col gap-2'>
                    <span className='underline font-bold'>Multiple user types support:</span>
                    <span className=''>
                        The dashboard functions and featured got varied based on user type selection
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default Page;
