// src/components/Navigation.js
import React, { useState, useCallback } from "react";
import { Link } from "gatsby";
import styled, { keyframes } from "styled-components";
import { rgba } from "polished";
import settings from "../../content/settings.json";

// MUI v7 (used only when settings.navtype === "dropdown")
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";

/* ---------- Animations ---------- */
const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0%); }
`;
const slideOut = keyframes`
  from { transform: translateX(0%); }
  to   { transform: translateX(100%); }
`;

/* ---------- Styled components (ported) ---------- */
const BurgerMenu = styled.div`
  @media (min-width: ${props => props.theme.mobileBreakpoint}px) {
    display: none;
  }
  text-align: center;

  svg { fill: ${props => props.theme.colors.light}; }

  &:hover {
    cursor: pointer;
    svg { fill: ${props => props.theme.colors.brand}; }
    .burger-label { color: ${props => props.theme.colors.brand}; }
  }

  .burger-label {
    text-transform: uppercase;
    font-size: 80%;
    margin-top: -10px;
    display: block;
    color: ${props => props.theme.colors.light};
  }
`;

const MenuItems = styled.nav`
  /* hide by default (desktop and tablets) */
  display: none;

  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    position: fixed;
    top: 0;
    right: 0;
    background-color: ${props => rgba(props.theme.colors.dark, 0.8)};
    -webkit-backdrop-filter: blur(20px);
    -o-backdrop-filter: blur(20px);
    -moz-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    transform: translateX(${props => (props.isClosing ? "100%" : "0%")});
    width: 100%;
    height: 100%;
    z-index: 99;

    /* only render on mobile, and only when open */
    display: ${props => (props.isOpen ? "block" : "none")};

    animation: ${props => (props.isClosing ? slideOut : slideIn)} 0.2s ease-in;
    padding: 40px 10px 10px 10px;
    box-shadow: 0 0 6px ${props => props.theme.colors.darkest};
    box-sizing: border-box;
  }
`;

const CloseButton = styled.span`
  @media (min-width: ${props => props.theme.mobileBreakpoint}px) {
    display: none;
  }
  font-size: 64px;
  line-height: 38px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${props => props.theme.colors.light};

  &:hover {
    color: ${props => props.theme.colors.lightest};
    font-weight: bold;
  }
`;

const MenuItem = styled(Link)`
  && {
    color: ${props => props.theme.colors.light};
    text-transform: uppercase;
    display: inline-block;
    padding: 0 10px;

    &:hover {
      color: ${props => props.theme.colors.lightest};
      font-weight: bold;
    }
  }

  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    && {
      border-bottom: ${props => props.theme.colors.light} 1px solid;
      display: block;
      padding: 6px 0;
    }
  }
`;

/* Desktop inline menu */
const DesktopMenu = styled.nav`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    display: none;
  }
`;

/* ---------- Component ---------- */
function Navigation() {
  // declare all hooks up-front (no conditional hooks)
  const [isOpen, setOpen] = useState(false);       // mobile overlay open
  const [isClosing, setClosing] = useState(false); // mobile overlay anim flag
  const [drawerOpen, setDrawerOpen] = useState(false); // MUI Drawer open

  const openMenu = useCallback((open) => {
    if (!open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 200);
    } else {
      setOpen(true);
    }
  }, []);

  const closeAndGo = useCallback(() => openMenu(false), [openMenu]);

  const toggleDrawer = useCallback((open) => (event) => {
    if (event?.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setDrawerOpen(open);
  }, []);

  const DrawerList = (
    <div
      className="top"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {settings.navigation.map((navItem, index) => (
          <ListItem key={`${navItem.link}-${index}`} disablePadding>
            <ListItemButton component={Link} to={navItem.link}>
              <ListItemIcon><MoveToInboxIcon /></ListItemIcon>
              <ListItemText primary={navItem.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  // If "dropdown" mode, show the MUI Drawer only (as in your original)
  if (settings.navtype === "dropdown") {
    return (
      <>
        <Button variant="outlined" onClick={toggleDrawer(true)}>Menu</Button>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </>
    );
  }

  // Default: desktop inline + mobile burger overlay
  return (
    <>
      {/* Desktop inline menu */}
      <DesktopMenu aria-label="Primary">
        {settings.navigation.map((navItem) => (
          <MenuItem to={navItem.link} key={`${navItem.link}-${navItem.title}`}>
            {navItem.title}
          </MenuItem>
        ))}
      </DesktopMenu>

      {/* Mobile burger */}
      <BurgerMenu onClick={() => openMenu(true)} aria-label="Open menu">
        <svg viewBox="0 0 100 70" width="40" height="24" aria-hidden="true" focusable="false">
          <rect width="100" height="10"></rect>
          <rect y="26" width="100" height="10"></rect>
          <rect y="52" width="100" height="10"></rect>
        </svg>
        <span className="burger-label">Valikko</span>
      </BurgerMenu>

      {/* Mobile overlay */}
      <MenuItems isOpen={isOpen} isClosing={isClosing} role="dialog" aria-modal="true" aria-label="Mobile menu">
        <CloseButton onClick={() => openMenu(false)} aria-label="Close menu">×</CloseButton>

        {settings.navigation.map((navItem) => (
          <MenuItem
            to={navItem.link}
            key={`${navItem.link}-${navItem.title}`}
            onClick={closeAndGo}
          >
            {navItem.title}
          </MenuItem>
        ))}
      </MenuItems>
    </>
  );
}

export default Navigation;
