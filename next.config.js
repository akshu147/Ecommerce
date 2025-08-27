/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",   // Unsplash
      "res.cloudinary.com",    // Cloudinary
      "cdn.pixabay.com",       // Pixabay
      "images.pexels.com",     // Pexels
      "lh3.googleusercontent.com", // Google Images / Profile pics
      "firebasestorage.googleapis.com", // Firebase storage
      "i.ibb.co",              // ibb image hosting
      "img.freepik.com",       // Freepik
      "upload.wikimedia.org",  // Wikipedia / Wikimedia
       "i.pravatar.cc",
        "w0.peakpx.com",
    ],
  },
}

module.exports = nextConfig
