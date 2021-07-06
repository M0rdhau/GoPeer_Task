const User = require('../models/user')
const Link = require('../models/link')
const Visit = require('../models/visit')

const initialUsers = [
  {
    username: 'Shalva',
    password: 'LaborParty'
  },
  {
    username: 'Mushni',
    password: 'Democracy'
  },
  {
    username: 'Wardo',
    password: 'WashingMachine'
  },
  {
    username: 'Gvtishobela',
    password: 'ChitiGvriti'
  },
  {
    username: 'ZelimKhan',
    password: 'MexicanKinto'
  },
]

const initialUser = initialUsers.pop()

const initialLinks = [
  'https://google.com',
  'youtube.com',
  'stackoverflow.com',
  'www.zelda.com'
]

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const linksInDB = async () => {
  const links = await Link.find({})
  return links.map(l => l.toJSON())
}

const visitsInDB = async () => {
  const visits = await Visit.find({})
  return visits.map(v => v.toJSON())
}

module.exports = {
  initialUsers,
  initialUser,
  initialLinks,
  usersInDB,
  linksInDB,
  visitsInDB
}