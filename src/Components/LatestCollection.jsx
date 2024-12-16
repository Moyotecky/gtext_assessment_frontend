import { useEffect, useState } from 'react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import axios from 'axios';

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://gnext-assessment-api-v1.onrender.com/api/v1/products/get-all-products'
        );
        const products = response.data?.products || [];
        const latest = products.slice(0, 10); // Get the latest 10 products
        setLatestProducts(latest);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals that blend style and comfort. Explore the
          latest trends in fashion, curated just for you.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.images && product.images.length > 0 ? [product.images[0]] : ['/placeholder-image.jpg']} // Always pass an array
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
