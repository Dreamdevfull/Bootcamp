import React from 'react'

interface mainType {
  main:{
    text1: string
    text2: string
    button?: {          
      label: string
      onClick: () => void
    }
  }
}
const Main = ({main} : mainType) => {
  return (
    <main className='space-y-6 mx-7.5 mt-5'>
      <div className='bg-white p-6 rounded-lg shadow-sm border border-[#d3d1c7]'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-[#0d3d30]'>{main.text1}</h1>
            <p className='text-md text-[#888780] mt-1'>{main.text2}</p>
          </div>
          {main.button && (
            <button
              onClick={main.button.onClick}
              className='bg-[#EF9F27] text-white px-7 py-3 mr-3 rounded-sm text-sm hover:bg-[#BA7517] transition cursor-pointer'
            >
              {main.button.label}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default Main