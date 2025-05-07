import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeIn = styled.span`
  display: inline-block;
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 0; 
`;

const PortalName = ({ text, data }) => {

  let content = null;

  const portal = data?.portal_owner_name?.charAt(0).toUpperCase() + data?.portal_owner_name?.slice(1);

  if (portal) {
    content = <FadeIn>{portal}</FadeIn>;
  }

  return <>{text}{" "}{content}</>;
};

export default PortalName;
