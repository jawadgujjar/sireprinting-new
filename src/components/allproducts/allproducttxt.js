import React from 'react';
import './allproducttxt.css';

function Allproducttxt() {
  return (
    <div className="text-container">
      {/* Box 1 - Introduction */}
      <div className="text-box">
        <h2>All Our Packaging Products</h2>
        <p>
          Sireprinting.com is your ultimate one-stop choice to acquire any custom box packaging solutions under a single roof. 
          No matter what you fantasize about, our highly proficient team of dedicated professionals will certainly make it 
          possible for you! The packaging and printing industry is like a vast sea with many horizons, and we are here to help 
          you conquer it with full zeal. Whether you are inquiring about CBD boxes or food packaging solutions or your target 
          niche is the cosmetic industry-related packaging, we have got you fully covered for all its aspects.
        </p>
        <p>
          We give you full freedom to choose the box style of your choice and get it tailored concerning size, shade, layout, 
          and finishing as well. The boxes we make are durable, sturdy, and will protect the item within.
        </p>
      </div>

      {/* Box 2 - Types & Stock */}
      <div className="text-box">
        <h2>Types & Stock We Offer</h2>
        <p>
          We at sireprinting.com have a custom box for every product you may have; all you have to do is choose the one 
          according to your specific business needs and requirements.
        </p>
        
        <h3>Cardboard Boxes</h3>
        <p>
          It is the most common type widely used in almost every industry. As can be guessed from their name, these boxes 
          are produced from cardboard material. You can easily use cardboard boxes produced by sireprinting.com for branding 
          and product marketing at various platforms.
        </p>
        
        <h3>Rigid Boxes</h3>
        <p>
          Manufactured from thick cardboard, these are best when you have to offer top-notch premium items like gift items, 
          artifacts, watches, jewelry, perfumes, etc. Our professional team will further enhance the appearance of your 
          personalized rigid packaging boxes.
        </p>
      </div>

      {/* Box 3 - Customization & Process */}
      <div className="text-box">
        <h2>Customization Options</h2>
        <p>
          No layout is impossible for us to attain. You might go with a monochromatic look or a fun, wild glamorous pattern, 
          and also, we will certainly print accordingly. In the printing process, we guarantee that the color turns out as 
          it was planned to be.
        </p>
        <p>
          What makes us the most effective at what we do is our specialist as well as trustworthy staff. We get motivated by 
          our customers' layout and see to it that their dreams are met. That is why we make it necessary that we provide 
          the highest quality at cost-effective prices.
        </p>
        <div className="testimonial">
          <p className="quote">"I really like Sire Printing because it's a really nice box, I've gotten a lot of compliments on it."</p>
          <p className="their-story">THEIR STORY</p>
        </div>
      </div>
    </div>
  );
}

export default Allproducttxt;