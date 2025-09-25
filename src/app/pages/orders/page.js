'use client'
import React, { useState } from "react";
import Aside from "../../componants/Aside";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image"; // ✅ Import Image

const OrdersPage = () => {
  const [orders] = useState([
    {
      id: "ORD12345",
      product: "Meja Tamu / Samping Minimalist",
      price: "Rp. 3.829.000",
      date: "12 Sept 2025",
      status: "Delivered",
      img: "https://via.placeholder.com/150",
    },
    {
      id: "ORD12346",
      product: "RISATOR Keranjang",
      price: "Rp. 164.000",
      date: "09 Sept 2025",
      status: "Shipped",
      img: "https://via.placeholder.com/150",
    },
    {
      id: "ORD12347",
      product: "Meja Tamu Minimalist",
      price: "Rp. 48.500",
      date: "01 Sept 2025",
      status: "Cancelled",
      img: "https://via.placeholder.com/150",
    },
  ]);

  const statusStyle = {
    Delivered: "bg-green-100 text-green-700 border border-green-300",
    Shipped: "bg-blue-100 text-blue-700 border border-blue-300",
    Cancelled: "bg-red-100 text-red-700 border border-red-300",
    Processing: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  };

  const statusIcon = {
    Delivered: <CheckCircle size={16} />,
    Shipped: <Truck size={16} />,
    Cancelled: <XCircle size={16} />,
    Processing: <Package size={16} />,
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex justify-between items-center p-4 shadow bg-white sticky top-0 z-50">
        <h1 className="font-bold text-lg">My Orders</h1>
      </div>

      <section className="flex mt-3 gap-6 p-4">
        {/* Sidebar */}
        <Aside />

        {/* Main Content */}
        <main className="rounded-2xl flex-1 p-4 lg:p-8 bg-slate-100">
          <h2 className="text-2xl font-bold mb-2">Orders</h2>
          <p className="text-gray-500 mb-6">
            Track your recent purchases and their delivery status.
          </p>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-gray-500">#{order.id}</span>
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${statusStyle[order.status]}`}
                  >
                    {statusIcon[order.status]} {order.status}
                  </span>
                </div>

                {/* Product Image */}
                <div className="w-full h-40 relative mb-3 border rounded-md overflow-hidden">
                  <Image
                    src={order.img}
                    alt={order.product}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Product Details */}
                <h3 className="font-semibold text-sm mb-1">{order.product}</h3>
                <p className="text-orange-600 text-[13px] font-bold">
                  {order.price}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Ordered on: {order.date}
                </p>

                {/* Actions */}
                <div className="mt-auto flex gap-3">
                  <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700 transition">
                    Track
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs border hover:bg-gray-200 transition">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default OrdersPage;
