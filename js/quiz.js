document.addEventListener("DOMContentLoaded", function () {

    const quizForm = document.getElementById("quizForm");
    const quizResult = document.getElementById("quizResult");

    if (!quizForm || !quizResult) {
        return;
    }

    quizForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let score = 0;

        for (let i = 1; i <= 10; i++) {

            const answer = document.querySelector(
                'input[name="q' + i + '"]:checked'
            );

            if (!answer) {
                quizResult.innerHTML = `
                    <div class="quiz-message">
                        <h2>Please Answer All Questions</h2>
                        <p>Please select one answer for every question.</p>
                    </div>
                `;

                quizResult.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                return;
            }

            score += Number(answer.value);
        }

        const percentage = score * 10;

        /* SAVE QUIZ RESULT FOR ADMIN */

        const quizResults = JSON.parse(
            localStorage.getItem("seniorTechQuizResults") || "[]"
        );

        quizResults.push({
            score: score,
            percentage: percentage,
            date: new Date().toLocaleDateString()
        });

        localStorage.setItem(
            "seniorTechQuizResults",
            JSON.stringify(quizResults)
        );


        /* SHOW RESULT */

        if (score >= 7) {

            quizResult.innerHTML = `
                <div class="quiz-message">

                    <h2>Congratulations! 🎉</h2>

                    <p>Your Score:
                        <strong>${score}/10</strong>
                    </p>

                    <p>Percentage:
                        <strong>${percentage}%</strong>
                    </p>

                    <p>You passed the quiz and earned a certificate!</p>

                    <button
                        type="button"
                        class="btn-primary certificate-button"
                        id="certificateBtn">
                        Get Certificate
                    </button>

                </div>
            `;

            document
                .getElementById("certificateBtn")
                .addEventListener("click", function () {
                    generateCertificate(score, percentage);
                });

        } else {

            quizResult.innerHTML = `
                <div class="quiz-message">

                    <h2>Quiz Completed</h2>

                    <p>Your Score:
                        <strong>${score}/10</strong>
                    </p>

                    <p>Percentage:
                        <strong>${percentage}%</strong>
                    </p>

                    <p>You need 7/10 to earn the certificate.</p>

                    <p>You can try the quiz again.</p>

                </div>
            `;
        }

        quizResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});
function generateCertificate(score, percentage) {

    const certificate = `
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<title>Senior Tech Certificate</title>

<style>

* {
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background: #f8f1e5;
    text-align: center;
    padding: 15px;
}

.certificate {
    width: 100%;
    max-width: 750px;
    margin: 15px auto;
    padding: 45px 30px;
    background: white;
    border: 8px solid #6b3fa0;
    border-radius: 12px;
}

h1 {
    color: #6b3fa0;
    font-size: 38px;
    margin: 0 0 20px;
}

h2 {
    color: #333;
    font-size: 25px;
    margin: 15px 0;
}

p {
    font-size: 18px;
    line-height: 1.6;
    margin: 12px 0;
}

.score {
    font-size: 20px;
    margin: 25px 0;
}

@media screen and (max-width: 600px) {

    body {
        padding: 10px;
    }

    .certificate {
        width: 100%;
        max-width: none;
        margin: 10px 0;
        padding: 30px 15px;
        border-width: 5px;
    }

    h1 {
        font-size: 28px;
    }

    h2 {
        font-size: 20px;
    }

    p {
        font-size: 16px;
    }

    .score {
        font-size: 17px;
        margin: 20px 0;
    }
}

</style>
</head>

<body>

<div class="certificate">

    <h1>Certificate of Achievement</h1>

    <p>This certificate is awarded for successfully completing</p>

    <h2>Senior Tech Digital Literacy Quiz</h2>

    <div class="score">
        <p>Score: <strong>${score}/10</strong></p>
        <p>Percentage: <strong>${percentage}%</strong></p>
    </div>

    <p>Congratulations on completing the quiz!</p>

    <p><strong>Senior Tech</strong></p>

</div>

</body>
</html>
`;

    const certificateWindow = window.open("", "_blank");

    if (!certificateWindow) {
        alert("Please allow pop-ups to view your certificate.");
        return;
    }

    certificateWindow.document.open();
    certificateWindow.document.write(certificate);
    certificateWindow.document.close();
}
