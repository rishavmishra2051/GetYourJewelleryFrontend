import React from 'react'
import Navbar from '../components/Navbar'
import CategoryExplore from './CategoryExplore'
import Footer from '../components/Footer'

export default function CategoryExploreClient() {
  return (
    <>
    <div className='mb-2'>
        <Navbar/>
    </div>
    <div>
        <CategoryExplore/>
    </div>
    <div>
        <Footer/>
    </div>
    </>
  )
}
