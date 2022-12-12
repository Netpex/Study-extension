var questions = [];
var type = "m"
var currentChoice = 1;

chrome.storage.sync.get(["qs"]).then((result) => {
    if (result.qs) {
        questions = result.qs;
    }
});

console.log(questions);

String.prototype.shuffle = function () {
    var a = this.split(" "),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join(" ");
}

const btnClick = function () {
    this.parentNode.getElementsByClassName("active")[0].classList.remove("active");
    this.classList.add("active");
    const div = document.querySelector('.' + this.id);
    document.querySelectorAll(".question-creator").forEach(foo => foo.classList.add("hidden"))
    div.classList.remove("hidden");
    type = this.id;
    let v
    if (this.innerHTML == "Choice") {
        v = "Multiple choice";
    } else {
        v = this.innerHTML;
    }
    document.getElementById("qtype").innerHTML = v;
};
document.querySelectorAll(".btn-group .type").forEach(foo => foo.addEventListener('click', btnClick));

function choice(correct, option1, option2, option3) {
   this.correct = correct;
   this.option1 = option1;
   this.option2 = option2;
   this.option3 = option3;
}

function scramble(correct) {
    this.correct = correct;
    this.option1 = correct.shuffle();
    this.option2 = correct.shuffle();
    this.option3 = correct.shuffle();
}

function phrase(phrase) {
   this.correct = phrase;
}


function question(question, type, duration, choices) {
   this.question = question;
   this.type = type;
   this.duration = duration;
   this.choices = choices;
}

const createbtn = document.querySelector('#createq');
const mchoice = document.querySelector('#moptions');

const ret = document.querySelector('#ret');

createbtn.addEventListener('click', (e) => {

    e.preventDefault();

    chrome.storage.sync.get(["qs"]).then((result) => {
        if (result.qs) {
            questions = result.qs;
        }
    });

    if (type == "m")  {
        const form = document.querySelector('#questionM');
        const formData = new FormData(form);
        const values = [...formData.entries()];
        var cancel = false;
        document.querySelectorAll("#multiplechoice").forEach(foo => {console.log(foo); if (foo.value.length < 1) {cancel = true;}});
        if (cancel == true) {
            return;
        }
        if (values[0][1].length >= 1) {
            const c = new choice(values[2][1], values[3][1], values[4][1], values[5][1]);
            const q = new question(values[0][1], type, values[6][1], c);
            questions.push(q);
        }
        chrome.storage.sync.set({ qs: questions })
        window.location.href="/views/return.html";
    } else if (type =="s") {
        const form = document.querySelector('#questionS');
        const formData = new FormData(form);
        const values = [...formData.entries()];
        console.log(values)
        if (values[0][1].length >= 1 && values[1][1].split(" ").length >= 3) {
            const c = new scramble(values[1][1]);
            const q = new question(values[0][1], type, values[2][1], c);
            questions.push(q);
        } else {
            return;
        }
        chrome.storage.sync.set({ qs: questions })
        window.location.href="/views/return.html";
    } else if (type =="p") {
        const form = document.querySelector('#questionP');
        const formData = new FormData(form);
        const values = [...formData.entries()];
        console.log(values)
        if (values[0][1].length >= 1 && values[1][1].split(" ").length >= 1) {
            const c = new phrase(values[1][1]);
            const q = new question(values[0][1], type, values[2][1], c);
            questions.push(q);
        } else {
            return;
        }
        chrome.storage.sync.set({ qs: questions })
        window.location.href="/views/return.html";
    }
});

mchoice.addEventListener('click', (e) => {

    const div = document.querySelector('.option' + mchoice.value);
    currentChoice = mchoice.value
    document.querySelectorAll(".option").forEach(foo => foo.classList.add("hidden"))
    div.classList.remove("hidden");
});


ret.addEventListener('click', (e) => {
    window.location.href="/views/return.html";
});
