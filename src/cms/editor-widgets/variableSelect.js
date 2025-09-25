import variableJson from "../../../content/variables/variables.json"
import CMS from "decap-cms-app"
import Immutable from "immutable"
import React from "react";

// Extends the Netlify CMS default select widget by populating it with values¨
// read from variables.json
const variableSelect = props => {
  const SelectControl = CMS.getWidget("select").control
  const selectProps = { ...props }
  selectProps.field = selectProps.field.set(
    "options",
    Immutable.List(variableJson.variables.map(item => item.key))
  )
  return <SelectControl {...selectProps} />
}

export default variableSelect
