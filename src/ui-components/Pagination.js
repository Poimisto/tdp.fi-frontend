/**
 * Renders pagination element on page
 *
 * Emits PaginationClick
 *
*/
const UIComponent = require('./UIComponent');
const LoadingScreen = require('./LoadingScreen');
require('./Pagination.css');
class Pagination extends UIComponent {
  constructor(params){
    super();
    this.params = params || {};
    this.params.style = this.params.style || 'full';
    if( typeof paginations[this.params.style] !== 'function') throw new Error(this.params.style + ' not valid option');
    this.params.hrefFunc = (typeof this.params.hrefFunc == 'function') ? this.params.hrefFunc : false;
  }
  render(renderParams){
    var pagination = paginations[this.params.style](this, renderParams);
    this.container.innerHTML = '';
    this.container.appendChild(pagination);
    return this;
  }
  showLoadingScreen(){
    new LoadingScreen({iconSize:32}).render().appendTo(this.container);
    return this;
  }

}
module.exports = Pagination;

const paginations = {
  full : function(self, params){
    var curr_page = params.currPage;
    var max_pages = params.maxPages;
    self.pagination = document.createElement('div');
    self.pagination.className = 'pmt-pagination';
    var show_pages = [1,2,3,max_pages -1,max_pages];
    for(var i = 1; i <= max_pages; i++){
      var pageLink = false;
      if(i == parseInt(curr_page)){
        pageLink = document.createElement("a");
        pageLink.dataset.pageNo = i;
        pageLink.innerText = i;
        pageLink.className = "curr_page";
      }
      else if(i == parseInt(curr_page) - 1 && i != 1){
        pageLink = document.createElement("a");
        pageLink.dataset.pageNo = i;
        pageLink.innerText = 'Edellinen';
        pageLink.className = "prev_page";
      }
      else if(i == parseInt(curr_page) + 1){
        pageLink = document.createElement("a");
        pageLink.dataset.pageNo = i;
        pageLink.innerText = 'Seuraava';
        pageLink.className = "next_page";
      }
      else if([1,max_pages].indexOf(i) > -1){
        pageLink = document.createElement("a");
        pageLink.dataset.pageNo = i;
        pageLink.innerText = i;
        pageLink.className = "page";
      }
      if(pageLink) {
        if(pageLink.className !== 'curr_page') {
          if(typeof self.hrefFunc == 'function') pageLink.href = self.hrefFunc(i);
          pageLink.addEventListener('click', function(e) {
            e.preventDefault();
            self.emit('PaginationClick', e.target.dataset.pageNo);
          });
        }
        self.pagination.appendChild(pageLink);
      }
    }
    return self.pagination;
  }
};
