import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

export default function Navbar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
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
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        id="inner"
      >
        <div className="itemsDiv">
          <h1>SHOPPING CART</h1>
          <List>
            {props.arr.map((text, index) => {
              if (text.length > 0) {
                return (
                //for each element, if there is an active item, display name, lowest price and highest price
                  <ListItem key={text[0]}>
                      <div>
                        <h2 id="name">{text[4]}</h2>
                        <h3 id="price">${text[1]} - ${text[2]}</h3>
                      </div>
                  </ListItem>
                )
              }
            })}
          </List>  
        </div>
      </div>
    );
  
    return (
      <div id="menu">
        {['right'].map((anchor1) => (
          <React.Fragment key={anchor1}>
            <Button onClick={toggleDrawer(anchor1, true)}><FontAwesomeIcon icon={faShoppingCart} size="2x" /></Button>
            
            <Drawer anchor={anchor1} open={state[anchor1]} onClose={toggleDrawer(anchor1, false)}>
              {list(anchor1)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  }