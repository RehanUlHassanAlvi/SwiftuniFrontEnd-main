import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import ScrollToTop from "./components/Common/ScrollToTop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthProvider } from "./authentication/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import useSetFavicon from "./hooks/useSetFavicon";
import { TestQuestionProvider } from "./context/TestQuestionContext";
import { MockTestScoreProvider } from "./context/MockTestScoreContext";

function App() {

  useSetFavicon();

  return (
    <>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <DndProvider backend={HTML5Backend}>
              <BrowserRouter>
                <MockTestScoreProvider>
                  <TestQuestionProvider>
                    <Router />
                    <ScrollToTop />
                    <ToastContainer />
                    <Toaster position="top-right" />
                  </TestQuestionProvider>
                </MockTestScoreProvider>
              </BrowserRouter>
            </DndProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
    </>
  );
}
export default App;
