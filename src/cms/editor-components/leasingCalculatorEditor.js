const editor = props =>
  `<LeasingCalculator additionalMargin={${
    props.additionalMargin
  }} threeYearInterest={${props.threeYearInterest}} devices='${JSON.stringify(
    props.devices
  )}' support='${JSON.stringify(props.support)}' security='${JSON.stringify(
    props.security
  )}' businessApps='${JSON.stringify(
    props.businessApps
  )}' cloudBackup='${JSON.stringify(
    props.cloudBackup
  )}' centralizedManagement='${JSON.stringify(props.centralizedManagement)}' />`

const LeasingCalculatorEditor = {
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
    },
    {
      widget: "list",
      label: "Support",
      name: "support",
      summmary: "{{fields.name}}",
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
    {
      widget: "list",
      label: "Security",
      name: "security",
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
    {
      widget: "list",
      label: "Business Apps",
      name: "businessApps",
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
    {
      widget: "list",
      label: "Cloud Backup",
      name: "cloudBackup",
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
        {
          label: "For",
          name: "for",
          summary:
            "Name of the service the cloud backup is for (eg. Google, Microsoft)",
          widget: "string",
        },
      ],
    },
    {
      widget: "object",
      label: "Centralized management",
      name: "centralizedManagement",
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
    /<LeasingCalculator additionalMargin={(\d+\.\d*|\.\d+|\d+)} threeYearInterest={(\d+\.\d*|\.\d+|\d+)} devices='([^']*)' support='([^']*)' security='([^']*)' businessApps='([^']*)' cloudBackup='([^']*)' centralizedManagement='({[\s\S]*})' \/>/s,
  fromBlock: function (match) {
    return {
      additionalMargin: match[1] ? Number.parseFloat(match[1]) : 0,
      threeYearInterest: match[2] ? Number.parseFloat(match[2]) : 0,
      devices: match[3] !== "undefined" ? JSON.parse(match[3]) : [],
      support: match[4] !== "undefined" ? JSON.parse(match[4]) : [],
      security: match[5] !== "undefined" ? JSON.parse(match[5]) : [],
      businessApps: match[6] !== "undefined" ? JSON.parse(match[6]) : [],
      cloudBackup: match[7] !== "undefined" ? JSON.parse(match[7]) : [],
      centralizedManagement:
        match[8] !== "undefined" ? JSON.parse(match[8]) : {},
    }
  },
  toBlock: function (props) {
    return editor(props)
  },
  toPreview: function (props) {
    return editor(props)
  },
}

export default LeasingCalculatorEditor
