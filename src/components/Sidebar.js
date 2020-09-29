import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5">
        Restaurant App
      </Typography>
      <Divider />
      <List>
        <Link className={classes.link} to="/">
          <ListItem button>
            <ListItemText primary="Orders" />
          </ListItem>
        </Link>
        <Link className={classes.link} to="/menu">
          <ListItem button>
            <ListItemText primary="Menu" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
