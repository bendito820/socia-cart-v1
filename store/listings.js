const listings = [
  {
    id: 4,
    title: "Coxa de Frango 3U",
    price: 2300,
    description: "Coxa de frango 3 unidades",
    category: "frozen",
    images: [{ fileName: "caixa-de-frango" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },

  {
    id: 5,
    title: "Peixe Arrancador",
    price: 33350,
    description: "Peixe Arrancador Caixa (20kg)",
    category: "fish",
    images: [{ fileName: "peixe" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 6,
    title: "Perna de Frango",
    price: 17649,
    description: "Perna de Frango - Caixa (10kg)",
    category: "frozen",
    images: [{ fileName: "perna-frango" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 7,
    title: "Meia Caixa - Perna de Frango",
    price: 8743.47,
    description: "Perna de Frango - Meia Caixa (5kg)",
    category: "frozen",
    images: [{ fileName: "perna-frango" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 8,
    title: "Perna de Frango",
    price: 4417.24,
    description: "Perna de Frango -  Caixa (2kg)",
    category: "frozen",
    images: [{ fileName: "perna-frango" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },

  // Hereee!
  {
    id: 9,
    title: "Linguiça - 4U",
    price: 145555.88,
    description: "Linguiça -  4 unidades (1kg)",
    category: "frozen",
    images: [{ fileName: "linguiça" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 10,
    title: "Linguiça - 3U",
    price: 10973.2,
    description: "Linguiça -  3 unidades /(1kg)",
    category: "frozen",
    images: [{ fileName: "linguiça" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 11,
    title: "Arroz Patriota (5kg)",
    price: 10973.2,
    description: "Arroz Patriota - Caixa de 12 unidades (5kg)",
    category: "cereal",
    images: [{ fileName: "arroz" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 12,
    title: "Massa Esparguete Primaveira",
    price: 6448.19,
    description:
      "Massa Esparguete Primaveira - Caixa de 20 unidades - Poupas 45,69kz",
    category: "cereal",
    images: [{ fileName: "massa-esparguete" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 13,
    title: "Massa Penne Macarrão Rigate Primaveira",
    price: 6757.31,
    description:
      "Massa Macarrão Rigate Primaveira - Caixa de 20 unidades - Poupas 42,50kz",
    category: "cereal",
    images: [{ fileName: "massa-macarrão" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 14,
    title: "Peixe Carapau - 15kg",
    price: 28807.59,
    description: "Peixe Carapau - 15kg - Poupas 442,50kz",
    category: "fish",
    images: [{ fileName: "peixe-carapau" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 15,
    title: "Peixe Pescado - 10kg",
    price: 16643.33,
    description: "Peixe Pescado - 10kg - Poupas 256,67kz",
    category: "fish",
    images: [{ fileName: "peixe-pescado" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 16,
    title: "Ovos - 4U",
    price: 16404.52,
    description: "Ovos - 4 ubidades - 10kg - Poupas 169,67kz",
    category: "lacteo",
    images: [{ fileName: "ovo-4u" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 17,
    title: "Coxa USA KOCH Foods",
    price: 15379.28,
    description: "Coxa USA KOCH Foods - 10kg - Poupas 96,72kz",
    category: "chicken",
    images: [{ fileName: "coxa-usa" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 18,
    title: "Coxa Seara Brazil",
    price: 15379.28,
    description: "Coxa Seara Brazil - 10kg - Poupas 106,72kz",
    category: "chicken",
    images: [{ fileName: "coxa-brazil" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 19,
    title: "Asa de Peru",
    price: 33985.59,
    description: "Asa de Peru - 10kg - Poupas 216,72kz",
    category: "chicken",
    images: [{ fileName: "asa-frango" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 20,
    title: "Galinha Rija Dura",
    price: 15351.71,
    description: "Galinha Rija Dura - 5 Unidades - Poupas 216,72kz",
    category: "chicken",
    images: [{ fileName: "hard-chicken" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 21,
    title: "Frango Perdix",
    price: 11431.37,
    description: "Frango Perdix - 3 Unidades - Poupas 118,39kz",
    category: "chicken",
    images: [{ fileName: "frango-perdix" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 22,
    title: "Leite Meio Gordo Mimosa 1L",
    price: 10000,
    description:
      "Leite Meio Gordo Mimosa 1L - Caixa 12 Unidades - Poupas 155,39kz",
    category: "lacteo",
    images: [{ fileName: "mimosa" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 23,
    title: "Leite Meio Gordo Mimosa 1L 4UN",
    price: 6701.29,
    description:
      "Leite Meio Gordo Mimosa 1L - Caixa 4 Unidades - Poupas 69,39kz",
    category: "lacteo",
    images: [{ fileName: "mimosa" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 24,
    title: "Leite Meio Gordo Mimosa 1L 3UN",
    price: 5051.29,
    description:
      "Leite Meio Gordo Mimosa 1L - Caixa 3 Unidades - Poupas 25,39kz",
    category: "lacteo",
    images: [{ fileName: "mimosa" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 25,
    title: "5 KG - Batata Rena Nacional ",
    price: 4536.98,
    description: "Batata Rena Nacional - Caixa de  5 KG - Poupas 25,39kz",
    category: "vegetable",
    images: [{ fileName: "batata-rena" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 26,
    title: "5 KG - Cebola Nacional",
    price: 7959,
    description: "Cebola Nacional- Caixa de  5 KG - Poupas 25,39kz",
    category: "vegetable",
    images: [{ fileName: "cebola" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 27,
    title: "5 KG - Batata Doce Nacional",
    price: 6504,
    description: "Batata Doce Nacional- Caixa de  5 KG - Poupas 33,39kz",
    category: "vegetable",
    images: [{ fileName: "batata-doce" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 28,
    title: "Banana Pão",
    price: 1400,
    description: "Banana Pão Nacional- Caixa de  1 KG - Poupas 33,39kz",
    category: "vegetable",
    images: [{ fileName: "banana-pão" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 29,
    title: "Abacate Nacional",
    price: 1900,
    description: "Abacate Nacional -  2,50 KG - Poupas 33,39kz",
    category: "vegetable",
    images: [{ fileName: "abacate" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
  {
    id: 30,
    title: "GIMBOA",
    price: 800,
    description: "GIMBOA - 1.00 - Poupas 33,39kz",
    category: "vegetable",
    images: [{ fileName: "gimboa" }],
    rating: {
      rate: 4.9,
      count: 120,
    },
  },
];

const addListing = (listing) => {
  listing.id = listings.length + 1;
  listings.push(listing);
};

const getListings = () => listings;

const getListing = (id) => listings.find((listing) => listing.id === id);

const filterListings = (predicate) => listings.filter(predicate);

module.exports = {
  addListing,
  getListings,
  getListing,
  filterListings,
};
