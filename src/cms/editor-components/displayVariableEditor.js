const editor = props => {
  return `<DisplayVariable variableKey="${props.variableKey}" bold={${props.bold}} />`
}

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
    { label: "Bold", name: "bold", widget: "boolean", default: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<DisplayVariable\s+variableKey="([^"]+)"(?:\s+bold=\{([^}]+)\})?\s*\/>/s,
  // Function to extract data elements fro mthe regex match
  fromBlock: function (match) {
    return {
      variableKey: match[1],
      bold: match[2] === undefined ? false : match[2] === "true",
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
