import React from 'react'
import { FlexDiv } from '../../assets/styles/style'
import { AverageScoreText } from './style'
import AvgScoreCard from './AvgScoreCard'
import { useMediaQuery } from '@mui/material'

const AverageScore = ({ isLoading, averageScores }) => {
    const isTab = useMediaQuery('(max-width:920px)')
    const isSTab = useMediaQuery('(max-width:700px)')

    const AvgScoreCardData = [
        {
          id: 1,
          borderRadius: "16px",
          backgroundColor: "#996CFE",
          text: "Overall",
          score: averageScores?.overallAverage,
        },
        {
          id: 2,
          borderRadius: "16px 0px 0px 16px",
          backgroundColor: "#49D7F2",
          text: "Speaking",
          score: averageScores?.speakingAverage,
          flex: "1 0 0",
        },
        {
          id: 3,
          borderRadius: "0px",
          backgroundColor: "#FF5D5D",
          text: "Writing",
          score: averageScores?.writingAverage,
          flex: "1 0 0",
        },
        {
          id: 4,
          borderRadius: "0px",
          backgroundColor: "#AD826E",
          text: "Reading",
          score: averageScores?.readingAverage,
        },
        {
          id: 5,
          borderRadius: "0px 16px 16px 0px",
          backgroundColor: "#868EAF",
          text: "Listening",
          score: averageScores?.listeningAverage,
        },
      ];

    return (
    !isSTab?
    <>
    <FlexDiv style={{paddingTop:'0.25rem'}}>
    <AverageScoreText>Last Four Mock Tests Average Score</AverageScoreText>
    </FlexDiv>
    <FlexDiv
        style={{
            flexDirection:'column',
            paddingTop:'12px',
            gap:'12px'
        }}
    >
        <FlexDiv
            style={{
                width:'100%',
                maxWidth: "1680px",
            }}
        >
            <AvgScoreCard
                key={AvgScoreCardData[0].id}
                borderRadius={AvgScoreCardData[0].borderRadius}
                backgroundColor={AvgScoreCardData[0].backgroundColor}
                text={AvgScoreCardData[0].text}
                score={AvgScoreCardData[0].score}
                marginRight={'1%'}
                isLoading={isLoading}
            />
            <AvgScoreCard
                key={AvgScoreCardData[1].id}
                borderRadius={AvgScoreCardData[1].borderRadius}
                backgroundColor={AvgScoreCardData[1].backgroundColor}
                text={AvgScoreCardData[1].text}
                score={AvgScoreCardData[1].score}
                isLoading={isLoading}
            />
            <AvgScoreCard
                key={AvgScoreCardData[2].id}
                borderRadius={AvgScoreCardData[2].borderRadius}
                backgroundColor={AvgScoreCardData[2].backgroundColor}
                text={AvgScoreCardData[2].text}
                score={AvgScoreCardData[2].score}
                isLoading={isLoading}
            />
            <AvgScoreCard
            key={AvgScoreCardData[3].id}
            borderRadius={AvgScoreCardData[3].borderRadius}
            backgroundColor={AvgScoreCardData[3].backgroundColor}
            text={AvgScoreCardData[3].text}
            score={AvgScoreCardData[3].score}
            isLoading={isLoading}
            />
            <AvgScoreCard
            key={AvgScoreCardData[4].id}
            borderRadius={AvgScoreCardData[4].borderRadius}
            backgroundColor={AvgScoreCardData[4].backgroundColor}
            text={AvgScoreCardData[4].text}
            score={AvgScoreCardData[4].score}
            isLoading={isLoading}
            />
        </FlexDiv>
    </FlexDiv>
    </>
    :
    <FlexDiv
        style={{
            flexDirection:'column',
            gap:'12px'
        }}
    >
        <AverageScoreText>Last Four Mock Tests Average Score</AverageScoreText>
        <FlexDiv
            style={{width:'100%'}}
        >
        <AvgScoreCard
            key={AvgScoreCardData[0].id}
            borderRadius={AvgScoreCardData[0].borderRadius}
            backgroundColor={AvgScoreCardData[0].backgroundColor}
            text={AvgScoreCardData[0].text}
            score={AvgScoreCardData[0].score}
            isLoading={isLoading}
        />
        </FlexDiv>
        <FlexDiv
        style={{width:'49%', gap:'4%'}}        
        >
            <AvgScoreCard
                key={AvgScoreCardData[1].id}
                borderRadius={AvgScoreCardData[1].borderRadius}
                backgroundColor={AvgScoreCardData[1].backgroundColor}
                text={AvgScoreCardData[1].text}
                score={AvgScoreCardData[1].score}
                isLoading={isLoading}
            />
            <AvgScoreCard
                key={AvgScoreCardData[2].id}
                borderRadius={AvgScoreCardData[2].borderRadius}
                backgroundColor={AvgScoreCardData[2].backgroundColor}
                text={AvgScoreCardData[2].text}
                score={AvgScoreCardData[2].score}
                isLoading={isLoading}
            />
        </FlexDiv>
        <FlexDiv
        style={{width:'49%', gap:'4%'}}        
        >
            <AvgScoreCard
                key={AvgScoreCardData[3].id}
                borderRadius={AvgScoreCardData[3].borderRadius}
                backgroundColor={AvgScoreCardData[3].backgroundColor}
                text={AvgScoreCardData[3].text}
                score={AvgScoreCardData[3].score}
                isLoading={isLoading}
            />
            <AvgScoreCard
                key={AvgScoreCardData[4].id}
                borderRadius={AvgScoreCardData[4].borderRadius}
                backgroundColor={AvgScoreCardData[4].backgroundColor}
                text={AvgScoreCardData[4].text}
                score={AvgScoreCardData[4].score}
                isLoading={isLoading}
            />
        </FlexDiv>
    </FlexDiv>
    
  )
}

export default AverageScore