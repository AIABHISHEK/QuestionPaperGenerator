


const fs = require('fs');

const data = fs.readFileSync('questions.json', 'utf8');
let ques = JSON.parse(data);
let jsq = ques.map((que) => {
    // console.log(que);
    //change marks of questions
    if(que.marks == 20){
        que.marks = 5;
    }
    else if(que.marks == 10){
        que.marks = 2;
    }
    else{
        que.marks = 1;
    }
    return que;
});

fs.writeFileSync('questions2.json', JSON.stringify(jsq, null, 2));