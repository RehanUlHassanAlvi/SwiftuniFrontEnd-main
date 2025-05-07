export const formatQuestionHeading = (heading) => {
  let formattedHeading = heading.startsWith("Listening: ") 
    ? heading.replace("Listening: ", "")
    : heading;
  
  if (formattedHeading === "Respond to a situation") {
    return "Respond to a Situation";
  }

  if (formattedHeading === "Re-tell Lecture") {
    return "Re-Tell Lecture";
  }
  
  return formattedHeading;
};