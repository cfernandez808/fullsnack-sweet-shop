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
  'Taffy'
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
  'Cookie sugar plum chupa chups cheesecake chupa chups.'
]

const candyPrices = [0.99, 1.99, 2.99, 3.99, 4.99]

const candyImages = [
  'beans.jpeg',
  'bears.jpeg',
  'canes.jpeg',
  'fruits.jpeg',
  'hardcandies.jpeg',
  'hearts.jpeg',
  'lollipop.jpeg',
  'slices.jpeg',
  'worms.jpeg'
]

let candyList = []

for (let i = 0; i < 60; i++) {
  let name = candyNames[Math.floor(Math.random() * candyNames.length)]
  let description =
    candyDescriptions[Math.floor(Math.random() * candyDescriptions.length)]
  let quantity = Math.floor(Math.random() * 100)
  let price = candyPrices[Math.floor(Math.random() * candyPrices.length)]
  let image = `./candies/${
    candyImages[Math.floor(Math.random() * candyImages.length)]
  }`
  candyList.push({
    name,
    description,
    quantity,
    price,
    image
  })
}

module.exports = candyList
