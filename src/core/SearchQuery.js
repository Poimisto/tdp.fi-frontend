/**
 * Handles single search request
 *
 * Emits StartSearch NoResults Results SearchError
 *
*/
const eventify = require('./eventify');
const request = require('./ajax');

const lunr = require('lunr'); 
require("lunr-languages/lunr.stemmer.support")(lunr);
require("lunr-languages/lunr.fi")(lunr);

class SearchQuery {
  constructor(searchProvider, searchEndpoint, optArgs){
    eventify(this);
    if(!searchProvider || !searchEndpoint) throw new Error('type and searchEndpoint required arguments');
    this.searchProvider = searchProvider;
    this.searchEndpoint = searchEndpoint;
    this.params = { // set defaults
      size : 5,
      page : 1
    };
    this.setParams(optArgs);
  }
  setParams(params){
    for(var key in params){
      if(key == 'page') this.params.page = parseInt(params.page) || 1;
      else if(key == 'size') this.params.size = parseInt(params.size) || 5;
      else this.params[key] = params[key];
    }
    return self;
  }
  getParams(){
    return this.params;
  }

  query(searchText){
    if(searchText) this.params.q = searchText;
    this.emit('StartSearch', this.params);

    if(this.searchProvider.toLowerCase() == 'lunr') {
      let startIndex = (this.params.page - 1) * this.params.size;
     
      this.doLunrSearch(this.params.q, startIndex, this.params.size, null, (err, result) => {
        if(err) { 
          console.log(err);
          this.emit('SearchError', this.params, err);
        }
        else if (result.items.length == 0) this.emit('NoResults', this.params);
        else this.emit('Results', this.params, result);
      });
    }
  }

  doLunrSearch(searchText, startIndex, maxResults, optArgs, callback) {

    let _getCachedSearchIndex = (cb) => {
      // load index
      if(this.LunrSearchIndex){
        // index already fetched
        cb(null, this.LunrSearchIndex);
      }
      else {
        request.get(this.searchEndpoint).then((data) => {
          this.LunrSearchIndex = data;
          cb(null, this.LunrSearchIndex);
        }).catch(callback);
      }
    }

    if(typeof startIndex !== 'number') throw new Error('startIndex (number) is required');
    if(typeof maxResults !== 'number') throw new Error('maxResults (number) is required');

    // assign defaults
    optArgs = Object.assign({
      fuzzyMatchMaxDistance : 2,
      searchField : false
    }, (typeof optArgs == 'object') ? optArgs : {});

    // remove lunr-specific syntax (: searches only specific field)
    let q = searchText.replace(/:/, '');

    if(optArgs.searchField){
      q = optArgs.field + ':' + q;
    }

    _getCachedSearchIndex((err, data) => {
      if(err) return callback(err);

      let result = {
        total : 0,
        items : []
      };
      

      let idx = lunr.Index.load(JSON.parse(data));
      let searches = idx.search(q);

      if(searches.length == 0) {
        if(optArgs.fuzzyMatchMaxDistance > 0) {
          // handle fuzzy matching
          let _query = q.split('~');
          let query = _query[0];
          let fuzzyDistance = parseInt(_query[1]);
          fuzzyDistance = (isNaN(fuzzyDistance)) ? 0 : fuzzyDistance;   
      
          if(fuzzyDistance <= optArgs.fuzzyMatchMaxDistance) {
            fuzzyDistance = fuzzyDistance + 1;
            q = query + '~' + fuzzyDistance;
            return this.doLunrSearch(q, startIndex, maxResults, optArgs, callback);
          }
        }
        // else return without results
        return callback(null, result);
      }
      else {
        result.total = searches.length;
      }

      for (var i = startIndex; i < searches.length && i < (maxResults + startIndex); i++) {
     
        let search = searches[i];

        // pull HTML contents of matched pages
        request.get(search.ref).then((pagehtml) => {

          // Support only for HTML page metadata fetching
          // todo: support other filetypes (e.g. PDFs)
          // adding e.g. pdf binary-to-text conversion on client side is overkill
          // would probably need a separate microservice to hold search index with references to metadata + actual objects
          
          if(!pagehtml.match(/<head/)) { 
            result.items.push({
              path: search.ref,
              title: search.ref.match(/\/([^\/]+)$/)[1],
              description: "Ei kuvausta"
            });
          }
          else {
            let page = document.implementation.createHTMLDocument("search result").createElement('html');
            page.innerHTML = pagehtml;
            let title = page.querySelector('title');
            let titleText = (title) ? title.innerText : "Ei otsikkoa";
            let description = page.querySelector('meta[name="description"]');
            let descriptionText = (description) ? description.content : "Ei kuvausta";
            result.items.push({
              path: search.ref,
              title: titleText,
              description: descriptionText
            });
          }

          if (i >= searches.length || result.items.length >= maxResults) {
            return callback(null, result);
          }

        }).catch(callback);
      }
    });
  }
}
module.exports = SearchQuery;