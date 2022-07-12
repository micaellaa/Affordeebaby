const products = [
  {
    id: 1,
    category: 'product',
    name: 'Checkered Crop Top',
    categoryno: 1,
    price: 9.99,
    about:
      'Up to 20 hours battery life | Super powerful Bass | 40mm dynamic driver | Pressure less ear muffs | Bluetooth 5.0 | Voice control',
    isOff: true,
    offPercentage: 10,
    img: require('../assets/checkeredtop.png'),
    like: true,
    isAvailable: true,
    productImageList: [
      require('../assets/checkeredtop.png'),
      require('../assets/checkeredtop.png'),
      require('../assets/checkeredtop.png'),
    ],
  },
  {
    id: 2,
    category: 'product',
    name: 'Lettuce Crop Top',
    categoryno: 1,
    price: 9.99,
    about:
      'boAt Rockerz 450 M is an on-ear wireless headset that has been ergonomically designed to meet the needs of music lovers.',
    isOff: false,
    img: require('../assets/lettucetop.png'),
    like: true,
    isAvailable: true,
    productImageList: [
      require('../assets/lettucetop.png'),
      require('../assets/lettucetop.png'),
      require('../assets/lettucetop.png'),
    ],
  },

];

export default products;

/*export function getProduct(id){
    return products.find((product) => product.id == id);
} */