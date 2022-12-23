
var timerElement = document.querySelector('#time');
var q_box = document.querySelector('.question');
var r_box = document.querySelector('.result');
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
var timeLimit = 100;
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
    timer = setInterval(() => {
        // if answers wrong, then....do reduce amount in countdown
        if (countdown <= 0) {
            //clear timer
            countdown = 0;
            setTimeText();
            clearInterval(timer);
            //go to score page
            scorePage();
            //prevent from showing negative time;
            return;
        }
        countdown--;
        setTimeText();

    }, 1000)
    //if timer turns 0, game over
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
    q_box.append(newP, newUl);
    //add eventlistener on li
    document.querySelectorAll('li').forEach((li) => {
        aEL(li, index)
    })
}

//attach eventlistenr on options
function aEL(element, index) {
    element.addEventListener('click', () => {
        var answer = element.textContent;
        //check if answer is right;
        checkWin(answer, index);

        // check if all questions runout.
        if (index + 1 === questions.length) {
            //Show score and ask the user to leave a initial.
            scorePage();
            //At the same time stop the timer
            clearInterval(timer);
            countdown = 0;
            setTimeText();

        }
        else {   //iterate through the rest questions.
            q_box.innerHTML = '';
            addElement(index + 1);
        }
    })
}

//check if each question is true.
function checkWin(answer, index) {
    let result = document.createElement('p');
    if (answer === questions[index].key) {
        isCorrect = true;

        //update score
        score++;

        //render 'Correct' on screen!
        r_box.innerHTML = '';
        result.innerHTML = 'Correct';
        r_box.appendChild(result);
        setTimeout(() => {
            r_box.innerHTML = '';
        }, 1000);

    } else {
        isCorrect = false;
        r_box.innerHTML = '';
        result.innerHTML = 'Wrong'
        //update the timer
        countdown -= 10;
        //  has to check countdown to not be below zero(done in the timerStart function)

        //render 'Wrong' on screen!
        r_box.appendChild(result);
        setTimeout(() => {
            r_box.innerHTML = '';
        }, 1000);

    }
}
function scorePage() {
    q_box.innerHTML = '';
    var pAllDone = document.createElement('h2');
    pAllDone.className = 'result_h2';
    var p1 = document.createElement('p');
    p1.className = 'result_p';
    var form_initial = document.createElement('form');
    var label_initial = document.createElement('label');
    var input_initial = document.createElement('input');
    var btn_initial = document.createElement('button');
    label_initial.setAttribute('for', 'initial');
    input_initial.setAttribute('type', 'text');
    input_initial.setAttribute('name', 'initial');
    input_initial.setAttribute('value', '');
    input_initial.setAttribute('required', 'true');
    pAllDone.textContent = 'All Done!'
    p1.textContent = `Your final score is ${score}`;
    label_initial.textContent = 'Enter initials:';
    btn_initial.textContent = 'Submit';
    q_box.append(pAllDone, p1, form_initial);
    form_initial.append(label_initial, input_initial, btn_initial);
    btn_initial.addEventListener('click', (e) => {
        // GO TO HIGHSCORE PAGE, ALSO, UPDATE THE INITIAL AND SCORE DATA TO LOCAL STORAGE;
        e.preventDefault();
        updateScore(input_initial.value, score);
        window.location.href = './highscores.html';
    })

}

function updateScore(initial, score) {
    /* BELOW IS TO STORE EVERY SCORE */
    // localStorage.setItem(initial, score);
    /* BELOW IS TO UPDATE A NEW SCORE. */
    if (localStorage.getItem(initial) === null) {
        localStorage.setItem(initial, score);
    } else {
        let localScore = localStorage.getItem(initial);
        if (parseInt(localScore) < score) {
            localStorage.setItem(initial, score);
        } else {
            return;
        }
    }
}

//cleans main content and add questions and options
function setQestionBox() {
    q_box.innerHTML = '';
    //add the the first th question
    addElement(0);
}


btn.addEventListener('click', () => {
    timerStart();
    setQestionBox();
    //reset score;
    //in this case not necessary reset score.
    score = 0;
})