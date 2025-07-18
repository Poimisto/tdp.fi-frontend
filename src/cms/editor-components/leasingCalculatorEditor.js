const editor = () => "<LeasingCalculator />"

export default {
  id: "leasing-calculator",
  label: "Leasing calculator",
  summary: "{{fields.text}}",
  fields: [],
  pattern: /<LeasingCalculator \/>/s,
  toBlock: function () {
    return editor()
  },
  toPreview: function () {
    return editor()
  },
}
