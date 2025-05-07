import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AnnouncementBar,
  AnnouncementText,
  InfoIconWrapper,
  CloseIconWrapper,
  OverlayWrapper,
  YouTubeOverlay,
  ThumbnailImage,
  InfoIconImg,
  AnnouncementWrapper,
  AnnouncementText2,
  AnnouncementTextSimple,
} from "../../assets/styles/style";
import CloseIcon from "@mui/icons-material/Close";
import AnnouncementShoutImg from "../../assets/images/announcement-shout-3.svg";
import { Base_URL } from "../../Client/apiURL";

const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube\.com\/(?:watch\?.*v=|v\/|embed\/))|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
};

const PortalAnnouncements = ({ setBarExists, setAdminBarExists}) => {
  const [portalData, setPortalData] = useState({});
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showSuperAdminAnnouncement, setShowSuperAdminAnnouncement] = useState(false);

  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [showSuperAdminYouTubeModal, setShowSuperAdminYouTubeModal] = useState(false);

  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [superAdminThumbnailSrc, setSuperAdminThumbnailSrc] = useState("");

  const [announcementDetailAll, setAnnouncementDetailAll] = useState({
    youtube_url_for_all_students: "",
    portal_info_for_all_students: "",
    youtube_thumbnail_for_all_students: "",
  });

  useEffect(() => {
    const fetchPortalInfo = async () => {
      try {
        let portalURL = window.location.origin; 
  
        if (
          portalURL.includes("localhost") || portalURL === "https://staging.swiftuni.com"
        ) {
          portalURL = "https://app.swiftuni.com";
        }
  
        const response = await axios.get(
          `${Base_URL}/app/users/portals/portal-info`,
          {
            params: {
              portal_url: portalURL,
            },
          }
        );
  
        if (response.data.responseCode === 200) {
          const portalData = response.data.response;
          setPortalData(portalData);
        } 
      } catch (err) {
        console.error("Error fetching portal info:", err);
      }
    };
  
    fetchPortalInfo();
  }, []);

  useEffect(() => {
    const fetchAnnouncementDetails = async () => {
      try {
        const response = await axios.get(`${Base_URL}/app/admin/get-transaction-details`, {
          withCredentials: true,
        });

        const data = response.data;
        if (data?.response?.TransactionDetails) {
          const parsedDetails = JSON.parse(data.response.TransactionDetails);
          setAnnouncementDetailAll(parsedDetails);
        } else {
          console.error("Failed to fetch transaction details.");
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      }
    };

    fetchAnnouncementDetails();
  }, []);

  useEffect(() => {
    const dismissedAnnouncement = localStorage.getItem("announcementDismissed");
    if (!dismissedAnnouncement && portalData.portal_info) {
      setShowAnnouncement(true);
      setBarExists(true);
    }

    const dismissedSuperAdminAnnouncement = localStorage.getItem("superAdminAnnouncementDismissed");
    if (!dismissedSuperAdminAnnouncement && announcementDetailAll.portal_info_for_all_students) {
      setShowSuperAdminAnnouncement(true);
      setAdminBarExists(true);
    }

    const dismissedThumbnail = localStorage.getItem("thumbnailDismissed");
    if (!dismissedThumbnail) {
      let imageToUse = portalData.youtube_thumbnail || "";
      let youTubeID = "";

      if (!imageToUse && portalData.youtube_url) {
        youTubeID = getYouTubeId(portalData.youtube_url);
        if (youTubeID) {
          imageToUse = `https://img.youtube.com/vi/${youTubeID}/hqdefault.jpg`;
        }
      }

      if (imageToUse) {
        setThumbnailSrc(imageToUse);
        setShowYouTubeModal(true);
      }
    }

    const dismissedSuperAdminThumbnail = localStorage.getItem("superAdminThumbnailDismissed");
    if (!dismissedSuperAdminThumbnail) {
      let imageToUse = announcementDetailAll.youtube_thumbnail_for_all_students || "";
      let youTubeID = "";

      if (!imageToUse && announcementDetailAll.youtube_url_for_all_students) {
        youTubeID = getYouTubeId(announcementDetailAll.youtube_url_for_all_students);
        if (youTubeID) {
          imageToUse = `https://img.youtube.com/vi/${youTubeID}/hqdefault.jpg`;
        }
      }

      if (imageToUse) {
        setSuperAdminThumbnailSrc(imageToUse);
        setShowSuperAdminYouTubeModal(true);
      }
    }
  }, [portalData, announcementDetailAll]);

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false);
    setBarExists(false);
    localStorage.setItem("announcementDismissed", "true");
  };

  const handleOverlayClick = (e) => {
    if (showSuperAdminYouTubeModal) {
      setShowSuperAdminYouTubeModal(false);
      localStorage.setItem("superAdminThumbnailDismissed", "true");
    } else if (showYouTubeModal) {
      setShowYouTubeModal(false);
      localStorage.setItem("thumbnailDismissed", "true");
    }
  };

  const handleThumbnailClick = (e, url) => {
    e.stopPropagation();
    if (url && url.trim() !== "") {
        window.open(url, "_blank");
    }
    handleOverlayClick(e);
  };

  return (
    <>
        <AnnouncementWrapper>
            {showSuperAdminAnnouncement && (
                <AnnouncementBar style={{ zIndex: 1002, backgroundColor: "#FF5D5D" }}>
                <InfoIconWrapper>
                    <InfoIconImg src={AnnouncementShoutImg} alt="Super Admin Announcement Icon" />
                </InfoIconWrapper>
                <AnnouncementText><span>{announcementDetailAll.portal_info_for_all_students}</span></AnnouncementText>
                <CloseIconWrapper>
                  <CloseIcon style={{ color: "white", cursor: "pointer", marginRight: "2rem", display: 'none' }} />
                </CloseIconWrapper>
                </AnnouncementBar>
            )}
 
            {showAnnouncement && (
                <AnnouncementBar style={{ zIndex: 1001 }}>
                <InfoIconWrapper>
                    <InfoIconImg src={AnnouncementShoutImg} alt="Portal Announcement Icon" />
                </InfoIconWrapper>
                <AnnouncementTextSimple><span>{portalData.portal_info}</span></AnnouncementTextSimple>
                <CloseIconWrapper onClick={handleCloseAnnouncement}>
                    <CloseIcon style={{ color: "white", cursor: "pointer", marginRight: "2rem" }} />
                </CloseIconWrapper>
                </AnnouncementBar>
            )}
        </AnnouncementWrapper>

        {showSuperAdminYouTubeModal && (
        <YouTubeOverlay style={{ zIndex: 1002 }}>
            <OverlayWrapper id="overlay-wrapper" onClick={handleOverlayClick}>
            {announcementDetailAll.youtube_url_for_all_students?.trim() ? (
                <a
                href={announcementDetailAll.youtube_url_for_all_students}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleThumbnailClick(e, announcementDetailAll.youtube_url_for_all_students)}
                >
                <ThumbnailImage
                    src={superAdminThumbnailSrc}
                    alt="Super Admin YouTube Thumbnail"
                    style={{ zIndex: 1003 }}
                />
                </a>
            ) : (
                <ThumbnailImage
                src={superAdminThumbnailSrc}
                alt="Super Admin YouTube Thumbnail"
                style={{ zIndex: 1003 }}
                onClick={handleOverlayClick}
                />
            )}
            </OverlayWrapper>
        </YouTubeOverlay>
        )}

        {showYouTubeModal && (
        <YouTubeOverlay style={{ zIndex: 1001 }}>
            <OverlayWrapper id="overlay-wrapper" onClick={handleOverlayClick}>
            {portalData.youtube_url?.trim() ? (
                <a
                href={portalData.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleThumbnailClick(e, portalData.youtube_url)}
                >
                <ThumbnailImage
                    src={thumbnailSrc}
                    alt="YouTube Thumbnail"
                    style={{ zIndex: 1002 }}
                />
                </a>
            ) : (
                <ThumbnailImage
                src={thumbnailSrc}
                alt="YouTube Thumbnail"
                style={{ zIndex: 1002 }}
                onClick={handleOverlayClick}
                />
            )}
            </OverlayWrapper>
        </YouTubeOverlay>
        )}
    </>
  );
};

export default PortalAnnouncements;
