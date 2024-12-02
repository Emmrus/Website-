let currentQuestion = 0;
let score = 0;
let lives = 3; // Number of hearts

// List of questions (Pancasila, SDG 4, International Cooperation, etc.)
const questions = [
    // Pancasila-related questions
    {
        type: "multiple-choice",
        question: "Apa sila pertama dalam Pancasila?",
        options: ["Kemanusiaan yang Adil dan Beradab", "Ketuhanan yang Maha Esa", "Persatuan Indonesia", "Keadilan Sosial bagi Seluruh Rakyat Indonesia"],
        answer: 1 // Index of correct answer
    },
    {
        type: "multiple-choice",
        question: "Apa arti dari sila kedua Pancasila, 'Kemanusiaan yang Adil dan Beradab'?",
        options: ["Menghargai hak asasi manusia", "Menjaga keadilan dalam bernegara", "Menghargai kebebasan beragama", "Menjaga kesejahteraan sosial"],
        answer: 0 // Index of correct answer
    },
    {
        type: "multiple-choice",
        question: "Apa nilai yang terkandung dalam sila ketiga Pancasila, 'Persatuan Indonesia'?",
        options: ["Menjaga kesatuan bangsa", "Menghargai keberagaman", "Mengutamakan kerjasama internasional", "Mempertahankan kemerdekaan"],
        answer: 0 // Index of correct answer
    },

    // SDG 4 (Pendidikan) related questions
    {
        type: "multiple-choice",
        question: "Apa tujuan utama SDG 4?",
        options: ["Pendidikan Berkualitas untuk Semua", "Pengentasan Kemiskinan", "Perbaikan Infrastruktur", "Pemenuhan Energi Terjangkau"],
        answer: 0
    },
    {
        type: "multiple-choice",
        question: "SDG 4 bertujuan untuk memastikan bahwa setiap anak mendapatkan _______.",
        options: ["Akses pendidikan tinggi", "Pendidikan yang berkualitas", "Pendidikan luar negeri", "Pendidikan dasar gratis"],
        answer: 1
    },

    // International Cooperation-related questions
    {
        type: "multiple-choice",
        question: "Apa tujuan utama kerjasama internasional?",
        options: ["Menjaga perdamaian dunia", "Mengatasi kemiskinan global", "Meningkatkan ketahanan pangan", "Semua jawaban benar"],
        answer: 3
    },
    {
        type: "multiple-choice",
        question: "Apa yang dimaksud dengan diplomasi internasional?",
        options: ["Hubungan antara negara dengan tujuan menjaga perdamaian dan kerja sama", "Perdagangan internasional", "Pertukaran budaya antar negara", "Semua jawaban benar"],
        answer: 0
    },

    // Fill-in-the-blank questions (SDGs, Pancasila, Indonesia's role)
    {
        type: "fill-in",
        question: "Pancasila sebagai dasar negara Indonesia mencerminkan prinsip _______.",
        correctAnswer: "kebangsaan"
    },
    {
        type: "fill-in",
        question: "Kerjasama internasional bertujuan untuk menciptakan _______ yang berkelanjutan.",
        correctAnswer: "keamanan"
    },
    {
        type: "fill-in",
        question: "Indonesia berperan aktif dalam menjaga _______ global dan kemanusiaan.",
        correctAnswer: "perdamaian"
    },
    {
        type: "fill-in",
        question: "Pendidikan berkualitas di SDG 4 mengutamakan _______ yang setara untuk semua anak.",
        correctAnswer: "kesempatan"
    },
    {
        type: "fill-in",
        question: "SDG 4 bertujuan untuk mengurangi _______ dalam pendidikan di negara berkembang.",
        correctAnswer: "kesenjangan"
    },

    // Matching questions (SDGs, Pancasila, Indonesia's role, International Cooperation)
    {
        type: "matching",
        question: "Cocokkan prinsip Pancasila dengan aplikasinya dalam kehidupan sehari-hari.",
        options: [
            { text: "Ketuhanan yang Maha Esa", answer: "Menghargai kebebasan beragama" },
            { text: "Kemanusiaan yang Adil dan Beradab", answer: "Menjaga hak asasi manusia" },
            { text: "Persatuan Indonesia", answer: "Menyatukan seluruh elemen bangsa" },
            { text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan", answer: "Membuat keputusan secara demokratis" },
            { text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia", answer: "Menyediakan fasilitas pendidikan yang adil" }
        ]
    },
    {
        type: "matching",
        question: "Cocokkan negara dengan program bantuan internasional yang mereka jalankan.",
        options: [
            { text: "Indonesia", answer: "Program bantuan kemanusiaan di Myanmar" },
            { text: "China", answer: "Bantuan dalam pembangunan infrastruktur di Afrika" },
            { text: "Germany", answer: "Pendanaan untuk program pendidikan di negara berkembang" },
            { text: "Brazil", answer: "Pemberian bantuan pangan untuk negara-negara di Amerika Selatan" },
            { text: "Canada", answer: "Proyek pengentasan kemiskinan di Asia Tenggara" }
        ]
    },
    {
        type: "matching",
        question: "Cocokkan negara dengan peran mereka dalam menjaga perdamaian dunia.",
        options: [
            { text: "Indonesia", answer: "Penyelesaian konflik di Timor Leste" },
            { text: "United Nations", answer: "Misi perdamaian internasional" },
            { text: "Norway", answer: "Diplomasi perdamaian di Timur Tengah" },
            { text: "South Korea", answer: "Peran dalam pemulihan pasca-konflik di Asia" },
            { text: "Japan", answer: "Kerjasama dalam pengurangan risiko bencana global" }
        ]
    },
    {
        type: "matching",
        question: "Cocokkan SDG dengan tujuan yang sesuai.",
        options: [
            { text: "SDG 1", answer: "Mengakhiri kemiskinan di seluruh dunia" },
            { text: "SDG 2", answer: "Mengakhiri kelaparan, mencapai ketahanan pangan" },
            { text: "SDG 3", answer: "Menjamin kehidupan yang sehat dan mendukung kesejahteraan untuk semua" },
            { text: "SDG 6", answer: "Menjamin akses air bersih dan sanitasi" },
            { text: "SDG 13", answer: "Mengambil tindakan segera untuk mengatasi perubahan iklim" }
        ]
    }
];

// Shuffle the questions and options for random order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle options for multiple-choice and matching questions
function shuffleMatchingOptions(question) {
    if (question.type === "matching") {
        shuffleArray(question.options);
    }
}

// Shuffle all questions and their options
function shuffleQuestions() {
    shuffleArray(questions);
    questions.forEach((question) => {
        shuffleMatchingOptions(question);
        if (question.type === "multiple-choice") {
            shuffleArray(question.options);
        }
    });
}

// Handle the drag and drop behavior for matching questions
let matchingAnswers = [];

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, option) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const targetElement = event.target;
    
    // Check if the drop target is a matching element
    if (targetElement.classList.contains("drop-zone") && targetElement.children.length === 0) {
        targetElement.appendChild(draggedElement);
        matchingAnswers.push({ option, answer: draggedElement.dataset.answer });
    }
}

// Update the heart icons based on remaining lives
function updateHearts() {
    const heartsContainer = document.getElementById('lives');
    heartsContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        heartsContainer.innerHTML += '❤️';
    }
}

// Load a question based on its type
function loadQuestion() {
    const question = questions[currentQuestion];
    const questionText = document.getElementById('question-text');
    questionText.textContent = question.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    if (question.type === 'multiple-choice') {
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.textContent = option;
            optionDiv.onclick = () => checkAnswer(index);
            optionsContainer.appendChild(optionDiv);
        });
    } else if (question.type === 'fill-in') {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'fill-in-input';
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.onclick = () => checkFillIn(inputField);
        optionsContainer.appendChild(inputField);
        optionsContainer.appendChild(submitButton);
    } else if (question.type === 'matching') {
        const matchContainer = document.createElement('div');
        matchContainer.classList.add('match-container');
        
        // Create the draggable elements
        question.options.forEach((option) => {
            const matchOptionDiv = document.createElement('div');
            matchOptionDiv.classList.add('match-option');
            matchOptionDiv.textContent = option.text;
            matchOptionDiv.id = option.text;
            matchOptionDiv.setAttribute('draggable', true);
            matchOptionDiv.setAttribute('data-answer', option.answer);
            matchOptionDiv.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text', event.target.textContent);
            });
            matchContainer.appendChild(matchOptionDiv);
        });

        // Create the drop zones
        question.options.forEach((option, index) => {
            const dropZoneDiv = document.createElement('div');
            dropZoneDiv.classList.add('drop-zone');
            dropZoneDiv.addEventListener('drop', (event) => drop(event, option.answer));
            dropZoneDiv.addEventListener('dragover', allowDrop);
            matchContainer.appendChild(dropZoneDiv);
        });

        optionsContainer.appendChild(matchContainer);
    }
}

// Check answer for multiple-choice questions
function checkAnswer(index) {
    const question = questions[currentQuestion];
    if (index === question.answer) {
        score++;
    } else {
        lives--;
        updateHearts();
    }
    nextQuestion();
}

// Check answer for fill-in-the-blank questions
function checkFillIn(inputField) {
    const question = questions[currentQuestion];
    if (inputField.value.toLowerCase() === question.correctAnswer.toLowerCase()) {
        score++;
    } else {
        lives--;
        updateHearts();
    }
    nextQuestion();
}

// Move to the next question or end the game
function nextQuestion() {
    if (lives === 0) {
        gameOver();
    } else {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            gameWon();
        }
    }
}

// Handle game over
function gameOver() {
    alert('Game Over! You lost all hearts. The game will restart.');
    currentQuestion = 0;
    score = 0;
    lives = 3;
    updateHearts();
    loadQuestion();
}

// Handle game won
function gameWon() {
    alert('Congratulations! You won the game!');
    currentQuestion = 0;
    score = 0;
    lives = 3;
    updateHearts();
    loadQuestion();
}

// Initialize the game
shuffleQuestions();
loadQuestion();
