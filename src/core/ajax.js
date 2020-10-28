const serialize = require('./helpers').objectToQueryString;
function get(uri, params) {
  if(params) uri = uri + '?' + serialize(params);
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    try {
      xhr.open('GET', uri);
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        }
        else {
          console.log(xhr);
          reject(xhr.status);
        }
      };
      xhr.onerror = function(e) {
        reject(xhr.status);
      };
      xhr.send();
    }
    catch(e){
      console.log(e);
      throw e;
    }

  });
}
module.exports = {
  get : get
}