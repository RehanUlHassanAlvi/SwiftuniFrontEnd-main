import React from 'react'
import { TermsHeaderDescription, TermsHeaderDiv, TermsHeaderText, TermsHeaderTitle, TermsHeaderTextList } from './Style'
import { FlexDiv } from '../../assets/styles/style'

const RefundPolicyHeader = ({Header = 'Refund Policy', Desc = 'Lorem ipsum dolor sit amet consectetur. Ac nisi.'}) => {
  return (
    <>
        <FlexDiv style={{flexDirection:'column', marginBottom:'2rem'}}>
            <TermsHeaderDiv>
                <TermsHeaderTitle>
                    {Header}
                </TermsHeaderTitle>
                <TermsHeaderDescription>
                    {Desc}
                </TermsHeaderDescription>
            </TermsHeaderDiv>
            <TermsHeaderText>
                At Swiftuni, we provide free trials for all our products and services. This allows users to try them out and ensure they meet their needs before making a purchase. Due to the digital nature of our offerings, refunds or credits on purchases are challenging to provide.
            </TermsHeaderText>            
            <TermsHeaderText>
                We strongly recommend users to take advantage of the free trials offered for the following:
            </TermsHeaderText>            
            <ul style={{width:'88%'}}>
                <TermsHeaderTextList><span style={{fontWeight:'bold'}}>Subscription:</span> We offer free AI clicks so users can familiarize themselves with our AI scoring system before committing to a subscription.</TermsHeaderTextList>
                <TermsHeaderTextList><span style={{fontWeight:'bold'}}>Mock Tests:</span> Users can take one fully scored test for free to experience our AI scoring system, test patterns, and ensure compatibility with their systems.</TermsHeaderTextList>
            </ul>
            <TermsHeaderText>However, we understand that circumstances may arise where a user needs to cancel a purchase and request a refund. For such cases, we have a cancellation and refund policy in place:</TermsHeaderText>
            <ul style={{width:'88%'}}>
                <TermsHeaderTextList>Cancellation requests must be sent to <span style={{fontWeight:'bold'}}>help@swiftuni.com</span> within 30 minutes of making the purchase.</TermsHeaderTextList>
                <TermsHeaderTextList>Only cancellation requests sent to the specified email address within the stipulated time frame will be considered.</TermsHeaderTextList>
                <TermsHeaderTextList>Requests received after 30 minutes of payment will not be eligible for cancellation or refund.</TermsHeaderTextList>
                <TermsHeaderTextList>Mock tests purchases cannot be cancelled or refunded once access has been granted.</TermsHeaderTextList>
                <TermsHeaderTextList>Refunds will not be processed for mock tests unlocked using codes, provided the codes have been unused.</TermsHeaderTextList>
                <TermsHeaderTextList>Refunded amounts may take up to 5 business days to reflect in the user's account.</TermsHeaderTextList>
                <TermsHeaderTextList>Please note that third-party payment merchants may charge fees or commissions on refund requests, which may affect the refunded amount.</TermsHeaderTextList>
                <TermsHeaderTextList>Swiftuni is not liable for any additional fees incurred by users during payment transactions, such as bank fees or international transaction fees, and these will not be included in refund requests.</TermsHeaderTextList>
            </ul>
            <TermsHeaderText>By proceeding with the payment, users acknowledge that they have read and agreed to Swiftuni's refund and cancellation policy as outlined on our website, <span style={{fontWeight:'bold'}}>www.swiftuni.com.</span></TermsHeaderText>
            <TermsHeaderText>We strive to ensure transparency and fairness in our refund processes while also providing users with the best possible experience.</TermsHeaderText>
        </FlexDiv>
    </>
  )
}

export default RefundPolicyHeader