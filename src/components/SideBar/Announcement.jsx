import React, { useState, useEffect } from "react";
import { SideCardContainer } from "./style";
import AnnouncementCard from "./AnnouncementCard";
import UserImg from "../../assets/images/navuser.svg";

const Announcement = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);
      if (storedUserData && storedUserData.UserName) {
        setUserData(storedUserData.UserName);
      }
    }
  }, []);

  // Sample data for mapping
  const announcements = [
    {
      MainText: "Welcome to Swiftuni",
      SubText: "Hello, Welcome to swiftuni 2.0",
      date: "12 Jan 2024",
    },
    {
      MainText: "Welcome to Swiftuni",
      SubText: "Hello, Welcome to swiftuni 2.0 ",
      date: "16 Jan 2024",
    },
  ];

  return (
    <>
      <SideCardContainer>
        {announcements.map((announcement, index) => (
          <AnnouncementCard
            key={index}
            MainText={announcement.MainText}
            SubText={announcement.SubText}
            date={announcement.date}
          />
        ))}
      </SideCardContainer>
    </>
  );
};

export default Announcement;

// import React, { useState, useEffect } from "react";
// import {
//   SideCardContainer,
//   Avatar3,
//   AnnunceMainDiv,
//   AnnunceSubDiv,
//   VIPText,
//   AnnounceDateText,
//   PurchasedText,
// } from "./style";
// import UserImg from "../../assets/images/navuser.svg";

// const Announcement = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const storedUserDataString = localStorage.getItem("userData");
//     if (storedUserDataString) {
//       const storedUserData = JSON.parse(storedUserDataString);
//       if (storedUserData && storedUserData.UserName) {
//         setUserData(storedUserData.UserName);
//       }
//     }
//   }, []);

//   return (
//     <>
//       <SideCardContainer>
//         <AnnunceMainDiv>
//           <AnnunceSubDiv>
//             <Avatar3 src={UserImg} alt="user" />
//             <div>
//               <VIPText>Welcome to Swiftuni</VIPText>
//               <PurchasedText>
//                 Hello, Welcome to swiftuni 2.0 This advanced practice por
//               </PurchasedText>
//             </div>
//           </AnnunceSubDiv>
//           <AnnounceDateText>12 Jan 2024</AnnounceDateText>
//         </AnnunceMainDiv>
//       </SideCardContainer>
//     </>
//   );
// };

// export default Announcement;
