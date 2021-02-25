import React, {useState} from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import styled, {keyframes} from 'styled-components';
import { lighten, shade, getContrast, rgba } from 'polished'

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    background:${props => props.theme.color.darkest};
  }
  100% {
    transform: translateX(0%);
    background:${props => props.theme.color.dark};
    
  }
`;
const slideOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
`;
const BurgerMenu = styled.div`
  @media (min-width: ${props => props.theme.mobileBreakpoint}px) {
    display:none;
  }
  text-align:center;
  svg {
    fill: ${props => props.theme.colors.light};
  }
  &:hover {
    cursor:pointer;
    svg {
      fill: ${props => props.theme.colors.brand};
    }
    .burger-label {
      color: ${props => props.theme.colors.brand};
    }
  }
  .burger-label {
    text-transform:uppercase;
    font-size:80%;
    margin-top:-10px;
    display:block;
    color: ${props => props.theme.colors.light};
  }


`;
const MenuItems = styled.nav`
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    position:fixed;
    top:0px;
    right:0px;
    background-color: ${props => rgba(props.theme.colors.dark, 0.8)};
    -webkit-backdrop-filter: blur(20px);
    -o-backdrop-filter: blur(20px);
    -moz-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    transform: translateX(${props => props.isClosing ? '100%' : '0%'});
    width:100%;
    height:100%;
    z-index:99;
    display:${props => props.isOpen ? 'block' : 'none'};
    animation: ${props => props.isClosing ? slideOut : slideIn} 0.2s ease-in;
    padding:40px 10px 10px 10px;
    box-shadow:0px 0px 6px ${props => props.theme.colors.darkest};
    box-sizing:border-box;
  }


`;
const CloseButton = styled.span`
  @media (min-width: ${props => props.theme.mobileBreakpoint}px) {
    display:none;
  }
  font-size:64px;
  line-height:38px;
  cursor:pointer;
  position:Absolute;
  top:10px;
  right:10px;
  color: ${props => props.theme.colors.light};
  &:hover {
    color: ${props => props.theme.colors.lightest};
    font-weight:bold;
  }
`;

const MenuItem = styled(Link)`
  && {
    color:${props => props.theme.colors.light};
    text-transform:uppercase;
    display:inline-block;
    padding:0px 10px;
    &:hover {
      color:${props => props.theme.colors.lightest};
      font-weight:bold;
    }
  }
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    && {
      border-bottom:1px solid #fff;
      display:block;
      border-bottom:${props => props.theme.colors.light} 1px solid;
      padding:6px 0px;

    }
  }

`;

export default () => {
  const [isOpen, setOpen] = useState(false);
  const [isClosing, setClosing] = useState(false);

  const settings = require("./../../content/settings.json")
  const openMenu = (open) => {
    if (!open) {
      setClosing(true);
      setTimeout( () => {
        setOpen(false);
        setClosing(false);
      }, 200)
    }
    else setOpen(true);
  }
  return (
    <>
      <BurgerMenu onClick={() => {
        openMenu(true);
      }}>
        <svg viewBox="0 0 100 70" width="40" height="24">
          <rect width="100" height="10"></rect>
          <rect y="26" width="100" height="10"></rect>
          <rect y="52" width="100" height="10"></rect>
        </svg>
        <span className="burger-label">Valikko</span>
        </BurgerMenu>

      <MenuItems isOpen={isOpen} isClosing={isClosing} >

        <CloseButton onClick={() => {
          openMenu(false);
      }}>×</CloseButton>

      {settings.navigation.map( (navItem, index) => {
        return (
          <MenuItem to={navItem.link} key={navItem.link + '-' + navItem.title}>
              {navItem.title}
          </MenuItem>
        )
      })}
      </MenuItems>
    </>
  );
 
}






/*

export default (props) => {
  const settings = require("./../../content/settings.json")
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className="top"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {settings.navigation.map( (navItem, index) => {
          return (
            <ListItem button key={navItem.link} key={index}>
              <Link to={navItem.link}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={navItem.title} /> 
              </Link>
            </ListItem>
          )
        })}
      </List>
    </div>
  );
  if (settings.navtype === 'dropdown') {
    return (
      <>
        <Button variant="outlined" onClick={toggleDrawer('right', true)}>Menu</Button>
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </>
    );
  }
  else {
    return (
      <>
        {settings.navigation.map( (navItem, index) => {
          return (
            <StyledLink to={navItem.link} key={navItem.link + '-' + navItem.title}>
                {navItem.title}
            </StyledLink>
          )
        })}
      </>
    )
  }
}
*/