import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const Product = () => {
  const { productId } = useParams();
  const { addToCart, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const BASEURL = "https://gnext-assessment-api-v1.onrender.com";

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/products/get-single-product/${productId}`);
      if (response.data && response.data.product) {
        setProductData(response.data.product);
        setImage(response.data.product.images[0] || ''); // Set the first image
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  if (!productData) {
    return <p>Loading...</p>;
  }

  const images = productData.images || [];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(productData._id, quantity);
  };

  return (
    <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
      {/* Product Images */}
      <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
          {images.map((item, index) => (
            <img key={index} src={item} alt={`Product ${index + 1}`} onClick={() => setImage(item)} className="cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover" />
          ))}
        </div>
        <div className="w-full sm:w-[80%]">
          <img src={image} alt="Selected Product" className="w-full h-auto object-cover" />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
        <p className="font-medium text-xl mt-3">₦{productData.price}</p>
        <p className="mt-5 text-gray-500">{productData.description}</p>

        {/* Quantity */}
        <div className="flex items-center gap-4 mt-5">
          <label className="font-medium text-sm">Quantity</label>
          <div className="flex items-center">
            <button onClick={decrementQuantity} className="px-4 py-2 bg-gray-200 text-xl">-</button>
            <span className="border p-2 text-center w-16">{quantity}</span>
            <button onClick={incrementQuantity} className="px-4 py-2 bg-gray-200 text-xl">+</button>
          </div>
        </div>

        <button onClick={handleAddToCart} className="w-full mt-6 bg-black text-white py-3">Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
