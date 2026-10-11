console.log("JavaScript connected!");

const ticketModal = document.getElementById("ticket-modal");
const closeTicketButton = document.getElementById("close-ticket");

document.querySelectorAll("[data-open-ticket]").forEach(function(button) {
    button.addEventListener("click", function() {
        const eventCard = button.closest(".event-card");
        const details = eventCard.querySelectorAll("p");

        document.getElementById("ticket-event-name").textContent = eventCard.querySelector("h3").textContent;
        document.getElementById("ticket-date").textContent = details[0].textContent;
        document.getElementById("ticket-time").textContent = details[1].textContent;
        document.getElementById("ticket-venue").textContent = details[2].textContent;
        document.getElementById("ticket-id").textContent = details[3].textContent;
        ticketModal.hidden = false;
    });
});

closeTicketButton.addEventListener("click", function() {
    ticketModal.hidden = true;
});

ticketModal.addEventListener("click", function(event) {
    if (event.target === ticketModal) {
        ticketModal.hidden = true;
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        ticketModal.hidden = true;
    }
});