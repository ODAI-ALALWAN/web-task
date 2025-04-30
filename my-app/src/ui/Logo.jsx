import React from 'react'


export default function Logo() {
  return (
    <div className='flex flex-row items-center gap-1'>
      <div className="bg-blue-600/10 w-10 h-10 rounded-md flex items-center justify-center mr-2">
        <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M12 7c1.5 0 2.5.5 3.5 1.5" />
        </svg>
        </div>
        <h2 className='font-bold font-serif'>TaskFlow</h2>
    </div>
  )
}
