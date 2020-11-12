const candy = [
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

let candyCounter = 0
let candyList = []

for (let i = 0; i < 60; i++) {
  if (candyCounter === candy.length) {
    candyCounter = 0
  }
  candyList.push(candy[candyCounter])
  candyCounter++
}

module.exports = candyList
