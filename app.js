
const Question = require('./models/Question');
const QuestionService = require('./services/QuestionStore');

const QuestionPaperGeneratorService = require('./services/QuestionPaperGenerator');
const { writeJSONToFile, readJSONFromFile } = require('./utils/fileUtils');

// Example usage
const questionService = new QuestionService();
const questionPaperGeneratorService = new QuestionPaperGeneratorService(questionService);

// Load questions from a JSON file (if available)
const existingQuestions = readJSONFromFile('questions.json');
existingQuestions.forEach((que) => {
    // console.log(que);
    questionService.addQuestion(new Question(que.question, que.subject, que.topic, que.difficulty, que.marks));
});


const difficultyDistribution = { "Easy": 20, "Medium": 50, "Hard": 30 };

const topicDistribution = { "Physics": 30, "Mathematics": 20, "Chemistry": 50 };

// const generatedQuestionPaper = questionPaperGeneratorService.generateQuestionPaper(100, difficultyDistribution);

// const gq = questionPaperGeneratorService.generateQuestionsByCategory(topicDistribution, 8, "subject")
// console.log(`Generating questions... by category of subject ${gq} `);

// const ge = questionPaperGeneratorService.generateQuestionsBySubject(topicDistribution, 8);
// console.log(`Generating questions... by Subject ${ge} `);

const qbyCbytotalMarks = questionPaperGeneratorService.generateQuestionPaperByTotalMarks(
    20,
    { "History": 30, "Geography": 40, "Biology": 30 },
    "Subject"
)
// console.log(`Generating questions... by total marks of category ${qbyCbytotalMarks} `);
writeJSONToFile('generatedQuestionPaper.json', qbyCbytotalMarks);

// Write the generated question paper to a new JSON file
// writeJSONToFile('generatedQuestionPaper.json', generatedQuestionPaper);
// writeJSONToFile('generatedQuestionPaper.json', ge);
