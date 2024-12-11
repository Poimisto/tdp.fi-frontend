import variableJson from "../../../content/variables/variables.json"
import CMS from "netlify-cms-app"
import Immutable from "immutable"

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
