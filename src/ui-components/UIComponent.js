const eventify = require('../core/eventify');
const isElement = require('../core/helpers').isElement;

class UIComponent {
  constructor(){
    eventify(this);
    this.container = document.createElement('DIV');
    // add constructor name as class, convert to CamelCase to hyphencase
    var constructorClassName = this.constructor.name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`).replace(/^-|-$/, '');
    this.container.className = 'ui-component ' + constructorClassName;
  }
  appendTo(element){
    var parent;
    if(typeof element == 'string') parent = document.getElementById(element);
    else parent = element;
    if(!isElement(parent)) throw new Error('Constructor argument not HTMLElement');
    parent.appendChild(this.container);
    return this;
  }
  prependTo(element){
    var parent;
    if(typeof element == 'string') parent = document.getElementById(element);
    else parent = element;
    if(!isElement(parent)) throw new Error('Constructor argument not HTMLElement');
    parent.insertBefore(this.container, parent.firstChild);
    return this;
  }
  getElement(){
    return this.container;
  }
  remove(){
    this.container.parentElement.removeChild(this.container);
    return this;
  }
}
module.exports = UIComponent;