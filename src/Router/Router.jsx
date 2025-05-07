import React from 'react'
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from '../authentication/ProtectedRoute';
import RedirectIfAuthenticated from '../authentication/RedirectIfAuthenticated';
import Home from "../pages/Home";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import VerifyEmail from '../components/Signup/VerifyEmail';
import Writing from "../pages/Writing";
import Speaking from "../pages/Speaking";
import Reading from "../pages/Reading";
import Listening from '../pages/Listening';
import WriteSummary from "../pages/WriteSummary";
import WriteEssay from "../pages/WriteEssay";
import WriteEmail from "../pages/WriteEmail";
import ReadingWFIB from '../pages/ReadingWFIB';
import ReadingROP from '../pages/ReadingROP';
import ReadingFIB from "../pages/ReadingFIB";
import ReadingMCS from "../pages/ReadingMCS";
import ReadingMCM from "../pages/ReadingMCM";
import ListeningSST from '../pages/ListeningSST';
import ListeningMCM from '../pages/ListeningMCM';
import ListeningFIB from '../pages/ListeningFIB';
import ListeningHCS from '../pages/ListeningHCS';
import ListeningMCS from '../pages/ListeningMCS';
import ListeningSMW from '../pages/ListeningSMW';
import ListeningHIW from '../pages/ListeningHIW';
import ListeningWFD from '../pages/ListeningWFD';
import SpeakingRA from '../pages/SpeakingRA';
import SpeakingDI from '../pages/SpeakingDI';
import SpeakingRTL from '../pages/SpeakingRTL';
import SpeakingASQ from '../pages/SpeakingASQ';
import SpeakingRTAS from '../pages/SpeakingRTAS';
import SpeakingRS from '../pages/SpeakingRS';
import ForgetPassowrd from '../components/Login/ForgetPassowrd';
import ResetPassowrd from '../components/Login/ResetPassword';
import ResetPasswordSuccess from '../components/Login/ResetPasswordSuccess';
import TermsAndConditions from '../pages/TermsAndConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Sidebar from '../components/SideBar/SideBar';
import Template from '../pages/Template';
import { Grammar } from '../pages/Grammar';
import ScoreFeedback from '../pages/ScoreFeedback';
import VocabBank from '../pages/VocabBank';
import Contactus from '../pages/Contactus';
import MockTest from '../pages/Mocktest';
import Layout from '../components/MockTest/';
import LayoutSectional from '../components/MockTest/indexSectional'; 
import MT_Score from '../pages/MT_Score';
import MtScoreFeedback from '../pages/MtScoreFeedback';
import MtScoreViewScore from '../pages/MtScoreViewScore';
import MtScoreAnalytics from '../pages/MtScoreAnalytics';
import StrategyVideos from '../pages/StrategyVideos';
import PTEGuide from '../pages/PTEGuide';
import AiStudyPlan from '../pages/AiStudyPlan';
import Checkout from '../pages/Checkout';
import CheckoutWithBank from '../pages/CheckoutWithBank';
import ScoreFeedBackResult from '../pages/ScoreFeedBackResult';
import { PaymentSuccess } from '../pages/PaymentSuccess';
import MtScoreViewScoreSectional from '../pages/MtScoreViewScoreSectional';
import MtScoreAnalyticsSectional from '../pages/MtScoreAnalyticsSectional';
import MtScoreFeedbackSectional from '../pages/MtScoreFeedbackSectional';
import MtScoreViewScoreForTeacher from '../pages/MtScoreViewScoreForTeacher';
import MtScoreViewScoreSectionalForTeacher from '../pages/MtScoreViewScoreSectionalForTeacher';
import MtScoreAnalyticsForTeacher from '../pages/MtScoreAnalyticsForTeacher';
import MtScoreAnalyticsSectionalForTeacher from '../pages/MtScoreAnalyticsSectionalForTeacher';
import MtScoreFeedbackSectionalForTeacher from '../pages/MtScoreFeedbackSectionalForTeacher';
import MtScoreFeedbackForTeacher from '../pages/MtScoreFeedbackForTeacher';
import Search from '../pages/Search';
import StripePaymentRedirect from '../components/SideBar/StripePaymentRedirect';
import UserAnalyticsForTeacher from '../pages/UserAnalyticsForTeacher';
 
const Router = () => {
  return (
    <Routes>
        <Route path='user-analytics/:userId' element={<UserAnalyticsForTeacher />} />
        <Route path='mt-score-full/:userId/:mockTestAttemptedId/:typeOfTest' element={<MtScoreViewScoreForTeacher />} />
        <Route path='mt-score-sectional/:userId/:mockTestAttemptedId/:typeOfTest' element={<MtScoreViewScoreSectionalForTeacher />} />
        <Route path='mt-score-full-analytics/:userId/:mockTestAttemptedId/:typeOfTest' element={<MtScoreAnalyticsForTeacher />} />
        <Route path='mt-score-sectional-analytics/:userId/:mockTestAttemptedId/:typeOfTest' element={<MtScoreAnalyticsSectionalForTeacher />} />
        <Route path='mt-score-full-feedback/:userId/:mockTestAttemptedId/:typeOfTest' element={<MtScoreFeedbackForTeacher />} />
        <Route path='mt-score-sectional-feedback/:userId/:mockTestAttemptedId/:typeOfTest' element={<MtScoreFeedbackSectionalForTeacher />} />

        <Route path="/forget-password" element={<ForgetPassowrd />} />
        <Route path="/reset-password" element={<ResetPassowrd />} />
        <Route path="/reset-password-status" element={<ResetPasswordSuccess />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<PrivacyPolicy />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
        <Route path="/signup" element={<RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated>} />
        <Route path="/verify-email" element={<RedirectIfAuthenticated><VerifyEmail /></RedirectIfAuthenticated>} />
        <Route path="/writing" element={<ProtectedRoute><Writing /></ProtectedRoute>} />
        <Route path="/speaking" element={<ProtectedRoute><Speaking /></ProtectedRoute>} />
        <Route path="/reading" element={<ProtectedRoute><Reading /></ProtectedRoute>} />
        <Route path="/listening" element={<ProtectedRoute><Listening /></ProtectedRoute>} />
        <Route path="/writing/summarize-written-text/:type" element={<ProtectedRoute><WriteSummary /></ProtectedRoute>} />
        <Route path="/writing/write-essay" element={<ProtectedRoute><WriteEssay /></ProtectedRoute>} />
        <Route path="/writing/write-email" element={<ProtectedRoute><WriteEmail /></ProtectedRoute>} />
        <Route path="/reading/reading-and-writing-fill-in-the-blanks" element={<ProtectedRoute><ReadingWFIB /></ProtectedRoute>} />
        <Route path="/reading/re-order-paragraphs" element={<ProtectedRoute><ReadingROP /></ProtectedRoute>} />
        <Route path="/reading/reading-fill-in-the-blanks" element={<ProtectedRoute><ReadingFIB /></ProtectedRoute>} />
        <Route path="/reading/multiple-choice-choose-single-answer" element={<ProtectedRoute><ReadingMCS /></ProtectedRoute>} />
        <Route path="/reading/multiple-choice-choose-multiple-answer" element={<ProtectedRoute><ReadingMCM /></ProtectedRoute>} />
        <Route path="/listening/summarize-spoken-text" element={<ProtectedRoute><ListeningSST /></ProtectedRoute>} />
        <Route path="/listening/multiple-choice-choose-multiple-answer" element={<ProtectedRoute><ListeningMCM /></ProtectedRoute>} />
        <Route path="/listening/fill-in-the-blanks" element={<ProtectedRoute><ListeningFIB /></ProtectedRoute>} />
        <Route path="/listening/highlight-correct-summary" element={<ProtectedRoute><ListeningHCS /></ProtectedRoute>} />
        <Route path="/listening/multiple-choice-choose-single-answer" element={<ProtectedRoute><ListeningMCS /></ProtectedRoute>} />
        <Route path="/listening/select-missing-word" element={<ProtectedRoute><ListeningSMW /></ProtectedRoute>} />
        <Route path="/listening/highlight-incorrect-word" element={<ProtectedRoute><ListeningHIW /></ProtectedRoute>} />
        <Route path="/listening/write-from-dictation" element={<ProtectedRoute><ListeningWFD /></ProtectedRoute>} />
        <Route path="/speaking/read-aloud" element={<ProtectedRoute><SpeakingRA /></ProtectedRoute>} />
        <Route path="/speaking/describe-image" element={<ProtectedRoute><SpeakingDI /></ProtectedRoute>} />
        <Route path="/speaking/re-tell-lectures" element={<ProtectedRoute><SpeakingRTL /></ProtectedRoute>} />
        <Route path="/speaking/answer-short-question" element={<ProtectedRoute><SpeakingASQ /></ProtectedRoute>} />
        <Route path="/speaking/respond-to-a-situation" element={<ProtectedRoute><SpeakingRTAS /></ProtectedRoute>} />
        <Route path="/speaking/repeat-sentence" element={<ProtectedRoute><SpeakingRS /></ProtectedRoute>} />
        <Route path="/sidebar" element={<ProtectedRoute><Sidebar /></ProtectedRoute>} />
        <Route path='templates' element={<ProtectedRoute><Template /></ProtectedRoute>} />
        <Route path='grammar' element={<ProtectedRoute><Grammar /></ProtectedRoute>} />  
        <Route path='strategy-videos' element={<ProtectedRoute><StrategyVideos /></ProtectedRoute>} />       
        <Route path='vocab-bank' element={<ProtectedRoute><VocabBank /></ProtectedRoute>} />

        <Route path='/MockTest/full-mock-test' element={<ProtectedRoute><Layout /></ProtectedRoute>} />  
        <Route path='/MockTest/sectional-mock-test' element={<ProtectedRoute><LayoutSectional /></ProtectedRoute>} />         
        <Route path='/MockTest' element={<ProtectedRoute><MockTest /></ProtectedRoute>} />      
        <Route path='score-feedback' element={<ProtectedRoute><ScoreFeedback /></ProtectedRoute>} />
        <Route path='/score-feedback-result' element={<ProtectedRoute><ScoreFeedBackResult /></ProtectedRoute>} />    
        <Route path='mt-score' element={<ProtectedRoute><MT_Score /></ProtectedRoute>} />  

        <Route path='mt-score-feedback/:id' element={<ProtectedRoute><MtScoreFeedback /></ProtectedRoute>} />
        <Route path='mt-score-feedback-sectional/:id' element={<ProtectedRoute><MtScoreFeedbackSectional /></ProtectedRoute>} />

        <Route path='mt-score-analytics/:id' element={<ProtectedRoute><MtScoreAnalytics /></ProtectedRoute>} />
        <Route path='mt-score-analytics-sectional/:id' element={<ProtectedRoute><MtScoreAnalyticsSectional /></ProtectedRoute>} />  

        <Route path='mt-score-viewscore/:id' element={<ProtectedRoute><MtScoreViewScore /></ProtectedRoute>} /> 
        <Route path='mt-score-viewscore-sectional/:id' element={<ProtectedRoute><MtScoreViewScoreSectional /></ProtectedRoute>} /> 

        <Route path='pte-guide' element={<ProtectedRoute><PTEGuide /></ProtectedRoute>} />    
        <Route path='contact-us' element={<ProtectedRoute><Contactus /></ProtectedRoute>} />  
        <Route path='/ai-study-plan' element={<ProtectedRoute><AiStudyPlan /></ProtectedRoute>} />             
        <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='/checkout-pay-with-bank-account' element={<ProtectedRoute><CheckoutWithBank /></ProtectedRoute>} />
        <Route path='/payment-success' element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />

        <Route path='search' element={<ProtectedRoute><Search /></ProtectedRoute>} />

        <Route path='/payment/status' element={<ProtectedRoute><StripePaymentRedirect /></ProtectedRoute>} />
    </Routes>
  )
}

export default Router