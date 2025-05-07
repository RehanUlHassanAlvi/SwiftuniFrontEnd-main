import axios from "axios";
// import { API_URL } from "src/configs/auth";



axios.defaults.withCredentials =true;
export default function AuthInterceptor(logout) {
  axios.interceptors.response.use(
    (response) => {
      // Check for your custom responseCode in the response data
      const { data } = response;
      const responseCode = data && data.responseCode;
      if (responseCode === 501) {
        // Handle 501 response here
        console.error("Received a 501 response");
        logout();
        // toast.error("Logout due to token expiry")
      }
      return response;
    },
    (error) => {
      // Handle errors or custom responseCode in case of failure
      if (error.response) {
        const { data, status } = error.response;
        const responseCode = data && data.responseCode;
        if (responseCode === 501) {
          // Handle 501 response here
          console.error("Received a 501 response");
        } else {
          // Handle other errors
          console.error(`Error with status code: ${status}`);
        }
      } else {
        // Handle network errors
        console.error("Network error");
      }
      return Promise.reject(error);
    }
  );
}
