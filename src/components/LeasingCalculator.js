import React, { useState, useMemo } from "react"
import Helmet from "react-helmet"
import { getContrast, shade, lighten, darken } from "polished"
import styled from "styled-components"

import {
  FormControl,
  Autocomplete,
  Input,
  Checkbox,
  TextField,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  IconButton,
  Box,
  Stack,
  Select,
  MenuItem,
  Divider,
  toggleButtonClasses,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import DevicesIcon from "@mui/icons-material/Devices"
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined"
import { useTheme } from "@mui/material/styles"

const MIN_DEVICES = 1
const MAX_DEVICES = 100
const MIN_USERS = 1
const MAX_USERS = 100

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
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  border: 1px solid
    ${({ theme }) => shade(0.2, theme.palette.background.default)};
  border-radius: 4px;
  padding: 1em;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) =>
    getContrast(theme.palette.text.primary, theme.palette.background.default) >
    10
      ? theme.palette.text.primary
      : theme.palette.background.default};

  ${({ theme }) => theme.breakpoints.down("sm")} {
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
  width: calc(100% - 2 * 0.75em);
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

/* ---------- MUI components styled with styled-components ---------- */
const CalculatorSectionContainer = styled(Box)`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`

const HeaderCard = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0.5em 1em;
  gap: 1rem;
  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: minmax(11em, 14em) 1fr minmax(7em, 8em);
  }
`

const DeviceCard = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  padding: 1em;
  gap: 1rem;
  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: minmax(11em, 14em) 1fr minmax(7em, 8em);
  }
  align-items: start;
  border: 1px solid ${({ theme }) => lighten(0.5, theme.palette.primary.main)};
  border-radius: 10px;
`

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  gap: 0.4rem;
  flex-wrap: wrap;
  && .${toggleButtonClasses.root} {
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  }

  && .${toggleButtonClasses.root} + .${toggleButtonClasses.root} {
    margin-left: 0; /* MUI sometimes uses negative margin / overlap */
  }

  && .${toggleButtonClasses.root}:not(:first-of-type) {
    border-left: 1px solid ${({ theme }) => theme.palette.divider};
  }

  &&
    .${toggleButtonClasses.root}.${toggleButtonClasses.disabled}:not(:first-of-type) {
    border-left: 1px solid
      ${({ theme }) => theme.palette.action.disabledBackground};
  }
`

const QuantityButton = styled(IconButton)`
  &.MuiIconButton-root {
    padding: 0.2rem;
    border: 1px solid ${({ theme }) => lighten(0.5, theme.palette.primary.main)};
    border-radius: 10px;
  }
`

const UserCountSliderContainer = styled(Box)`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1em;
  border: 1px solid ${({ theme }) => lighten(0.5, theme.palette.primary.main)};
  border-radius: 10px;
  gap: 1em;
`

const ServiceInputsContainer = styled(Box)`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  gap: 1rem;
  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: 1fr 1fr;
  }
`

const StyledSelectContainer = styled(Box)`
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
`

const StyledSelect = styled(Select)`
  height: 56px;
  width: 100%;
  border-radius: 10px;
  & .MuiSelect-select {
    height: 56px !important;
    display: flex;
    align-items: center;
    min-width: 0;
    padding-top: 0;
    padding-bottom: 0;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .MuiOutlinedInput-notchedOutline {
    top: 0;
    border-radius: 12px;
    & legend {
      display: none;
    }
  }
`

const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    padding: 6px 16px;
  }
`

const CostBreakdownContainer = styled(Box)`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(14, 1fr);
  }
`

const CostBreakdownBox = styled(Box)`
  min-width: 0;
  width: 100%;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => lighten(0.6, theme.palette.primary.main)};
  border-radius: 10px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: 0.5rem;
  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-column: span ${({ $span }) => $span || 1};
  }
`

const PriceFormat = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
})

/**
 * Safely parses JSON strings provided as props to the component.
 * @param {string} str
 * @param {any} fallback
 * @returns {any}
 */
const safeParse = (str, fallback) => {
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}

/**
 * Formats strings to be used as keys for list items in JSX.
 *
 * Makes all characters lower-case, replaces whitespace with dashes (-) and
 * removes non-alphanumeric characters.
 * @param {string} str
 * @returns {string} Formatted string
 */
const formatKey = str =>
  str
    .toLowerCase()
    .replaceAll(/\s/g, "-")
    .replaceAll(/[^a-z0-9\s]/g, "")

export default function LeasingCalculatorComponent({
  additionalMargin,
  threeYearInterest,
  devices,
  support,
  security,
  businessApps,
  cloudBackup,
  centralizedManagement,
}) {
  // Load the Material UI theme
  const theme = useTheme()

  // Parse the serialized JSON strings from the MDX.
  const parsedDevices = useMemo(() => safeParse(devices, []), [devices])
  const parsedSupport = useMemo(() => safeParse(support, []), [support])
  const parsedSecurity = useMemo(() => safeParse(security, []), [security])
  const parsedBusinessApps = useMemo(
    () => safeParse(businessApps, []),
    [businessApps]
  )
  const parsedCloudBackup = useMemo(
    () => safeParse(cloudBackup, []),
    [cloudBackup]
  )
  const parsedCentralizedManagement = useMemo(
    () => safeParse(centralizedManagement, {}),
    [centralizedManagement]
  )

  const [leasingPackage, setLeasingPackage] = useState({
    devices:
      parsedDevices.length > 0
        ? [
            {
              name: parsedDevices[0].name,
              price: parsedDevices[0].price,
              peripherals: [],
              count: 1,
            },
          ]
        : [],
    services: {
      support: "",
      security: "",
      businessApps: "",
      cloudBackup: "",
      centralizedManagement: parsedCentralizedManagement,
    },
    userCount: 1,
    servicesChecked: {
      centralizedManagement: false,
      cloudBackup: false,
    },
  })

  const [open, setOpen] = useState({
    support: false,
    security: false,
    businessApps: false,
  })

  const handleDevicesChange = (_, newValue) => {
    let newDevices = newValue.reduce((packageDevices, current) => {
      if (!packageDevices.some(d => d.name === current)) {
        const catalogueDevice = parsedDevices.find(d => d.name === current)
        if (!catalogueDevice) {
          return packageDevices
        }
        packageDevices.push({
          name: catalogueDevice.name,
          price: catalogueDevice.price,
          peripherals: [],
          count: 1,
        })
      }
      return packageDevices
    }, leasingPackage.devices)

    newDevices = newDevices.filter(d => newValue.includes(d.name))

    setLeasingPackage(prev => ({
      ...prev,
      devices: newDevices,
    }))
  }

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

  const handleBlur = (deviceName, rawCount) => {
    const parsed = Number(rawCount)

    const normalized = Number.isNaN(parsed)
      ? MIN_DEVICES
      : clamp(parsed, MIN_DEVICES, MAX_DEVICES)

    setLeasingPackage(prev => ({
      ...prev,
      devices: prev.devices.map(d =>
        d.name === deviceName ? { ...d, count: normalized } : d
      ),
    }))
  }

  const handleQuantityUpdate = (deviceName, change = 0) => {
    setLeasingPackage(prev => ({
      ...prev,
      devices: prev.devices.map(d => {
        const current = Number(d.count)
        if (Number.isNaN(current)) {
          return d
        }

        return d.name === deviceName &&
          d.count + change >= MIN_DEVICES &&
          d.count + change <= MAX_DEVICES
          ? { ...d, count: current + change }
          : d
      }),
    }))
  }

  const handleQuantitySet = (e, deviceName) => {
    const { value } = e.target

    setLeasingPackage(prev => ({
      ...prev,
      devices: prev.devices.map(d =>
        d.name === deviceName ? { ...d, count: value } : d
      ),
    }))
  }

  const handlePeripheralsChange = (deviceName, newValue) => {
    const catalogueDevicePeripherals =
      parsedDevices.find(d => d.name === deviceName)?.peripherals || []

    setLeasingPackage(prev => ({
      ...prev,
      devices: prev.devices.map(d => {
        if (d.name === deviceName) {
          return {
            ...d,
            peripherals: newValue
              .map(
                v =>
                  catalogueDevicePeripherals.find(p => p.name === v) ||
                  undefined
              )
              .filter(v => !!v),
          }
        }
        return d
      }),
    }))
  }

  const handleUserCountChange = (_, value) => {
    // If a support package has been selected, make sure to update it to the correct one if necessary.
    setLeasingPackage(prev => {
      const support = prev.services.support

      // Check if we need to update the support to match the new user count.
      const supportNeedsRecalc =
        support &&
        support.type === "fixed" &&
        (value < support.fromUsers || value > support.toUsers)

      // Find the correct support package for the user count.
      const nextSupport = supportNeedsRecalc
        ? parsedSupport.find(s =>
            s.toUsers
              ? value >= s.fromUsers && value <= s.toUsers
              : value >= s.fromUsers
          )
        : support

      return {
        ...prev,
        userCount: value,
        services: {
          ...prev.services,
          support: nextSupport,
        },
      }
    })
  }

  const handleSupportChange = e => {
    const { value } = e.target

    setLeasingPackage(prev => ({
      ...prev,
      services: {
        ...prev.services,
        support: parsedSupport.find(s => s.name === value) || "",
      },
    }))
  }

  const handleSecurityChange = e => {
    const { value } = e.target

    setLeasingPackage(prev => ({
      ...prev,
      services: {
        ...prev.services,
        security: parsedSecurity.find(s => s.name === value) || "",
      },
    }))
  }

  const handleBusinessAppsChange = e => {
    const { value } = e.target

    // Choose the correct cloud backup option if available
    let relatedCloudBackup = undefined
    if (parsedCloudBackup && parsedCloudBackup.length > 0) {
      relatedCloudBackup =
        parsedCloudBackup.find(cb =>
          value.toLowerCase().includes(cb.for.toLowerCase())
        ) || ""
    }

    setLeasingPackage(prev => ({
      ...prev,
      services: {
        ...prev.services,
        businessApps: parsedBusinessApps.find(a => a.name === value) || "",
        ...(relatedCloudBackup
          ? { cloudBackup: relatedCloudBackup }
          : { cloudBackup: "" }),
      },
    }))
  }

  const handleCloudBackupChange = e => {
    const { checked } = e.target
    setLeasingPackage(prev => ({
      ...prev,
      servicesChecked: { ...prev.servicesChecked, cloudBackup: checked },
    }))
  }

  const handleCentalizedManagementCheckedChange = e => {
    const { checked } = e.target
    setLeasingPackage(prev => ({
      ...prev,
      servicesChecked: {
        ...prev.servicesChecked,
        centralizedManagement: checked,
      },
    }))
  }

  const handleSelectOpen = stateKey => {
    setOpen(prev => ({
      ...prev,
      [stateKey]: true,
    }))
  }

  const handleSelectClose = stateKey => {
    setOpen(prev => ({ ...prev, [stateKey]: false }))
  }

  /**
   * This is used to check if any services have been selected as part of the
   * leasing package.
   */
  const packageIncludesServices = () => {
    let objectCount = 0
    for (const value of Object.values(leasingPackage.services)) {
      if (typeof value === "object") {
        objectCount += 1
      }
    }
    for (const value of Object.values(leasingPackage.servicesChecked)) {
      if (value) {
        objectCount += 1
      }
    }
    return objectCount > 1
  }

  const supportOptions = useMemo(() => {
    return parsedSupport.filter(s =>
      s.type === "fixed"
        ? s.toUsers
          ? leasingPackage.userCount >= s.fromUsers &&
            leasingPackage.userCount <= s.toUsers
          : leasingPackage.userCount >= s.fromUsers
        : true
    )
  }, [parsedSupport, leasingPackage])

  const { devicesComputed, totals } = useMemo(() => {
    let servicePayment = 0

    // Calculate the direct purchase price for devices + peripherals. These are
    // added to the total as well.
    const devicesComputedLocal = leasingPackage.devices.map(device => {
      let pricePerUnit = device.peripherals.reduce(
        (total, current) => (total += current.price),
        0
      )

      if (device.name) {
        const devicePrice =
          parsedDevices.find(d => d.name === device.name).price || 0
        pricePerUnit += devicePrice
      }

      const deviceTotal = pricePerUnit * Number(device.count)

      return {
        ...device,
        deviceTotal,
        contribution: 0, // Calculated below
      }
    })

    const directPurchase = devicesComputedLocal.reduce(
      (total, current) => total + current.deviceTotal,
      0
    )

    // Calculate the monthly payment for services and add them to the total.
    if (
      typeof leasingPackage.services.support === "object" &&
      Object.keys(leasingPackage.services.support).length > 0
    ) {
      servicePayment +=
        leasingPackage.services.support.price * leasingPackage.userCount
    }

    if (
      typeof leasingPackage.services.security === "object" &&
      Object.keys(leasingPackage.services.security).length > 0
    ) {
      servicePayment +=
        leasingPackage.services.security.price * leasingPackage.userCount
    }

    if (
      typeof leasingPackage.services.businessApps === "object" &&
      Object.keys(leasingPackage.services.businessApps).length > 0
    ) {
      servicePayment +=
        leasingPackage.services.businessApps.price * leasingPackage.userCount
    }

    if (leasingPackage.servicesChecked.cloudBackup) {
      servicePayment +=
        leasingPackage.services.cloudBackup.price * leasingPackage.userCount
    }

    if (leasingPackage.servicesChecked.centralizedManagement) {
      servicePayment +=
        leasingPackage.services.centralizedManagement.price *
        leasingPackage.userCount
    }

    // Calculate each item's contribution to the final monthly payment based on
    // the products portion of the direct purchase price.
    // KPMG: https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/ifrg/2024/lease-payments.pdf

    // Calculate the monthly payment on devices + peripherals.
    let devicePayment =
      ((directPurchase + additionalMargin) / 36) * threeYearInterest

    // Calculate contributions for device
    const devicesWithContribution =
      directPurchase > 0
        ? devicesComputedLocal.map(device => {
            const weight = device.deviceTotal / directPurchase

            // Contributions are calculated as a percentage of the monthly device
            // payment.
            return { ...device, contribution: devicePayment * weight }
          })
        : devicesComputedLocal

    return {
      devicesComputed: devicesWithContribution,
      totals: {
        directPurchase,
        devicePayment,
        servicePayment,
        totalPayment: devicePayment + servicePayment,
      },
    }
  }, [leasingPackage, parsedDevices, additionalMargin, threeYearInterest])

  return (
    <LeasingCalculatorContainer>
      <Helmet
        meta={[
          {
            name: "calculator-keywords",
            content: parsedDevices
              .map(d => d.name.replaceAll(",", ""))
              .join(", "),
          },
        ]}
      />
      <LeasingCalculator>
        <CalculatorSectionContainer>
          <Box
            sx={{
              height: "fit-content",
              width: "fit-content",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                height: "2.2rem",
                padding: "0.3rem",
                aspectRatio: 1,
                backgroundColor: darken(0.1, theme.palette.background.default),
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  height: "fit-content",
                  width: "fit-content",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                }}
              >
                1
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{ fontSize: "1.3rem", fontWeight: 500 }}
            >
              Laitteet
            </Typography>
          </Box>
          <FormContainer>
            <FormInputContainer>
              <FormControl fullWidth>
                <Autocomplete
                  id="devices"
                  options={parsedDevices.map(d => d.name)}
                  renderInput={params => (
                    <TextField {...params} label="Laite" />
                  )}
                  value={leasingPackage.devices.map(d => d.name)}
                  onChange={(e, newValue) => handleDevicesChange(e, newValue)}
                  multiple={true}
                  disablePortal
                  disableClearable
                />
              </FormControl>
            </FormInputContainer>
          </FormContainer>
          <TableContainer>
            <HeaderCard>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.8em",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  color: lighten(0.1, theme.palette.primary.main),
                }}
              >
                Laite
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.8em",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  color: lighten(0.1, theme.palette.primary.main),
                }}
              >
                Oheislaitteet + takuulaajennukset
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.8em",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  color: lighten(0.1, theme.palette.primary.main),
                  [theme.breakpoints.up("md")]: {
                    textAlign: "right",
                  },
                }}
              >
                Hinta & kpl
              </Typography>
            </HeaderCard>
            <Stack direction="column" spacing={1}>
              {devicesComputed.map(row => {
                const catalogueDevice = parsedDevices.find(
                  d => d.name === row.name
                )

                if (!catalogueDevice) {
                  return <></>
                }

                return (
                  <DeviceCard key={formatKey(row.name)}>
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                        gutterBottom
                      >
                        {row.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          color: lighten(0.15, theme.palette.primary.main),
                        }}
                      >
                        Perushinta: {PriceFormat.format(row.price)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 400,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          color: lighten(0.1, theme.palette.primary.main),
                        }}
                        gutterBottom
                      >
                        Valitse oheislaitteet
                      </Typography>
                      {!!catalogueDevice.peripherals && (
                        <StyledToggleButtonGroup
                          value={row.peripherals.map(p => p.name)}
                          onChange={(_, newValue) =>
                            handlePeripheralsChange(row.name, newValue)
                          }
                          aria-label="Button group for selecting peripherals"
                        >
                          {catalogueDevice.peripherals.map(p => (
                            <ToggleButton
                              key={formatKey(p.name)}
                              value={p.name}
                              aria-label={p.name}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "0.3rem",
                              }}
                              size="small"
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: "x-small",
                                  fontWeight: 700,
                                  color: lighten(
                                    0.1,
                                    theme.palette.primary.main
                                  ),
                                }}
                              >
                                {p.name}: {PriceFormat.format(p.price)}
                              </Typography>
                            </ToggleButton>
                          ))}
                        </StyledToggleButtonGroup>
                      )}
                    </Box>
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1em",
                        [theme.breakpoints.up("md")]: {
                          flexDirection: "column",
                          justifyContent: "flex-start",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          height: "fit-content",
                          width: "fit-content",
                          [theme.breakpoints.up("md")]: {
                            width: "100%",
                            textAlign: "right",
                            alignSelf: "flex-end",
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                        >
                          {PriceFormat.format(row.contribution)}/kk
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "0.7rem",
                            color: lighten(0.1, theme.palette.primary.main),
                          }}
                        >
                          Suoraosto
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "0.7rem",
                            color: lighten(0.1, theme.palette.primary.main),
                          }}
                        >
                          {PriceFormat.format(row.deviceTotal)} (alv 0%)
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: "fit-content",
                          width: "fit-content",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          gap: "0.3em",
                          padding: "0.3em",
                          marginTop: "auto",
                          border: `1px solid ${lighten(
                            0.5,
                            theme.palette.primary.main
                          )}`,
                          borderRadius: "10px",
                          backgroundColor: darken(
                            0.02,
                            theme.palette.background.default
                          ),
                        }}
                      >
                        <QuantityButton
                          size="medium"
                          onClick={() => handleQuantityUpdate(row.name, -1)}
                        >
                          <RemoveIcon />
                        </QuantityButton>
                        <Input
                          id="count"
                          type="number"
                          value={row.count}
                          onChange={e => handleQuantitySet(e, row.name)}
                          onBlur={e => handleBlur(row.name, e.target.value)}
                          inputProps={{
                            type: "number",
                            step: 1,
                            min: MIN_DEVICES,
                            max: MAX_DEVICES,
                            sx: {
                              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                                {
                                  WebkitAppearance: "none",
                                  margin: 0,
                                },
                              "&": {
                                MozAppearance: "textfield",
                              },
                              textAlign: "center",
                            },
                          }}
                          aria-label={`Device count input for ${row.name}`}
                          disableUnderline
                        />
                        <QuantityButton
                          size="medium"
                          onClick={() => handleQuantityUpdate(row.name, 1)}
                        >
                          <AddIcon />
                        </QuantityButton>
                      </Box>
                    </Box>
                  </DeviceCard>
                )
              })}
            </Stack>
          </TableContainer>
        </CalculatorSectionContainer>

        <CalculatorSectionContainer>
          <Box
            sx={{
              height: "fit-content",
              width: "fit-content",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                height: "2.2rem",
                padding: "0.3rem",
                aspectRatio: 1,
                backgroundColor: darken(0.1, theme.palette.background.default),
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  height: "fit-content",
                  width: "fit-content",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                }}
              >
                2
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{ fontSize: "1.3rem", fontWeight: 500 }}
            >
              Palvelut
            </Typography>
          </Box>
          <UserCountSliderContainer>
            <Box
              sx={{
                height: "fit-content",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  height: "fit-content",
                  width: "fit-content",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5em",
                  backgroundColor: `${lighten(
                    0.25,
                    theme.palette.secondary.main
                  )}`,
                  borderRadius: "10px",
                  lineHeight: 0,
                }}
              >
                <PeopleOutlineIcon fontSize="large" />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: `${theme.palette.primary.main}`,
                  }}
                >
                  Palvelut ja käyttäjät
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: `${lighten(0.2, theme.palette.primary.main)}` }}
                >
                  Valitse käyttäjämäärä ja tarvittavat pilvipalvelut
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "fit-content",
                  width: "fit-content",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginLeft: "auto",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    textAlign: "right",
                    color: `${darken(0.1, theme.palette.secondary.main)}`,
                  }}
                >
                  {leasingPackage.userCount}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    color: `${lighten(0.2, theme.palette.primary.main)}`,
                    textTransform: "uppercase",
                  }}
                >
                  {leasingPackage.userCount === 1 ? "Käyttäjä" : "Käyttäjää"}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Slider
                id="count-slider"
                value={
                  typeof leasingPackage.userCount === "number"
                    ? leasingPackage.userCount
                    : MIN_USERS
                }
                onChange={handleUserCountChange}
                min={MIN_USERS}
                max={MAX_USERS}
                aria-label="User count slider"
                sx={{
                  color: theme.palette.secondary.main,
                  width: `calc(100% - 20px)`,
                  alignSelf: "center",
                }}
              />
            </Box>
          </UserCountSliderContainer>
          <ServiceInputsContainer>
            <StyledSelectContainer>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: `${lighten(0.2, theme.palette.primary.main)}`,
                  textTransform: "uppercase",
                }}
              >
                TDP IT-tuki
              </Typography>
              <FormControl fullWidth>
                <StyledSelect
                  id="support-input"
                  variant="outlined"
                  open={open.support}
                  onOpen={() => handleSelectOpen("support")}
                  onClose={() => handleSelectClose("support")}
                  value={leasingPackage.services.support?.name || ""}
                  onChange={e => handleSupportChange(e)}
                >
                  <StyledMenuItem key="no-support" value={""}>
                    <Typography variant="body1" noWrap>
                      Ei valintaa
                    </Typography>
                  </StyledMenuItem>
                  {supportOptions.map(s => (
                    <StyledMenuItem key={formatKey(s.name)} value={s.name}>
                      <Typography variant="body1" noWrap>
                        {s.name} {PriceFormat.format(s.price)}/kk
                      </Typography>
                    </StyledMenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </StyledSelectContainer>
            <StyledSelectContainer>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: `${lighten(0.2, theme.palette.primary.main)}`,
                  textTransform: "uppercase",
                }}
              >
                Tietoturva
              </Typography>
              <FormControl fullWidth>
                <StyledSelect
                  id="security-input"
                  variant="outlined"
                  open={open.security}
                  onOpen={() => handleSelectOpen("security")}
                  onClose={() => handleSelectClose("security")}
                  value={leasingPackage.services.security?.name || ""}
                  onChange={e => handleSecurityChange(e)}
                >
                  <StyledMenuItem key="no-support" value={""}>
                    <Typography variant="body1" noWrap>
                      Ei valintaa
                    </Typography>
                  </StyledMenuItem>
                  {parsedSecurity.map(s => (
                    <StyledMenuItem key={formatKey(s.name)} value={s.name}>
                      <Typography variant="body1" noWrap>
                        {s.name} {PriceFormat.format(s.price)}/kk
                      </Typography>
                    </StyledMenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </StyledSelectContainer>
            <StyledSelectContainer>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: `${lighten(0.2, theme.palette.primary.main)}`,
                  textTransform: "uppercase",
                }}
              >
                Liiketoimintasovellukset
              </Typography>
              <FormControl fullWidth>
                <StyledSelect
                  id="business-apps-input"
                  variant="outlined"
                  open={open.businessApps}
                  onOpen={() => handleSelectOpen("businessApps")}
                  onClose={() => handleSelectClose("businessApps")}
                  value={leasingPackage.services.businessApps?.name || ""}
                  onChange={e => handleBusinessAppsChange(e)}
                >
                  <StyledMenuItem key="no-support" value={""}>
                    <Typography variant="body1" noWrap>
                      Ei valintaa
                    </Typography>
                  </StyledMenuItem>
                  {parsedBusinessApps.map(a => (
                    <StyledMenuItem key={formatKey(a.name)} value={a.name}>
                      <Typography variant="body1" noWrap>
                        {a.name} {PriceFormat.format(a.price)}/kk
                      </Typography>
                    </StyledMenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </StyledSelectContainer>
            <StyledSelectContainer>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: `${lighten(0.2, theme.palette.primary.main)}`,
                  textTransform: "uppercase",
                }}
              >
                Hallinta
              </Typography>
              <Box
                sx={{
                  height: 56,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: "auto",
                  border: `1px solid ${lighten(
                    0.5,
                    theme.palette.primary.main
                  )}`,
                  borderRadius: "10px",
                  px: 1,
                }}
              >
                <FormControl>
                  <Checkbox
                    checked={
                      leasingPackage.servicesChecked.centralizedManagement
                    }
                    onChange={e => handleCentalizedManagementCheckedChange(e)}
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  />
                </FormControl>
                <Box
                  sx={{
                    height: "fit-content",
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "0.9rem", fontWeight: 400 }}
                  >
                    {leasingPackage.services.centralizedManagement?.name ||
                      "Ei määritelty"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 400,
                      color: `${lighten(0.2, theme.palette.primary.main)}`,
                    }}
                  >
                    {PriceFormat.format(
                      leasingPackage.services.centralizedManagement?.price
                        ? leasingPackage.services.centralizedManagement?.price
                        : 0
                    )}
                    /kk
                  </Typography>
                </Box>
              </Box>
            </StyledSelectContainer>
            {!!leasingPackage.services.cloudBackup && (
              <StyledSelectContainer
                sx={{ gridColumn: "1", gridRow: { xs: 4, md: 3 } }}
              >
                <Box
                  sx={{
                    height: 56,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: "auto",
                    border: `1px solid ${lighten(
                      0.5,
                      theme.palette.primary.main
                    )}`,
                    borderRadius: "10px",
                    px: 1,
                  }}
                >
                  <FormControl>
                    <Checkbox
                      checked={leasingPackage.servicesChecked.cloudBackup}
                      onChange={e => handleCloudBackupChange(e)}
                      sx={{
                        color: theme.palette.primary.main,
                        "&.Mui-checked": {
                          color: theme.palette.secondary.main,
                        },
                      }}
                    />
                  </FormControl>
                  <Box
                    sx={{
                      height: "fit-content",
                      width: "fit-content",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "0.9rem", fontWeight: 400 }}
                    >
                      {leasingPackage.services.cloudBackup?.name ||
                        "Pilvipalveluiden varmuuskopiointi"}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 400,
                        color: `${lighten(0.2, theme.palette.primary.main)}`,
                      }}
                    >
                      {PriceFormat.format(
                        leasingPackage.services.cloudBackup.price
                      )}
                      /kk
                    </Typography>
                  </Box>
                </Box>
              </StyledSelectContainer>
            )}
          </ServiceInputsContainer>
        </CalculatorSectionContainer>

        <CalculatorSectionContainer>
          <Box
            sx={{
              height: "fit-content",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              border: `1px solid ${lighten(0.5, theme.palette.primary.main)}`,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "fit-content",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: `${theme.palette.primary.main}`,
                padding: "0.7rem",
              }}
            >
              <CreditCardIcon
                sx={{
                  color: `${theme.palette.background.default}`,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: `${theme.palette.background.default}`,
                }}
              >
                Kustannusyhteenveto
              </Typography>
            </Box>
            <CostBreakdownContainer>
              <CostBreakdownBox
                $span={7}
                $backgroundColor={darken(
                  0.02,
                  theme.palette.background.default
                )}
              >
                <Box
                  sx={{
                    height: "fit-content",
                    width: "100%",
                    minWidth: 0,
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <DevicesIcon
                    sx={{ color: lighten(0.2, theme.palette.primary.main) }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: `${lighten(0.2, theme.palette.primary.main)}`,
                      textTransform: "uppercase",
                    }}
                  >
                    Laitteet (36kk leasing)
                  </Typography>
                </Box>
                {devicesComputed.length > 0 ? (
                  devicesComputed.map(d => (
                    <Box
                      key={formatKey(d.name)}
                      sx={{
                        height: "fit-content",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "1rem",
                      }}
                    >
                      <Box
                        sx={{
                          height: "fit-content",
                          py: "0.2rem",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "0.9rem", textOverflow: "ellipsis" }}
                          noWrap
                        >
                          {d.count}x {d.name}
                        </Typography>
                        {d.peripherals && d.peripherals.length > 0 && (
                          <>
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.7rem",
                                color: lighten(0.2, theme.palette.primary.main),
                              }}
                            >
                              {Number(d.count) === 1 ? "Laite" : "Laitteet"}:{" "}
                              {PriceFormat.format(d.price * Number(d.count))}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.7rem",
                                color: lighten(0.2, theme.palette.primary.main),
                              }}
                            >
                              Oheislaitteet:{" "}
                              {PriceFormat.format(
                                d.peripherals.reduce(
                                  (pTotal, current) => pTotal + current.price,
                                  0
                                )
                              )}
                            </Typography>
                          </>
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.7rem",
                            color: lighten(0.2, theme.palette.primary.main),
                          }}
                        >
                          Suoraosto: {PriceFormat.format(d.deviceTotal)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          width: "fit-content",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          textWrap: "nowrap",
                          marginLeft: "auto",
                          py: "0.2rem",
                        }}
                      >
                        {PriceFormat.format(d.contribution)}/kk
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    fontStyle="italic"
                    sx={{
                      fontSize: "0.7rem",
                      color: lighten(0.2, theme.palette.primary.main),
                    }}
                  >
                    Ei valittuja laitteita
                  </Typography>
                )}
                <Box
                  sx={{
                    width: "100%",
                    marginTop: "auto",
                  }}
                >
                  <Divider
                    variant="fullWidth"
                    sx={{ paddingTop: "0.5rem" }}
                    flexItem
                  />
                  <Box
                    sx={{
                      height: "fit-content",
                      width: "100%",
                      display: "inline-flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "1rem",
                      py: "0.5rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "0.9rem", fontWeight: 700 }}
                    >
                      Laitteet yhteensä
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        marginLeft: "auto",
                      }}
                    >
                      {PriceFormat.format(totals.devicePayment)}/kk
                    </Typography>
                  </Box>
                </Box>
              </CostBreakdownBox>
              <CostBreakdownBox
                $span={7}
                $backgroundColor={lighten(0.75, theme.palette.primary.main)}
              >
                <Box
                  sx={{
                    height: "fit-content",
                    width: "100%",
                    minWidth: 0,
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <DnsOutlinedIcon
                    sx={{ color: lighten(0.2, theme.palette.primary.main) }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: `${lighten(0.2, theme.palette.primary.main)}`,
                      textTransform: "uppercase",
                    }}
                  >
                    Palvelut ({leasingPackage.userCount}{" "}
                    {leasingPackage.userCount === 1 ? "Käyttäjä" : "Käyttäjää"})
                  </Typography>
                </Box>
                {packageIncludesServices() ? (
                  Object.entries(leasingPackage.services)
                    .reduce((selectedServices, [key, value]) => {
                      const checkboxSelectedService = Object.keys(
                        leasingPackage.servicesChecked
                      ).some(k => k === key)

                      if (value === "") {
                        return selectedServices
                      } else if (
                        checkboxSelectedService &&
                        leasingPackage.servicesChecked[key]
                      ) {
                        selectedServices.push(value)
                      } else if (!checkboxSelectedService) {
                        selectedServices.push(value)
                      }
                      return selectedServices
                    }, [])
                    .map(s => (
                      <Box
                        key={formatKey(s.name)}
                        sx={{
                          height: "fit-content",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <Box
                          sx={{
                            height: "fit-content",
                            py: "0.2rem",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "0.9rem",
                              textOverflow: "ellipsis",
                            }}
                            noWrap
                          >
                            {s.name}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            width: "fit-content",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            textWrap: "nowrap",
                            marginLeft: "auto",
                          }}
                        >
                          {PriceFormat.format(
                            s.price * leasingPackage.userCount
                          )}
                          /kk
                        </Typography>
                      </Box>
                    ))
                ) : (
                  <Typography
                    variant="body2"
                    fontStyle="italic"
                    sx={{
                      fontSize: "0.7rem",
                      color: lighten(0.2, theme.palette.primary.main),
                    }}
                  >
                    Ei valittuja palveluita
                  </Typography>
                )}
                <Box
                  sx={{
                    width: "100%",
                    marginTop: "auto",
                  }}
                >
                  <Divider
                    variant="fullWidth"
                    sx={{ paddingTop: "0.5rem" }}
                    flexItem
                  />
                  <Box
                    sx={{
                      height: "fit-content",
                      width: "100%",
                      display: "inline-flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "1rem",
                      py: "0.5rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "0.9rem", fontWeight: 700 }}
                    >
                      Palvelut yhteensä
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        marginLeft: "auto",
                      }}
                    >
                      {PriceFormat.format(totals.servicePayment)}/kk
                    </Typography>
                  </Box>
                </Box>
              </CostBreakdownBox>
              <CostBreakdownBox $span={6}>
                <Box
                  sx={{
                    height: "fit-content",
                    width: "fit-content",
                    minWidth: 0,
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ color: lighten(0.2, theme.palette.primary.main) }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: `${lighten(0.2, theme.palette.primary.main)}`,
                      textTransform: "uppercase",
                    }}
                  >
                    Suoraosto
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    color: lighten(0.2, theme.palette.primary.main),
                  }}
                >
                  Laitteiden ja lisätarvikkeiden hinta kerralla ostettuna.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginTop: "0.5rem",
                  }}
                >
                  {PriceFormat.format(totals.directPurchase)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    color: lighten(0.2, theme.palette.primary.main),
                    textTransform: "uppercase",
                  }}
                >
                  Kerralla maksettava (Alv 0%)
                </Typography>
              </CostBreakdownBox>
              <CostBreakdownBox
                $span={8}
                $backgroundColor={theme.palette.secondary.main}
              >
                <Box
                  sx={{
                    height: "fit-content",
                    width: "100%",
                    minWidth: 0,
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <EventRepeatOutlinedIcon />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Kuukausierä
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.7rem",
                    fontWeight: 700,
                    marginTop: "0.5rem",
                  }}
                >
                  {PriceFormat.format(totals.totalPayment)}/kk
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  Sisältää laitteet ja kaikki valitut palvelut.
                </Typography>
              </CostBreakdownBox>
            </CostBreakdownContainer>
            <Box
              sx={{
                height: "fit-content",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "0.7rem",
                px: "0.7rem",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: `${lighten(0.2, theme.palette.primary.main)}`,
                  textTransform: "uppercase",
                }}
              >
                Hinnat alv 0 % ▪ Leasing edellyttää hyväksyttyä luottopäätöstä ▪
                Sopimuskausi 36kk
              </Typography>
            </Box>
          </Box>
        </CalculatorSectionContainer>
      </LeasingCalculator>
    </LeasingCalculatorContainer>
  )
}
