let shareCount = 0;
const shareBtn = document.getElementById("shareBtn");
const counterText = document.getElementById("counterText");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const statusMessage = document.getElementById("statusMessage");

// Check if the user already submitted
const isSubmitted = localStorage.getItem("submitted");
if (isSubmitted === "true") {
  disableForm();
  statusMessage.innerHTML = `
    🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!<br><br>
    <a href="" onclick="localStorage.removeItem('submitted'); location.reload(); return false;" style="color:#6a11cb; font-weight:bold;">Submit another response</a>
  `;
}

// WhatsApp Share Button Click
shareBtn.addEventListener("click", () => {
  if (shareCount < 5) {
    shareCount++;
    counterText.textContent = `Click count: ${shareCount}/5`;

    const webpageLink = "https://rohan5-9.github.io/Tech_For_Girls/"; 
    const message = `Hey Buddy! 👋\n\nJoin the amazing 🚀 Tech For Girls Community — a platform to empower girls through technology, workshops, mentorship, and mini-projects!\n\nRegister now at: ${webpageLink}\n\nLet’s grow and learn together! 💪✨\n#TechForGirls`;

    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  }

  if (shareCount === 5) {
    shareBtn.disabled = true;
    counterText.textContent += " ✅ Sharing complete. Please continue.";
    submitBtn.disabled = false;
  }
});

// Form Submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please share on WhatsApp 5 times before submitting.");
    return;
  }

  const formData = new FormData(form)
  const scriptURL = "https://script.google.com/macros/s/AKfycbyREKyNcc0ak87YqYzconUc9G5LxL5YWKQv0eKzakG3zpZynFWRcSIx1BxyopRnBBNd/exec"; 

  try {
    await fetch(scriptURL, {
      method: 'POST',
      body: formData,
    });

    statusMessage.innerHTML = `
      🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!<br><br>
      <a href="" onclick="localStorage.removeItem('submitted'); location.reload(); return false;" style="color:#6a11cb; font-weight:bold;">Submit another response</a>
    `;

    localStorage.setItem("submitted", "true");
    disableForm();
  } catch (error) {
    alert("Submission failed. Please try again later.");
    console.error("Error!", error.message);
  }
});

// Disable all form inputs and buttons
function disableForm() {
  const inputs = form.querySelectorAll("input, button");
  inputs.forEach(input => input.disabled = true);
}
