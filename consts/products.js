const products = [
  {
    id: 1,
    category: 'product',
    name: 'Checkered Crop Top',
    categoryno: 1,
    price: 9.99,
    about:
      'Petite | Checkered print | Crop | Tank Top',
    isOff: true,
    offPercentage: 10,
    img: require('../assets/checkeredtop.png'),
    like: true,
    isAvailable: true,
    productImageList: [
      require('../assets/checkeredtop.png'),
      require('../assets/checkeredCropTop2.png'),
      require('../assets/checkeredCropTop3.png'),
    ],
  },
  {
    id: 2,
    category: 'product',
    name: 'Lettuce Crop Top',
    categoryno: 1,
    price: 9.99,
    about:
      'Lettuce edge | Crop top | Green | Ribbed',
    isOff: false,
    img: require('../assets/lettucetop.png'),
    like: true,
    isAvailable: true,
    productImageList: [
      require('../assets/lettucetop.png'),
      require('../assets/lettuceTop2.png'),
      require('../assets/lettuceTop3.png'),
    ],
  },

  {
    id: 3,
    category: 'product',
    name: 'Floral Cami Dress',
    categoryno: 3,
    price: 12.00,
    about:
      'Floral print| Slit thigh | Cami | Front Tie',
    isOff: false,
    img: require('../assets/floralDress.png'),
    like: true,
    isAvailable: true,
    productImageList: [
      require('../assets/floralDress.png'),
      require('../assets/floralDress2.png'),
      require('../assets/floralDress3.png'),
    ],
  },

  {
    id: 4,
    category: 'product',
    name: 'Ruched Bodycon Dress',
    categoryno: 3,
    price: 12.00,
    about:
      'Ruched | Bodycon | Backless | White',
    isOff: false,
    img: require('../assets/ruchedDress.png'),
    like: true,
    isAvailable: true,
    productImageList: [
      require('../assets/ruchedDress.png'),
      require('../assets/ruchedDress2.png'),
      require('../assets/ruchedDress3.png'),
    ],
  },

  {
    id: 5,
    category: 'product',
    name: 'Wide leg shorts',
    categoryno: 2,
    price: 12.00,
    about:
      'Solid slant pocket | Wide leg | Flare shorts | Pink',
    isOff: false,
    img: require('../assets/wideLegShorts.png'),
    like: true,
    isAvailable: true,
    productImageList: [
      require('../assets/wideLegShorts.png'),
      require('../assets/wideLegShorts2.png'),
      require('../assets/wideLegShorts3.png'),
    ],
  },


];

export default products;

/*export function getProduct(id){
    return products.find((product) => product.id == id);
} */