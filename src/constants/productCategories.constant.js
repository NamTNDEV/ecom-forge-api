const PRODUCT_CATEGORIES = Object.freeze({
  CLOTHING: 'clothing',
  ELECTRONICS: 'electronics',
  ACCESSORIES: 'accessories',
  HOME: 'home',
  BOOKS: 'books',
  BEAUTY: 'beauty',
  TOYS: 'toys',
});

const PRODUCT_CATEGORIES_ENUM = Object.values(PRODUCT_CATEGORIES);
module.exports = { PRODUCT_CATEGORIES, PRODUCT_CATEGORIES_ENUM };
