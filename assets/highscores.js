var highscore;
var ol = document.querySelector('ol');
var btngb = document.querySelector('#goback');
var btncl = document.querySelector('#clear');


if (localStorage.length !== 0) {
    for (let i = 0; i < localStorage.length; i++) {
        let li = document.createElement('li');
        li.textContent = `${i + 1}. ${localStorage.key(i)} --- ${localStorage.getItem(localStorage.key(i))}`;
        ol.appendChild(li);
    }
}

btngb.addEventListener('click', () => {
    window.location.href = './';
})

btncl.addEventListener('click', () => {
    localStorage.clear();
    ol.textContent = '';
})
