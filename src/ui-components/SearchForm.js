const UIComponent = require('./UIComponent');
require('./SearchForm.css');

class SearchForm extends UIComponent {
  constructor(params){
    super();
    params = params || {};
    this.placeholder = params.placeholder || 'Hae...';
    this.searchButtonText = params.buttonText || "HAE";
  }
  render(){
    var searchForm = document.createElement('FORM');
    searchForm.className += ' pmt-search-form';
    var input = document.createElement('INPUT');
    input.type = 'text';
    input.className = 'pmt-search-text';
    input.setAttribute('placeholder', this.placeholder);
    var btn = document.createElement('BUTTON');
    btn.className = 'pmt-search-button';
    btn.innerHTML= '<span class="pmt-button-text">'+this.searchButtonText+'</span>';
    searchForm.appendChild(input);
    searchForm.appendChild(btn);

    var self = this;
    searchForm.addEventListener('submit', function(e){
      e.preventDefault();
      var searchVal = e.target.querySelector('.pmt-search-text').value;
      if(searchVal.length > 0) self.emit('submit', {searchText: searchVal});
    });

    this.container.appendChild(searchForm)
    return this;
  }
  setText(text){
    this.container.querySelector('.pmt-search-text').value = text;

    return this;
  }
}
module.exports = SearchForm;