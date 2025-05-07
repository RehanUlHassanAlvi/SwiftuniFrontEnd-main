import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  CardWrapperRE,
  CardHeader,
  CardHeaderText,
  HeaderText,
  EnableSkillsCardRE,
  EnableSkillsHeader,
  ListeningCard,
  ListeningHeader,
  LoremCard,
  LoremHeader,
  LoremContentText,
  UserResponseCard,
  UserResponseHeader,
  ContentWrapper1,
  ContentWrapper2,
  AiScoreParagraphCard,
  AiScoreParagraphText,
  WritingOutOfText,
  Flexed1,
  Flexed2,
} from "../../components/Writing/style";
import CircularScoreProgress from "../../components/Writing/CircularScoreProgress";
import EnableSkillsScoreTable from "../../components/Writing/EnableSkillsScoreTable";
import InfoIcon from "../../assets/images/infoicon2.svg";

const AiScoreCardSST = ({
  onClose,
  dataKey,
  EnableSkills,
  WritingScore,
  UserResponse,
}) => {
  const { score, totalScore } = WritingScore;
  const paragraphs = UserResponse.textValue.split("\n");

  return (
    <FlexDiv style={{ justifyContent: "flex-end" }}>
      <CardWrapperRE>
        <CardHeader>
          <CardHeaderText>Ai Score</CardHeaderText>
        </CardHeader>

        <Flexed1>
          <Flexed2>
            <ListeningCard>
              <ListeningHeader>
                <HeaderText>Writing</HeaderText>
              </ListeningHeader>
              <ContentWrapper1>
                <CircularScoreProgress score={score} totalScore={totalScore} />
                <WritingOutOfText>Out of {totalScore}</WritingOutOfText>
              </ContentWrapper1>
            </ListeningCard>
            <LoremCard>
              <LoremHeader>
                <HeaderText>Summary</HeaderText>
              </LoremHeader>
              <ContentWrapper2>
                <LoremContentText>Total:</LoremContentText>
                <LoremContentText>52</LoremContentText>
              </ContentWrapper2>
              <ContentWrapper2>
                <LoremContentText>Time:</LoremContentText>
                <LoremContentText>09:46</LoremContentText>
              </ContentWrapper2>
              <ContentWrapper2>
                <LoremContentText>English:</LoremContentText>
                <FlexDiv>
                  <LoremContentText>British</LoremContentText>
                  <img src={InfoIcon} alt="" style={{ marginLeft: "5px" }} />
                </FlexDiv>
              </ContentWrapper2>
            </LoremCard>
          </Flexed2>
          <FlexDiv>
            <EnableSkillsCardRE>
              <EnableSkillsHeader>
                <HeaderText>Enable Skills</HeaderText>
              </EnableSkillsHeader>
              <EnableSkillsScoreTable rows={EnableSkills} />
            </EnableSkillsCardRE>
          </FlexDiv>
        </Flexed1>

        <FlexDiv>
          <UserResponseCard>
            <UserResponseHeader>
              <HeaderText>User's Response</HeaderText>
            </UserResponseHeader>
            <AiScoreParagraphCard>
              {paragraphs.map((paragraph, dataKey) => (
                <AiScoreParagraphText
                  key={dataKey}
                  variant="body1"
                  style={{ marginBottom: "1em" }}
                >
                  {paragraph}
                </AiScoreParagraphText>
              ))}
            </AiScoreParagraphCard>
          </UserResponseCard>
        </FlexDiv>
      </CardWrapperRE>
    </FlexDiv>
  );
};

export default AiScoreCardSST;
