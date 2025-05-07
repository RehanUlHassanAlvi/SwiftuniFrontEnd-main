import {
  Box,
  Button,
  Modal,
  Pagination,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Tests } from "../../constants/Mocktests";
// import CompatibilityModal from "../../components/MockTest/CompatibilityModal";
// import { Height } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  MockTextBtn,
  PurpleBtn,
  ResetPurpleBtn,
} from "../../components/Common/Style";
import { GetAllMocktest, GetSectionTests } from "../../Client/request";
import { Btn, FlexDiv } from "../../assets/styles/style";
import { OptionText } from "../../components/StrategyVideos/Style";
import LoadingModal from "../../components/Common/LoadingModal";
import axios from "axios";
import { Base_URL } from "../../Client/apiURL";
import SnackbarAlertPTE from "../../components/Login/SnackbarAlertPTE";
import CircularLoader from "../../components/Login/CircularLoader";
import toast from "react-hot-toast";

const Options = [
  {
    id: "1",
    text: "Speaking",
  },
  {
    id: "2",
    text: "Writing",
  },
  {
    id: "3",
    text: "Reading",
  },
  {
    id: "4",
    text: "Listening",
  },
];

export default function PTE() {
  const [page, setPage] = useState(1);
  const isTab = useMediaQuery("(max-width:1000px)");
  const isLaptopOne = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:400px)");
  const [Tests, setTests] = useState([]);
  const [InitLoading, setInitLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resetLoadingId, setResetLoadingId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Speaking");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const itemsPerPage = 5;
  const [Selected, setSelected] = useState("full tests");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const count = Math.ceil(Tests.length > 0 ? Tests.length / itemsPerPage : 0);

  const isPteCore = localStorage.getItem("pte-type") === "pte core";

  const handleReset = async (id) => {
    setResetLoadingId(id);

    try {
      const response = await axios.delete(
        `${Base_URL}/app/users/mock-test-attempts/delete?mock_test_attempted_id=${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchData(false);
        setTimeout(() => {
          setSnackbarMessage("Mock Test Successfully Reset.");
          setSnackbarColor("success");
          setSnackbarVariant("filled");
          setSnackbarOpen(true);
        }, 300);

        // toast.success("Mock Test Successfully Reset.")
      }
    } catch (error) {
      console.error("Error deleting mock test:", error);
    } finally {
      setResetLoadingId(null);
    }
  }; 

  const fetchData = async (showLoading = true) => {
    if (showLoading) setInitLoading(true);
    try {
      if (Selected === "full tests") {
        const res = await GetAllMocktest(isPteCore);
        if (res.data) {
          const sorted = res.data.sort((a, b) => a.key - b.key);
          setTests(sorted);
        } else {
          setTests([]);
        }
      } else if (Selected === "section tests") {
        const mock_test_type_id = Options.find(
          (option) => option.text === selectedOption
        ).id;

        const res = await GetSectionTests(mock_test_type_id, isPteCore);
        
        if (res.data) {
          // Sort strictly by 'key' to maintain original order
          const sorted = res.data.sort((a, b) => a.key - b.key);
          setTests(sorted);
        } else {
          setTests([]);
        }
      }
    } catch (error) {
      console.error("Error in fetching tests:", error);
      setTests([]);
    } finally {
      setInitLoading(false);
    }
  };

  // const fetchData = async () => {
  //   setInitLoading(true);
  //   try {
  //     if (Selected === "full tests") {
  //       const res = await GetAllMocktest();
  //       if (res.data) {
  //         let sorted = res.data.sort((a, b) => {
  //           if (a.ResumeTestId === null) return 1;
  //           if (b.ResumeTestId === null) return -1;
  //           return a.key - b.key;
  //         });
  //         setTests(sorted);
  //       } else {
  //         setTests([]);
  //       }
  //     } else if (Selected === "section tests") {
  //       const mock_test_type_id = Options.find(
  //         (option) => option.text === selectedOption
  //       ).id;

  //       const res = await GetSectionTests(mock_test_type_id);
  //       if (res.data) {
  //         let sorted = res.data.sort((a, b) => {
  //           if (a.ResumeTestId === null) return 1;
  //           if (b.ResumeTestId === null) return -1;
  //           return a.key - b.key;
  //         });
  //         setTests(sorted);
  //       } else {
  //         setTests([]);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error in fetching tests:", error);
  //     setTests([]);
  //   } finally {
  //     setInitLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, [Selected, selectedOption]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const updatedTests = Tests.map((test, index) => {
    return {
      ...test,
      show: userData.IsSubscribed ? true : index === 0,
      // show: true,
    };
  });
  const displayedTests = updatedTests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const FocusedBtn = styled(Button)({
    borderRadius: "47px",
    padding: isMobile ? "5px 10px" : "10px 20px",
    fontSize: isMobile ? "12px" : "15px",
    textTransform: "none",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    ":hover": {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transform: "translateY(-2px)",
    },
  });

  const UnFocusedBtn = styled(Button)({
    borderRadius: "47px",
    // backgroundColor: "white",
    // color: "#996cfe",
    padding: isMobile ? "5px 10px" : "10px 20px",
    fontSize: isMobile ? "12px" : "15px",
    textTransform: "none",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    ":hover": {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transform: "translateY(-2px)",
    },
  });

  return (
    <>
      <SnackbarAlertPTE
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarColor}
        variant={snackbarVariant}
        fromTop="14px"
      />

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "-0.3rem",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <FocusedBtn
                variant="contained"
                onClick={() => setSelected("full tests")}
                style={
                  Selected !== "full tests"
                    ? { backgroundColor: "white", color: "#996cfe" }
                    : {}
                }
              >
                Full Tests
              </FocusedBtn>
            </div>
            <div>
              <UnFocusedBtn
                variant="contained"
                onClick={() => setSelected("section tests")}
                style={
                  Selected !== "section tests"
                    ? { backgroundColor: "white", color: "#996cfe" }
                    : {}
                }
              >
                Section Tests
              </UnFocusedBtn>
            </div>
          </div>
          <div>
            <PurpleBtn
              variant="contained"
              style={{
                textTransform: "none",
                fontSize: isMobile ? "12px" : "15px",
                padding: isMobile ? "5px 10px" : "12px 22px",
              }}
              onClick={() => navigate("/mt-score")}
            >
              {!isLaptopOne ? "Mock Test Score" : "Test Score"}
            </PurpleBtn>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <div style={{ width: "100%" }}>
            {InitLoading ? (
              <>
                {" "}
                <LoadingModal open={InitLoading} />
              </>
            ) : (
              <>
                {" "}
                {Selected === "full tests" && (
                  <>
                    {Tests.length === 0 ? (
                    <FlexDiv>
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#999",
                          padding: "20px",
                          fontWeight: "500",
                        }}
                      >
                        <div>
                          No{' '}
                          <span style={{ color: 'rgb(171 144 233)' }}>
                            {isPteCore ? 'Core' : 'Academic'}
                          </span>{' '}
                          Mock Test Available.
                        </div>
                      </div>
                    </FlexDiv>
                    ) : (
                      <>
                        {displayedTests.map((test) => {
                          return !isLaptopOne ? (
                            <div
                              key={test.MockTestId}
                              style={{
                                marginTop: ".1rem",
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: "white",
                                boxShadow:
                                  " 0px 4px 10px 0px rgba(51, 51, 51, 0.08)",
                                padding: "0.5rem 1rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "15px",
                                  alignItems: "center",
                                }}
                              >
                                <p>{test.MockTestName}</p>
                                <p
                                  style={{
                                    borderRadius: "4px",
                                    backgroundColor: "rgba(253, 60, 101, 0.10)",
                                    padding: "7px 10px",
                                    fontSize: "16px",
                                    color: "#fd3c65",
                                  }}
                                >
                                  Question: {test.TotalQuestions}
                                </p>
                                <p
                                  style={{
                                    borderRadius: "4px",
                                    backgroundColor:
                                      "rgba(153, 108, 254, 0.10)",
                                    padding: "7px 10px",
                                    fontSize: "16px",
                                    color: "#996cfe",
                                  }}
                                >
                                  Approx Time:{" "}
                                  {(test.TotalTime / 60) % 1 === 0
                                    ? test.TotalTime / 60
                                    : (test.TotalTime / 60).toFixed(1)}{" "}
                                  Hours
                                </p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                {/* <p style={{ fontSize: "16px" }}>
                                  Have a code?{" "}
                                  <span
                                    style={{
                                      color: "var(--Brand-Purple, #996CFE)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <i>Click here</i>
                                  </span>
                                </p> */}
                                {test.show ? (
                                  <>
                                    {test.ResumeTestId && (
                                      <ResetPurpleBtn
                                        onClick={() => {
                                          handleReset(test.ResumeTestId);
                                        }}
                                      >
                                        {resetLoadingId ===
                                        test.ResumeTestId ? (
                                          <CircularLoader color={"white"} />
                                        ) : (
                                          "Reset"
                                        )}
                                      </ResetPurpleBtn>
                                    )}
                                    <PurpleBtn
                                      onClick={() => {
                                        navigate("/MockTest/full-mock-test", {
                                          state: { Exam: test },
                                        });
                                      }}
                                    >
                                      {test.ResumeTestId ? "Resume" : "Start"}
                                    </PurpleBtn>
                                  </>
                                ) : (
                                  <PurpleBtn
                                    style={{ backgroundColor: "#c6cbd9" }}
                                  >
                                    Locked
                                  </PurpleBtn>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div
                              key={test.MockTestId}
                              style={{
                                marginTop: ".1rem",
                                backgroundColor: "white",
                                boxShadow:
                                  " 0px 4px 10px 0px rgba(51, 51, 51, 0.08)",
                                padding: "0.5rem 1rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: "15px",
                                  alignItems: "center",
                                }}
                              >
                                <p>{test.MockTestName}</p>
                                {/* <p style={{ fontSize: "10px" }}>
                                  Have a code?{" "}
                                  <span
                                    style={{
                                      color: "var(--Brand-Purple, #996CFE)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <i>Click here</i>
                                  </span>
                                </p> */}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    borderRadius: "4px",
                                    backgroundColor: "rgba(253, 60, 101, 0.10)",
                                    padding: "7px 10px",
                                    fontSize: "12px",
                                    color: "#fd3c65",
                                  }}
                                >
                                  Question: {test.TotalQuestions}
                                </p>
                                <p
                                  style={{
                                    borderRadius: "4px",
                                    backgroundColor:
                                      "rgba(153, 108, 254, 0.10)",
                                    padding: "7px 10px",
                                    fontSize: "12px",
                                    color: "#996cfe",
                                  }}
                                >
                                  Approx Time:{" "}
                                  {(test.TotalTime / 60) % 1 === 0
                                    ? test.TotalTime / 60
                                    : (test.TotalTime / 60).toFixed(1)}{" "}
                                  Hours
                                </p>
                                {test.show ? (
                                  <>
                                    {test.ResumeTestId && (
                                      <ResetPurpleBtn
                                        onClick={() => {
                                          handleReset(test.ResumeTestId);
                                        }}
                                      >
                                        {resetLoadingId ===
                                        test.ResumeTestId ? (
                                          <CircularLoader color={"white"} />
                                        ) : (
                                          "Reset"
                                        )}
                                      </ResetPurpleBtn>
                                    )}
                                    <PurpleBtn
                                      onClick={() => {
                                        navigate("/MockTest/full-mock-test", {
                                          state: { Exam: test },
                                        });
                                      }}
                                    >
                                      {test.ResumeTestId ? "Resume" : "Start"}
                                    </PurpleBtn>
                                  </>
                                ) : (
                                  <PurpleBtn
                                    style={{ backgroundColor: "#c6cbd9" }}
                                  >
                                    Locked
                                  </PurpleBtn>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </>
            )}

            <div>
              {Selected === "section tests" && (
                <>
                  <FlexDiv
                    style={{
                      justifyContent: "space-between",
                      width: "100%",
                      marginBottom: "1.63rem",
                    }}
                  >
                    <FlexDiv style={{ gap: isTab ? "1rem" : "2rem" }}>
                      {Options.map((option) => (
                        <Btn
                          key={option.id}
                          onClick={() => {
                            setSelectedOption(option.text);
                          }}
                        >
                          <OptionText
                            style={{
                              color:
                                option.text === selectedOption
                                  ? "var(--Brand-Purple, #996CFE)"
                                  : "",
                              borderBottom:
                                option.text === selectedOption
                                  ? "1px solid var(--Brand-Purple, #996CFE)"
                                  : "",
                            }}
                          >
                            {option.text}
                          </OptionText>
                        </Btn>
                      ))}
                    </FlexDiv>
                  </FlexDiv>
                </>
              )}
            </div>

            {InitLoading ? (
              <>
                {" "}
                <LoadingModal open={InitLoading} />
              </>
            ) : (
              <>
                {" "}
                {Selected === "section tests" && (
                  <>
                    {Tests.length === 0 ? (
                    <FlexDiv>
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          color: "#999",
                          padding: "20px",
                          fontWeight: "500",
                        }}
                      >
                        <div>
                          No{' '}
                          <span style={{ color: 'rgb(171 144 233)' }}>
                            {isPteCore ? 'Core' : 'Academic'}
                          </span>{' '}
                          Mock Test Available.
                        </div>
                      </div>
                    </FlexDiv>
                    ) : (
                      <>
                        {displayedTests.map((test) => {
                          return !isLaptopOne ? (
                            <div
                              key={test.MockTestId}
                              style={{
                                marginTop: ".1rem",
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: "white",
                                boxShadow:
                                  " 0px 4px 10px 0px rgba(51, 51, 51, 0.08)",
                                padding: "0.5rem 1rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "15px",
                                  alignItems: "center",
                                }}
                              >
                                <p>{test.MockTestName}</p>
                                <p
                                  style={{
                                    borderRadius: "4px",
                                    backgroundColor: "rgba(253, 60, 101, 0.10)",
                                    padding: "7px 10px",
                                    fontSize: "16px",
                                    color: "#fd3c65",
                                  }}
                                >
                                  Question: {test.TotalQuestions}
                                </p>
                                <p
                                  style={{
                                    borderRadius: "4px",
                                    backgroundColor:
                                      "rgba(153, 108, 254, 0.10)",
                                    padding: "7px 10px",
                                    fontSize: "16px",
                                    color: "#996cfe",
                                  }}
                                >
                                  Approx Time:{" "}
                                  {(test.TotalTime / 60) % 1 === 0
                                    ? test.TotalTime / 60
                                    : (test.TotalTime / 60).toFixed(1)}{" "}
                                  Hours
                                </p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                {/* <p style={{ fontSize: "16px" }}>
                                  Have a code?{" "}
                                  <span
                                    style={{
                                      color: "var(--Brand-Purple, #996CFE)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <i>Click here</i>
                                  </span>
                                </p> */}
                                {test.ResumeTestId && (
                                  <ResetPurpleBtn
                                    onClick={() => {
                                      handleReset(test.ResumeTestId);
                                    }}
                                  >
                                    {resetLoadingId === test.ResumeTestId ? (
                                      <CircularLoader color={"white"} />
                                    ) : (
                                      "Reset"
                                    )}
                                  </ResetPurpleBtn>
                                )}
                                {test.show ? 
                                <PurpleBtn
                                  onClick={() => {
                                    navigate("/MockTest/sectional-mock-test", {
                                      state: { Exam: test },
                                    });
                                  }}
                                >
                                  {test.ResumeTestId ? "Resume" : "Start"}
                                </PurpleBtn>
                                :
                                  <PurpleBtn
                                    style={{ backgroundColor: "#c6cbd9" }}
                                  >
                                   Locked
                                  </PurpleBtn>                                
                                }
                              </div>
                            </div>
                          ) : (
                            <div
                              key={test.MockTestId}
                              style={{
                                marginTop: ".1rem",
                                backgroundColor: "white",
                                boxShadow:
                                  " 0px 4px 10px 0px rgba(51, 51, 51, 0.08)",
                                padding: "0.5rem 1rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: "15px",
                                  alignItems: "center",
                                }}
                              >
                                <p>{test.MockTestName}</p>
                                {/* <p style={{ fontSize: "10px" }}>
                                  Have a code?{" "}
                                  <span
                                    style={{
                                      color: "var(--Brand-Purple, #996CFE)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <i>Click here</i>
                                  </span>
                                </p> */}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    borderRadius: "4px",
                                    backgroundColor: "rgba(253, 60, 101, 0.10)",
                                    padding: "7px 10px",
                                    fontSize: "12px",
                                    color: "#fd3c65",
                                  }}
                                >
                                  Question: {test.TotalQuestions}
                                </p>
                                <p
                                  style={{
                                    borderRadius: "4px",
                                    backgroundColor:
                                      "rgba(153, 108, 254, 0.10)",
                                    padding: "7px 10px",
                                    fontSize: "12px",
                                    color: "#996cfe",
                                  }}
                                >
                                  Approx Time:{" "}
                                  {(test.TotalTime / 60) % 1 === 0
                                    ? test.TotalTime / 60
                                    : (test.TotalTime / 60).toFixed(1)}{" "}
                                  Hours
                                </p>
                                {test.ResumeTestId && (
                                  <ResetPurpleBtn
                                    onClick={() => {
                                      handleReset(test.ResumeTestId);
                                    }}
                                  >
                                    {resetLoadingId === test.ResumeTestId ? (
                                      <CircularLoader color={"white"} />
                                    ) : (
                                      "Reset"
                                    )}
                                  </ResetPurpleBtn>
                                )}
                                {test.show ?                                
                                    <PurpleBtn
                                      onClick={() => {
                                        navigate("/MockTest/sectional-mock-test", {
                                          state: { Exam: test },
                                        });
                                      }}
                                    >
                                      {test.ResumeTestId ? "Resume" : "Start"}
                                    </PurpleBtn>
                                  :
                                    <PurpleBtn
                                      style={{ backgroundColor: "#c6cbd9" }}
                                    >
                                      Locked
                                    </PurpleBtn>
                                }
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {count > 1 && (
              <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
