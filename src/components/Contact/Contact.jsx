import React from 'react';
import { useMediaQuery } from '@mui/material';
import { FlexDiv } from "../../assets/styles/style";
import SeperatingHeader from '../Common/SeperatingHeader';
import SocialCard from './SocialCard';
import FB from '../../assets/images/fb_icon.svg';
import FbCode from '../../assets/images/swiftuni-messanger-qr.svg';
import Whatsapp from '../../assets/images/whatsapp_icon.svg';
import WhatsappCode from '../../assets/images/swiftuni-whatsapp-qr.svg';
import Telegram from '../../assets/images/telegram_icon.svg';
import TelegramCode from '../../assets/images/swiftuni-telegram-qr.svg';
import ContactCard from './ContactCard';
import Svg from '../../assets/images/call_log.svg';
import Email from '../../assets/images/message.svg';
import Address from '../../assets/images/Address.svg'; 

const formatPhoneNumber = (number) => {
    if (!number) return '';
    const cleaned = number.replace(/[^\d+]/g, ''); // Remove non-digit and non-plus characters

    // Check if the number already contains dashes
    if (number.includes('-')) {
        return number; // Return as is if already formatted
    }

    if (cleaned.startsWith('+92')) {
        return cleaned.replace(/^(\+92)(\d{3})(\d{7})$/, '$1-$2-$3'); // Format for Pakistan numbers
    } else if (cleaned.startsWith('03')) {
        return cleaned.replace(/^(03)(\d{3})(\d{7})$/, '$1$2-$3'); // Format local Pakistan numbers
    }
    // Add formatting for other countries here as needed
    return cleaned; // Return as is if no pattern matches
};

// Utility to ensure WhatsApp link is valid
const createWhatsAppLink = (number) => {
    if (!number) return '';
    let cleaned = number.replace(/[^\d+]/g, ''); // Remove non-digit and non-plus characters

    // If number starts with '0', add Pakistan's country code (+92)
    if (cleaned.startsWith('0')) {
        cleaned = `+92${cleaned.slice(1)}`;
    }

    // Ensure it's a valid WhatsApp link
    if (!cleaned.startsWith('+')) {
        cleaned = `+${cleaned}`; // Add '+' if missing
    }

    return `https://wa.me/${cleaned}`;
};

const Contact = () => {
    const isTab = useMediaQuery('(max-width:1000px)');
    const PortalData = JSON.parse(localStorage.getItem("portalData")) || {};

    const {
        facebook_link = '',
        whatsapp_link = '',
        telegram_link = '',
        phone_no = '',
        support_email = '',
        support_address = '',
    } = PortalData || {};

    const formattedPhoneNumber = formatPhoneNumber(phone_no);
    const validWhatsAppLink = whatsapp_link && whatsapp_link.startsWith('https://wa.me/')
        ? whatsapp_link
        : createWhatsAppLink(whatsapp_link);

    return (
        <FlexDiv style={{ width: '100%' }}>
            <FlexDiv style={{ flexDirection: 'column', padding: isTab ? '1.5rem 2% 0rem' : '6.5rem 3% 0rem', maxWidth: '1680px', width: '100%' }}>
                <SeperatingHeader title='Contact Us' />
                <FlexDiv style={{ width: '100%', justifyContent: 'space-between', marginBottom: '1.25rem', flexDirection: isTab ? 'column' : '' }}>
                    {!isTab ?
                        <>
                            <SocialCard img={FB} qr={FbCode} title='Facebook' url={facebook_link} color='#2F88FF' width='32%' />
                            <SocialCard img={Whatsapp} qr={WhatsappCode} title='Whatsapp' url={validWhatsAppLink} color='#25D366' width='32%' />
                            <SocialCard img={Telegram} qr={TelegramCode} title='Telegram' url={telegram_link} color='#08C' width='32%' />
                        </>
                        :
                        <>
                            <FlexDiv style={{ width: '100%', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <SocialCard img={FB} qr={FbCode} title='Facebook' url={facebook_link} color='#2F88FF' width='49%' />
                                <SocialCard img={Whatsapp} qr={WhatsappCode} title='Whatsapp' url={validWhatsAppLink} color='#25D366' width='49%' />
                            </FlexDiv>
                            <SocialCard img={Telegram} qr={TelegramCode} title='Telegram' url={telegram_link} color='#08C' width='100%' />
                        </>
                    }
                </FlexDiv>
                <FlexDiv style={{ width: '100%', justifyContent: 'space-between', flexDirection: isTab ? 'column' : '', gap: isTab ? '1rem' : '', marginBottom: '1rem' }}>
                    <ContactCard width={isTab ? '100%' : '49%'} svg={Svg} contact='tel' text={formattedPhoneNumber} />
                    <ContactCard width={isTab ? '100%' : '49%'} svg={Email} contact='email' text={support_email} />
                </FlexDiv>
                <FlexDiv style={{ width: '100%', justifyContent: 'space-between', flexDirection: isTab ? 'column' : '', gap: isTab ? '1rem' : '', marginBottom: '1rem' }}>
                    <ContactCard width={isTab ? '100%' : '100%'} svg={Address} contact='address' text={`${support_address}`}  />
                </FlexDiv>
            </FlexDiv>
        </FlexDiv>
    );
};

export default Contact;


// import React from 'react'
// import { useMediaQuery } from '@mui/material';
// import { FlexDiv } from "../../assets/styles/style";
// import SeperatingHeader from '../Common/SeperatingHeader';
// import SocialCard from './SocialCard';
// import FB from '../../assets/images/fb_icon.svg';
// import FbCode from '../../assets/images/swiftuni-messanger-qr.svg';
// import Whatsapp from '../../assets/images/whatsapp_icon.svg';
// import WhatsappCode from '../../assets/images/swiftuni-whatsapp-qr.svg';
// import Telegram from '../../assets/images/telegram_icon.svg';
// import TelegramCode from '../../assets/images/swiftuni-telegram-qr.svg';
// import ContactCard from './ContactCard';
// import Svg from '../../assets/images/call_log.svg';
// import Email from '../../assets/images/message.svg';
// import Address from '../../assets/images/Address.svg'; 

// const Contact = () => {
//     const isTab = useMediaQuery('(max-width:1000px)')
//     const PortalData = JSON.parse(localStorage.getItem("portalData"));

//     const {
//         facebook_link,
//         whatsapp_link,
//         telegram_link,
//         phone_no,
//         support_email,
//         support_address,
//     } = PortalData || {};

//   return (
//     <FlexDiv style={{width:'100%'}}>
//         <FlexDiv style={{flexDirection:'column', padding:isTab?'1.5rem 2% 0rem':'6.5rem 3% 0rem', maxWidth:'1680px', width:'100%'}}>
//             <SeperatingHeader title='Contact Us' />
//             <FlexDiv style={{width:'100%', justifyContent:'space-between', marginBottom:'1.25rem', flexDirection:isTab?'column':''}}>
//                 {!isTab?
//                 <>
//                     <SocialCard img={FB} qr={FbCode} title='Facebook' url='https://www.facebook.com/officialswiftuni' color='#2F88FF' width='32%'/>
//                     <SocialCard img={Whatsapp} qr={WhatsappCode} title='Whatsapp' url='https://wa.me/+923071170004' color='#25D366' width='32%'/>
//                     <SocialCard img={Telegram} qr={TelegramCode} title='Telegram' url='https://t.me/+qZ934RrtjSljODY0' color='#08C' width='32%'/>
//                 </>
//                 :
//                 <>
//                     <FlexDiv style={{width:'100%', justifyContent:'space-between', marginBottom:'1rem'}}>
//                         <SocialCard img={FB} qr={FbCode} title='Facebook' url='https://www.facebook.com/officialswiftuni' color='#2F88FF' width='49%'/>
//                         <SocialCard img={Whatsapp} qr={WhatsappCode} title='Whatsapp' url='https://wa.me/+923071170004' color='#25D366' width='49%'/>
//                     </FlexDiv>
//                     <SocialCard img={Telegram} qr={TelegramCode} title='Telegram' url='https://t.me/+qZ934RrtjSljODY0' color='#08C' width='100%'/>
//                 </>
//                 }
//             </FlexDiv>
//             <FlexDiv style={{width:'100%', justifyContent:'space-between', flexDirection:isTab?'column':'', gap:isTab?'1rem':'', marginBottom:'1rem'}}>
//                 <ContactCard width={isTab?'100%':'49%'} svg={Svg} contact='tel' text='0307-1170004' />
//                 <ContactCard width={isTab?'100%':'49%'} svg={Email} contact='email' text='help@swiftuni.com' />
//             </FlexDiv>
//             <FlexDiv style={{width:'100%', justifyContent:'space-between', flexDirection:isTab?'column':'', gap:isTab?'1rem':'', marginBottom:'1rem'}}>
//                 <ContactCard width={isTab?'100%':'100%'} svg={Address} contact='address' text='Address: Ground Floor, Hafiz Town Plaza, Faisalabad Road, Khurrianwala, Pakistan' />
//             </FlexDiv>
//         </FlexDiv>
//     </FlexDiv>
//   )
// }

// export default Contact