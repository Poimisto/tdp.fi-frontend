const editor = props =>
  `<LatestPosts maxNumberOfPosts="${props.maxNumberOfPosts}" title="${props.title}"/>`

export default {
  // Internal id of the component
  id: "latestposts",
  // Visible label
  label: "Latest Posts",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { label: "Title", name: "title", widget: "string"},
    { label: "Max number of posts", name: "maxNumberOfPosts", widget: 'number', max: 100, min: 1},
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<LatestPosts maxNumberOfPosts="([^\"]+)" title="([^\"]+)"\/>/s,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      maxNumberOfPosts: match[1],
      title : match[2]
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
