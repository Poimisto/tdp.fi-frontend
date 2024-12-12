import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import theme from "../theme"
import styled from "styled-components"

const VariableDisplay = styled.p`
  display: inline;
  font-family: ${theme.bodyFontFamily};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
`

const DisplayVariable = ({ variableKey, bold = false }) => {
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
  
  return (
    <VariableDisplay bold={bold}>
      {data.variablesJson.variables.find(item => item.key === variableKey)
        ?.value || "N/A"}
    </VariableDisplay>
  )
}

export default DisplayVariable
