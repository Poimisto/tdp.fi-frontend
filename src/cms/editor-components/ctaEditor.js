import theme from "../../theme"
const colors = Object.keys(theme.colors);
const editor = props =>
  `<CallToAction bgColor="${props.bgColor}" url="${props.url || ""}" align="${props.align}">${props.text || ""}</CallToAction>`

export default {
  // Internal id of the component
  id: "cta",
  // Visible label
  label: "Call to Action",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { label: "Background Color", name: "bgColor", widget: "select", options: colors, default: colors[0] },
    { label: "Align", name:"align", widget: "select", options: ["left", "center"], default:"center"},
    { label: "Link", name: "url", widget: "string" },
    { label: "Text", name: "text", widget: "string" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<CallToAction bgColor="([^\"]+)" url="([^\"]+)" align="([^\"]+)">(.*)<\/CallToAction>/s,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      bgColor: match[1],
      url:  match[2],
      align: match[3],
      text: match[4]
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
