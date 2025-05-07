import React from "react";
import { styled } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ReactComponent as CallIcon } from "../../assets/images/callicon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/Auth";
import { useTestQuestions } from "../../context/TestQuestionContext";

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    display: "inline-flex",
    flexDirection: "column",
    // padding: "1.39% 7.85% 1.39% 1.32%", //max screen 1440
    padding: "1.06% 6.01% 1.06% 1.01%", //max screen 1880px
    alignItems: "center",
    borderRadius: "8px",
    background: "#FFF",
    gap: "20px",
    marginTop: "3px",
  },
});

const StyledMenuItem = styled(MenuItem)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.01) !important",
    borderRadius: "4px",
    "& .MuiListItemText-primary": {
      color: "#6B41CB",
    },
  },
  //   "&:focus-visible": {
  //     backgroundColor: "#FFF !important",
  //     borderRadius: "8px",
  //   },
});

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: "auto",
  "& svg": {
    width: "24px",
    height: "24px",
  },
});

const StyledListItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    color: "var(--White-Theme-Gray---10, #16161E)",
    fontFamily: '"Noto Sans"',
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "16px",
  },
});

const ProfileDropDown = ({
  anchorEl,
  open,
  handleClose,
  userImage,
  userName,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { resetAllStates } = useTestQuestions();

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  const handleSideBar = () => {
    resetAllStates();
    navigate("/sidebar", { state: { section:'My Profile'} });
  };

  return (
    <StyledMenu
      disableAutoFocusItem
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <StyledMenuItem onClick={handleSideBar}>
        <Avatar
          src={userImage}
          alt="User Image"
          sx={{ width: 24, height: 24, marginRight: "11px" }}
        />
        <StyledListItemText primary={userName} />
      </StyledMenuItem>
      <StyledMenuItem
        onClick={() => {
          resetAllStates();
          navigate("/contact-us");
        }}
      >
        <StyledListItemIcon>
          <CallIcon />
        </StyledListItemIcon>
        <StyledListItemText primary="Contact" />
      </StyledMenuItem>
      <StyledMenuItem onClick={handleLogout}>
        <StyledListItemIcon>
          <LogoutIcon />
        </StyledListItemIcon>
        <StyledListItemText primary="Logout" />
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default ProfileDropDown;
