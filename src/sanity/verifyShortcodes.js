// src/sanity/verifyShortcodes.js
import {
  CallToAction,
  Link,
  HeroBlock,
  Cards,
  LatestPosts,
  ListOfEmployees,
  ListOfLeasingPackages,
  NewsletterForm,
  SupportPricingCalculator,
  DisplayVariable,
  YoutubeWrapper,
  LeasingCalculator,
  TableOfContents,
  H1, H2, H3, H4, H5, H6,
} from "../components";
import Grid from "@mui/material/Grid";

const isValidComponent = (v) =>
  !!v && (typeof v === "function" || typeof v === "object");

const componentsToCheck = {
  CallToAction,
  Link,
  HeroBlock,
  Cards,
  LatestPosts,
  ListOfEmployees,
  ListOfLeasingPackages,
  NewsletterForm,
  SupportPricingCalculator,
  DisplayVariable,
  YoutubeWrapper,
  LeasingCalculator,
  TableOfContents,
  H1, H2, H3, H4, H5, H6,
  Grid,
};

const missing = Object.entries(componentsToCheck)
  .filter(([, v]) => !isValidComponent(v))
  .map(([k]) => k);

if (missing.length) {
  // Throw loudly with the exact names you need to fix
  throw new Error(
    `[MDX shortcodes] These imports are undefined or not React components: ${missing.join(", ")}`
  );
}

// Be noisy once so you know the verifier ran
if (typeof console !== "undefined") {
  console.log("[MDX shortcodes] All components resolved OK");
}
