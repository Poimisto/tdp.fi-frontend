import theme from "../../theme"

const colors = Object.keys(theme.colors);

const editor = props => `<Cards cardsPerRow="${props.cardsPerRow}" cards='${JSON.stringify(props.cards)}' />`

export default {
  // Internal id of the component
  id: "cards",
  // Visible label
  label: "Cards",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { widget: "number", label: "Cards per row", name:"cardsPerRow", default: 3},
    { widget: "list",
      label: "Cards",
      name: "cards",
      summary: '{{fields.title}}',
      fields: [
       { label: "Background Color", name: "bgColor", widget: "select", options: colors, default: 'lightest'},
       {label: 'Title', name: 'title', widget: 'string', default: "Everything is awesome!"},
       {label: "Content", name: "content", widget:"text"},
       { label: "CTA Link", name: "link", widget: "string" },
       { label: "CTA Text", name: "linkText", widget: "string" },
       { label: "CTA Color", name: "linkBgColor", widget: "select", options: colors, default: 'darkest' },
       
      ]
    }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<Cards cardsPerRow="([^\"]*)" cards='([^\']*)' \/>/s,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    console.log('match', match)

    return {
      cardsPerRow: match[1],
      cards : JSON.parse(match[2])
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
