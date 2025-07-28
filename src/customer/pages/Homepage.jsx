import React from 'react'
import ProductBycategory from './ProductCategoryByBrand'
import MenuIcon from '../components/MenuIcon'
import asto from '../../assets/logoes/asto_logo.jpg'

const HomePage = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      
      <MenuIcon />
      <img src={asto} alt="asto logo" className='opacity-10' />
      
  
      
    </div>
  )
}

export default HomePage
