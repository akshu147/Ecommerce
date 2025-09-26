"use client";
import { Star, Heart } from "lucide-react";
import { useState} from "react";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import Navbar from "../../../componants/Navbar";
import RelatedProducts from "../../../componants/RelatedProducts";

export default function Page() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Get parameters from URL
  const id = params.id;
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const image = searchParams.get("image");
  const brand = searchParams.get("brand");
  const description = searchParams.get("description");
  const productImages = JSON.parse(searchParams.get("product_images") || "[]");
  const serverfilepath = searchParams.get("serverfilepath");

  const product = {
    id,
    name: name || "Product Name",
    price: parseFloat(price) || 0,
    brand: brand || "Unknown Brand",
    description: description || "No description available",
    images: productImages.length ? productImages : [image || "/placeholder.jpg"],
    imagepath: serverfilepath,
    rating: 4.5,
    reviews: 1200,
    discount: 10,
  };

  const handleWishlistToggle = () => {
    // if (isInWishlist(product.id)) {
    //   removeFromWishlist(product.id);
    // } else {
    //   addToWishlist(product);
    // }
  };
  

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
        {/* Left: Product Images */}
        <div>
          {/* Main Image */}
          <Image
            src={`${product.imagepath}/${product.images[selectedImage]}`}
            alt={product.name}
            width={500}
            height={400}
            unoptimized
            className="rounded-2xl shadow-lg w-full h-[400px] object-contain border"
          />

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {product.images.map((img, index) => (
              <Image
                key={index}
                height={80}
                width={80}
                src={`${product.imagepath}/${img}`}
                alt={`Thumbnail ${index}`}
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
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl px-6 py-1 shadow">
              Add to Cart
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl px-6 py-1 shadow">
              Buy Now
            </button>
            <button
              onClick={handleWishlistToggle}
              // className={`font-bold rounded-xl px-6 py-2 shadow flex items-center gap-2 ${
              //   isInWishlist(product.id)
              //     ? "bg-red-500 hover:bg-red-600 text-white"
              //     : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              // }`}
            >
              <Heart
                // className={`w-5 h-5 ${
                //   isInWishlist(product.id) ? "fill-current" : ""
                // }`}
              />
              {/* {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"} */}
            </button>
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
