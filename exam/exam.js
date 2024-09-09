class Quizzify {
    constructor(timerDuration, questionsUrl) {
        this.timerDuration = timerDuration;
        this.questionsUrl = questionsUrl;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.flaggedQuestions = new Set();
        this.timerInterval = null;
        this.timeRemaining = this.timerDuration * 60;
        this.initializeQuiz();
    }

    async initializeQuiz() {
        await this.fetchQuestions();
        this.startTimer();
        this.displayQuestion();
        this.setupEventListeners();
        this.showUser();
    }

    async fetchQuestions() {
        try {
            const questionsNumber=10;
            localStorage.setItem("QuestionNumber", questionsNumber);
            const response = await fetch(this.questionsUrl);
            const data = await response.json();
            this.questions = this.getRandomQuestions(data, questionsNumber);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    getRandomQuestions(allQuestions, number) {
        const random = allQuestions.sort(() => 0.5 - Math.random());
        return random.slice(0, number);
    }

    showUser(){
        const userName=document.querySelector('.user');
        const getName = localStorage.getItem("UserName");
        userName.textContent=`${getName}`;
    }

    startTimer() {
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.timeEnded();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        document.getElementById('time').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        document.querySelector('.question').textContent = `${this.currentQuestionIndex + 1}. ${question.question}`;

        const optionsContainer = document.querySelector('#options');
        optionsContainer.innerHTML = '';
    
        question.choices.forEach((choice, index) => {
            const optionElement = document.createElement('p');
            optionElement.classList.add('option');
            optionElement.textContent = choice;
    
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionElement.classList.add('active');
            }
    
            optionElement.addEventListener('click', () => this.selectAnswer(index));
    
            optionsContainer.appendChild(optionElement);
        });
    
        this.updateFlagButton();
        this.updateNavigationButtons();
    }
    

    selectAnswer(answerIndex) {
        this.userAnswers[this.currentQuestionIndex] = answerIndex;
        this.displayQuestion();
    }

    navigateQuestion(step) {//
        this.currentQuestionIndex += step;

        // reset index lzero lw 2a2al
        if (this.currentQuestionIndex < 0) {
            this.currentQuestionIndex = 0;
        //birga3 la5er valid question
        } else if (this.currentQuestionIndex >= this.questions.length) {
            this.currentQuestionIndex = this.questions.length - 1;
        }

        this.displayQuestion();
    }

    toggleFlag() {
        //bisheel elquestion mn elset lw already f flaggedQuestions
        if (this.flaggedQuestions.has(this.currentQuestionIndex)) {
            this.flaggedQuestions.delete(this.currentQuestionIndex);
        }
        //bi7ot elquestion f elflaggedQuestions set
        else {
            this.flaggedQuestions.add(this.currentQuestionIndex);
        }
        this.updateFlaggedQuestionsDisplay();
        this.updateFlagButton();
    }

    updateFlagButton() {//bookmark button change
        const flagButton = document.getElementById('bookmarkBtn');
        const icon = flagButton.querySelector('i'); // icon el fe bookmarkBtn
    
        if (this.flaggedQuestions.has(this.currentQuestionIndex)) {
            //lw mn elflagged questions 5aleeh solid
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            //lw msh flagged 5aleeh regular
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    }

    updateFlaggedQuestionsDisplay() {
        const flaggedContainer = document.getElementById('flaggedQuestions');
        flaggedContainer.innerHTML = '';

        this.flaggedQuestions.forEach((questionIndex) => {
            const flaggedElement = document.createElement('p');
            flaggedElement.textContent = questionIndex + 1;
            flaggedElement.addEventListener('click', () => {
                this.currentQuestionIndex = questionIndex;
                this.displayQuestion();
            });
            flaggedContainer.appendChild(flaggedElement);
        });
    }

    updateNavigationButtons() {
        const backButton = document.querySelector('#backBtn');
        const nextButton = document.querySelector('#nextBtn');

        backButton.disabled = this.currentQuestionIndex === 0;

        if(this.currentQuestionIndex === this.questions.length - 1){
            nextButton.textContent="Finish";
        }else{
            nextButton.textContent="Next"
        }
    }

    calculateScore() {
        let score = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] !== undefined &&
                question.choices[this.userAnswers[index]] === question.answer) {
                score++;
            }
        });
        localStorage.setItem("Score", score);
        return score;
    }

    endQuiz() {
        const score = this.calculateScore();
        console.log('Final score:', score);
        window.location.href = "../Results/Results.html";
    }

    timeEnded(){
        window.location.href = "../Time/time.html";
    }

    setupEventListeners() {
        document.querySelector('#backBtn').addEventListener('click', () => this.navigateQuestion(-1));
        document.querySelector('#nextBtn').addEventListener('click', () => {
            if (this.currentQuestionIndex === this.questions.length - 1) {
                this.endQuiz();
            } else {
                this.navigateQuestion(1);
            }
        });
        document.querySelector('#bookmarkBtn').addEventListener('click', () => this.toggleFlag());
    }
}

const Exam = new Quizzify(3, 'Questions.json');