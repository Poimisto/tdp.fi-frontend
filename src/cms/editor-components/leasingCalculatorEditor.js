const editor = props =>
  `<LeasingCalculator additionalMargin={${props.additionalMargin
  }} threeYearInterest={${props.threeYearInterest}} devices='${JSON.stringify(
    props.devices
  )}' peripherals='${JSON.stringify(props.peripherals)}' />`

export default {
  id: "leasing-calculator",
  label: "Leasing calculator",
  summary: "{{fields.text}}",
  fields: [
    {
      widget: "number",
      label: "Three year interest",
      name: "threeYearInterest",
      value_type: "float",
      default: 0.0,
      min: 0.0,
    },
    {
      widget: "number",
      label: "Additional margin",
      name: "additionalMargin",
      value_type: "float",
      default: 0.0,
      min: 0.0,
    },
    {
      widget: "list",
      label: "Devices",
      name: "devices",
      summary: "{{fields.name}}",
      fields: [
        { label: "Name", name: "name", widget: "string" },
        {
          label: "Price",
          name: "price",
          widget: "number",
          value_type: "float",
          min: 0.0,
        },
        {
          label: "Warranty name",
          name: "warrantyName",
          widget: "string",
        },
        {
          label: "Warranty price",
          name: "warrantyPrice",
          widget: "number",
          value_type: "float",
          min: 0,
          step: 1,
        },
      ],
    },
    {
      widget: "list",
      label: "Peripherals",
      name: "peripherals",
      summary: "{{fields.name}}",
      fields: [
        {
          label: "Name",
          name: "name",
          widget: "string",
        },
        {
          label: "Price",
          name: "price",
          widget: "number",
          value_type: "float",
          min: 0.0,
        },
      ],
    },
  ],
  pattern:
    /<LeasingCalculator additionalMargin={(\d+\.\d*|\.\d+|\d+)} threeYearInterest={(\d+\.\d*|\.\d+|\d+)} devices='([^\']*)' peripherals='([^\']*)' \/>/s,
  fromBlock: function (match) {
    return {
      additionalMargin: match[1] ? Number.parseFloat(match[1]) : 0,
      threeYearInterest: match[2] ? Number.parseFloat(match[2]) : 0,
      devices: match[3] !== "undefined" ? JSON.parse(match[3]) : [],
      peripherals: match[4] !== "undefined" ? JSON.parse(match[4]) : [],
    }
  },
  toBlock: function (props) {
    return editor(props)
  },
  toPreview: function (props) {
    return editor(props)
  },
}
