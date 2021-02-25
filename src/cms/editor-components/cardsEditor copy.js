import theme from "../../theme"

const colors = Object.keys(theme.colors);

const editor = props => `<Cards cardsPerRow="${props.cardsPerRow}">
${props.cards && props.cards.map( (card) => { return `
<div className="card"><span className="title">${card.title}</span><span className="content">${card.content}</span></div>
`}).join('')}
</Cards>`

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
       {label: 'Title', name: 'title', widget: 'string', default: "Everything is awesome!"},
       {label: "Content", name: "content", widget:"text"},
      ]
    }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<Cards cardsPerRow="([^\"]*)">(.*)<\/Cards>/s,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    console.log('match', match)
    let cards = match[2].match(/<div className="card">(.*?)<\/div>/sg).map( (string) => {
      let card = string.match(/<span className="title">(.*?)<\/span><span className="content">(.*?)<\/span>/s)
      return {
        title: card[1],
        content: card[2]
      }
    })
    return {
      cardsPerRow: match[1],
      cards : cards
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
