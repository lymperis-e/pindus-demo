import React from 'react'

function MapToolbar(props) {
    const { position, children, ...rest } = props;


    if (position === 'top') {
        return (
            <div className='flex flex-row justify-between items-center absolute top-0 left-0 right-0 p-3 z-50' {...rest}>
                {children}
            </div>
        )
    }

    if (position === 'right') {
        return (
            <div className='flex flex-col h-full justify-between items-center absolute top-0 right-0 p-3 pb-10 z-50' {...rest} >
                {children}
            </div>
        )
    }

    if (position === 'left') {
        return (
            <div className='flex flex-col h-full justify-between items-center absolute top-0 left-0 p-3 pb-10 z-50' {...rest}>
                {children}
            </div>
        )
    }

    if (position === 'bottom') {
        return (
            <div className='flex flex-row w-full items-center absolute bottom-0  px-3 mb-10 z-40' {...rest} >
                {children}
            </div>
        )
    }

}

export default MapToolbar