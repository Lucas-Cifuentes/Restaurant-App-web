import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase/index";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";

import MenuCard from "../components/MenuCard";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    marginLeft: "1rem",
  },
}));

const Menu = () => {
  const [menu, setMenu] = useState([]);

  const { firebase } = useContext(FirebaseContext);
  const classes = useStyles();

  const GetMenu = async () => {
    return await firebase.db.collection("products").onSnapshot(handleSnapshot);
  };

  const handleSnapshot = (snapshot) => {
    const menu = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setMenu(menu);
  };

  useEffect(() => {
    GetMenu();
  }, []);

  return (
    <>
      <div className={classes.header}>
        <Typography color="primary" variant="h2">
          Menu
        </Typography>
        <Link className={classes.link} to="/new-saucer">
          <Button className={classes.button} color="primary">
            New Saucer
          </Button>
        </Link>
      </div>
      <Divider />
      {menu.map((saucer) => (
        <MenuCard key={saucer.id} saucer={saucer} />
      ))}
    </>
  );
};

export default Menu;
