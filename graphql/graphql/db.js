export const people = [
  {
    id: '0',
    name: 'kanziw',
    age: 25,
    gender: 'male',
  },
  {
    id: '1',
    name: 'reese',
    age: 23,
    gender: 'female',
  },
  {
    id: '2',
    name: 'david',
    age: 30,
    gender: 'male',
  }
]

export const getById = id => people.find(person => person.id == id)
