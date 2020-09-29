import React, { useContext, useState } from "react";
import { FirebaseContext } from "../firebase/index";
import { useHistory } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Divider,
  TextField,
  MenuItem,
  InputLabel,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    width: "100%",
    maxWidth: "600px",
  },
  input: {
    width: "90%",
    margin: "0.5rem auto",
  },
  label: {
    marginTop: "0.5rem",
  },
  error: {
    color: "#E40000",
  },
  imageSuccess: {
    color: "#00CA00",
  },
}));

const NewSaucer = () => {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const classes = useStyles();

  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must contain at least 3 characters")
        .required("Name is required"),
      price: Yup.number()
        .min(1, "Number must be greater than 1")
        .required("Number is required"),
      category: Yup.string().required("Category is required"),
      description: Yup.string()
        .min(10, "Description must contain at least 10 characters")
        .required("Description is required"),
    }),
    onSubmit: async (data) => {
      try {
        data.status = true;
        data.image = urlImage;
        await firebase.db.collection("products").add(data);
        history.push("/menu");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleUploadStart = () => {
    setProgress(0);
    setUpload(true);
  };

  const handleUploadError = (error) => {
    setUpload(false);
    console.log(error);
  };

  const handleUploadSuccess = async (name) => {
    setProgress(100);
    setUpload(false);
    const url = await firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL();
    console.log(url);
    setUrlImage(url);
  };

  const handleProgress = (progress) => {
    setProgress(progress);
    console.log(progress);
  };

  return (
    <>
      <Typography variant="h2">New Saucer</Typography>
      <Divider />
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.input}
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="name"
        />
        {formik.touched.name && formik.errors.name ? (
          <Typography
            className={classes.error}
            variant="caption"
            display="block"
            gutterBottom
          >
            {formik.errors.name}
          </Typography>
        ) : null}

        <TextField
          id="price"
          className={classes.input}
          value={formik.values.price}
          onChange={formik.handleChange}
          type="number"
          label="Price"
          onBlur={formik.handleBlur}
        />

        {formik.touched.price && formik.errors.price ? (
          <Typography
            className={classes.error}
            variant="caption"
            display="block"
            gutterBottom
          >
            {formik.errors.price}
          </Typography>
        ) : null}

        <TextField
          name="category"
          className={classes.input}
          label="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          select
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="breakfast">Breakfast</MenuItem>
          <MenuItem value="lunch">Lunch</MenuItem>
          <MenuItem value="dinner">Dinner</MenuItem>
          <MenuItem value="drinks">Drinks</MenuItem>
          <MenuItem value="salads">Salads</MenuItem>
        </TextField>

        {formik.touched.category && formik.errors.category ? (
          <Typography
            className={classes.error}
            variant="caption"
            display="block"
            gutterBottom
          >
            {formik.errors.category}
          </Typography>
        ) : null}

        <InputLabel className={classes.label} id="image">
          Image
        </InputLabel>

        <FileUploader
          accept="image/*"
          id="image"
          name="image"
          randomizeFilename
          storageRef={firebase.storage.ref("products")}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
          className={classes.label}
        />

        {upload && (
          <div className={classes.input}>
            <LinearProgress variant="determinate" value={progress} />
          </div>
        )}

        {urlImage && (
          <Typography
            className={[classes.input, classes.imageSuccess]}
            variant="caption"
          >
            Image uploaded successfully
          </Typography>
        )}

        <TextField
          className={classes.input}
          label="Description"
          rows={5}
          multiline
          variant="outlined"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="description"
        />

        {formik.touched.description && formik.errors.description ? (
          <Typography
            className={classes.error}
            variant="caption"
            display="block"
            gutterBottom
          >
            {formik.errors.description}
          </Typography>
        ) : null}

        <Button
          className={classes.input}
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          type="submit"
        >
          Add Saucer
        </Button>
      </form>
    </>
  );
};

export default NewSaucer;
