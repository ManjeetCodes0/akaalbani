import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import React from "react";
import { schemaTypes } from "./schemas";
import "./studio.css";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "l70phq0b";
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

const AkaalibaniLogo = () =>
  React.createElement(
    "div",
    { style: { display: "flex", alignItems: "center", gap: "0.45rem", fontWeight: 700 } },
    React.createElement(
      "span",
      {
        style: {
          width: "1.55rem",
          height: "1.55rem",
          borderRadius: "0.42rem",
          background: "#b64022",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontFamily: "serif"
        }
      },
      "ਅ"
    ),
    React.createElement("span", null, "Akaalibani")
  );

export default defineConfig({
  name: "default",
  title: "Akaalibani Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes
  },
  studio: {
    components: {
      logo: AkaalibaniLogo
    }
  }
});
