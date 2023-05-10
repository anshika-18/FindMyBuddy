import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import clientPromise from "../lib/mongo/index";
import varibles from '../styles/variables.module.scss';
import Hello from "./hello";
import LandingPage from './components/landingpage/landing-page'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <>
    <LandingPage />
    Hii
    <div className={varibles.title}>Hello sass</div>
  </>;
}
