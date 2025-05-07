import React, { useState, useEffect } from 'react'
import { FlexDiv } from "../../assets/styles/style";
import SeperatingHeader from '../Common/SeperatingHeader';
import WhiteContainer from '../Common/WhiteContainer';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import { Base_URL } from "../../Client/apiURL";

const Templates = () => {
  const isMobile = useMediaQuery('(max-width:1000px)');
  const [templateData, setTemplateData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Base_URL}/app/users/templates/template`,{ withCredentials: true,});
      if(response.data && response?.data?.response){
        setTemplateData(response.data.response);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

  return (
    <FlexDiv style={{width:'100%'}}>
      <FlexDiv style={{flexDirection:'column', padding:isMobile?'1.5rem 2% 0rem':'6.5rem 3% 0rem', maxWidth:'1680px', width:'100%'}}>
          <SeperatingHeader title='Templates' />
          {(loading && templateData.length < 1)?
            <></>
          :
          templateData.map((data) => (
            <WhiteContainer key={data.title} text={data.Name} download={true} pdfUrl={data.PdfUrl}/>
          ))
          }
      </FlexDiv>
    </FlexDiv>
  )
}

export default Templates