import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinearProgressBar from "./LinearProgressBar";
import Collapse from "@mui/material/Collapse";
import { Btn } from "../../assets/styles/style";

const AnalyticsCard2 = ({
  imageSrc,
  titleText,
  titleTextColor,
  marksTextColor,
  barBgColor,
  categoriesData = [],
  render_one,
  havePadding = true,
  widthOne = "30px",
  haveRowGap = false,
  keepOpen = false,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const isSmallScreenTwo = useMediaQuery("(max-width:890px)");
  const [isExpanded, setExpanded] = useState(keepOpen);
  const isSLaptop = useMediaQuery("(max-width:1050px)");
  const isMobile = useMediaQuery("(max-width:425px)");
  const isSTab = useMediaQuery("(max-width:860px)");

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  useEffect(() => {
    setExpanded(keepOpen);
  }, [keepOpen]);

  useEffect(() => {
    if (render_one === undefined) {
      setRenderOne(false);
    } else {
      setRenderOne(render_one);
      setExpanded(true);
    }
  }, [render_one]);

  const [renderOne, setRenderOne] = useState(false);

  return (
    <Btn
      onClick={isSmallScreen ? handleToggle : () => {}}
      style={{
        cursor: isSmallScreen ? "pointer" : "default",
      }}
    >
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          rowGap: isSmallScreen ? "0px" : "20px",
          columnGap: isSmallScreen ? "0px" : haveRowGap ? "0px" : "20px",
          width: isSmallScreen ? "100%" : "93.5%",
          padding: isSmallScreen && haveRowGap ? "3% 0px" : "3%",
          borderRadius: "10px",
          border: renderOne
            ? "none"
            : "1px solid var(--White-Theme-Gray---1, #F2F3F7)",
          background: "#FFF",
          boxShadow: renderOne ? "none" : "0px 4px 6px 0px rgba(0, 0, 0, 0.04)",
          marginBottom: isSmallScreen && !haveRowGap ? "15px" : "0px",
        }}
      >
        {/* Box 1 */}
        <Box
          sx={{
            gridColumn: "span 12",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: isSmallScreen && isExpanded ? "10px" : "0px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={imageSrc}
              alt="icon"
              style={{
                width: render_one ? "32px" : "24px",
                height: render_one ? "32px" : "24px",
              }}
            />
            <Typography
              sx={{
                color: titleTextColor,
                fontFamily: "Noto Sans",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: render_one ? "20px" : "16px",
                letterSpacing: "0em",
                marginLeft: "10px",
              }}
            >
              {titleText}
            </Typography>
          </div>
          {isSmallScreen && (
            <IconButton onClick={handleToggle}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>

        {/* {categoriesData.map((data, index) => (
          <React.Fragment key={index}>
            {render_one ? (
              <Collapse
                in={!isSmallScreen || isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                  gridColumn: "span 12",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: isSmallScreen ? "5px" : "0px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: isSmallScreen && isExpanded ? "15px" : "0px",
                    marginLeft: !havePadding && "10px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignSelf: "stretch",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#000",
                          fontFamily: "Noto Sans",
                          fontSize: isSLaptop
                            ? isSTab
                              ? "10px"
                              : "12px"
                            : "14px",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: "16px",
                          textAlign: "left",
                          letterSpacing: "0em",
                        }}
                      >
                        {data.CategoryName}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: marksTextColor,
                        fontFamily: "Noto Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {data.attemptedcount}/{data.TotalCount}
                    </Typography>
                  </div>
                  <div style={{ width: "100%" }}>
                    <LinearProgressBar
                     attemptedCount={data.attemptedcount}
                     totalCount={data.TotalCount}
                      chunkCount={
                        isMobile ? data.chunkCount - 1 : data.chunkCount
                      }
                      barcolor={titleTextColor}
                      bgcolor={barBgColor}
                      widthOne={widthOne}
                    />
                  </div>
                </Box>
              </Collapse>
            ) : (
              <Collapse
                in={!isSmallScreen || isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                  gridColumn: isSmallScreen
                    ? "span 12"
                    : index % 2 === 0
                    ? "span 6"
                    : "span 6",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: isSmallScreen ? "5px" : "0px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: isSmallScreen && isExpanded ? "15px" : "0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignSelf: "stretch",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "var(--White-Theme-Gray---7, #535362)",
                          fontFamily: "Noto Sans",
                          fontSize: isSLaptop
                            ? isSTab
                              ? "10px"
                              : "12px"
                            : "14px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "16px",
                          textAlign: "left",
                          letterSpacing: "0em",
                        }}
                      >
                        {data.CategoryName}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: marksTextColor,
                        fontFamily: "Noto Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {data.attemptedcount}/{data.TotalCount}
                    </Typography>
                  </div>
                  <div style={{ width: "100%" }}>
                    <LinearProgressBar
                      attemptedCount={data.attemptedcount}
                      totalCount={data.TotalCount}
                      chunkCount={
                        isSmallScreenTwo && !isSmallScreen
                          ? data.chunkCount - 3
                          : data.chunkCount - 2
                      }
                      barcolor={titleTextColor}
                      bgcolor={barBgColor}
                      widthOne={widthOne}
                    />
                  </div>
                </Box>
              </Collapse>
            )}
          </React.Fragment>
        ))} */}

        {categoriesData.length > 0 ? (
          categoriesData.map((data, index) => (
            <React.Fragment key={index}>
              {render_one ? (
                <Collapse
                  in={!isSmallScreen || isExpanded}
                  timeout="auto"
                  unmountOnExit
                  sx={{
                    gridColumn: "span 12",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: isSmallScreen ? "5px" : "0px",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom:
                        isSmallScreen && isExpanded ? "15px" : "0px",
                      marginLeft: !havePadding && "10px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignSelf: "stretch",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: "#000",
                            fontFamily: "Noto Sans",
                            fontSize: isSLaptop
                              ? isSTab
                                ? "10px"
                                : "12px"
                              : "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "16px",
                            textAlign: "left",
                            letterSpacing: "0em",
                          }}
                        >
                          {data.CategoryName}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: marksTextColor,
                          fontFamily: "Noto Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: "16px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {data.attemptedcount}/{data.TotalCount}
                      </Typography>
                    </div>
                    <div style={{ width: "100%" }}>
                      <LinearProgressBar
                        attemptedCount={data.attemptedcount}
                        totalCount={data.TotalCount}
                        chunkCount={
                          isMobile ? data.chunkCount - 1 : data.chunkCount
                        }
                        barcolor={titleTextColor}
                        bgcolor={barBgColor}
                        widthOne={widthOne}
                      />
                    </div>
                  </Box>
                </Collapse>
              ) : (
                <Collapse
                  in={!isSmallScreen || isExpanded}
                  timeout="auto"
                  unmountOnExit
                  sx={{
                    gridColumn: isSmallScreen
                      ? "span 12"
                      : index % 2 === 0
                      ? "span 6"
                      : "span 6",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: isSmallScreen ? "5px" : "0px",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom:
                        isSmallScreen && isExpanded ? "15px" : "0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignSelf: "stretch",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: "var(--White-Theme-Gray---7, #535362)",
                            fontFamily: "Noto Sans",
                            fontSize: isSLaptop
                              ? isSTab
                                ? "10px"
                                : "12px"
                              : "14px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "16px",
                            textAlign: "left",
                            letterSpacing: "0em",
                          }}
                        >
                          {data.CategoryName}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: marksTextColor,
                          fontFamily: "Noto Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: "16px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {data.attemptedcount}/{data.TotalCount}
                      </Typography>
                    </div>
                    <div style={{ width: "100%" }}>
                      <LinearProgressBar
                        attemptedCount={data.attemptedcount}
                        totalCount={data.TotalCount}
                        chunkCount={
                          isSmallScreenTwo && !isSmallScreen
                            ? data.chunkCount - 3
                            : data.chunkCount - 2
                        }
                        barcolor={titleTextColor}
                        bgcolor={barBgColor}
                        widthOne={widthOne}
                      />
                    </div>
                  </Box>
                </Collapse>
              )}
            </React.Fragment>
          ))
        ) : (
          <Typography
            sx={{ gridColumn: "span 12", textAlign: "center", marginY: 2 }}
          >
            No task available
          </Typography>
        )}
      </Card>
    </Btn>
  );
};

export default AnalyticsCard2;
