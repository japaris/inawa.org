/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Anciennes URL du site statique (avant la refonte de juin 2026) :
    // 301 vers la home pour récupérer l'existant indexé au lieu de servir des 404.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/products/:slug*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
