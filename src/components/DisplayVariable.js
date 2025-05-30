import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import theme from "../theme"
import styled from "styled-components"

/**
 * Displays the value of a variable stored in file variables.json
 * @param {Object} props
 * @param {string} props.variableKey - Key of the variable to show
 * @param {string} props.type - HTML tag to display the value in, defaults to "p"
 * @param {boolean} props.bold - Should text be bold, defaults to false
 * @returns {React.Component} Component displaying the value of a variable
 */
const DisplayVariable = ({ variableKey, tag = "p", bold = false }) => {
  const data = useStaticQuery(graphql`
    query {
      variablesJson {
        variables {
          type
          key
          value
        }
      }
    }
  `)

  const VariableDisplay = styled(tag)`
    display: ${tag === "p" ? "inline" : "block"};
    font-family: ${tag === "p"
      ? theme.bodyFontFamily
      : theme.headingFontFamily};
    font-weight: ${props => (props.bold ? "bold" : "normal")};
  `

  return (
    <VariableDisplay bold={bold}>
      {data.variablesJson.variables.find(item => item.key === variableKey)
        ?.value || "N/A"}
    </VariableDisplay>
  )
}

export default DisplayVariable
