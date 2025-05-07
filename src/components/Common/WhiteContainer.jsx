import React from 'react'
import { WhiteContainerBtn, WhiteContainerBtnText, WhiteContainerDiv, WhiteContainerText } from './Style'
import Lock from '../../assets/images/Lock.svg';

const WhiteContainer = ({text="Text", download=true, pdfUrl}) => {
  return (
    <WhiteContainerDiv>
        <WhiteContainerText>{text}</WhiteContainerText>
        {download?
            <a href={`${pdfUrl}`} target="_blank" style={{textDecoration:'none', cursor:'pointer'}}>
              <WhiteContainerBtn>
                  Download
              </WhiteContainerBtn>
            </a>
            :
            <WhiteContainerBtn>
                <img src={Lock} alt='' />
                <WhiteContainerBtnText>Locked</WhiteContainerBtnText>
            </WhiteContainerBtn>            
        }
    </WhiteContainerDiv>
  )
}

export default WhiteContainer