/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.steampowered.com",
      "hb.imgix.net",
      "image.api.playstation.com",
      "agst.prod.dl.playstation.net",
    ],
  },
};

module.exports = nextConfig;
