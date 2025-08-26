"use client";
import { useContext, useEffect, useState } from "react";
import Head from "../../componants/Head";
import Navbar from "../../componants/Navbar";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import { Mycontext } from "../../context/Authcontext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of products per page
  const nav = useRouter();
  const { wishlistItems, setWishlistItems,searchTerm, setDummyData, dummydata } =
    useContext(Mycontext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [categories, setCategories] = useState([]);
  const brands = ["WoodCraft", "FurniHouse", "HomeLux", "ComfortLine"];
  const [loading, setLoading] = useState(false);

  

  // Fetch products
  const fetchDummyData = async () => {
    setLoading(true);
    try {
      const allProduct = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );
      setDummyData(allProduct.data.products);

      const allCategories = [
        ...new Set(allProduct.data.products.map((p) => p.category)),
      ];
      setCategories(allCategories);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDummyData();
  }, []);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(savedWishlist);
  }, [setWishlistItems]);

  const addToWishlist = (product) => {
    if (wishlistItems.some((item) => item.id === product.id))
      return alert("Already in wishlist");
    const updated = [...wishlistItems, product];
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  // Filtered products
  const allProductData = dummydata.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesBrand =
      !selectedBrand || (p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // Pagination logic
  const totalPages = Math.ceil(allProductData.length / itemsPerPage);
  const currentItems = allProductData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBrand, maxPrice]);

  return (
    <>
      <Head />
      <Navbar />
      <div className="flex flex-col md:flex-row p-5 items-start justify-between">
        {/* Sidebar */}
        <aside className="w-full md:w-1/5 p-4 bg-gray-100 rounded-xl space-y-6">
   
          <div>
            <h2 className="font-bold mb-2">Category</h2>
            {categories.map((cat) => (
              <label key={cat} className="block cursor-pointer">
                <input
                  type="radio"
                  className="mr-2"
                  checked={selectedCategory.toLowerCase() === cat.toLowerCase()}
                  onChange={() => setSelectedCategory(cat)}
                />
                {cat}
              </label>
            ))}
            <button
              className="mt-2 text-sm bg-black text-white p-[2px_5px] rounded-md font-bold"
              onClick={() => setSelectedCategory("")}
            >
              Clear Category
            </button>
          </div>

          <div>
            <h2 className="font-bold mb-2">Brand</h2>
            {brands.map((brand) => (
              <label key={brand} className="block cursor-pointer">
                <input
                  type="radio"
                  className="mr-2"
                  checked={selectedBrand.toLowerCase() === brand.toLowerCase()}
                  onChange={() => setSelectedBrand(brand)}
                />
                {brand}
              </label>
            ))}
            <button
              className="mt-2 text-sm bg-black text-white p-[2px_5px] rounded-md font-bold"
              onClick={() => setSelectedBrand("")}
            >
              Clear Brand
            </button>
          </div>

          <div>
            <h2 className="font-bold mb-2">Max Price: ${maxPrice}</h2>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="w-full"
            />
          </div>
        </aside>

        {/* Products Grid */}
        <main className="product-ui w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 overflow-y-auto">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : currentItems.length ? (
            currentItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <Link
                    href={`/pages/detail/${product.id}?name=${encodeURIComponent(
                      product.title
                    )}&price=${product.price}&image=${encodeURIComponent(
                      product.thumbnail
                    )}&brand=${encodeURIComponent(
                      product.brand || ""
                    )}&description=${encodeURIComponent(product.description || "")}`}
                  >
                    <Image
                      src={product.thumbnail}
                      width={300}
                      height={200}
                      alt={product.title}
                      unoptimized
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    {isInWishlist(product.id) ? (
                      <GoHeartFill className="w-5 h-5 text-red-500" />
                    ) : (
                      <GoHeart className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xl text-blue-600">
                      ${product.price}
                    </p>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                      {product.discountPercentage}% off
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          )}
        </main>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center my-8"> 
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-l-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="mx-4 flex items-center">
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
