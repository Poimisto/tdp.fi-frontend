import theme from "../../theme"
const colors = Object.keys(theme.colors);
const editor = props =>
  `<NewsletterForm title="${props.title}" ctaText="${props.ctaText || ""}"  redirectTo="${props.redirectTo || ""}" />`

export default {
  // Internal id of the component
  id: "subscribe",
  // Visible label
  label: "Subscribe",
  summary: '{{fields.text}}',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { label: "Title", name: "title", widget: "string" },
    { label: "Cta button Text", name:"ctaText", widget: "string"},
    { label: "Redirect To URL", name: "redirectTo", widget: "string" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<NewsletterForm title="([^\"]+)" ctaText="([^\"]+)" redirectTo="([^\"]+)" \/>/s,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      title: match[1],
      ctaText:  match[2],
      redirectTo: match[3]
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
