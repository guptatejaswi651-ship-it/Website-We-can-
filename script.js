// ---------- SMALL HELPERS ----------
function get(id) { return document.getElementById(id); }

function showPage(number) {
  get("page1").classList.add("hidden");
  get("page2").classList.add("hidden");
  get("page3").classList.add("hidden");
  get("page" + number).classList.remove("hidden");
}

function totalAmount() {
  return Number(get("type").value) * Number(get("qty").value);
}

// ---------- PAGE 1 ----------
function updateTotal() {
  get("total").textContent = "₹" + totalAmount();
}

function goToPayment() {
  var email = get("email").value;
  var phone = get("phone").value;
  var message = "";

  if (get("name").value.trim().length < 2) {
    message = "Enter your full name.";
  } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    message = "Enter a valid email, like name@example.com.";
  } else if (phone.length !== 10 || isNaN(phone)) {
    message = "Enter a 10-digit phone number.";
  } else if (get("college").value.trim().length < 3) {
    message = "Enter your college and roll number.";
  }

  get("error1").textContent = message;
  if (message !== "") { return; }          // stop if something is wrong

  get("payTotal").textContent = "₹" + totalAmount();
  showPage(2);
}

// ---------- PAGE 2 ----------
function showPayFields() {
  var isUpi = get("method").value === "upi";
  get("upiBox").classList.toggle("hidden", !isUpi);
  get("cardBox").classList.toggle("hidden", isUpi);
}

function pay() {
  var message = "";

  if (get("method").value === "upi") {
    if (get("upi").value.indexOf("@") === -1) {
      message = "Enter a valid UPI ID, like name@bank.";
    }
  } else {
    var card = get("card").value.replace(/ /g, "");
    if (card.length !== 16 || isNaN(card)) {
      message = "Card number must be 16 digits.";
    } else if (get("expiry").value.length !== 5) {
      message = "Enter expiry as MM/YY.";
    } else if (get("cvv").value.length !== 3) {
      message = "CVV must be 3 digits.";
    }
  }

  get("error2").textContent = message;
  if (message !== "") { return; }

  get("payBtn").textContent = "Processing...";
  setTimeout(showTicket, 1200);            // wait 1.2 seconds, then show the ticket
}

// ---------- PAGE 3 ----------
function showTicket() {
  var id = "EV-" + Math.floor(10000 + Math.random() * 90000);

  get("tName").textContent = get("name").value;
  get("tQty").textContent = get("qty").value + " × " + get("type").selectedOptions[0].text.split(" - ")[0];
  get("tPaid").textContent = "₹" + totalAmount();
  get("tId").textContent = id;

  // Make a decorative QR-style pattern
  var pattern = "";
  var n = 0;
  for (var i = 0; i < id.length; i++) { n = n * 31 + id.charCodeAt(i); }
  for (var j = 0; j < 81; j++) {
    n = (n * 1103515245 + 12345) % 2147483648;
    pattern += n % 2 === 0 ? "<i></i>" : "<i class='w'></i>";
  }
  get("qr").innerHTML = pattern;

  showPage(3);
}