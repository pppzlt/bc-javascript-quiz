
var timerElement = document.querySelector('#time');
var main = document.querySelector('main');
var btn = document.querySelector('.btn');



var questions = [
    {
        q: 'Inside which HTML element do we put the JavaScript?',
        op: ['<javascript>', '<scripting>', '<js>', '<script>'],
        key: '<script>'
    },
    {
        q: 'What is the correct JavaScript syntax to change the content of the HTML element below?',
        op: ['document.getElement(\"p\").innerHTML = \"Hello World!\"',
            'document.getElementById(\"demo\").innerHTML = \"Hello World\"',
            '#demo.innerHTML = \"Hello World\"',
            'document.getElementByName(\"p\").innerHTML = \"Hello World\"'],
        key: 'document.getElement(\"p\").innerHTML = \"Hello World!\"'
    },
    {
        q: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        op: ['<script src=\"xxx.js\">', '<script href=\"xxx.js\">', '<script name=\"xxx.js\"'],
        key: '<script src=\"xxx.js\">'
    },
    {
        q: 'The external JavaScript file must contain the <script> tag.',
        op: ['False', 'True'],
        key: 'False'
    },
    {
        q: 'How do you write "Hello World" in an alert box?',
        op: ['alert(\"Hello World\");', 'msgBox(\"Hello World\");', 'alertBox(\"Hello World\");', 'msg(\"Hello World\");'],
        key: 'alert(\"Hello World\");'
    },
    {
        q: 'How do you create a function in JavaScript?',
        op: ['function = myFunction()', 'function:myFunction()', 'function myFunction()'],
        key: 'function myFunction()'
    },
    {
        q: 'How do you call a function named "myFunction"?',
        op: ['myFunction()', 'call function myFunction()', 'call myFunction()'],
        key: 'myFunction()'
    },
    {
        q: 'How to write an IF statement in JavaScript?',
        op: ['if i == 5 then', 'if (i == 5)', 'if i = 5', 'if i=5 then'],
        key: 'if (i == 5)'
    },
    {
        q: 'How does a FOR loop start?',
        op: ['for (i <=5; i ++)', 'for i = 1 to 5', 'for (i = 0; i <= 5)', 'for (i = 0; i <= 5; i++)'],
        key: 'for (i = 0; i <= 5; i++)'
    },
    {
        q: 'How can you add a comment in a JavaScript?',
        op: ['<!--This is a comment-->', 'This is a comment', '//This is a comment'],
        key: '//This is a comment'
    }

];
// var question = Object.keys(questions);

var timer;
var timeLimit = 1000;
var countdown;
var score = 0;
var isCorrect = false;

//give time box a number
function setTimeText() {
    timerElement.textContent = countdown;
}
//timer starts
function timerStart() {
    countdown = timeLimit;
    setTimeText();
    setInterval(() => {
        countdown--;
        setTimeText();
        // if answers wrong, then....do reduce amount in countdown

        //if timer turns 0, game over
        if (countdown === 0) {
            //do something
            return;
        }
    }, 1000)

}

//add new element and put text inside of the box
//index means the ith question in the questions array
function addElement(index) {
    var newP = document.createElement('p');
    var newUl = document.createElement('ul');
    newP.textContent = questions[index].q;
    for (let i = 0; i < questions[index].op.length; i++) {
        var newLi = document.createElement('li');
        newLi.textContent = questions[index].op[i];
        newUl.appendChild(newLi);
    }
    main.append(newP, newUl);
    //add eventlistener on li
    document.querySelectorAll('li').forEach((li) => {
        aEL(li,index)
    })
}

//attach eventlistenr on options
function aEL(element,index) {
    element.addEventListener('click', () => {
        var answer = element.textContent;
        //check if answer is right;
        checkWin(answer, index)
        
    })
}

//check if each question is true.
function checkWin(answer, index) {
    if (answer === questions[index].key) {
        isCorrect = true;
        console.log(isCorrect)
        //render 'Correct' on screen!

    } else {
        isCorrect = false;
        console.log(isCorrect)
        //render 'Wrong' on screen!

    }
}

//cleans main content and add questions and options
function setMain() {
    main.innerHTML = '';
    //add the the i th question
    addElement(1);
}


btn.addEventListener('click', () => {
    timerStart();
    setMain();
})