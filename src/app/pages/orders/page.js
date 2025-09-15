"use client"
import React, { useState } from "react";
import Navbar from "../../componants/Navbar";
import Aside from "../../componants/Aside";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";

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

  return (
    <>
      <Navbar />

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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition"
              >
                <img
                  src={order.img}
                  alt={order.product}
                  className="w-full h-40 object-cover rounded-md mb-3 border"
                />

                <h3 className="font-semibold text-sm mb-1">{order.product}</h3>
                <p className="text-orange-600 text-[13px] font-bold">
                  {order.price}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Ordered on: {order.date}
                </p>

                {/* Status */}
                <div className="flex items-center gap-2 text-sm font-medium mt-auto">
                  {order.status === "Delivered" && (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle size={16} /> Delivered
                    </span>
                  )}
                  {order.status === "Shipped" && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <Truck size={16} /> Shipped
                    </span>
                  )}
                  {order.status === "Cancelled" && (
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle size={16} /> Cancelled
                    </span>
                  )}
                  {order.status === "Processing" && (
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Package size={16} /> Processing
                    </span>
                  )}
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
