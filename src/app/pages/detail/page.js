"use client";
import { Star } from "lucide-react";
import { useState } from "react";

export default function page() {
  const [selectedImage, setSelectedImage] = useState(0);
  const product = {
    name: "Apple iPhone 15 Pro Max (256 GB)",
    price: 139900,
    discount: 10,
    rating: 4.5,
    reviews: 1200,
    description:
      "The iPhone 15 Pro Max features a 6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, and advanced camera system.",
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blacktitanium",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-front",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-camera",
    ],
    variants: ["Black Titanium", "Blue Titanium", "Natural Titanium"],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
      {/* Left: Product Images */}
      <div>
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="rounded-2xl shadow-md w-full h-[400px] object-contain"
        />
        <div className="flex gap-3 mt-4">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className={`w-20 h-20 object-contain rounded-lg cursor-pointer border ${
                selectedImage === index ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-gray-600">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div>
          <span className="text-3xl font-bold text-red-600">
            ₹{(product.price * (1 - product.discount / 100)).toLocaleString()}
          </span>
          <span className="ml-3 line-through text-gray-500">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="ml-2 text-green-600 font-semibold">
            {product.discount}% off
          </span>
        </div>

        {/* Variants */}
        <div>
          <h3 className="font-medium mb-1">Available Colors:</h3>
          <div className="flex gap-3">
            {product.variants.map((variant, i) => (
              <button
                key={i}
                className="px-4 py-2 border rounded-xl hover:bg-gray-100"
              >
                {variant}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700">{product.description}</p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl px-6 py-2 shadow">
            Add to Cart
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl px-6 py-2 shadow">
            Buy Now
          </button>
        </div>

        {/* Delivery Info */}
        <div className="mt-6 text-gray-700">
          <p>
            ✅ Free delivery by <span className="font-medium">Tomorrow</span>
          </p>
          <p>🚚 Cash on Delivery available</p>
        </div>
      </div>
    </div>
  );
}
