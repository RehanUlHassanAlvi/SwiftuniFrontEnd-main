import { feedbackData } from './data'; 

const getFeedback = (category, overallScore, categoryScore, targetRange) => {

  const feedbackRange = feedbackData[targetRange];

  if (!feedbackRange) return '';

  let overallFeedback = '';
  for (const feedback of feedbackRange.overall) {
    if (overallScore >= feedback.min && overallScore <= feedback.max) {
      overallFeedback = feedback.message;
      break;
    }
  }

  const { minOverall, maxOverall, message: achievedMessage } = feedbackRange.categoriesAchieved;
  if (overallScore >= minOverall && overallScore <= maxOverall) {
    return achievedMessage;
  }

  let categoryFeedback = '';
  if (category === 'listening') {
    for (const feedback of feedbackRange.categories.listening) {
      if (categoryScore >= feedback.min && categoryScore <= feedback.max) {
        categoryFeedback = feedback.message;
        break;
      }
    }
  } else {
    categoryFeedback = feedbackRange.categories[category];
  }

  if (categoryFeedback) {
    return `${categoryFeedback}`;
  }

  return overallFeedback;
};

export default getFeedback;
