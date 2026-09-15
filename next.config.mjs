/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Ті самі формати, що віддавала Astro-версія.
    formats: ["image/webp"],
  },

  // Якщо треба чиста статика без Node на хості — розкоментуйте.
  // Ціна: next/image втрачає ресайз, і на телефон поїдуть повнорозмірні
  // кадри. Тоді має сенс заздалегідь нарізати їх скриптом.
  // output: "export",
  // images: { unoptimized: true },
};

export default nextConfig;
