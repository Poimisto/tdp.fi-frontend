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

/**
 * We'll use hard-coded devices and interest rates for now. In the future we
 * can create a CMS component for editing the calculator and available devices
 * and peripherals.
 */
const ADDITIONAL_MARGIN = 0
const THREE_YEAR_INTEREST = 1.04663
const LEASING_DEVICES = {
  devices: [
    {
      name: 'MacBook Pro 16" M4 Pro 24 Gt, 1 Tt 2024',
      price: 2594,
      warrantyId: 2,
    },
    {
      name: 'MacBook Pro 16" M4 Max 64 Gt, 1Tt 2024',
      price: 3978,
      warrantyId: 2,
    },
    {
      name: 'MacBook Pro 14" M4 24 Gt, 512 Gt 2024',
      price: 1792,
      warrantyId: 1,
    },
    {
      name: 'MacBook Air 15" M4 16 Gt, 512 Gt 2024',
      price: 1449,
      warrantyId: 4,
    },
    { name: "Mac mini M4 Pro 24 Gt, 512 Gt", price: 1393, warrantyId: 3 },
  ],
  warranty: [
    {
      id: 1,
      name:
        'mcare Business Premium -huoltopalvelu, MacBook Pro 14" M4 Pro/Max, 36 kk',
      price: 198,
    },
    {
      id: 2,
      name:
        'mcare Business Premium -huoltopalvelu, MacBook Pro 16" M4 Pro/Max, 36 kk',
      price: 258,
    },
    {
      id: 3,
      name: "mcare Business Premium -huoltopalvelu, Mac Mini M4 Pro, 36 kk",
      price: 112,
    },
    {
      id: 4,
      name: 'mcare Business Premium -huoltopalvelu, MacBook Air 15" M4, 36 kk',
      price: 178,
    },
  ],
  peripherals: [
    { name: "Näppäimistö", price: 76 },
    { name: "Hiiri", price: 105 },
    { name: "Kuulokkeet", price: 159 },
    { name: 'Näyttö 27" QHD USB-C', price: 292 },
  ],
}

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

export default function LeasingCalculatorComponent() {
  const [leasingPackage, setLeasingPackage] = useState({
    device: LEASING_DEVICES.devices[0],
    peripherals: [],
    extendedWarranty: false,
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
    // Calculate the leasing prices for the selected package.
    let extendedWarrantyPrice = 0
    if (leasingPackage.extendedWarranty) {
      const extendedWarranty = LEASING_DEVICES.warranty.find(
        w => w.id === leasingPackage.device.warrantyId
      )

      if (extendedWarranty) {
        extendedWarrantyPrice = extendedWarranty.price
      }
    }

    const pricePerUnit =
      leasingPackage.device.price +
      extendedWarrantyPrice +
      leasingPackage.peripherals.reduce((total, current) => {
        if (current.price) {
          total += current.price
        }
        return total
      }, 0)

    const threeYearPayment =
      ((pricePerUnit * leasingPackage.count + ADDITIONAL_MARGIN) / 36) *
      THREE_YEAR_INTEREST
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
            content: LEASING_DEVICES.devices
              .map(d => d.name.replaceAll(",", ""))
              .join(", "),
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
                  {LEASING_DEVICES.devices?.map(d => (
                    <MenuItem key={d.name} value={d}>
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
                      ? selected.map(s => s.name).join(", ")
                      : "Valitse oheislaitteet"
                  }
                  MenuProps={{
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    transformOrigin: { vertical: "top", horizontal: "left" },
                  }}
                >
                  {LEASING_DEVICES.peripherals?.map(p => (
                    <MenuItem key={p.name} value={p}>
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
            <CheckboxLabel>36kk Business Premium takuulaajennus</CheckboxLabel>
          </LeasingCalculatorFormLower>
        </LeasingCalculatorFormContainer>

        <LeasingPriceTableContainer>
          <Table style={{ margin: 0 }}>
            <TableHead>
              <TableRow>
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
