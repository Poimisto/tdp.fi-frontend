import theme from "../../theme"

const colors = Object.keys(theme.colors);

const editor = (props) => {
return `
<HeroBlock bgColor="${props.bgColor}" imageAlign="${props.imageAlign}">

<div className="HeroBlockImage">

${props.heroImage ? '![' + props.heroImageAlt + '](' + props.heroImage + ')' : ''}

</div>

<div className="HeroBlockContent">

${props.body ? props.body.trim() : ''}

</div>

</HeroBlock>
`};

export default {
  // Internal id of the component
  id: "heroblock",
  // Visible label
  label: "Hero Block",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { label: "Background Color", name: "bgColor", widget: "select", options: colors , default: colors[0] },
    { label: "Body", name : "body", widget:"markdown"},
    { label: "Hero Image", name : "heroImage", widget:"image"},
    { label: "Hero Image alignment", name : "imageAlign", widget:"select", options: ["right", "left"], default: "left"},
    { label: "Hero Image Alt text", name : "heroImageAlt", widget:"string"}
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<HeroBlock bgColor="([^\"]*)" imageAlign="([^\"]*)">(.*?)<\/HeroBlock>/s,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    console.log('MATCHED', match)
    let matchBody = match[3].match(/<div className="HeroBlockImage">(.*)<\/div>.*<div className="HeroBlockContent">(.*)<\/div>/s)

    let heroImage = (matchBody) ? matchBody[1].match(/\!\[(.*)\]\((.*)\)/) : false;
   
    return {
      bgColor: match[1],
      imageAlign: match[2],
      heroImage: heroImage ? heroImage[2] : '',
      heroImageAlt: heroImage ? heroImage[1] : '',
      body : matchBody ? matchBody[2] : ''
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(props) {
    return editor(props)
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(props) {
    return editor(props)
  },
}
