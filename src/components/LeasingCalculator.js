import React, { useState, useEffect } from "react"
import Helmet from "react-helmet"
import { getContrast, shade } from "polished"
import styled from "styled-components"
import appTheme from "../theme"

import {
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  Checkbox,
  Button,
} from "@mui/material"
import { styled as muiStyled } from "@mui/material/styles"

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

const LeasingCalculatorFormContainer = styled.div`
  height: fit-content;
  width: 100%;
`

const LeasingCalculatorFormUpper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    display: flex;
    flex-direction: column;
  }
`

const LeasingCalculatorFormLower = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`

const LeasingPriceTableContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
`

const InputContainer = styled.div`
  width: calc(100% / 3 - 16px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin: 0px 8px 16px;

  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    width: 100%;
    margin: 16px 0px;
  }
`

const InputText = styled.p`
  width: fit-content;
  height: fit-content;
  margin: 0;
`

const CheckboxLabel = styled.p`
  margin: 0;
  padding: 0;
`

const VatNotice = styled.p`
  width: fit-content;
  padding: 0;
  margin: 0;
  font-size: smaller;
  color: ${props => props.theme.colors.dark};
`

/* ---------- MUI-styled replacements for withStyles ---------- */
const WarrantyCheckbox = muiStyled(Checkbox)({
  color: appTheme.colors.dark,
  "&.Mui-checked": {
    color: appTheme.colors.brand,
  },
})

const brandTextColor =
  getContrast(appTheme.colors.darkest, appTheme.colors.lightest) > 10
    ? appTheme.colors.darkest
    : appTheme.colors.lightest

const BrandButton = muiStyled(Button)({
  backgroundColor: appTheme.colors.brand,
  width: "calc(100% - 10px)",
  margin: "5px 5px 0px",
  color: brandTextColor,
  "&:hover": {
    backgroundColor: appTheme.colors.brand, // keep same look on hover as before
  },
})

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
    extendedWarranty: false,
    warrantyName: devices[0].warrantyName,
    warrantyPrice: devices[0].warrantyPrice,
    count: 1,
  })
  const [leasingPrices, setLeasingPrices] = useState([
    {
      name: "Leasing hinnat",
      price36: "--",
      directPurchase: "--",
    },
  ])
  const [peripheralsOpen, setPeripheralsOpen] = useState(false)

  const handleInputChange = (e, key) => {
    const { value, checked } = e.target

    switch (key) {
      case "extendedWarranty":
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
          warrantyName: selectedDevice.warrantyName,
          warrantyPrice: selectedDevice.warrantyPrice,
        }))
      default:
        setLeasingPackage(prev => ({
          ...prev,
          [key]: value,
        }))
    }
  }

  const handleBlur = () => {
    if (leasingPackage.count < 1) {
      setLeasingPackage(prev => ({ ...prev, count: 1 }))
    } else if (leasingPackage.count > 1000) {
      setLeasingPackage(prev => ({ ...prev, count: 1000 }))
    }
  }

  const handlePeripheralsOpen = () => setPeripheralsOpen(true)
  const handlePeripheralsClose = () => setPeripheralsOpen(false)

  useEffect(() => {
    const selectedDevice = devices.find(d => d.name === leasingPackage.device)
    const selectedPeripherals = peripherals.filter(p =>
      leasingPackage.peripherals.includes(p.name)
    )

    // Calculate the leasing prices for the selected package.
    let pricePerUnit =
      selectedDevice.price +
      selectedPeripherals.reduce((total, current) => {
        if (current.price) {
          total += current.price
        }
        return total
      }, 0)

    if (leasingPackage.extendedWarranty) {
      pricePerUnit += selectedDevice.warrantyPrice
    }

    const threeYearPayment =
      ((pricePerUnit * leasingPackage.count + additionalMargin) / 36) *
      threeYearInterest
    const directPurchase = pricePerUnit * leasingPackage.count

    setLeasingPrices([
      {
        price36: `${threeYearPayment.toFixed(2)} €/kk`,
        directPurchase: `${directPurchase.toFixed(2)} €`,
      },
    ])
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
        <LeasingCalculatorFormContainer>
          <LeasingCalculatorFormUpper>
            <InputContainer>
              <FormControl fullWidth>
                <InputText>Laite</InputText>
                <Select
                  id="device"
                  value={leasingPackage.device}
                  onChange={e => handleInputChange(e, "device")}
                  input={<Input aria-label="device-input" />}
                  displayEmpty
                  MenuProps={{
                    // modern anchoring; old getContentAnchorEl is removed
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    transformOrigin: { vertical: "top", horizontal: "left" },
                  }}
                >
                  {devices?.map(d => (
                    <MenuItem key={d.name} value={d.name}>
                      {d.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputContainer>

            <InputContainer>
              <FormControl fullWidth>
                <InputText>Oheislaitteet</InputText>
                <Select
                  id="peripherals"
                  multiple
                  value={
                    leasingPackage.peripherals.length > 0
                      ? leasingPackage.peripherals
                      : []
                  }
                  open={peripheralsOpen}
                  onOpen={handlePeripheralsOpen}
                  onClose={handlePeripheralsClose}
                  onChange={e => handleInputChange(e, "peripherals")}
                  input={<Input aria-label="peripherals-input" />}
                  displayEmpty
                  renderValue={selected =>
                    Array.isArray(selected) && selected.length > 0
                      ? selected.join(", ")
                      : "Valitse oheislaitteet"
                  }
                  MenuProps={{
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    transformOrigin: { vertical: "top", horizontal: "left" },
                  }}
                >
                  {peripherals?.map(p => (
                    <MenuItem key={p.name} value={p.name}>
                      {p.name}
                    </MenuItem>
                  ))}
                  <BrandButton onClick={handlePeripheralsClose}>
                    Sulje
                  </BrandButton>
                </Select>
              </FormControl>
            </InputContainer>

            <InputContainer>
              <FormControl fullWidth>
                <InputText>Määrä</InputText>
                <Input
                  id="count"
                  value={leasingPackage.count}
                  onChange={e => handleInputChange(e, "count")}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 1000,
                    type: "number",
                    "aria-label": "count",
                  }}
                />
              </FormControl>
            </InputContainer>
          </LeasingCalculatorFormUpper>

          <LeasingCalculatorFormLower>
            <FormControl margin="dense">
              <WarrantyCheckbox
                checked={leasingPackage.extendedWarranty}
                onChange={e => handleInputChange(e, "extendedWarranty")}
              />
            </FormControl>
            <CheckboxLabel>{leasingPackage.warrantyName}</CheckboxLabel>
          </LeasingCalculatorFormLower>
        </LeasingCalculatorFormContainer>

        <LeasingPriceTableContainer>
          <Table style={{ margin: 0 }}>
            <TableHead>
              <TableRow key="heading">
                <TableCell align="left">Suoraosto</TableCell>
                <TableCell align="left">Hinta 36kk</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leasingPrices.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.directPurchase}</TableCell>
                  <TableCell align="left">{row.price36}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <VatNotice>Hinnat ALV 0%</VatNotice>
        </LeasingPriceTableContainer>
      </LeasingCalculator>
    </LeasingCalculatorContainer>
  )
}
