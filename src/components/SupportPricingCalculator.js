import React, { useEffect, useState } from "react"

import theme from "../theme"
import styled from "styled-components"
import Input from "@material-ui/core/Input"
import Slider from "@material-ui/core/Slider"
import { makeStyles } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"

const CalculatorContainer = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FormWrapper = styled.div`
  width: calc(100% - 2 * 1em);
  height: fit-content;
  position: relative;
  margin: 1em;
`

const Text = styled.p`
  width: calc(100% - 2 * 1em);
  font-size: 1rem;
  text-align: center;
`

const useStyles = makeStyles({
  sliderRoot: {
    color: theme.colors.dark,
  },
  sliderRail: {
    color: theme.colors.dark,
  },
  sliderThumb: {
    color: theme.colors.brand,
  },
  sliderValueLabel: {
    color: theme.colors.brand,
    "& > span > span": {
      color: theme.colors.darkest,
    },
  },
  sliderMarkLabel: {
    opacity: 1,
    color: theme.colors.dark,
  },
  inputRoot: {
    width: "4em",
    alignSelf: "center",
  },
  inputUnderline: {
    borderBottomColor: theme.colors.dark,
    "&:before": {
      borderBottomColor: theme.colors.dark,
    },
    "&:after": {
      borderBottomColor: theme.colors.dark,
    },
  },
  inputFocused: {
    borderWidth: "2px",
    borderBottomColor: theme.colors.brand,
    "&:before": {
      borderWidth: "2px",
      borderBottomColor: theme.colors.brand,
    },
    "&:after": {
      borderWidth: "2px",
      borderBottomColor: theme.colors.brand,
    },
  },
})

export default () => {
  const [userCount, setUserCount] = useState(1)
  const [price, setPrice] = useState(0)

  const handleSliderChange = (event, value) => {
    event.preventDefault()
    setUserCount(value)
  }

  const handleInputChange = value => {
    setUserCount(value === "" ? "" : Number(value))
  }

  const handleBlur = () => {
    if (userCount < 1) {
      setUserCount(1)
    } else if (userCount > 100) {
      setUserCount(100)
    }
  }

  useEffect(() => {
    if (userCount < 10) {
      setPrice(userCount * 29)
    } else {
      setPrice(userCount * 19)
    }
  }, [userCount])

  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 100,
      label: "100",
    },
  ]

  const classes = useStyles()

  return (
    <CalculatorContainer>
      <FormWrapper>
        <FormControl id="userCount" aria-label="User count" fullWidth>
          <Slider
            aria-label="User count slider"
            name="userCountSlider"
            valueLabelDisplay="auto"
            value={userCount}
            onChange={handleSliderChange}
            step={1}
            min={1}
            max={100}
            marks={marks}
            track={false}
            classes={{
              root: classes.sliderRoot,
              rail: classes.sliderRail,
              thumb: classes.sliderThumb,
              markLabel: classes.sliderMarkLabel,
              valueLabel: classes.sliderValueLabel,
            }}
          />
          <Input
            aria-label="User count number input"
            value={userCount}
            onChange={event => handleInputChange(event.target.value)}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 100,
              type: "number",
            }}
            fullWidth={false}
            margin="dense"
            classes={{
              root: classes.inputRoot,
              underline: classes.inputUnderline,
              focused: classes.inputFocused,
            }}
          />
        </FormControl>
      </FormWrapper>
      <Text>
        Tukipalvelun hinta {userCount} käyttäjälle on{" "}
        {Math.round((price * 100) / 100).toFixed(2)} €/kk
      </Text>
    </CalculatorContainer>
  )
}
