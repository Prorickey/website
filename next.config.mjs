/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['172.20.10.2'],
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
