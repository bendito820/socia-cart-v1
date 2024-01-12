const mapper = (listing) => {
  const baseUrl = "http://192.168.0.13:8000/assets/";
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
