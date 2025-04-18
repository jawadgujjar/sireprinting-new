import React from 'react'
import Allproduct1 from '../components/allproducts/allproduct'
import Videocarousel from '../components/landing/carouselvideo';
import Allproducttxt from '../components/allproducts/allproducttxt';
import Testimonial from '../components/landing/testimonial';
 

function Allproductpage() {
  return (
    <div>
      <Allproduct1/>
      <Videocarousel />
      <Allproducttxt/>
      <Testimonial />
      
    </div>
  )
}

export default Allproductpage;
