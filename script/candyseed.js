const candyList = [
  {
    name: 'Jelly Beans',
    description:
      'Gummi bears pastry cake fruitcake liquorice jelly beans marshmallow.',
    category: 'Fruity',
    quantity: 48,
    price: 199,
    image: '/candies/beans.jpeg',
  },
  {
    name: 'Gummy Bears',
    description: 'Gingerbread halvah candy canes.',
    category: 'Chewy',
    quantity: 98,
    price: 99,
    image: '/candies/bears.jpeg',
  },
  {
    name: 'Candy Canes',
    description:
      'Sweet dragée cheesecake candy canes candy pastry bear claw macaroon.',
    category: 'Holiday',
    quantity: 21,
    price: 299,
    image: '/candies/canes.jpeg',
  },
  {
    name: 'Fruit Crunches',
    description:
      'Gummi bears chocolate cake sweet roll candy canes caramels lollipop cheesecake.',
    category: 'Fruity',
    quantity: 11,
    price: 99,
    image: '/candies/fruits.jpeg',
  },
  {
    name: 'Hard Candies',
    description: 'Bonbon topping tootsie roll chocolate bar.',
    category: 'Hard Candy',
    quantity: 87,
    price: 199,
    image: '/candies/hardcandies.jpeg',
  },
  {
    name: 'Sweet Hearts',
    description: 'Jujubes gingerbread jelly-o danish.',
    category: 'Holiday',
    quantity: 79,
    price: 499,
    image: '/candies/hearts.jpeg',
  },
  {
    name: 'Lollipop',
    description:
      'Candy jelly sesame snaps tart cookie candy canes chocolate icing.',
    category: 'Lollipop',
    quantity: 33,
    price: 299,
    image: '/candies/lollipop.jpeg',
  },
  {
    name: 'Fruit Chews',
    description: 'Donut topping ice cream candy canes apple pie.',
    category: 'Fruity',
    quantity: 61,
    price: 299,
    image: '/candies/slices.jpeg',
  },
  {
    name: 'Gummy Worms',
    description: 'Chupa chups chocolate bar lemon drops.',
    category: 'Chewy',
    quantity: 99,
    price: 199,
    image: '/candies/worms.jpeg',
  },
]

const candyNames = [
  'Jelly Beans',
  'Gummy Bears',
  'Candy Canes',
  'Fruit Chews',
  'Hard Candies',
  'Sweet Hearts',
  'Lollipops',
  'Fruit Crunches',
  'Gummy Worms',
  'Gumballs',
  'Jujubes',
  'Lemon Drops',
  'Taffy',
]

const candyDescriptions = [
  'Gummi bears pastry cake fruitcake liquorice jelly beans marshmallow.',
  'Gingerbread halvah candy canes.',
  'Sweet dragée cheesecake candy canes candy pastry bear claw macaroon gingerbread.',
  'Gummi bears chocolate cake sweet roll candy canes caramels lollipop cheesecake ice cream.',
  'Bonbon topping tootsie roll chocolate bar.',
  'Jujubes gingerbread jelly-o danish.',
  'Candy jelly sesame snaps tart cookie candy canes chocolate icing.',
  'Donut topping ice cream candy canes apple pie.',
  'Chupa chups chocolate bar lemon drops.',
  'Topping candy canes brownie lollipop gummi bears caramels sweet sweet.',
  'Cookie sugar plum chupa chups cheesecake chupa chups.',
]

const candyPrices = [99, 199, 299, 399, 499]

const candyImages = [
  'beans.jpeg',
  'bears.jpeg',
  'canes.jpeg',
  'fruits.jpeg',
  'hardcandies.jpeg',
  'hearts.jpeg',
  'lollipop.jpeg',
  'slices.jpeg',
  'worms.jpeg',
]

const candyCategories = ['Hard Candy', 'Chocolate', 'Fruity', 'Gummy']

for (let i = 0; i < 60; i++) {
  let name = candyNames[Math.floor(Math.random() * candyNames.length)]
  let description =
    candyDescriptions[Math.floor(Math.random() * candyDescriptions.length)]
  let category =
    candyCategories[Math.floor(Math.random() * candyCategories.length)]
  let quantity = Math.floor(Math.random() * 100)
  let price = candyPrices[Math.floor(Math.random() * candyPrices.length)]
  let image = `/candies/${
    candyImages[Math.floor(Math.random() * candyImages.length)]
  }`
  candyList.push({
    name,
    description,
    category,
    quantity,
    price,
    image,
  })
}

module.exports = candyList
