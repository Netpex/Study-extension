let duration = 1;

chrome.storage.sync.get(["exam"]).then((result) => {
    if (result.exam) {
        window.location.href="/views/return.html";
        chrome.action.setPopup({popup: "/views/return.html"});
    }
});

const btnClick = function () {
    this.parentNode.getElementsByClassName("active")[0].classList.remove("active");
    this.classList.add("active");
    duration = this.id
};
document.querySelectorAll(".btn-group .duration").forEach(foo => foo.addEventListener('click', btnClick));


const btn = document.querySelector('#create-exam');
const form = document.querySelector('#exam');

btn.addEventListener('click', (e) => {
    // prevent the form from submitting
    e.preventDefault();

    // show the form values
    const formData = new FormData(form);
    const values = [...formData.entries()];
    if (values[0][0] == "ename") {
        console.log(values[0][1]);
        const value = values[0][1];
        chrome.storage.sync.set({ exam: value }).then(() => {
            console.log("Value is set to " + value);
        });
        chrome.storage.sync.set({ examdur: duration }).then(() => {
            console.log("Value is set to " + duration);
        });
        window.location.href="/views/return.html";
        chrome.action.setPopup({popup: "/views/return.html"});
    }
});