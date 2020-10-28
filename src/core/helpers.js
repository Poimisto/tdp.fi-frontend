// Returns true if it is a DOM element
const isElement = function (o) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
  );
}
const toggleClass = function (element, toggledClass) {
  if (!isElement(element)) throw new Error('Not HTMLElement');
  var classes = element.className;
  if (classes.indexOf(toggledClass) > -1) {
    classes = classes.split(' ').map(function (c) {
      return c.trim();
    }).filter(function (c) {
      return c !== toggledClass;
    }).join(' ');
  }
  else classes = (classes + ' ' + toggledClass).trim();
  element.className = classes;
  return element;
}

const objectToQueryString = function (obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        objectToQueryString(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
const queryStringToObject = function (href) {
  var search;
  var out = {};
  try {
    var url = new URL(href);
    search = url.search.substring(1);
  }
  catch (e) {
    if (href && href.indexOf('?') > -1) search = href.split('?')[1];
    if (search && search.indexOf('#') > -1) search = search.split('#')[0];
  }
  if (!search) return out;
  else {
    search.split('&').map(function (keyval) {
      var val = decodeURIComponent(keyval.match(/^[^\=]+=(.*)/)[1]);
      var key = decodeURIComponent(keyval.match(/^([^\=]+)/)[1]);
      out[key] = val;
    })
  }
  return out;
}
const filterObjectByKey = function (obj, filter_keys) {
  var out = {};
  for (var key in obj) {
    if (filter_keys.indexOf(key) > -1) out[key] = obj[key];
  }
  return out;
}
module.exports = {
  isElement: isElement,
  toggleClass: toggleClass,
  queryStringToObject: queryStringToObject,
  objectToQueryString: objectToQueryString,
  filterObjectByKey: filterObjectByKey
};