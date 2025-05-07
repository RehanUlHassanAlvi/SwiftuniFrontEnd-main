import React from 'react'
import { FeedbackCardDiv, FeedbackCardText, FeedbackScoreCard, FeedbackScoreCardScore, FeedbackScoreCardTitle } from './style'

const FeedbackCard = ({title="Overall Score", score= 0, bg='#996CFE', text=" "}) => {
  return (
    <>
        <FeedbackCardDiv>
            <FeedbackScoreCard style={{background:bg}}>
                <FeedbackScoreCardTitle>
                    {title}
                </FeedbackScoreCardTitle>
                <FeedbackScoreCardScore>{score}</FeedbackScoreCardScore>
            </FeedbackScoreCard>
            <FeedbackCardText>{text}</FeedbackCardText>
        </FeedbackCardDiv>
    </>
  )
}

export default FeedbackCard