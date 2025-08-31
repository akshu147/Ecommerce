"use client";
import { Star } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Navbar from "../../../componants/Navbar";
import RelatedProducts from "../../../components/RelatedProducts";


export default function Page() {
  const searchParams = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Get parameters from URL
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const image = searchParams.get("image");
  const brand = searchParams.get("brand");
  const description = searchParams.get("description");

  const product = {
    id,
    name: name || "Product Name",
    price: parseFloat(price) || 0,
    brand: brand || "Unknown Brand",
    description: description || "No description available",
    images: [image || "/placeholder.jpg"],
    rating: 4.5,
    reviews: 1200,
    discount: 10,
  };

  // Hardcoded related products removed - now using dynamic RelatedProducts component

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
        {/* Left: Product Images */}
        <div>
              <Image
            src={product.images[selectedImage]}
            alt={product.name}
            width={500}
            height={400}
            unoptimized
            className="rounded-2xl shadow-lg w-full h-[400px] object-contain border"
          />

        







          <div className="flex gap-3 mt-4">
            {product.images.map((img, index) => (
              <Image
                key={index}
                height={80}
                width={80}
                src={img}
                alt="thumbnail"
                unoptimized
                className={`object-contain rounded-lg cursor-pointer border ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
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
            <span className="text-gray-600">
              ({product.reviews} reviews)
            </span>
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

          {/* EMI / Card Offers */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-gray-800 font-medium">
              EMI starts from ₹{Math.round(product.price / 12)}/month
            </p>
            <p className="text-sm text-blue-600 cursor-pointer">
              View Plans & Offers
            </p>
            <ul className="list-disc ml-6 text-gray-700 text-sm">
              <li>10% Instant Discount on HDFC Credit Cards</li>
              <li>No Cost EMI Available</li>
              <li>Extra 5% off with Amazon Pay ICICI card</li>
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h3 className="font-medium mb-1">Brand:</h3>
            <p className="text-gray-700">{product.brand}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium mb-1">Description:</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

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
          <div className="mt-6 text-gray-700 space-y-1">
            <p>✅ Free delivery by <span className="font-medium">Tomorrow</span></p>
            <p>🚚 Cash on Delivery available</p>
            <p>🔄 7-Day Replacement Policy</p>
            <p>🏬 Sold by <span className="font-medium">Apple Retailer Pvt Ltd</span></p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts 
        currentProduct={product} 
        category={product.brand} 
        brand={product.brand} 
      />
    </>
  );
}