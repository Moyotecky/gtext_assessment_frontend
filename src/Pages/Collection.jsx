import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import Title from '../Components/Title';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortType, setSortType] = useState('relevant');

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://gnext-assessment-api-v1.onrender.com/api/v1/products/get-all-products'
      );
      setProducts(response.data.products);
      setFilterProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://gnext-assessment-api-v1.onrender.com/api/v1/products/category/${category}`
      );
      setFilterProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    } else {
      setFilterProducts(products);
    }
  };

  // Sort products
  const sortProducts = () => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = [...filterProducts];
        break;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Section */}
      <div className="min-w-52">
        <p className="my-2 text-xl flex items-center">Filters</p>

        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                type="radio"
                name="category"
                value=""
                onChange={handleCategoryChange}
                checked={category === ''}
              />
              All
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                name="category"
                value="fashion"
                onChange={handleCategoryChange}
                checked={category === 'fashion'}
              />
              Fashion
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                name="category"
                value="electronics"
                onChange={handleCategoryChange}
                checked={category === 'electronics'}
              />
              Electronics
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                name="category"
                value="food"
                onChange={handleCategoryChange}
                checked={category === 'food'}
              />
              Food
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                name="category"
                value="others"
                onChange={handleCategoryChange}
                checked={category === 'others'}
              />
              Others
            </label>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-sm sm:text-xl lg:text-2xl mb-4">
          <Title text1={category ? category.toUpperCase() : 'ALL'} text2={'COLLECTIONS'} />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}> {/* Wrap product with Link */}
              <ProductItem
                id={product._id}
                image={product.images[0]}
                name={product.name}
                price={product.price}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
