var consolidate = (function() {
  var data = '';
  return function (append_val) {
    if (append_val === undefined) {
      return data;
    }
    data+= append_val;
    return data;
  }
}());

module.exports = consolidate;