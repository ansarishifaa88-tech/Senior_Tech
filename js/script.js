
// ===============================
// MOBILE MENU
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("show");

            const isOpen = navLinks.classList.contains("show");

            menuBtn.setAttribute("aria-expanded", isOpen);
        });

        document.querySelectorAll(".nav-links a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("show");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

});

// ===============================
// FONT SIZE
// ===============================

const savedFont = localStorage.getItem("seniorTechFont") || "normal";

document.body.classList.add("font-" + savedFont);

function setFontSize(size) {
    document.body.classList.remove(
        "font-small",
        "font-normal",
        "font-large"
    );

    document.body.classList.add("font-" + size);

    localStorage.setItem("seniorTechFont", size);
}


// ===============================
// DARK MODE
// ===============================

if (localStorage.getItem("seniorTechDark") === "true") {
    document.body.classList.add("dark-mode");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "seniorTechDark",
        document.body.classList.contains("dark-mode")
    );
}


// ===============================
// READ ALOUD
// ===============================

function readPage() {
    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

        const mainContent = document.querySelector("main");

        if (!mainContent) return;

        const text = mainContent.innerText;

        const speech = new SpeechSynthesisUtterance(text);

        speech.rate = 0.85;
        speech.lang = "en-IN";

        speechSynthesis.speak(speech);
    }
}


// ===============================
// STOP READING
// ===============================

function stopReading() {
    if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
    }
}


// ===============================
// FEEDBACK FORM
// ===============================

const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const rating = document.getElementById("rating").value;
        const feedback = document.getElementById("feedback").value.trim();

        if (!name || !rating || !feedback) {
            return;
        }

        const newFeedback = {
            name: name,
            rating: Number(rating),
            feedback: feedback,
            date: new Date().toLocaleDateString()
        };

        const feedbackList = JSON.parse(
            localStorage.getItem("seniorTechFeedback") || "[]"
        );

        feedbackList.push(newFeedback);

        localStorage.setItem(
            "seniorTechFeedback",
            JSON.stringify(feedbackList)
        );

        const message = document.getElementById("feedbackMessage");

        if (message) {
            message.textContent =
                "Thank you! Your feedback has been submitted.";
        }

        feedbackForm.reset();
    });
}
