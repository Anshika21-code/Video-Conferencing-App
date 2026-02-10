import { Loader2, Loader2Icon } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Loader2 className='w-8 h-8 animate-spin text-white'/>
      
    </div>
  )
}

export default Loader
