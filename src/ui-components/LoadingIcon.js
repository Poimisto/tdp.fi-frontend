const UIComponent = require('./UIComponent');

const colorSchemes = {
  blue: {
    primary: "#0a50c9",
    secondary: "#0f3e91",
    tertiary: "#2c65c9"
  },
  dark: {
    primary: "#222",
    secondary: "#111",
    tertiary: "#444"
  },
  white: {
    primary: "#fff",
    secondary: "#eee",
    tertiary: "#f3f3f3"
  },
  yellow: {
    primary: "#deda02",
    secondary: "#c7b70c",
    tertiary: "#f0f02b"
  },
  red: {
    primary: "#f73816",
    secondary: "#bd2b11",
    tertiary: "#e64c1e"
  },
  orange: {
    primary: "#ff8a14",
    secondary: "#c46b12",
    tertiary: "#e89520"
  }
};
const getIconSVG = function(icon, color) {
  let g = '';
  switch (icon) {
    case 'arrow':
      return `<g>
                  <path d="M50 15A35 35 0 1 0 74.787 25.213" fill="none" stroke="${colorSchemes[color].primary}" stroke-width="8"></path>
                  <path d="M49 3L49 27L61 15L49 3" fill="${colorSchemes[color].primary}"></path>
                  <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite">
                  </animateTransform>
              </g>`;
    case 'audio':
      return `<g transform="matrix(1 0 0 -1 0 92)">
                  <rect x="6" width="20" height="20" rx="3" fill="${colorSchemes[color].primary}">
                      <animate attributeName="height"
                          begin="0s" dur="4.3s"
                          values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear"
                          repeatCount="indefinite" />
                  </rect>
                  <rect x="29" width="20" height="80" rx="3" fill="${colorSchemes[color].secondary}">
                      <animate attributeName="height"
                          begin="0s" dur="2s"
                          values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear"
                          repeatCount="indefinite" />
                  </rect>
                  <rect x="52" width="20" height="50" rx="3" fill="${colorSchemes[color].tertiary}">
                      <animate attributeName="height"
                          begin="0s" dur="1.4s"
                          values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear"
                          repeatCount="indefinite" />
                  </rect>
                  <rect x="75" width="20" height="30" rx="3" fill="${colorSchemes[color].primary}">
                      <animate attributeName="height"
                          begin="0s" dur="2s"
                          values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear"
                          repeatCount="indefinite" />
                  </rect>
              </g>`;
      break;
    case 'puff':
      return `<g fill="none" fill-rule="evenodd" stroke-width="6" >
                  <circle cx="50" cy="50" r="1" stroke="${colorSchemes[color].primary}">
                      <animate attributeName="r"
                          begin="0s" dur="1.8s"
                          values="1; 40"
                          calcMode="spline"
                          keyTimes="0; 1"
                          keySplines="0.165, 0.84, 0.44, 1"
                          repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity"
                          begin="0s" dur="1.8s"
                          values="1; 0"
                          calcMode="spline"
                          keyTimes="0; 1"
                          keySplines="0.3, 0.61, 0.355, 1"
                          repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="50" r="1" stroke="${colorSchemes[color].secondary}">
                      <animate attributeName="r"
                          begin="-0.9s" dur="1.8s"
                          values="1; 45"
                          calcMode="spline"
                          keyTimes="0; 1"
                          keySplines="0.165, 0.84, 0.44, 1"
                          repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity"
                          begin="-0.9s" dur="1.8s"
                          values="1; 0"
                          calcMode="spline"
                          keyTimes="0; 1"
                          keySplines="0.3, 0.61, 0.355, 1"
                          repeatCount="indefinite" />
                  </circle>
              </g>`;
    case 'clock':
      return `<g>
              <circle fill="none" stroke="${colorSchemes[color].secondary}" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="45"/>
              <line fill="none" stroke-linecap="round" stroke="${colorSchemes[color].primary}" stroke-width="6" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
              <animateTransform 
                  attributeName="transform" 
                  dur="2s"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite" />
              </line>
              <line fill="none" stroke-linecap="round" stroke="${colorSchemes[color].primary}" stroke-width="6" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
              <animateTransform 
                  attributeName="transform" 
                  dur="15s"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite" />
              </line>
              </g>`;
    case 'bars':
    default:
      return `<g>
                  <rect x="5" y="10" width="28" height="80" fill="${colorSchemes[color].primary}">
                      <animate attributeName="height" values="20;50;80;50;20" begin="0s" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="y" values="40;25;10;25;40" begin="0s" dur="1s" repeatCount="indefinite" />
                  </rect>
                  <rect x="36" y="10" width="28" height="80" fill="${colorSchemes[color].secondary}">
                      <animate attributeName="height" values="50;80;50;20;50" begin="0s" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="y" values="25;10;25;40;25" begin="0s" dur="1s" repeatCount="indefinite" />
                  </rect>
                  <rect x="67" y="10" width="28" height="80" fill="${colorSchemes[color].tertiary}">
                      <animate attributeName="height" values="80;50;20;50;80" begin="0s" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="y" values="10;25;40;25;10"  begin="0s" dur="1s" repeatCount="indefinite" />
                  </rect>
              </g>`;
  }
}

class LoadingIcon extends UIComponent {
  constructor(params){
    super();
    this.params = params || {};
    this.params.size = this.params.size || 64;
    this.params.icon = this.params.icon || 'puff';
    this.params.colorScheme = this.params.colorScheme || 'blue';
    this.params.backgroundColorScheme = this.params.backgroundColorScheme || false;
    this.params.text = this.params.text || false;
    if(!colorSchemes[this.params.colorScheme]) throw new Error('colorScheme ' + this.params.colorScheme + ' not valid option');
  }
  render() {
    // create the svg element
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // set width and height
    svg.setAttribute("width", this.params.size);
    if(this.params.text) {
      svg.setAttribute("height", this.params.size + (this.params.size * 0.2));
      svg.setAttribute("viewBox", "0 0 100 120" );
    }
    else {
      svg.setAttribute("height", this.params.size);
      svg.setAttribute("viewBox", "0 0 100 100" );
    }

    svg.setAttribute("preserveAspectRatio", "xMinYMin slice");
    if (this.params.backgroundColorScheme) {
      svg.innerHTML = `
            <g fill="${colorSchemes[this.params.backgroundColorScheme].primary}">
                <rect width="100%" height="100%" rx="10"></rect>
            </g>
        `;
    }
    svg.innerHTML += getIconSVG(this.params.icon, this.params.colorScheme)
    if (this.params.text) {
      svg.innerHTML += `<g>
            <text x="50%" y="110"
                font-weight="bold" font-family="arial" 
                font-size="14" letter-spacing="1.2"
                fill="${colorSchemes[this.params.colorScheme].secondary}" 
                dominant-baseline="middle" text-anchor="middle">
                ${this.params.text}</text>
            </g>`;
    }
    this.container.appendChild(svg);
    return this;
  }
}
module.exports = LoadingIcon;