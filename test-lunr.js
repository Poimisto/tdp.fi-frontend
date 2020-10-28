const lunr = require('lunr');

var documents = [
  {
    id : 1,
    title : "jani",
    body : "esa sievinen"
  },
  {
    id : 2,
    title : "pekka",
    body : "jani jani sievinen sievinen"
  }
];




let index, builder;
index = lunr(function () {
  builder = this;
  builder.ref('id');
  builder.field('title', { boost: 10 });
  builder.field('body');
  builder.add({
    id : "3",
    title : "teppo",
    body : "my another body"
  })
  
  builder.add({
    id : "4",
    title : "seppo",
    body : "dsdsas"
  })
  
});





console.log(JSON.stringify(index));

let idx = lunr.Index.load(JSON.parse(JSON.stringify(index)))

let s = idx.search('seppo');

console.log(s);

