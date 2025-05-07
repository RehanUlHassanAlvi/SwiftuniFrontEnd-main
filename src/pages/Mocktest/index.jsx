import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Box,
  Button,
  Tab,
  ThemeProvider,
  styled,
  useMediaQuery,
} from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import PTE from "./PTE";
import theme from "../../theme";

export default function MockTest() {
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");
  const [value, setValue] = React.useState("PTE");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar />
        <div style={{
          height: "calc(100vh - 7rem)",
          backgroundColor: "#f1f5f9",
          padding: isLaptopTwo ? "2rem 3% 0rem" : "7rem 3% 0rem",
        }}>
          <PTE/>
          {/* <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="PTE" value="PTE" />
                <Tab label="PTE-Core" value="PTE-Core" />
              </TabList>
            </Box>
            {value === "PTE" ? (
              <PTE/>
            ) : (
              <div>PTE-Core</div>
            )}
          </TabContext> */}
        </div>
      </>
    </ThemeProvider>
  );
}
