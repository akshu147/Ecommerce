"use client";
import { User, Heart, ShoppingBag, CreditCard, Bell, MapPin, LogOut, Settings } from "lucide-react";
import Aside from "../../componants/Aside";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaPaypal } from "react-icons/fa";

export default function AccountPage() {
  const userdatava = useSelector((state) => state.userdata.value);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");

  const options = [
    { id: 1, label: "My Orders", icon: <ShoppingBag size={22} /> },
    { id: 2, label: "Favorites", icon: <Heart size={22} /> },
    { id: 3, label: "Payment Methods", icon: <CreditCard size={22} /> },
    { id: 4, label: "Addresses", icon: <MapPin size={22} /> },
    { id: 5, label: "Notifications", icon: <Bell size={22} /> },
    { id: 6, label: "Settings", icon: <Settings size={22} /> },
    { id: 7, label: "Logout", icon: <LogOut size={22} /> },
  ];

  // Payment options
  const paymentMethods = [
    { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={20} /> },
    { id: "paypal", label: "PayPal", icon: <FaPaypal size={20} /> },
    { id: "wallet", label: "Wallet", icon: <User size={20} /> },
  ];

  return (
    <>
      <section className="flex mt-3 gap-6 p-4">
        <Aside />
        <main className="rounded-2xl flex-1 p-4 lg:p-8 bg-slate-100">
          <h2 className="text-2xl font-bold mb-4">My Account</h2>

          {/* Profile Card */}
          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={32} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{userdatava.email}</p>
              <button className="text-orange-500 text-xs mt-1 hover:underline">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {options.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer"
                onClick={() => item.label === "Payment Methods" && setShowPaymentModal(true)}
              >
                <div className="text-orange-500 mb-2">{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </main>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-[#00000060] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

            {/* Payment Options */}
            <div className="flex flex-col gap-3 mb-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                    selectedMethod === method.id
                      ? "bg-blue-500 text-white border-transparent"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {method.icon}
                  {method.label}
                </button>
              ))}
            </div>

            {/* Card Form */}
            {selectedMethod === "card" && (
              <div className="flex flex-col gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <button className="w-full p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
              Pay Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
