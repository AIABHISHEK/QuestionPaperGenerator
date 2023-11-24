
const Question = require('./models/Question');
const QuestionService = require('./services/QuestionStore');

const QuestionPaperGeneratorService = require('./services/QuestionPaperGenerator');
const { writeJSONToFile, readJSONFromFile } = require('./utils/fileUtils');

const questionService = new QuestionService();
const questionPaperGeneratorService = new QuestionPaperGeneratorService(questionService);

// get questions from a JSON file 
const existingQuestions = readJSONFromFile('questions.json');
existingQuestions.forEach((que) => {
    questionService.addQuestion(new Question(que.question, que.subject, que.topic, que.difficulty, que.marks));
});


//Example test cases

const difficultyDistribution = { "Easy": 20, "Medium": 50, "Hard": 30 };

const subjectDistribution = { "Physics": 30, "Mathematics": 20, "Chemistry": 50 };

//Uncomment the below example one by one to generate questions by subject

//Example 1
const generatedQuestionPaper1 = questionPaperGeneratorService.generateQuestionPaper(100, difficultyDistribution);
writeJSONToFile('generatedQuestionPaper1.json', generatedQuestionPaper1);


//Example 2
const generatedQuestionPaper2 = questionPaperGeneratorService.generateQuestionsBySubject(subjectDistribution, 8);
writeJSONToFile('generatedQuestionPaper2.json', generatedQuestionPaper2);

//Example 3
const generatedQuestionPaper3 = questionPaperGeneratorService.generateQuestionPaperByTotalMarks(
    20,
    { "History": 30, "Geography": 40, "Biology": 30 },
    "Subject"
)
writeJSONToFile('generatedQuestionPaper3.json', generatedQuestionPaper3);

