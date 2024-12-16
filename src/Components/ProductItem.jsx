import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

  // Default fallback image
  const defaultImage = '/placeholder-image.jpg';

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden border rounded-lg p-4 shadow-sm h-[300px]">
        <img
          src={image && image.length > 0 ? image[0] : defaultImage} // Check if image array exists and has at least one item
          alt={name || 'Product Image'}
          className="w-full h-48 object-cover mb-2 rounded hover:scale-110 transition ease-in-out duration-500"
          onError={(e) => {
            e.currentTarget.src = defaultImage; // Fallback to default image if loading fails
          }}
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">₦{price}</p>
      </div>
    </Link>
  );
};

// Add prop validation
ProductItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number,
};

export default ProductItem;
