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
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-size:80%;
  display:inline-block;
  padding:4px 6px;
  border-radius:4px;
  margin-left:10px;
  text-transform:uppercase;
  text-decoration:none;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {      
    margin-left:0px;
    margin-top:10px;
    border:none;
    padding:5px;
  }
  &:hover {
    background: ${props => props.theme.colors.light}
  }

`;


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