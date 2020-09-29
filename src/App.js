import React from "react";
import firebase, { FirebaseContext } from "./firebase/index";

import { makeStyles } from "@material-ui/core/styles";

import { Switch, Route } from "react-router-dom";

import SideBar from "./components/Sidebar";

import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import NewSaucer from "./pages/NewSaucer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className={classes.root}>
        <SideBar />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Orders} />
            <Route path="/menu" component={Menu} />
            <Route path="/new-saucer" component={NewSaucer} />
          </Switch>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
