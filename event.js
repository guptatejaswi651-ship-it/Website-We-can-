// 1. Grab the things we need from the page
const searchBox = document.getElementById("searchBox");
const buttons = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

// 2. Remember which button is selected right now
let selectedCategory = "all";

// 3. One function that decides which cards to show
function showCards() {
  const searchText = searchBox.value.toLowerCase();

  cards.forEach(function (card) {
    const cardCategory = card.dataset.category;
    const cardText = card.textContent.toLowerCase();

    const categoryMatches = selectedCategory === "all" || cardCategory === selectedCategory;
    const searchMatches = cardText.includes(searchText);

    if (categoryMatches && searchMatches) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// 4. When someone types in the search box, run showCards
searchBox.addEventListener("input", showCards);

// 5. When someone clicks a button, update the selection and run showCards
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    buttons.forEach(function (b) {
      b.classList.remove("active");
    });
    button.classList.add("active");

    selectedCategory = button.dataset.category;
    showCards();
  });
});