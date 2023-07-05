let counterActive = true;
let count;
const likeArray = [];

document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    const counter = document.getElementById('counter');
    const minus = document.getElementById('minus');
    const plus = document.getElementById('plus');
    const heart = document.getElementById('heart');
    const pause = document.getElementById('pause');
    const likes = document.getElementsByClassName('likes').item(0);
    const comments = document.getElementById('comment-form');

    runCounter();

    minus.addEventListener('click', () => {
        let newCount = parseInt(counter.innerText) -1;
        counter.innerText = newCount;
    })

    plus.addEventListener('click', () => {
        let newCount = parseInt(counter.innerText) +1;
        counter.innerText = newCount;
    })

    heart.addEventListener('click', () => {
        let currCount = counter.innerText;
        if (likeArray[currCount] === undefined) {
            let li = document.createElement('li');
            li.setAttribute('id', `like${currCount}`);
            li.innerText = `  ${currCount} has been liked 1 time`;
            likes.appendChild(li);
            likeArray[currCount] = [];
            likeArray[currCount].push('');
        } else if (likeArray[currCount].length >= 1) {
            let likeCount = likeArray[currCount].length +1;
            let li = document.getElementById(`like${currCount}`);
            li.innerText = `  ${currCount} has been liked ${likeCount} times`;
            likeArray[currCount].push('');
        }
    })

    pause.addEventListener('click', () => {
        if (counterActive === true) {
            counterActive = false;
            pause.innerText = 'resume';
            document.querySelectorAll('button').forEach(e => e.setAttribute('disabled', true));
            pause.disabled = false;
        } else {
            counterActive = true;
            runCounter();
            pause.innerText = 'pause';
            document.querySelectorAll('button').forEach(e => e.removeAttribute('disabled'));
            document.querySelectorAll('button').forEach(e => console.log(e.disabled));
        };
    });

    comments.addEventListener('submit', handleSubmit);
})

function runCounter() {
    const myInterval = setInterval(() => {
        if (counterActive === true) {
            count = parseInt(counter.innerText);
            counter.innerText = count +1;
        } else {
            clearInterval(myInterval);
        }
    }, 1000)
}

function handleSubmit(event) {
    event.preventDefault();
    const comment = event.target.parentNode.querySelector('input').value;
    event.target.parentNode.querySelector('input').value = '';
    let p = document.createElement('p');
    p.innerText = comment;
    event.target.parentNode.querySelector('div').appendChild(p);
}