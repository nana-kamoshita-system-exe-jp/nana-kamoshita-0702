/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/nana-kamoshita-0702' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig