chrome.storage.sync.get(["exam"]).then((result) => {
    document.getElementById("examtag").innerHTML = result.exam;
  });

  chrome.storage.sync.get(["qs"]).then((result) => {
    console.log(result.qs.length)
    if (result.qs.length >= 2) {
        document.getElementById("qamount").innerHTML = result.qs.length + " Qs";
    } else {
        document.getElementById("qamount").innerHTML = result.qs.length + " Q";
    }
  });

  chrome.storage.sync.get(["examdur"]).then((result) => {
    if (result.examdur >= 2) {
        document.getElementById("stduration").innerHTML = result.examdur + " Weeks";
    } else {
        document.getElementById("stduration").innerHTML = result.examdur + " Week";
    }
  });

const showbtn = document.querySelector('#showq');
const shownq = document.querySelector('#shownq');
const mex = document.querySelector('#mex');
const sex = document.querySelector('#sex');
const pex = document.querySelector('#pex');
let showq = false;

showbtn.addEventListener('click', (e) => {
    if (showq == false) {
        showq = true;
        chrome.storage.sync.get(["qs"]).then((result) => {
            const a = result.qs;
            console.log(a)
            for (const q of a) { 
                if (q.type == "m") {
                    console.log(q);
                    var question = mex.cloneNode(true);
                    question.classList.remove("hidden");
                    question.querySelector('#qtitle').innerHTML = q.question;
                    question.querySelector('#qtype').innerHTML = "Multiple Choice";
                    question.querySelector('#stcorrect').innerHTML = q.choices.correct;
                    question.querySelector('#stother1').innerHTML = q.choices.option1;
                    question.querySelector('#stother2').innerHTML = q.choices.option2;
                    question.querySelector('#stother3').innerHTML = q.choices.option3;
                    mex.after(question);
                } else if (q.type == "s") {
                    console.log(q);
                    var question = sex.cloneNode(true);
                    question.classList.remove("hidden");
                    question.querySelector('#qtitle').innerHTML = q.question;
                    question.querySelector('#qtype').innerHTML = "Scramble";
                    question.querySelector('#stcorrect').innerHTML = q.choices.correct;
                    question.querySelector('#stother1').innerHTML = q.choices.option1;
                    question.querySelector('#stother2').innerHTML = q.choices.option2;
                    question.querySelector('#stother3').innerHTML = q.choices.option3;
                    mex.after(question);
                } else if (q.type == "p") {
                    console.log(q);
                    var question = pex.cloneNode(true);
                    question.classList.remove("hidden");
                    question.querySelector('#qtitle').innerHTML = q.question;
                    question.querySelector('#qtype').innerHTML = "Phrase";
                    question.querySelector('#stcorrect').innerHTML = q.choices.correct;
                    mex.after(question);
                }
            }
        });
        shownq.classList.remove("hidden");
        showbtn.innerHTML = "Hide Questions";
    } else {
        window.location.href="/views/return.html";
        showq = false;
    }
});

const createnewbtn = document.querySelector('#createnewq');

createnewbtn.addEventListener('click', (e) => {
    window.location.href="/views/createq.html";
});
