
class QuestionService {
    
    constructor() {
        this.questions = [];
    }

    /**
     * Adds a question to the list of questions.
     *
     * @param {object} question - The question to be added.
     */
    addQuestion(question) {
        this.questions.push(question);
    }

    /**
     * Retrieves questions based on the provided difficulty level.
     *
     * @param {string} difficulty - The difficulty level of the questions.
     * @return {Array} - An array of questions that match the provided difficulty level.
     */
    getQuestionsByDifficulty(difficulty) {
        return this.questions.filter(q => q.difficulty.toString() === difficulty.toString());
    }

    /**
     * Filter the questions by the given topic and return the filtered questions.
     *
     * @param {any} topic - The topic to filter the questions by.
     * @return {Array} - An array containing the filtered questions.
     */
    getQuestionsByTopic(topic) {
    return this.questions.filter(q => q.topic.toString() === topic.toString());
    }

    /**
     * Retrieves questions by subject.
     *
     * @param {type} subject - the subject to filter the questions by
     * @return {Array} - an array of questions filtered by subject
     */
    getQuestionsBySubject(subject) {
        return this.questions.filter(q => q.subject.toString() === subject.toString());
    }
    
    /**
     * Returns the number of questions in the array.
     *
     * @return {number} The number of questions in the array.
     */
    getNumberOfQuestions() {
        return this.questions.length;
    }

    /**
     * Returns a set of topics based on the questions array.
     *
     * @return {Set} - A set of topics.
     */
    getTopics() {
        return new Set(this.questions.map(q => q.topic));
    }

    /**
     * Returns a set of unique subjects extracted from the questions array.
     *
     * @return {Set} - A set of unique subjects.
     */
    getSubjets() {
        return new Set(this.questions.map(q => q.subject));
    }

    /**
     * Returns a Set containing the difficulty levels present in of all the questions.
     *
     * @return {Set} The Set containing the difficulty levels.
     */
    getDifficultyLevels() {
        return new Set(this.questions.map(q => q.difficulty));
    }

}

module.exports = QuestionService;