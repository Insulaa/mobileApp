import React from "react";
import createServices from "./api/services";

const ServicesContext = React.createContext(createServices());
export default ServicesContext;
