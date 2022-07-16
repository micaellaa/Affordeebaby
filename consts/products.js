const products = [
  {
    id: 1,
    category: "product",
    name: "Checkered Crop Top",
    categoryno: 1,
    price: 6.99,
    about:
      "Multicolor | Casual | Tank | Crop | Slim Fit | 90% Polyester, 4% Elastane | Machine Wash",
    isOff: true,
    offPercentage: 10,
    img: require("../assets/checkeredtop.png"),
    like: true,
    isAvailable: true,
    productImageList: [
      require("../assets/checkeredtop.png"),
      require("../assets/checkeredtop.png"),
      require("../assets/checkeredtop.png"),
    ],
  },
  {
    id: 2,
    category: "product",
    name: "Lettuce Crop Top",
    categoryno: 1,
    price: 9.99,
    about:
      "Green | Casual | Shirt | Crop | Slim Fit | 50% Cotton, 50% Polyester | Machine Wash",
    isOff: false,
    img: require("../assets/lettucetop.png"),
    like: true,
    isAvailable: true,
    productImageList: [
      require("../assets/lettucetop.png"),
      require("../assets/lettucetop.png"),
      require("../assets/lettucetop.png"),
    ],
  },
];

export default products;

/*export function getProduct(id){
    return products.find((product) => product.id == id);
} */
