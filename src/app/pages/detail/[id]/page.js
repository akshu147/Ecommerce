'use client';

import { useParams } from 'next/navigation';
import jwt from "jsonwebtoken"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import RelatedProducts from '@/app/componants/RelatedProducts';
import Button from '@/app/componants/Button';
import { Heart, Star } from 'lucide-react';
import { addToCart } from '@/app/redux/cartSlice/cartSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const products = useSelector((state) => state.allproduct.value);
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  const [reviews] = useState([
    { id: 1, user: 'Rohit Sharma', rating: 5, text: 'Bahut accha product hai, quality mast hai!' },
    { id: 2, user: 'Anjali Verma', rating: 4, text: 'Product accha hai but delivery thoda late tha.' },
    { id: 3, user: 'Sameer Khan', rating: 3, text: 'Thik thak hai, price ke hisaab se average hai.' },
  ]);

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

 const handleAddToCart = async (p) => {
  try {
    const token = localStorage.getItem("accessToken");
    const user = jwt.decode(token);

    // sirf required fields bhejo
    let productToAdd = {
      user_id: user.id,
      product_id: p.id,
      title: p.title,
      price: Number(p.price),
      quantity: quantity,  // ab ye guaranteed jayega
      image: p.thumbnail
    };

    console.log("Sending product:", productToAdd);

    const response = await axios.post(
      "http://localhost:4000/api/cart/add-to-cart",
      productToAdd,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Response:", response.data);

    dispatch(addToCart(productToAdd));
    toast.success("Product added to cart!");
  } catch (err) {
    console.error("Add to cart error:", err);
    toast.error(`Something went wrong: ${err.message}`);
  }
};


  const handleWishlist = () => {
    // dispatch(toggleWishlist(product));
  };

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="rounded-xl overflow-hidden shadow-md"></div>
          {product.product_images && product.product_images.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {[product.thumbnail, ...product.product_images].map((img, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-blue-500"
                  onClick={() => setMainImage(img)}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 mb-2">{product.brand}</p>

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'}
                  size={20}
                />
              ))}
              <span className="ml-2 text-gray-500">{avgRating.toFixed(1)}</span>
              <span className="ml-2 text-sm text-gray-400">({reviews.length} Reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
              {product.discountPercentage && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{Math.round(product.price / (1 - product.discountPercentage / 100))}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span>Quantity:</span>
              <div className="flex items-center border rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-gray-200">-</button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-gray-200">+</button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={()=> handleAddToCart(product)}
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

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Product Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts currentProduct={product} category={product.category} brand={product.brand} />
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center border p-4 rounded-xl w-full md:w-1/3">
            <span className="text-4xl font-bold">{avgRating.toFixed(1)}</span>
            <div className="flex gap-1 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <p className="text-gray-500 text-sm">{reviews.length} Verified Buyers</p>
          </div>

          <div className="flex-1">
            {ratingCounts.map((item) => (
              <div key={item.star} className="flex items-center gap-2 mb-1">
                <span className="w-10 text-sm">{item.star} ★</span>
                <div className="flex-1 bg-gray-200 h-2 rounded">
                  <div className="bg-yellow-400 h-2 rounded" style={{width: `${(item.count / reviews.length) * 100 || 0}%`}}></div>
                </div>
                <span className="text-sm w-6 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="p-4 border rounded-xl shadow-sm bg-white">
              <div className="flex items-center gap-2 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < r.rating ? 'text-yellow-400' : 'text-gray-300'} />
                ))}
                <span className="text-sm font-medium">{r.user}</span>
              </div>
              <p className="text-gray-700 text-sm">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
