'use client'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl text-gray-500">👤</span>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <p className="text-sm text-gray-500">Member since January 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Personal Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Full Name:</span> John Doe</p>
                <p><span className="font-medium">Email:</span> john.doe@example.com</p>
                <p><span className="font-medium">Phone:</span> +1 (555) 123-4567</p>
                <p><span className="font-medium">Location:</span> New York, USA</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Account Stats</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Orders:</span> 12</p>
                <p><span className="font-medium">Wishlist Items:</span> 5</p>
                <p><span className="font-medium">Reviews:</span> 8</p>
                <p><span className="font-medium">Member Level:</span> Gold</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
            <div className="space-y-2">
              <p className="text-sm">• Placed order #12345 - 2 days ago</p>
              <p className="text-sm">• Added product to wishlist - 3 days ago</p>
              <p className="text-sm">• Wrote a review - 1 week ago</p>
              <p className="text-sm">• Updated profile information - 2 weeks ago</p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
