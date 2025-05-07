import React from "react";
import { ContactDiv, ContactDivLink, ContactDivText } from "./style";

const ContactCard = ({ width = "100%", svg, contact, text }) => {
  return (
    <ContactDiv style={{ width: width }}>
      <img
        alt={text}
        src={svg}
        style={{ width: "2.5rem", height: "2.5rem", marginLeft: "1rem" }}
      />
      {contact === "tel" ? (
        <ContactDivLink href="tel:+923071170004">{text}</ContactDivLink>
      ) : contact === "email" ? (
        <ContactDivLink href="mailto:help@swiftuni.com">{text}</ContactDivLink>
      ) : (
        <ContactDivLink
          href="https://www.google.com/maps/search/?api=1&query=Ground+Floor,+Hafiz+Town+Plaza,+Faisalabad+Road,+Khurrianwala,+Pakistan"
          target="_blank"
        >
          {text}
        </ContactDivLink>
      )}
    </ContactDiv>
  );
};

export default ContactCard;
