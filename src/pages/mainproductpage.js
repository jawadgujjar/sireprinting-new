import React from 'react'
import Productmain1 from '../components/productmain/productmain'
import ProductSpecs from '../components/productmain/productspecs'
import Videocarousel from '../components/landing/carouselvideo'
import Relatedproduct from '../components/productmain/relatedproduct'
import Relatedblogs from '../components/productmain/relatedblogs'
 

function Mainproductpage() {
  return (
    <div>
      <Productmain1 />
      <Videocarousel />
      <ProductSpecs />
      <Relatedproduct/>
      <Relatedblogs/>
    </div>
  )
}

export default Mainproductpage
