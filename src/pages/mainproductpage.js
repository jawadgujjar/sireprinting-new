import React from 'react'
import Productmain1 from '../components/productmain/productmain'
import ProductSpecs from '../components/productmain/productspecs'
import Videocarousel from '../components/landing/carouselvideo'
import Relatedproduct from '../components/productmain/relatedproduct'
import Relatedblogs from '../components/productmain/relatedblogs'
import Testimonial from '../components/landing/testimonial'
import Banner from '../components/landing/banner'
import Categorydescription from '../components/products/catdes'
 

function Mainproductpage() {
  return (
    <div>
      <Productmain1 />
      <Videocarousel />
      <ProductSpecs />
      <Banner />
      <Categorydescription/>
      <Relatedproduct/>
      {/* <Relatedblogs/> */}
      <Testimonial />
    </div>
  )
}

export default Mainproductpage
