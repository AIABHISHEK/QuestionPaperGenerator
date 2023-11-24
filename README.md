# To run the code, run the following command: 

```
node app
```
This will run app.js file.
Which will update the questions.json file with new questions.
Check app.js to change the input
parameters and generate questions. 


## Class Used In this Project are as follows with explanation:

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
  - Which Contains:
  - `numberOfQuestions` (object): The total number of questions.
  - `category numberOfQuestions` (object): The number of questions for each  category.
  - `questionPaper` (object): The generated question paper.
  - `totalMarks` (number): The total marks for the question paper.

### `getRandomQuestionsFromCategory(categoryQuestions, percentage, categoryValue)`
- Retrieves a random set of questions from a given category.
- Parameters:
  - `categoryQuestions` (array): The array of questions in the category.
  - `percentage` (number): The percentage of total marks to retrieve.
  - `categoryValue` (string): The category value.
- Returns:
  - The randomly generated set of questions.



# QuestionService

The `QuestionService` class is responsible for managing and manipulating a list of questions.

## Constructor

### `constructor()`

Creates a new instance of the `QuestionService` class with an empty list of questions.

## Methods

### `addQuestion(question)`

Adds a question to the list of questions.

- `question` (object): The question object to be added.

### `getQuestionsByDifficulty(difficulty)`

Retrieves questions based on the provided difficulty level.

- `difficulty` (string): The difficulty level of the questions.
- Returns an array of questions that match the provided difficulty level.

### `getQuestionsByTopic(topic)`

Filters the questions by the given topic and returns the filtered questions.

- `topic` (any): The topic to filter the questions by.
- Returns an array containing the filtered questions.

### `getQuestionsBySubject(subject)`

Retrieves questions by subject.

- `subject` (any): The subject to filter the questions by.
- Returns an array of questions filtered by subject.

### `getNumberOfQuestions()`

Returns the number of questions in the array.

- Returns the number of questions in the array.

### `getTopics()`

Returns a set of topics based on the questions array.

- Returns a set of topics.

### `getSubjects()`

Returns a set of unique subjects extracted from the questions array.

- Returns a set of unique subjects.

### `getDifficultyLevels()`

Returns a Set containing the difficulty levels present in all the questions.

- Returns a Set containing the difficulty levels.



# Question

The `Question` class represents a single question object.

## Properties

- `question` (string): The question.
- `subject` (string): The subject of the question.
- `topic` (string): The topic of the question.
- `difficulty` (string): The difficulty level of the question.
- `marks` (number): The marks assigned to the question.

## Constructor

### `constructor(question, subject, topic, difficulty, marks)`

Creates a new instance of the `Question` class.

- `question` (string): The question.
- `subject` (string): The subject of the question.
- `topic` (string): The topic of the question.
- `difficulty` (string): The difficulty level of the question.
- `marks` (number): The marks assigned to the question.

