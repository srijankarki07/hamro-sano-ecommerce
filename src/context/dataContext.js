"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [siteData, setSetData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const categories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_categories}`
      );
      return response.json();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const product = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_products}`
      );

      return response.json();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dataOne, dataTwo] = await Promise.all([categories(), product()]);
      setSetData({
        apiOne: dataOne,
        apiTwo: dataTwo,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ siteData, setSetData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
