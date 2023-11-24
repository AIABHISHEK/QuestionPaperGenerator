
class QuestionPaperGeneratorService {

    /**
     * Constructor function for initializing the questionService property.
     *
     * @param {QuestionService} questionService - The instance of the QuestionService class.
     */
    constructor(questionService) {
        this.questionService = questionService;
    }

    /**
     * Generates a question paper based on the total marks, difficulty distribution, and topic distribution.
     *
     * @param {number} totalMarks - The total marks for the question paper.
     * @param {object} difficultyDistribution - The distribution of difficulty levels and their corresponding percentages.
     * @return {object} result - The generated question paper object.
     */
    generateQuestionPaper(totalMarks, difficultyDistribution) {
        const questionPaper = [];
        let result = {};
        result["numberOfQuestions"] = 0;
        result["category"] = {};
        result["category"]["numberOfQuestions"] = {};
        result["category"]["totalMarks"] = {};
        result["totalMarks"] = 0;
        totalMarks = +totalMarks;
        const mark = { "Easy": 1, "Medium": 2, "Hard": 5 };
        let currtotalMarks = 0;
        /**
         * Retrieves a random set of questions from a given category.
         *
         * @param {Array} categoryQuestions - The array of questions in the category.
         * @param {number} percentage - The percentage of total marks to retrieve.
         * @param {string} difficulty - The difficulty level of the questions.
         * @return {Array} - The randomly selected questions.
         */
        function getRandomQuestionsFromCategory(categoryQuestions, percentage, difficulty) {
            // console.log(categoryQuestions);
            const numberOfMarks = Math.ceil((percentage / 100) * totalMarks);
            console.log(numberOfMarks);
            const numberOfQuestions = Math.ceil(numberOfMarks / mark[difficulty]);
            result["category"]["numberOfQuestions"][difficulty] = numberOfQuestions;
            result["numberOfQuestions"] += +numberOfQuestions;
            result["category"]["totalMarks"][difficulty] = numberOfQuestions * mark[difficulty];
            result["totalMarks"] += numberOfQuestions * mark[difficulty];
            currtotalMarks += numberOfQuestions * mark[difficulty];
            const shuffledQuestions = categoryQuestions.sort(() => 0.5 - Math.random());
            let a = shuffledQuestions.slice(0, numberOfQuestions);
            console.log(a);
            return a;
        }

        // Distribute questions by difficulty
        for (let [difficulty, percentage] of Object.entries(difficultyDistribution)) {
            // console.log(difficulty);
            percentage = +percentage;
            const difficultyQuestions = this.questionService.getQuestionsByDifficulty(difficulty);
            // console.log(difficultyQuestions);
            const selectedDifficultyQuestions = getRandomQuestionsFromCategory(difficultyQuestions, percentage, difficulty);

            questionPaper.push(...selectedDifficultyQuestions);
        }
        // console.log(questionPaper);
        while (currtotalMarks > totalMarks) {
            let diff = currtotalMarks - totalMarks
            if (diff >= mark["Hard"]) { 
                //remove one hard question
                let index = questionPaper.indexOf(questionPaper.find(x => x.difficulty == "Hard"));
                questionPaper.splice(index, 1);
                result["totalMarks"] -= mark["Hard"];
                result["numberOfQuestions"] -= 1;
                result["category"]["numberOfQuestions"]["Hard"] -= 1;
                result["category"]["totalMarks"]["Hard"] -= mark["Hard"];
                currtotalMarks -= mark["Hard"];
                diff = currtotalMarks - totalMarks
                
            }
            if (diff >= mark["Medium"]) {
                //remove one medium question
                let index = questionPaper.indexOf(questionPaper.find(x => x.difficulty == "Medium"));
                questionPaper.splice(index, 1);
                currtotalMarks -= mark["Medium"];
                result["totalMarks"] -= mark["Medium"];
                result["numberOfQuestions"] -= 1;
                result["category"]["numberOfQuestions"]["Medium"] -= 1;
                result["category"]["totalMarks"]["Medium"] -= mark["Medium"];
                diff = currtotalMarks - totalMarks
            }
            if(diff >= mark["Easy"]) {
                //remove one easy question
                let index = questionPaper.indexOf(questionPaper.find(x => x.difficulty == "Easy"));
                questionPaper.splice(index, 1);
                currtotalMarks -= mark["Easy"];
                result["totalMarks"] -= mark["Easy"];
                result["numberOfQuestions"] -= 1;
                result["category"]["numberOfQuestions"]["Easy"] -= 1;
                result["category"]["totalMarks"]["Easy"] -= mark["Easy"];
                diff = currtotalMarks - totalMarks;
            }
        }
        result["questionPaper"] = questionPaper;
        console.log(result);
        return result;
    }

    
    
    /**
     * Generates questions based on the subject's distribution(distribution based on totalNumberOfQuestions) and the total number of questions.
     *
     * @param {Object} topicDistribution - An object containing the distribution of topics and their percentages.
     * @param {number} totalQuestions - The total number of questions to generate.
     * @return {Object} - An object containing the total number of questions per topic and the generated question paper.
     */
    generateQuestionsBySubject(subjectDistribution , totalQuestions) {
        const totalQuestionsBySubject = {};
        const questionPaper = [];
        // Helper function to get a specific percentage of questions from an array

        function getRandomQuestionsFromCategory(categoryQuestions, percentage) {
            const numberOfQuestions = Math.ceil((+percentage / 100) * +totalQuestions);
            const shuffledQuestions = categoryQuestions.sort(() => 0.5 - Math.random());
            return shuffledQuestions.slice(0, numberOfQuestions);
        }

        // Distribute questions by topic if topicDistribution is provided
        for (const [subject, percentage] of Object.entries(subjectDistribution)) {
            console.log(subject, percentage);
            const topicQuestions = this.questionService.getQuestionsBySubject(subject);
            const selectedSubjectQuestions = getRandomQuestionsFromCategory(topicQuestions, percentage);
            totalQuestionsBySubject[subject] = (totalQuestionsBySubject[subject] || 0) + selectedSubjectQuestions.length;
            questionPaper.push(...selectedSubjectQuestions);
        }
        console.log(questionPaper);
        return { totalQuestionsBySubject, questionPaper };
    }

    generateQuestionsByCategory(categoryDistribution, totalQuestions, category) {
        const totalQuestionsByCategory = {};
        const questionPaper = [];
        // Helper function to get a specific percentage of questions from an array

        function getRandomQuestionsFromCategory(categoryQuestions, percentage) {
            const numberOfQuestions = Math.ceil((+percentage / 100) * +totalQuestions);
            const shuffledQuestions = categoryQuestions.sort(() => 0.5 - Math.random());
            return shuffledQuestions.slice(0, numberOfQuestions);
        }

        // Distribute questions by topic if topicDistribution is provided
        for (const [categoryValue, percentage] of Object.entries(categoryDistribution)) {
            console.log(categoryValue, percentage);
            let categoryQuestions;
            if (category === "subject") {
                categoryQuestions = this.questionService.getQuestionsBySubject(categoryValue);
            }
            else if (category === "topic") {
                categoryQuestions = this.questionService.getQuestionsByTopic(categoryValue);
            }
            else if (category === "difficulty") {
                categoryQuestions = this.questionService.getQuestionsByDifficulty(categoryValue);
            }

            const selectedCategoryQuestions = getRandomQuestionsFromCategory(categoryQuestions, percentage);
            totalQuestionsByCategory[categoryValue] = (totalQuestionsByCategory[categoryValue] || 0) + selectedCategoryQuestions.length;
            questionPaper.push(...selectedCategoryQuestions);
        }

        console.log(questionPaper);
        return { totalQuestionsByCategory, questionPaper };
    }


    /**
     * Generates a question paper based on the total marks, category distribution, and category.
     *
     * @param {number} totalMarks - The total marks for the question paper.
     * @param {object} categoryDistribution - The distribution of marks by category-Value in percenatge.
     * @param {string} category - The category of questions to include in the paper.
     * @return {object} - The generated question paper.
     */
    generateQuestionPaperByTotalMarks(totalMarks, categoryDistribution, category) {
        const questionPaper = [];
        let result = {};
        result["numberOfQuestions"] = 0;
        result["category"] = {};
        result["category"]["numberOfQuestions"] = {};
        result["category"]["totalMarks"] = {};
        result["totalMarks"] = 0;
        totalMarks = +totalMarks;
        const mark = { "Easy": 1, "Medium": 2, "Hard": 5 };
        
        let currMarks = 0;

        /**
         * Generates a random set of questions from a given category.
         *
         * @param {Array} categoryQuestions - The array of category questions.
         * @param {string} categoryValue - The category value.
         * @return {Array} The randomly generated set of questions.
         */
        function getRandomQuestionsFromCategory(categoryQuestions, percentage, categoryValue) {
            console.log(categoryValue);
            let a = [];
            if (categoryQuestions.length === 0) return [];
            result["category"]["totalMarks"][categoryValue] = 0;
            result["category"]["numberOfQuestions"][categoryValue] = 0;
            let totalMarksForCategory = Math.ceil((percentage / 100) * totalMarks);
            const shuffledQuestions = categoryQuestions.sort(() => 0.5 - Math.random());
            let currCategory = 0;
            for (let q of shuffledQuestions) {
                if (currCategory >= totalMarksForCategory) break;
                a.push(q);
                console.log(q);
                currMarks += q.marks;
                currCategory += q.marks;
                result["numberOfQuestions"] += 1;
                result["totalMarks"] += +q.marks;
                result["category"]["totalMarks"][categoryValue] += q.marks;
                result["category"]["numberOfQuestions"][categoryValue] += +1;
            }
            // console.log(currMarks);
            return a;
        }

        // Distribute questions by difficulty
        let categoryValueList = [];
        for (let [categoryValue, percentage] of Object.entries(categoryDistribution)) {
            console.log(category);
            percentage = +percentage;
            categoryValueList.push(categoryValue);
            // console.log(categoryValue, percentage);
            let categoryQuestions;
            if (category.toString() === "Subject") {
            categoryQuestions = this.questionService.getQuestionsBySubject(categoryValue);
            }
            else if (category.toString() === "Topic") {
                categoryQuestions = this.questionService.getQuestionsByTopic(categoryValue);
            }
            
            // console.log(categoryQuestions);
            // console.log(difficultyQuestions);
            const selectedCatgeoryQuestions = getRandomQuestionsFromCategory(categoryQuestions, percentage, categoryValue);
            // console.log(selectedCatgeoryQuestions);
            questionPaper.push(...selectedCatgeoryQuestions);
        }
        //remove questions from each category until currMarks == totalMarks
        let i = 0;
        while (currMarks < totalMarks) {
            let maxMarks = 0;
            let maxCategory = "";
            let diff = currMarks - totalMarks;
            let categoryValue = categoryValueList[i];
            questionPaper.findIndex(item => {
                if (category == "subject") {
                    return item[category] == categoryValue[0] && item.marks <= diff;
                }
                else if (category == "topic") {
                    return item[category] == categoryValue[1] && item.marks <= diff;
                }
            })
            currMarks -= questionPaper[index].marks;
            result["numberOfQuestions"] -= 1;
            result["totalMarks"] -= questionPaper[index].marks;
            result["category"]["totalMarks"][questionPaper[index][categoryValue]] -= questionPaper[index].marks;
            result["category"]["numberOfQuestions"][questionPaper[index][categoryValue]] -= 1;
            questionPaper.splice(index, 1);
            i = (i + 1) % categoryValueList.length;
        };

        let diff = currMarks - totalMarks;
        console.log(currMarks, totalMarks, diff);
        result["questionPaper"] = questionPaper;
        // console.log(result);
        return result;
    }
}

module.exports = QuestionPaperGeneratorService;
























// generateQuestionPaperByTotalMarks(totalMarks, categoryDistribution, category) {
//     const questionPaper = [];
//     let result = {};
//     result["numberOfQuestions"] = 0;
//     result["category"] = {};
//     result["category"]["numberOfQuestions"] = {};
//     result["category"]["totalMarks"] = {};
//     result["totalMarks"] = 0;
//     totalMarks = +totalMarks;
//     const mark = { "Easy": 1, "Medium": 2, "Hard": 5 };

//     let currMarks = 0;

//     /**
//      * Generates a random set of questions from a given category.
//      *
//      * @param {Array} categoryQuestions - The array of category questions.
//      * @param {string} categoryValue - The category value.
//      * @return {Array} The randomly generated set of questions.
//      */
//     function getRandomQuestionsFromCategory(categoryQuestions, percentage, categoryValue) {
//         // console.log(categoryQuestions);
//         if (categoryQuestions.length === 0) return [];
//         let totalMarksForCategoryValue = Math.ceil((percentage / 100) * totalMarks);
//         console.table([categoryValue, totalMarksForCategoryValue]);
//         //get number questions of difficulty easy of numberOfMarks/3

//         //get number of question for given caetgory value

//         // let numberOfQuestionsEasy = Math.ceil((totalMarksForCategoryValue/3) / mark["Easy"]) > 0 ? Math.ceil((totalMarksForCategoryValue/3) / mark["Easy"]) : 1;
//         // console.log("numberOfQuestionsEasy", numberOfQuestionsEasy);

//         // let easyQuestions = categoryQuestions.filter(q => q.difficulty.toString() === "Easy");

//         // //get number questions of difficulty medium of numberOfMarks/3
//         // let numberOfQuestionsMedium = Math.ceil((totalMarksForCategoryValue / 3) / mark["Medium"]) > 0 ? Math.ceil((totalMarksForCategoryValue / 3) / mark["Medium"]) : 1;
//         // console.log("Number of questions medium", numberOfQuestionsMedium);
//         // //get number questions of difficulty hard of numberOfMarks/3
//         // let numberOfQuestionsHard = Math.ceil((totalMarksForCategoryValue / 3) / mark["Hard"]);
//         // console.log("Number of questions hard", numberOfQuestionsHard);
//         // //get questions of difficulty easy of numberOfMarks/3


//         // //get questions of difficulty medium of numberOfMarks/3
//         // let mediumQuestions = categoryQuestions.filter(q => q.difficulty.toString() === "Medium".toString());

//         // //get questions of difficulty hard of numberOfMarks/3
//         // let hardQuestions = categoryQuestions.filter(q => q.difficulty.toString() === "Hard".toString());
//         // //add marks to currMarks
//         // currMarks += numberOfQuestionsEasy * mark["Easy"] + numberOfQuestionsMedium * mark["Medium"] + numberOfQuestionsHard * mark["Hard"];

//         // let shuffledQuestions = easyQuestions.sort(() => 0.5 - Math.random());
//         // console.log(totalMarks);

//         // let a = shuffledQuestions.slice(0, numberOfQuestionsEasy);

//         // shuffledQuestions = mediumQuestions.sort(() => 0.5 - Math.random());
//         // a = a.concat(shuffledQuestions.slice(0, numberOfQuestionsMedium));

//         // shuffledQuestions = hardQuestions.sort(() => 0.5 - Math.random());
//         // a = a.concat(shuffledQuestions.slice(0, numberOfQuestionsHard));

//         // result["category"][categoryValue] = +numberOfQuestionsEasy;
//         // result["category"][categoryValue] += +numberOfQuestionsMedium;
//         // result["category"][categoryValue] += +numberOfQuestionsHard;

//         result["numberOfQuestions"] += result["category"][categoryValue];
//         result["totalMarks"] += numberOfQuestionsEasy * mark["Easy"] + numberOfQuestionsMedium * mark["Medium"] + numberOfQuestionsHard * mark["Hard"];
//         // console.log(a);
//         return a;
//     }

//     // Distribute questions by difficulty
//     for (let [categoryValue, percentage] of Object.entries(categoryDistribution)) {
//         console.log(category);
//         percentage = +percentage;

//         let categoryQuestions;
//         if (category.toString() === "Subject") {
//             categoryQuestions = this.questionService.getQuestionsBySubject(categoryValue);
//         }
//         else if (category.toString() === "Topic") {
//             categoryQuestions = this.questionService.getQuestionsByTopic(categoryValue);
//         }

//         // console.log(categoryQuestions);
//         // console.log(difficultyQuestions);
//         const selectedCatgeoryQuestions = getRandomQuestionsFromCategory(categoryQuestions, percentage, categoryValue);
//         console.log(selectedCatgeoryQuestions);
//         questionPaper.push(...selectedCatgeoryQuestions);
//     }
//     let diff = currMarks - totalMarks;
//     console.log(currMarks, totalMarks, diff);
//     while (currMarks > totalMarks) {
//         // console.log(diff);
//         if (diff >= mark["Hard"]) {
//             diff -= mark["Hard"];
//             currMarks -= mark["Hard"];
//             let index = questionPaper.indexOf(questionPaper.find(x => x.difficulty == "Hard"));
//             result["category"][questionPaper[index][category]] -= mark["Hard"];
//             questionPaper.splice(index, 1);
//             result["totalMarks"] -= mark["Hard"];
//             result["numberOfQuestions"] -= 1;
//         }
//         if (diff >= mark["Medium"]) {
//             diff -= mark["Medium"];
//             currMarks -= mark["Medium"];
//             let index = questionPaper.indexOf(questionPaper.find(x => x.difficulty == "Medium"));
//             result["category"][questionPaper[index][category]] -= mark["Medium"];
//             questionPaper.splice(index, 1);
//             result["totalMarks"] -= mark["Medium"];
//             result["numberOfQuestions"] -= 1;
//         }
//         if (diff >= mark["Easy"]) {
//             diff -= mark["Easy"];
//             currMarks -= mark["Easy"];
//             let index = questionPaper.indexOf(questionPaper.find(x => x.difficulty == "Easy"));
//             result["category"][questionPaper[index][category]] -= mark["Easy"];
//             result["totalMarks"] -= mark["Easy"];
//             questionPaper.splice(index, 1);
//             result["numberOfQuestions"] -= 1;
//         }
//         diff = currMarks - totalMarks;
//     }
//     // console.log(questionPaper);
//     result["questionPaper"] = questionPaper;
//     console.log(result);
//     return result;
// }