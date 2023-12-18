import * as React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import post1 from "./blog-post.1.md";
import post2 from "./blog-post.1.md";
import post3 from "./blog-post.1.md";
const Icon = `${process.env.PUBLIC_URL}/icons/pharmacyLogo2.svg`;
const Home1 = `${process.env.PUBLIC_URL}/icons/pharmaHome1.jpg`;
const Home2 = `${process.env.PUBLIC_URL}/icons/pharmaHome2.jpg`;
const Home3 = `${process.env.PUBLIC_URL}/icons/pharmaHome3.jpg`;
const sections = [];

const mainFeaturedPost = {
  title: "Welcome to MangoDB Virtual Pharmacy",
  description:
    "An all in one solution to your pharmaceutical needs. Our pharmacy provides you with your needs of medicines all with a click of a button!",
  image: Home1,
  imageText: "MangoDB Virtual Pharmacy",
  linkText: (
    <Link to="./pharmaReg" sx={{ color: "#fff" }}>
      Sign up
    </Link>
  ),
};

const featuredPosts = [
  {
    title: "Complete Pharmacy",
    date: "",
    description: "Find all the meds you need and order them to your doorstep",
    image: Home2,
    imageLabel: "Patient Services",
  },
  {
    title: "24/7 Support",
    date: "Dec 17",
    description:
      "Need help? Our pharmacists are always available to help you at any time",
    image: Home3,
    imageLabel: "Pharmacist Services",
  },
];

const posts = [
  "We are a diverse team of designers, developers, pharmacists, and doctors. Our goal is to create a comprehensive E-medical solution that simplifies the process of finding and ordering medications, offers 24/7 support, and meets the needs of patients, pharmacists, and doctors. We combine our expertise in design, development, and healthcare to improve healthcare accessibility and efficiency through technology.",
  "",
  "",
];
const sidebar = {
  title: "About",
  description:
    "MangoDB Virtual Pharmacy is a digital platform designed to revolutionize the pharmacy experience. Our platform provides a user-friendly interface for patients, pharmacists, and administrators, offering efficient navigation and high levels of accessibility. Join us on this journey towards a more streamlined and effective healthcare experience.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    {
      name: "GitHub",
      icon: GitHubIcon,
      url: "https://github.com/advanced-computer-lab-2023/MangoDB-Pharmacy", // replace with your GitHub profile URL
    },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Who are we?" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="El7a2ny" />
    </ThemeProvider>
  );
}
