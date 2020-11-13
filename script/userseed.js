const faker = require('faker')

const userList = [
  {
    email: 'cody@email.com',
    password: '123',
    firstName: 'Cody',
    lastName: 'Puppy',
    admin: 'true',
  },
  {
    email: 'murphy@email.com',
    password: '123',
    firstName: 'Murphy',
    lastName: 'Kitty',
  },
  {
    email: 'mrsmith@email.com',
    password: '123',
    firstName: 'Christopher',
    lastName: 'Smith',
    admin: 'true',
  },
  {
    email: 'romy@email.com',
    password: '123',
    firstName: 'Romina',
    lastName: 'Ionascu',
  },
  {
    email: 'franzferdinand@email.com',
    password: '123',
    firstName: 'Christian',
    lastName: 'Fernandez',
  },
  {
    email: 'bird@email.com',
    password: '123',
    firstName: 'Brandie',
    lastName: 'Burditt',
  },
  {
    email: 'kittykat@email.com',
    password: '123',
    firstName: 'Elba',
    lastName: 'Zamolodchikova',
  },
  {
    email: 'pupperino@email.com',
    password: '123',
    firstName: 'Leo',
    lastName: 'Hussey',
    admin: 'true',
  },
]

for (let i = 0; i < 60; i++) {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  userList.push({
    email,
    password,
    firstName,
    lastName,
  })
}

module.exports = userList
