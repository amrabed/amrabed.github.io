"use client";

import React, { createContext, useEffect, useState } from "react";

export const PortfolioContext = createContext();

const PortfolioProvider = ({ children }) => {
  const [dark, setDark] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <PortfolioContext.Provider
      value={{ dark, setDark, showModal, setShowModal }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider;
