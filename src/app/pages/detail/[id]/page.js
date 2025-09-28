'use client';

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import RelatedProducts from '@/app/componants/RelatedProducts';
import Button from '@/app/componants/Button';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
// import { addToCart } from '@/app/redux/cartSlice/cartSlice'; // adjust path
// import { toggleWishlist } from '@/app/redux/wishlistSlice/wishlistSlice'; // adjust path

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const products = useSelector((state) => state.allproduct.value);
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  // 🔥 Review States
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
      setMainImage(foundProduct?.thumbnail || '/placeholder.jpg');
      setLoading(false);
    }
  }, [products, id]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    alert('Product added to cart!');
  };

  const handleWishlist = () => {
    // dispatch(toggleWishlist(product));
  };

  // 🔥 Add Review Function
  const handleAddReview = () => {
    if (newReview.trim() === '') return alert('Please write a review');

    const reviewData = {
      id: Date.now(),
      text: newReview,
      rating: newRating,
    };

    setReviews([...reviews, reviewData]);
    setNewReview('');
    setNewRating(5);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="rounded-xl overflow-hidden shadow-md">
            {/* <Image
              src={mainImage}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            /> */}
          </div>
          {product.product_images && product.product_images.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {[product.thumbnail, ...product.product_images].map((img, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-blue-500"
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    width={80}
                    height={80}
                    alt="Thumbnail"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 mb-2">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                  size={20}
                />
              ))}
              <span className="ml-2 text-gray-500">{product.rating}.0</span>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
              {product.discountPercentage && (
                <p className="text-sm text-gray-500 line-through">
                  ₹
                  {Math.round(
                    product.price / (1 - product.discountPercentage / 100)
                  )}
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-4">
              <span>Quantity:</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </Button>
              <button
                onClick={handleWishlist}
                className="border rounded px-4 py-2 hover:bg-red-100 transition flex items-center gap-2"
              >
                <Heart size={20} className="text-red-500" />
                Wishlist
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Product Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>



        {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts
          currentProduct={product}
          category={product.category}
          brand={product.brand}
        />
      </div>

      {/* Reviews Section */}
<div className="mt-12">
  <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

  {/* Review Card */}
  <div className="mb-6 p-4 rounded-xl shadow-md border bg-white">
    <h3 className="font-semibold mb-2 text-gray-700">Write a Review</h3>

    {/* Star Rating */}
    <div className="flex items-center mb-2">
      {[1,2,3,4,5].map((num) => (
        <Star
          key={num}
          size={22}
          className={`cursor-pointer transition ${
            num <= newRating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => setNewRating(num)}
        />
      ))}
    </div>

    {/* Review Input */}
    <input
      type="text"
      value={newReview}
      onChange={(e) => setNewReview(e.target.value)}
      placeholder="Write your review..."
      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
    />

    <button
      onClick={handleAddReview}
      className="mt-2 bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition text-sm"
    >
      Submit
    </button>
  </div>

  {/* Reviews List */}
  <div className="space-y-3">
    {reviews.length === 0 ? (
      <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
    ) : (
      reviews.map((r) => (
        <div key={r.id} className="p-3 bg-white rounded-xl shadow-sm border flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < r.rating ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <p className="text-gray-700 text-sm">{r.text}</p>
        </div>
      ))
    )}
  </div>
</div>


    
    </div>
  );
}
