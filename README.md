# QuestionPaperGeneratorService

The `QuestionPaperGeneratorService` class is responsible for generating question papers based on various distributions and criteria.

## Constructor

### `QuestionPaperGeneratorService(questionService)`
- Initializes the `questionService` property with an instance of the `QuestionService` class.

## Methods

### `generateQuestionPaper(totalMarks, difficultyDistribution)`
- Generates a question paper based on the total marks and difficulty distribution.
- Parameters:
  - `totalMarks` (number): The total marks for the question paper.
  - `difficultyDistribution` (object): The distribution of difficulty levels and their corresponding percentages.
- Returns:<br>

   `result` (object): The generated question paper object. <br>
  Which Contains:
  - `numberOfQuestions` (object): The total number of questions.
  - `category numberOfQuestions` (object): The number of questions for each difficulty level.
  - `questionPaper` (object): The generated question paper.
  - `totalMarks` (number): The total marks for the question paper.

### `generateQuestionsBySubject(topicDistribution, totalQuestions)`
- Generates questions based on the subject's distribution and the total number of questions.
- Parameters:
  - `topicDistribution` (object): An object containing the distribution of topics and their percentages.
  - `totalQuestions` (number): The total number of questions to generate.
- Returns:
  - An object containing the total number of questions per topic and the generated question paper.

### `generateQuestionsByCategory(categoryDistribution, totalQuestions, category)`
- Generates questions based on the category's distribution and the total number of questions.
- Parameters:
  - `categoryDistribution` (object): The distribution of marks by category in percentage.
  - `totalQuestions` (number): The total number of questions to generate.
  - `category` (string): The category of questions to include in the paper.
- Returns:
  - An object containing the total number of questions per category and the generated question paper.

### `generateQuestionPaperByTotalMarks(totalMarks, categoryDistribution, category)`
- Generates a question paper based on the total marks, category distribution, and category.
- Parameters:
  - `totalMarks` (number): The total marks for the question paper.
  - `categoryDistribution` (object): The distribution of marks by category in percentage.
  - `category` (string): The category of questions to include in the paper.
- Returns:
  - The generated question paper.

### `getRandomQuestionsFromCategory(categoryQuestions, percentage, categoryValue)`
- Retrieves a random set of questions from a given category.
- Parameters:
  - `categoryQuestions` (array): The array of questions in the category.
  - `percentage` (number): The percentage of total marks to retrieve.
  - `categoryValue` (string): The category value.
- Returns:
  - The randomly generated set of questions.
