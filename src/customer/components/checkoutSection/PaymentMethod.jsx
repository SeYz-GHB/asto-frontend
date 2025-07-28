import React from 'react'
import QRPayment from './QRPayment'

const PaymentMethod = () => {
  
  return (
    <div className='px-6 py-4'>
      <h6 className='border-b-1'>Payment Method</h6>
          <QRPayment />
        <div className='border-1 px-3 rounded'>
            
        </div>
    </div>
  )
}

export default PaymentMethod
