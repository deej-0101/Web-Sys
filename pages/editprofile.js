import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import Button from "/components/CustomButtons/Button.js"
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import NavPills from "/components/NavPills/NavPills.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/profilePage.js";
import useSWR from 'swr'
import Link from "next/link";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

// import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, useField, handleSubmit, useFormikContext } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles(styles);
const fetcher = url => fetch(url).then(res => res.json())

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  bio: yup.string().required('Message is required'),
});

export default function EditProfile() {
const classes = useStyles();
const handleSubmit = (values, { setSubmitting }) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("email", values.email);
  formData.append("bio", values.bio);


  axios
    .post("/api/update-user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      setSubmitting(false);

      // Update the JSON file with the form data
      fetch("/api/update-json", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
      setSubmitting(false);
    });
};

  return (
    <div>
      <Header
        color="transparent"
        brand="BSCS3B1-Nicanor"
        rightLinks={<HeaderLinks />}
        fixed
      />
      <Parallax small filter image="/img/bg-profile-c.jpg"/>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem cs={12} sm={12} md={8}>
                <h2 className={classes.title}>Edit Profile</h2>
                <Formik
                    initialValues={{ name: '', email: '', bio: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      const formData = new FormData();
                      formData.append("name", values.name);
                      formData.append("email", values.email);
                      formData.append("bio", values.bio);
                      axios
                      .post("/api/update-user", formData, {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        })
                      .then((response) => {
                          console.log(response.data);
                          setSubmitting(false);
                          // Update the JSON file with the form data
                          fetch("/api/update-json", {
                            method: "POST",
                            body: JSON.stringify(values),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          })
                          .then((response) => response.json())
                          .then((data) => {
                              console.log(data);
                            })
                          .catch((error) => {
                              console.error(error);
                            });
                        })
                      .catch((error) => {
                          console.error(error);
                          setSubmitting(false);
                        });
                    }}
                    method="post"
                  >
                    {({ isSubmitting }) => (
                    <Form>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <Field
                            as={TextField}
                            name="name"
                            label="Enter your name"
                            fullWidth
                            required
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Field
                            as={TextField}
                            name="email"
                            label="Enter your email"
                            fullWidth
                            required
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <Field
                            as={TextField}
                            name="bio"
                            label="Enter your bio"
                            fullWidth
                            multiline
                            rows={5}
                            required
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                     
                        </GridItem>
                        
                      </GridContainer>
                      <GridContainer justify="center" >
                        <GridItem xs={12} md={12}>
                            <Button type="submit" disabled={isSubmitting} color="primary">
                                Submit
                            </Button>
                        </GridItem>
                      </GridContainer>
                    </Form>
                  )}
                </Formik>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
