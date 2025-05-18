import React from 'react'

type DashboardRecapProps = {
  userId?: string;
};

const DashboardRecap = ({userId}: DashboardRecapProps) => {

  return (
    <div className='flex-col gap-2 w-[30%] border-blue-400 min-h-[30vh] border-2 p-4 rounded-md'>
    <h3 className='text-right md:text-xl font-semibold'>Recap</h3>

    {/* Charts */}
    

    </div>
  )
}

export default DashboardRecap
