var a = function (obj) {
  for (var key in obj) {
  return false;
  }
  return true;
}

module.exports = {
  isEmptyObject : a
};