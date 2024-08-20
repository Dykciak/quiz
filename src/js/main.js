const questions = [
	{
		question: "In which city is Lamborghini's headquarters located?",
		answers: [
			{ text: "Rome", correct: false },
			{ text: "Milan", correct: false },
			{ text: "Sant'Agata Bolognese", correct: true },
			{ text: "Turin", correct: false },
		],
	},
	{
		question: "What is the symbol in the Lamborghini logo?",
		answers: [
			{ text: "Horse", correct: false },
			{ text: "Bull", correct: true },
			{ text: "Lion", correct: false },
			{ text: "Tiger", correct: false },
		],
	},
	{
		question: "What was Lamborghini's first production model?",
		answers: [
			{ text: "Lamborghini Miura", correct: false },
			{ text: "Lamborghini Countach", correct: false },
			{ text: "Lamborghini 350 GT", correct: true },
			{ text: "Lamborghini Huracán", correct: false },
		],
	},
	{
		question: "In what year did Lamborghini release the Countach?",
		answers: [
			{ text: "1980", correct: false },
			{ text: "1985", correct: false },
			{ text: "1970", correct: false },
			{ text: "1974", correct: true },
		],
	},
];

let questionElement;
let answerBtns;
let nextBtn;
let currentQuestionIndex;
let score;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	startQuiz();
};

const prepareDOMElements = () => {
	questionElement = document.querySelector(".quiz__question");
	answerBtns = document.querySelector(".quiz__btns");
	answerAllBtns = document.querySelectorAll(".quiz__btn");
	nextBtn = document.querySelector(".quiz__btn-next");
};

const prepareDOMEvents = () => {
	nextBtn.addEventListener("click", () => {
		if (currentQuestionIndex < questions.length) {
			handleNextBtn();
		} else {
			startQuiz();
		}
	});
};

const startQuiz = () => {
	resetState();
	currentQuestionIndex = 0;
	score = 0;
	nextBtn.innerHTML = "NEXT";
	showQuestion();
};

const showQuestion = () => {
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

	answerBtns.innerHTML = "";

	currentQuestion.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("quiz__btn");
		answerBtns.append(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
};

const resetState = () => {
	nextBtn.style.display = "none";
	while (answerBtns.firstChild) {
		answerBtns.removeChild(answerBtns.firstChild);
	}
};

const selectAnswer = (e) => {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if (isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	} else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerBtns.children).forEach((button) => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextBtn.style.display = "block";
};
const showScore = () => {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
	nextBtn.innerHTML = "Play again"
	nextBtn.style.display = 'block'
};

const handleNextBtn = () => {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}
};

document.addEventListener("DOMContentLoaded", main);
