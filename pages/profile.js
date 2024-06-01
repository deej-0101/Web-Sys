import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import Button from "/components/CustomButtons/Button.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import NavPills from "/components/NavPills/NavPills.js";
import Parallax from "/components/Parallax/Parallax.js";
import useSWR from 'swr'
import styles from "/styles/jss/nextjs-material-kit/pages/profilePage.js";

import Link from "next/link";

const fetcher = url => fetch(url).then(res => res.json())

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const { data, error } = useSWR("/api/user", fetcher)

  if (error) return <div>Failed to load user data</div>

  if (!data) return <div>Loading...</div>

  const user = data.user;

  return (
    <div>
      <Header
        color="transparent"
        brand="BSCS3B1-Nicanor"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image="/img/bg-profile-c.jpg" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src="/img/faces/5.jpg"
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h2 className={classes.title}>{user.name}</h2>
                    <h4>{user.school}</h4>
                    <h6>{user.email}  ||  {user.contact}</h6>
                    <Button justIcon link className={classes.margin5}
                      href="https://x.com/home">
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}
                      href="https://www.instagram.com/" >
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}
                      href="https://www.facebook.com/" >
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                {user.bio}
              </p>
            </div>
            <GridContainer justify="center">
              <Link href="/editprofile">
                <Button color="warning" size="md" justify="center">
                    Edit Profile
                </Button>
              </Link>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
               
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}