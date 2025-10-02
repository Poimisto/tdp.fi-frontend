import React, { useState, useEffect } from "react"
import Helmet from "react-helmet"
import { getContrast, shade } from "polished"
import styled from "styled-components"
import appTheme from "../theme"

import {
  FormControl,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  Checkbox,
  TextField,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  tableCellClasses,
  toggleButtonGroupClasses,
} from "@mui/material"
import { styled as muiStyled } from "@mui/material/styles"

const MIN_DEVICES = 1
const MAX_DEVICES = 100

/* ---------- layout wrappers (styled-components) ---------- */
const LeasingCalculatorContainer = styled.div`
  height: fit-content;
  width: 100%;
  margin: 16px 0;
  display: flex;
  justify-content: center;
`

const LeasingCalculator = styled.div`
  height: fit-content;
  width: 60%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => shade(0.2, props.theme.colors.lightest)};
  border-radius: 4px;
  padding: 1em;
  background-color: ${props => props.theme.colors.lightest};
  color: ${props =>
    getContrast(props.theme.colors.darkest, props.theme.colors.lightest) > 10
      ? props.theme.colors.darkest
      : props.theme.colors.lightest};

  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    width: 100%;
  }
`

const FormContainer = styled.div`
  height: fit-content;
  width: 100%;
`

const FormInputContainer = styled.div`
  height: fit-content;
  // Width: parent - margins
  width: calc(100% - 2 * 0.5em);
  margin: 0.75em;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

const TableContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
`

const InputText = styled.p`
  width: fit-content;
  height: fit-content;
  margin: 0;
`

const CheckboxLabel = styled.p`
  height: fit-content;
  margin: 0;
  padding: 0;
`

const ButtonTextContainer = styled.p`
  height: fit-content;
  text-wrap: ${props => (props.noWrap ? "nowrap" : "wrap")};
  margin: 0;
`

const VatNotice = styled.p`
  width: fit-content;
  padding: 0;
  margin: 0;
  font-size: smaller;
  color: ${props => props.theme.colors.dark};
`

/* ---------- MUI-styled replacements for withStyles ---------- */
const CheckboxInput = muiStyled(Checkbox)({
  color: appTheme.colors.dark,
  "&.Mui-checked": {
    color: appTheme.colors.brand,
  },
})

const StyledToggleButtonGroup = muiStyled(ToggleButtonGroup)(({ theme }) => ({
  gap: "1rem",
  flexWrap: "wrap",
  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
    },
  [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
  [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonGroupClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonGroupClasses.disabled}`]:
    {
      borderLeft: `1pc solid ${
        (theme.vars || theme).palette.action.disabledBackground
      }`,
    },
}))

const CountSlider = muiStyled(Slider)(({ theme }) => ({
  color: theme.palette.secondary.main,
  width: `calc(100% - 20px)`,
  alignSelf: "center",
}))

const StyledTableCell = muiStyled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    fontSize: 16,
  },
  "&:nth-child(1)": {
    width: "55%",
  },
  "&:nth-child(2)": {
    width: "22.5%",
  },
  "&:nth-child(3)": {
    width: "22.5%",
  },
}))

const StyledTableRow = muiStyled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    fontWeight: "bold",
  },
}))

export default function LeasingCalculatorComponent({
  additionalMargin,
  threeYearInterest,
  devices,
  peripherals,
}) {
  // Parse the serialized JSON strings from the MDX.
  devices = JSON.parse(devices)
  peripherals = JSON.parse(peripherals)

  const [leasingPackage, setLeasingPackage] = useState({
    device: devices[0].name,
    peripherals: [],
    extendedWarrantySelected: false,
    warrantyName: devices[0].warrantyName,
    warrantyPrice: devices[0].warrantyPrice,
    count: 1,
  })

  const [leasingPrices, setLeasingPrices] = useState({
    itemContributions: [],
    name: "Leasing hinnat",
    price36: "--",
    directPurchase: "--",
  })

  const handleInputChange = (e, key, newValue = false) => {
    let { value, checked } = e.target
    if (newValue) {
      value = newValue
    }

    switch (key) {
      case "extendedWarrantySelected":
        setLeasingPackage(prev => ({ ...prev, [key]: checked }))
        break
      case "peripherals":
        setLeasingPackage(prev => ({
          ...prev,
          [key]: value.filter(v => !!v),
        }))

        break
      case "device":
        const selectedDevice = devices.find(d => d.name === value)

        setLeasingPackage(prev => ({
          ...prev,
          [key]: value,
          warrantyName: selectedDevice ? selectedDevice.warrantyName : "",
          warrantyPrice: selectedDevice ? selectedDevice.warrantyPrice : 0,
          extendedWarrantySelected: selectedDevice
            ? prev.extendedWarrantySelected
            : false,
        }))

        break
      case "count":
        if (value > MAX_DEVICES) {
          value = MAX_DEVICES
        } else if (value < MIN_DEVICES) {
          value = MIN_DEVICES
        }

        setLeasingPackage(prev => ({ ...prev, count: Number.parseInt(value) }))

        break
      default:
        setLeasingPackage(prev => ({
          ...prev,
          [key]: value,
        }))
    }
  }

  const handleBlur = () => {
    if (leasingPackage.count < MIN_DEVICES) {
      setLeasingPackage(prev => ({ ...prev, count: MIN_DEVICES }))
    } else if (leasingPackage.count > MAX_DEVICES) {
      setLeasingPackage(prev => ({ ...prev, count: MAX_DEVICES }))
    }
  }

  useEffect(() => {
    const selectedDevice = devices.find(d => d.name === leasingPackage.device)
    const selectedPeripherals = peripherals.filter(p =>
      leasingPackage.peripherals.includes(p.name)
    )

    // Calculate the montly leasing cost for the selected package.
    let pricePerUnit = selectedPeripherals.reduce((total, current) => {
      if (current.price) {
        total += current.price
      }
      return total
    }, 0)

    if (selectedDevice) {
      pricePerUnit += selectedDevice.price
    }

    if (leasingPackage.extendedWarrantySelected) {
      pricePerUnit += selectedDevice.warrantyPrice
    }

    const threeYearPayment =
      ((pricePerUnit * leasingPackage.count + additionalMargin) / 36) *
      threeYearInterest
    const directPurchase = pricePerUnit * leasingPackage.count

    // Calculate each item's contribution to the final monthly payment based on the products portion of the direct purchase price.
    // KPMG: https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/ifrg/2024/lease-payments.pdf
    const allProducts = [...selectedPeripherals]

    if (selectedDevice) {
      allProducts.unshift({
        name: selectedDevice.name,
        price: selectedDevice.price,
      })
    }

    if (leasingPackage.extendedWarrantySelected) {
      allProducts.push({
        name: selectedDevice.warrantyName,
        price: selectedDevice.warrantyPrice,
      })
    }

    const itemContributions = allProducts.map(p => {
      const weight = p.price / directPurchase

      const contribution =
        ((directPurchase * weight * leasingPackage.count + additionalMargin) /
          36) *
        threeYearInterest

      const itemDirectPurchase = p.price * leasingPackage.count

      if (devices.some(d => d.name === p.name)) {
        return {
          ...p,
          price: `${itemDirectPurchase.toFixed(2)} €`,
          contribution: `${contribution.toFixed(2)} €/kk`,
        }
      } else {
        return {
          ...p,
          price: `${itemDirectPurchase.toFixed(2)} €`,
          contribution: `+ ${contribution.toFixed(2)} €/kk`,
        }
      }
    })

    setLeasingPrices({
      itemContributions,
      price36: `${threeYearPayment.toFixed(2)} €/kk`,
      directPurchase: `${directPurchase.toFixed(2)} €`,
    })
  }, [leasingPackage])

  return (
    <LeasingCalculatorContainer>
      <Helmet
        meta={[
          {
            name: "calculator-keywords",
            content: devices.map(d => d.name.replaceAll(",", "")).join(", "),
          },
        ]}
      />
      <LeasingCalculator>
        <FormContainer>
          <FormInputContainer>
            <FormControl fullWidth>
              <Autocomplete
                id="device"
                options={devices.map(d => d.name)}
                renderInput={params => <TextField {...params} label="Laite" />}
                value={leasingPackage.device}
                onChange={(e, newValue) =>
                  handleInputChange(e, "device", newValue)
                }
                disablePortal
              />
            </FormControl>
          </FormInputContainer>

          {!!leasingPackage.device && (
            <FormInputContainer>
              <FormControl margin="dense">
                <CheckboxInput
                  checked={leasingPackage.extendedWarrantySelected}
                  onChange={e =>
                    handleInputChange(e, "extendedWarrantySelected")
                  }
                />
              </FormControl>
              <CheckboxLabel>{leasingPackage.warrantyName}</CheckboxLabel>
            </FormInputContainer>
          )}

          <FormInputContainer>
            <StyledToggleButtonGroup
              value={leasingPackage.peripherals}
              onChange={(e, newValue) =>
                handleInputChange(e, "peripherals", newValue)
              }
              aria-label="Button group for selecting peripherals"
            >
              {peripherals.map(p => (
                <ToggleButton
                  value={p.name}
                  aria-label={p.name}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <ButtonTextContainer>{p.name}</ButtonTextContainer>
                  <ButtonTextContainer noWrap>{p.price} €</ButtonTextContainer>
                </ToggleButton>
              ))}
            </StyledToggleButtonGroup>
          </FormInputContainer>

          <FormInputContainer>
            <FormControl fullWidth>
              <InputText>Määrä</InputText>
              <CountSlider
                id="count-slider"
                value={
                  typeof leasingPackage.count === "number"
                    ? leasingPackage.count
                    : MIN_DEVICES
                }
                onChange={e => handleInputChange(e, "count")}
                min={MIN_DEVICES}
                max={MAX_DEVICES}
                aria-label="Device count slider"
              />
              <Input
                id="count"
                value={leasingPackage.count}
                onChange={e => handleInputChange(e, "count")}
                onBlur={handleBlur}
                type="number"
                inputProps={{
                  step: 1,
                  min: MIN_DEVICES,
                  max: MAX_DEVICES,
                }}
                sx={{ width: "fit-content", alignSelf: "center" }}
                arial-label="Device count input"
              />
            </FormControl>
          </FormInputContainer>
        </FormContainer>

        <TableContainer>
          <Table style={{ margin: 0 }}>
            <TableHead>
              <StyledTableRow key="heading">
                <StyledTableCell align="left">Tuote</StyledTableCell>
                <StyledTableCell align="left">Suoraosto</StyledTableCell>
                <StyledTableCell align="left">Hinta 36kk</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {leasingPrices.itemContributions.length > 0 &&
                leasingPrices.itemContributions.map(row => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.contribution}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              <StyledTableRow key="total">
                <StyledTableCell align="left">Yhteensä</StyledTableCell>
                <StyledTableCell align="left">
                  {leasingPrices.directPurchase}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {leasingPrices.price36}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <VatNotice>Hinnat ALV 0%</VatNotice>
        </TableContainer>
      </LeasingCalculator>
    </LeasingCalculatorContainer>
  )
}
