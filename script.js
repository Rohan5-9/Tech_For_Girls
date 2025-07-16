let shareCount = 0;
const shareBtn = document.getElementById("shareBtn");
const counterText = document.getElementById("counterText");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const statusMessage = document.getElementById("statusMessage");

const isSubmitted = localStorage.getItem("submitted");
if (isSubmitted === "true") {
  disableForm();
  statusMessage.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
}

shareBtn.addEventListener("click", () => {
  if (shareCount < 5) {
    shareCount++;
    counterText.textContent = `Click count: ${shareCount}/5`;

    const webpageLink = "https://yourusername.github.io/tech-for-girls/"; // Replace with your GitHub Pages link
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (shareCount < 5) {
    alert("Please share on WhatsApp 5 times before submitting.");
    return;
  }

  const formData = new FormData(form);
  const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"; // Replace with actual Apps Script URL

  try {
    await fetch(scriptURL, { method: 'POST', body: formData });
    statusMessage.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    localStorage.setItem("submitted", "true");
    disableForm();
  } catch (error) {
    alert("Submission failed. Please try again later.");
    console.error("Error!", error.message);
  }
});

function disableForm() {
  const inputs = form.querySelectorAll("input, button");
  inputs.forEach(input => input.disabled = true);
}
