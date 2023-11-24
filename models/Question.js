class Question {
    /**
     * Constructor function for creating a new instance of the class.
     *
     * @param {string} question - The question for the instance.
     * @param {string} subject - The subject for the instance.
     * @param {string} topic - The topic for the instance.
     * @param {string} difficulty - The difficulty level for the instance.
     * @param {number} marks - The marks for the instance.
     */
    constructor(question, subject, topic, difficulty, marks) {
        this.question = question;
        this.subject = subject;
        this.topic = topic;
        this.difficulty = difficulty;
        this.marks = marks;
    }
}

module.exports = Question;
