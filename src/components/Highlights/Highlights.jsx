import React from 'react';

import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';

const Highlights = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 w-full">
      <div className="flex flex-col items-center w-72">
        <img src={image1} alt="Item 1" className="w-64 h-64 object-cover mb-2" />
        <div className="flex flex-col items-center">
          <h3 className="text-lg mb-1">Item 1</h3>
          <p className="text-sm text-gray-800">R$ 100,00</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-72">
        <img src={image2} alt="Item 2" className="w-64 h-64 object-cover mb-2" />
        <div className="flex flex-col items-center">
          <h3 className="text-lg mb-1">Item 2</h3>
          <p className="text-sm text-gray-800">R$ 150,00</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-72">
        <img src={image3} alt="Item 3" className="w-64 h-64 object-cover mb-2" />
        <div className="flex flex-col items-center">
          <h3 className="text-lg mb-1">Item 3</h3>
          <p className="text-sm text-gray-800">R$ 200,00</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-72">
        <img src={image4} alt="Item 4" className="w-64 h-64 object-cover mb-2" />
        <div className="flex flex-col items-center">
          <h3 className="text-lg mb-1">Item 4</h3>
          <p className="text-sm text-gray-800">R$ 250,00</p>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
