import React from 'react'
import { SeperatingHeaderLine, SeperatingHeaderText, SeperatingHeaderTitle } from './Style'
import { FlexDiv } from '../../assets/styles/style'

const SeperatingHeader = ({title="Templates", displayText = false, text=""}) => {
  return (
    <>
        <FlexDiv style={{flexDirection:'column', alignItems:'flex-start', width:'100%', marginBottom:'1.25rem', maxWidth:'1680px'}}>
        <SeperatingHeaderTitle>{title}</SeperatingHeaderTitle>
        <SeperatingHeaderLine />
        {
          displayText &&
            <SeperatingHeaderText>{text}</SeperatingHeaderText>
        }
        </FlexDiv>
    </>
  )
}

export default SeperatingHeader