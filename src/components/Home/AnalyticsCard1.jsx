import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgressBar from "./LinearProgressBar"; 
import { useMediaQuery } from "@mui/material";

const AnalyticsCard1 = ({
  count,
  attempted = 0,
  TextColor,
  percentage,
  percentageBackgroundColor,
  Question,
  totalProgress,
  chunkCount,
  borderRadius,
  marginBottom
}) => {
  const isLaptop = useMediaQuery('(max-width:1220px)')
  const isSLaptop = useMediaQuery('(max-width:1050px)')
  const isTab = useMediaQuery('(max-width:930px)')
  const isSTab = useMediaQuery('(max-width:700px)')
  const isDesktop = useMediaQuery('(min-width:1800px)')
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const isSmallScreenTwo = useMediaQuery("(max-width:890px)");

  return (
    <Card
      sx={{
        width: "100%", //100% //232px
        height: "auto",
        display: "flex",
        padding: isDesktop?'32px':isSTab?'1% 0px 2%':'2%',
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "15px",
        flex: "1 0 0",
        borderRadius:isSTab?'':borderRadius,
        boxShadow:isSTab?'none':'0px 4px 6px 0px #0000000A',
        border:isSTab?'none':'1px solid #F2F3F7',
        marginBottom:isSTab && marginBottom?'1rem':''
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: TextColor,
            fontFamily: "Noto Sans",
            fontSize: isTab?'24px':"32px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "38.871px",
          }}
        >
          {count}
        </Typography>

        <Box
          sx={{
            display: "flex",
            padding: "1% 4%",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            borderRadius: "48px",
            background: percentageBackgroundColor,
            marginLeft: "10px",
          }}
        >
          <Typography
            sx={{
              color: TextColor,
              leadingTrim: "both",
              textEdge: "cap",
              fontFamily: "Noto Sans",
              fontSize: isTab?'10px':"12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "16px",
            }}
          >
            {percentage}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <LinearProgressBar
          attemptedCount={attempted}
          totalCount={count}
          chunkCount={
            isSmallScreenTwo && !isSmallScreen
              ? chunkCount - 2
              : chunkCount - 1
          }
          barcolor={TextColor}
          bgcolor={percentageBackgroundColor}
        />
      </Box>

      <Typography
        sx={{
          color: "var(--White-Theme-Gray---10, #16161E)",
          fontFamily: "Noto Sans",
          fontSize: isSLaptop && !isSTab?isTab?"10px":"12px":"14px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "16px",
        }}
      >
        {Question}
      </Typography>
    </Card>
  );
};

export default AnalyticsCard1;
