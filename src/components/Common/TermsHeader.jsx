import React from 'react'
import { TermsHeaderDiv, TermsHeaderText, TermsHeaderTitle, TermsHeaderTextList } from './Style'
import { FlexDiv } from '../../assets/styles/style'

const TermsHeader = () => {
  return (
    <>
    <FlexDiv style={{flexDirection:'column', marginBottom:'2rem'}}>
        <TermsHeaderDiv>
            <TermsHeaderTitle>
                Terms & Conditions
            </TermsHeaderTitle>
        </TermsHeaderDiv>
        <TermsHeaderText>These Terms and Conditions, along with our Privacy Policy, apply to your use of Swiftuni's website and mobile apps. Swiftuni, operated by Swiftuni (SMC Pty) Ltd ("Swiftuni"), provides these platforms.</TermsHeaderText>
        <TermsHeaderText>When you use our website or apps in any way, you agree to follow these Terms. We may update these Terms from time to time, and any changes will be posted on the website. If you don't agree with any changes, please stop using our services. By continuing to use our services after changes are made, you accept the updated Terms.</TermsHeaderText>
        <TermsHeaderText>Swiftuni is an online practice platform for Pearson’s Test of English (PTE), offering practice materials and mock tests. We are an e-learning service provider and don't provide physical or electronic training ourselves. Our website serves as a platform for e-learning PTE solutions.</TermsHeaderText>
        <TermsHeaderText>Our responsibilities include providing the advertised services on the website and offering customer support when needed. However, we are not responsible for:</TermsHeaderText>
        <ul style={{width:'88%'}}>
            <TermsHeaderTextList>The actual start and end times of classes provided by third parties.</TermsHeaderTextList>
            <TermsHeaderTextList>The conduct, competence, or absence of employees of class providers.</TermsHeaderTextList>
            <TermsHeaderTextList>The quality of services provided by class providers.</TermsHeaderTextList>
            <TermsHeaderTextList>Cancellation or rescheduling of classes by class providers.</TermsHeaderTextList>
            <TermsHeaderTextList>Injuries or loss of property during classes.</TermsHeaderTextList>
        </ul>
        <TermsHeaderText>When using our website or registering an account, you warrant that:</TermsHeaderText>
        <ul style={{width:'88%'}}>
            <TermsHeaderTextList>You are at least 18 years old.</TermsHeaderTextList>
            <TermsHeaderTextList>You are using your real identity.</TermsHeaderTextList>
            <TermsHeaderTextList>The personal data you provide is true, accurate, complete, and up-to-date.</TermsHeaderTextList>
            <TermsHeaderTextList>You'll keep your personal information current.</TermsHeaderTextList>
        </ul>
        <TermsHeaderText>Children under 18 can only use the website with parental consent or supervision.</TermsHeaderText>
        <TermsHeaderText>By using the platform, you guarantee that:</TermsHeaderText>
        <ul style={{width:'88%'}}>
            <TermsHeaderTextList>You'll use it for personal purposes only.</TermsHeaderTextList>
            <TermsHeaderTextList>You won't modify, reproduce, distribute, or sell any part of the website.</TermsHeaderTextList>
            <TermsHeaderTextList>You'll use the website for lawful purposes only and won't engage in any fraudulent or unlawful activities.</TermsHeaderTextList>
        </ul>
        <TermsHeaderText>You may encounter links to third-party advertisers or sponsors while using our website or app. By accessing these third-party websites, you agree to their terms and conditions. We're not responsible for these third-party sites or services</TermsHeaderText>
        <TermsHeaderText>When you communicate with us through the website or by email, you consent to receive electronic communications from us.</TermsHeaderText>
        <TermsHeaderText>If you have any questions, please contact us at <span style={{fontWeight:'bold'}}>help@swiftuni.com.</span></TermsHeaderText>
    </FlexDiv>
    </>
  )
}

export default TermsHeader