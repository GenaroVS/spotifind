
const hasBeenDay = () => {
  return new Date().getHours() === 0 ? true : false;
}

const hasBeenMonth = () => {
  return new Date().getDate() === 1 ? true : false;
}

module.exports = {
  hasBeenDay,
  hasBeenMonth,
}