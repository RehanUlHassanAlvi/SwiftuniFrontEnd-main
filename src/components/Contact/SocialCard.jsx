import React from 'react'
import { SocialDiv, SocialDivText, SocialDivTitle } from './style'
import { useMediaQuery } from '@mui/material';

const SocialCard = ({img, qr, title, url, color='#2F88FF', width='100%'}) => {
    const isTab = useMediaQuery('(max-width:1000px)')

  return (
    <SocialDiv style={{width:width}}>
        <img alt='' src={img} style={{width:isTab?'1.75rem':'2.5rem', height:isTab?'1.75rem':'2.5rem', marginBottom:'1.5rem'}}/>
        <img alt='' src={qr} style={{width:isTab?'3.75rem':'5rem', height:isTab?'3.75rem':'5rem', marginBottom:'1rem'}}/>
        <SocialDivTitle style={{color:color}}>{title}</SocialDivTitle>
        <a href={url} target="_blank" style={{textDecoration:'none', cursor:'pointer'}}><SocialDivText style={{color:color}}>{url}</SocialDivText></a>
    </SocialDiv>
  )
}

export default SocialCard