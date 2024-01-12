const mapper = (listing) => {
  // const baseUrl = "http://192.168.0.21:8000/assets/";
  const baseUrl = "https://socia-cart-api-v1.onrender.com/assets";
  const mapImage = (image) => ({
    url: `${baseUrl}${image.fileName}.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}.jpg`,
  });

  return {
    ...listing,
    images: listing.images.map(mapImage),
  };
};

module.exports = mapper;
