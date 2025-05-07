import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import AnalyticsForTeacher from '../components/MT_Score/AnalyticsForTeacher'
import ScoreViewHeaderForTeacher from '../components/MT_Score/ScoreViewHeaderForTeacher'

const MtScoreAnalyticsForTeacher = () => {
  return (
    <>
    <ScoreViewHeaderForTeacher />
    <AnalyticsForTeacher />
    </>
  )
}

export default MtScoreAnalyticsForTeacher