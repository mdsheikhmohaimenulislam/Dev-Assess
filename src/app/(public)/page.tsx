import Footer from "@/components/layouts/public/Footer";
import Navbar from "@/components/layouts/public/Navber";
import HomePage from "@/components/layouts/shear/Problem";
import React from "react";
import HomeApp from "./app/page";
import UpcomingProblems from "./UpcomingProblems/page";

export default function Homepage() {
  return (
    <>
    <HomeApp/>
    <HomePage/>
    <UpcomingProblems/>
    <Footer/>
    </>
  );
}
