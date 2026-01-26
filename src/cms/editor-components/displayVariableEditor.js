const editor = props => {
  return `<DisplayVariable variableKey="${props.variableKey}" tag="${props.tag}" bold={${props.bold}} isInline={${props.isInline}} />`
}

const tagOptions = [
  { label: "Paragraph", value: "p" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Headign 4", value: "h4" },
  { label: "Headign 5", value: "h5" },
  { label: "Headign 6", value: "h6" },
]

export default {
  // Internal id of the component
  id: "displayVariable",
  // Visible name
  label: "Display Variable",
  summery: "{fields.text}",
  // Fields the user needs to fill out when adding an instance of the component
  fields: [
    {
      label: "Variable Key",
      name: "variableKey",
      widget: "variableSelect",
    },
    {
      label: "Tag",
      name: "tag",
      widget: "select",
      options: tagOptions,
      default: tagOptions[0],
    },
    { label: "Bold", name: "bold", widget: "boolean", default: false },
    { lable: "Is inline", name: "isInline", widget: "boolean", default: false }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<DisplayVariable\s+variableKey="([^"]+)"(?:\s+tag="([^"]+)")?(?:\s+bold=\{([^}]+)\})?(?:\s+isInline=\{([^}]+)\})?\s*\/>/is,
  // Function to extract data elements fro mthe regex match
  fromBlock: function (match) {
    return {
      variableKey: match[1],
      tag: match[2] || "p",
      bold: match[3] === undefined ? false : match[3] === "true",
      isInline: match[4] === undefined ? false : match[4] === "true"
    }
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (props) {
    return editor(props)
  },
  // Function to create a text block from an instance of this component
  toBlock: function (props) {
    return editor(props)
  },
}
