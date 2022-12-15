import React from "react";

const styleJumbotron = {
  height: 560,
  clear: "both",
  paddingTop: 120,
  textAlign: "center",
};
export default function Jumbotron({ children }) {
  return <div style={styleJumbotron}>{children}</div>;
}
