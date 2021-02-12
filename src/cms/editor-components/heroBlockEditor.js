import theme from "../../theme"

const colors = Object.keys(theme.colors);

const editor = props =>`
<HeroBlock bgColor="${props.bgColor}">

${props.body.trim()}

</HeroBlock>`

export default {
  // Internal id of the component
  id: "heroblock",
  // Visible label
  label: "Hero Block",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { label: "Background Color", name: "bgColor", widget: "select", options: colors , default: colors[0] },
    { label: "Body", name : "body", widget:"markdown"}
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<HeroBlock bgColor="([^\"]*)">(.*)<\/HeroBlock>/s,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      bgColor: match[1],
      body : match[2]
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
