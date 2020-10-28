const UIComponent = require('./UIComponent');
const LoadingIcon = require('./LoadingIcon');

require('./LoadingScreen.css');


class LoadingScreen extends UIComponent {
  constructor(params){
    super();
    this.params = params || {};

    
    if (this.params.icon !== false || this.params.icon !== 0) {
      this.params.icon = (typeof this.params.icon == 'object') ? this.params.icon : {};
      this.params.icon = Object.assign({
        icon : 'arrow',
        size : 124,
        colorScheme : 'dark',
        backgroundColorScheme : false,
        text : false
      }, this.params.icon);
    }

    this.params.style = this.params.style || 'default';    // overlay, gradient, default
    this.params.minHeight = this.params.minHeight || this.params.icon.size || 0;


  }

  remove(){
    if(this.container.parentElement){
      let clone = this.container.parentElement.querySelector('.loading-container-clone');
      if(clone) this.container.parentElement.removeChild(clone);
      this.container.parentElement.removeChild(this.container);
    }
    return this;
  }
  render(){
    // remove existing loaders if present
    this.container.className += ' pmt-loading-screen ' + this.params.style;
    this.container.style.minHeight = this.params.minHeight + 'px';
    if(this.params.icon){

      let loadingIcon = new LoadingIcon(this.params.icon).render();
      this.container.appendChild( loadingIcon.getElement() );

   
    }
    return this;
  }
  _adjustToParent(){

    if(this.params.minHeight){
      // reset min height
      this.parent.style.minHeight = '0px';
      
      let minHeight = this.params.minHeight;
      if(this.params.icon && this.params.icon.text){
        // icon with text is 20% more height
        minHeight = minHeight + (this.params.icon.size * 0.2);
      }
      if( this.parent.offsetHeight < minHeight) {
        this.parent.style.minHeight = minHeight + 'px';
      }
    }
    // adjust to fit the parent
    if(this.params.icon){

      let icon = this.container.querySelector('.loading-icon');
      let marginTop = (this.parent.offsetHeight / 2) - (icon.offsetHeight / 2);
      icon.style.marginTop = (Math.max(0, marginTop)) + 'px'
      
    }
  }
  appendTo(element){
    // remove existing loaders if present
    this.remove();

    this.parent = element;

    this.parent.style.position = 'relative';
    this.container.style.position = 'absolute';
    this.container.style.top = '0px';
    this.container.style.left = '0px';
    this.container.style.height = '100%';
    this.container.style.width = '100%';
    this.container.style.zIndex = '999';
 

    super.appendTo(element);

    // adjust to parent
    
    this._adjustToParent();

    window.onresize = () => { this._adjustToParent() }


    return this;
  }
  blurParent() {
    // remove to copy contents from parent
    this.parent.removeChild(this.container);
    this.containerClone = document.createElement('DIV');
    this.containerClone.innerHTML = this.parent.innerHTML;
    this.containerClone.className += ' loading-container-clone blur';
    this.containerClone.style.width = '100%';
    this.containerClone.style.position = 'absolute';
    this.containerClone.style.top = '0px';
    this.containerClone.style.left = '0px';
    this.containerClone.style.zIndex = '998';
    this.parent.appendChild(this.containerClone);
    this.parent.appendChild(this.container);
    return this;
  }
}
module.exports = LoadingScreen;