
let menuBtn = document.getElementById("menuBtn");
let menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {
    menu.classList.toggle("show");
});

let search = document.getElementById("search");
let buttons = document.querySelectorAll(".filters button");
let cards = document.querySelectorAll(".card");
let message = document.getElementById("message");

let category = "all";

function showEvents() {
    let word = search.value.toLowerCase();
    let count = 0;

    cards.forEach(function (card) {
        let details = card.innerText.toLowerCase();

        if (
            (category == "all" || card.dataset.type == category) &&
            details.includes(word)
        ) {
            card.style.display = "";
            count++;
        } else {
            card.style.display = "none";
        }
    });

    message.innerText = count == 0 ? "No events found!" : "";
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        category = button.dataset.type;

        buttons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        showEvents();
    });
});

search.addEventListener("input", showEvents);

menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("show");
    });
});
