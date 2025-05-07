import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#996CFE",
    color: "white",
    fontSize: "0.7rem",
    fontFamily: "Noto Sans",
    borderRadius: "4px",
    zIndex: "150000 !important",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#333",
  },
});

export default CustomTooltip;
