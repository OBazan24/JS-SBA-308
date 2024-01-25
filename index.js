// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  const result = [];
  const learners = {};

  // Helper function to round to three decimal places
  function roundToThreeDecimals(number) {
    const factor = 1000;
    const rounded = (number * factor + 0.5) | 0;
    return (rounded / factor).toFixed(3);
  }

  // Iterate through learner submissions
  for (let i = 0; i < learnerSubmissions.length; i++) {
    const submission = learnerSubmissions[i];
    const learnerId = submission.learner_id;
    const assignmentId = submission.assignment_id;
    const score = submission.submission.score;
    let pointsPossible;

    // Find pointsPossible for the assignment
    for (let j = 0; j < assignmentGroup.assignments.length; j++) {
      if (assignmentGroup.assignments[j].id === assignmentId) {
        pointsPossible = assignmentGroup.assignments[j].points_possible;
        break;
      }
    }

    // Calculate the normalized score
    const normalizedScore = roundToThreeDecimals(score / pointsPossible);

    // If learner is not in the learners object, add them
    if (!learners[learnerId]) {
      learners[learnerId] = {
        id: learnerId,
        totalScore: 0,
        totalPoints: 0,
        scores: {},
      };
    }

    // Update learners total score and total points
    learners[learnerId].totalScore += score;
    learners[learnerId].totalPoints += pointsPossible;

    // Store the normalized score for each assignment
    learners[learnerId].scores[assignmentId] = normalizedScore;
  }

  // Calculate averages and format the result
  for (const learnerId in learners) {
    if (learners.hasOwnProperty(learnerId)) {
      const learnerData = learners[learnerId];
      const learnerAverage = learnerData.totalScore / learnerData.totalPoints;

      const formattedResult = {
        id: learnerData.id,
        avg: roundToThreeDecimals(learnerAverage),
      };

      // Add individual assignment scores
      for (const assignmentId in learnerData.scores) {
        if (learnerData.scores.hasOwnProperty(assignmentId)) {
          formattedResult[assignmentId] = roundToThreeDecimals(
            learnerData.scores[assignmentId]
          );
        }
      }

      result.push(formattedResult);
    }
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
