"use client";
import { User, Heart, ShoppingBag, CreditCard, Bell, MapPin, LogOut, Settings } from "lucide-react";
import Navbar from "../../componants/Navbar";
import Aside from "../../componants/Aside";
import { Mycontext } from "@/app/context/Authcontext";
import { useContext } from "react";

export default function AccountPage() {
  // const {userdata} = useContext()
  const options = [
    { id: 1, label: "My Orders", icon: <ShoppingBag size={22} /> },
    { id: 2, label: "Favorites", icon: <Heart size={22} /> },
    { id: 3, label: "Payment Methods", icon: <CreditCard size={22} /> },
    { id: 4, label: "Addresses", icon: <MapPin size={22} /> },
    { id: 5, label: "Notifications", icon: <Bell size={22} /> },
    { id: 6, label: "Settings", icon: <Settings size={22} /> },
    { id: 7, label: "Logout", icon: <LogOut size={22} /> },
  ];
  


  return (
    <>
      <Navbar />
      <section className="flex mt-3 gap-6 p-4">
        {/* Sidebar */}
        <Aside />

        {/* Main Content */}
        <main className="rounded-2xl flex-1 p-4 lg:p-8 bg-slate-100">
          <h2 className="text-2xl font-bold mb-4">My Account</h2>

          {/* Profile Card */}
          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={32} className="text-gray-500" />
            </div>
            <div>
              {/* <h3 className="font-semibold text-lg">{userdata.email}</h3> */}
              <p className="text-sm text-gray-500">johndoe@email.com</p>
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
              >
                <div className="text-orange-500 mb-2">{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  );
}
