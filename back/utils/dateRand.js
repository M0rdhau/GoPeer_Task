const MILLIS_IN_A_DAY = 86400000


const dateRandInMillis = (maxOffset) => {
  const offset = Math.floor(Math.random()*maxOffset)*MILLIS_IN_A_DAY
  const offsetDate = Date.now() - offset
  return offsetDate
}

module.exports = dateRandInMillis