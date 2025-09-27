"use client";
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function RelatedProducts({ currentProduct, category, brand }) {
  const alldata = useSelector(state=> state.allproduct.value);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (alldata.length > 0 && currentProduct) {
      // Filter related products
      let filtered = alldata.filter(product => 
        product.id !== currentProduct.id && 
        (product.category === category || product.brand === brand)
      );

      // Limit to 8 products and sort by relevance
      filtered = filtered
        .sort((a, b) => {
          // Prioritize same category, then same brand
          const aScore = (a.category === category ? 2 : 0) + (a.brand === brand ? 1 : 0);
          const bScore = (b.category === category ? 2 : 0) + (b.brand === brand ? 1 : 0);
          return bScore - aScore;
        })
        .slice(0, 8);

      setRelatedProducts(filtered);
      setLoading(false);
    }
  }, [alldata, currentProduct, category, brand]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border rounded-xl shadow p-4 animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/pages/detail/${product.id}?name=${encodeURIComponent(product.title)}&price=${product.price}&image=${encodeURIComponent(product.thumbnail)}&brand=${encodeURIComponent(product.brand || '')}&description=${encodeURIComponent(product.description || '')}`}
            className="border rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
              unoptimized
              className="w-full h-40 object-contain rounded"
            />
            <h3 className="mt-2 text-sm font-medium line-clamp-2">{product.title}</h3>
            <p className="text-red-600 font-semibold">₹{product.price}</p>
            <p className="text-xs text-gray-500">{product.brand}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
