import React, { useEffect } from "react"

const SmModal: React.FC<{children: JSX.Element, isAcctive: boolean}> = ({children, isAcctive}) => {

    useEffect(() => {
        if (isAcctive) {
            document.body.style.overflow = "hidden"; 
        }else{
            document.body.style.overflow = "unset"; 
            
        }
    }, [isAcctive])
    
  return (
    <div className={`${isAcctive ? "": "hidden"} z-[9001] fixed h-screen w-full overflow-y-hidden top-0 left-0 flex flex-col justify-center items-center backdrop-blur-sm bg-black bg-opacity-50 `}>
        {children}
        {isAcctive}
    </div>
  )
}

export default SmModal