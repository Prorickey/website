/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/feedback',
        destination: 'https://forms.gle/fAPNfHpUEQf5nfAf7',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
