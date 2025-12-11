// Navigasi antar section
function showSection(id) {
    // sembunyikan semua section
    document.querySelectorAll('section').forEach(s => {
        s.style.display = 'none';
    });
    // tampilkan yang dipilih
    const el = document.getElementById(id);
    if (el) {
        el.style.display = 'block';
        window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
        // update active state on navigation links
        document.querySelectorAll('nav .nav-link').forEach(a => {
            const target = a.getAttribute('data-target');
            if (target === id) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }
}

// Toggle detail untuk content-box
function toggleDetail(btn) {
    const container = btn.closest('.content-box');
    if (!container) return;
    const detail = container.querySelector('.detail');
    if (!detail) return;
    if (detail.style.display === 'block') {
        detail.style.display = 'none';
        btn.textContent = 'Lihat detail';
    } else {
        detail.style.display = 'block';
        btn.textContent = 'Sembunyikan detail';
    }
}

// Inject detail otomatis ke setiap content-box (jika belum ada)
function injectDetails() {
    const map = {
        'Apa itu Hutan?': 'Hutan merupakan area yang didominasi pohon dan vegetasi lain yang saling berinteraksi dengan fauna dan mikroorganisme. Fungsi hutan mencakup penyimpanan karbon, pengaturan siklus air, habitat keanekaragaman hayati, serta sumber mata pencaharian dan obat-obatan.',
        'Fakta Penting': 'Angka-angka pada halaman ini diambil dari berbagai studi ilmiah dan lembaga konservasi. Hutan menyerap ratusan juta ton CO₂ per tahun dan terus memainkan peran penting dalam moderasi iklim regional.',
        'Mengapa Penting?': 'Hutan mendukung layanan ekosistem yang sangat penting, seperti penyerapan karbon, filtrasi air, pelestarian tanah, serta penyediaan bahan pangan dan obat-obatan tradisional dan modern.',
        'Fungsi Produksi Oksigen': 'Selama fotosintesis, pohon mengambil CO₂ dan melepaskan oksigen. Selain itu, hutan menyimpan karbon dalam biomassa dan tanah, sehingga membantu mitigasi perubahan iklim.',
        'Dampak Deforestasi': 'Pembukaan lahan secara besar-besaran mengurangi kapasitas penyerapan karbon, merusak habitat, dan mempercepat erosi tanah serta perubahan iklim lokal yang merugikan masyarakat setempat.',
        'Siklus Air': 'Melalui transpirasi, vegetasi hutan mengembalikan uap air ke atmosfer yang berkontribusi pada pembentukan awan dan hujan. Hutan juga menyimpan air di lapisan tanah sehingga menjaga aliran sungai tetap stabil.',
        'Manfaat Kesehatan': 'Senayawa aktif yang ditemukan di tanaman hutan menjadi dasar bagi banyak obat modern. Perlindungan hutan membantu menjaga pula sumber penelitian farmasi masa depan.',
        'Keanekaragaman Hayati': 'Hutan tropis menyimpan sebagian besar spesies darat dunia; menjaga habitat ini berarti melindungi jaring makan dan fungsi ekosistem yang saling bergantung.',
        'Energi dari Biomassa': 'Biomassa yang dikelola berkelanjutan dapat menyediakan sumber energi terbarukan, tetapi harus diimbangi dengan praktik pengelolaan agar tidak menguras stok karbon hutan.',
        'Energi Air (Hidro)': 'Hutan di kawasan hulu membantu menjaga debit sungai yang stabil dan mengurangi risiko sedimentasi pada waduk, sehingga mendukung operasi pembangkit listrik tenaga air.',
        'Stabilitas Iklim untuk Energi Terbarukan': 'Perubahan iklim lokal dapat menurunkan efisiensi panel surya dan mengubah pola angin; hutan membantu mempertahankan kondisi mikroklimatik yang lebih stabil.',
        'Bahan Baku Teknologi Hijau': 'Pemanfaatan kayu berkelanjutan dan produk turunan dapat mengurangi jejak karbon konstruksi dan komponen teknologi hijau.',
        'Tantangan di Masa Depan': 'Perubahan iklim, tekanan ekonomi, dan kebutuhan lahan menjadi tantangan utama. Solusi memerlukan integrasi antara konservasi, pemulihan, dan kebijakan yang berpihak pada keberlanjutan.',
        'Materi Genetik Berharga': 'Keanekaragaman genetik di hutan memungkinkan pemuliaan tanaman tahan penyakit dan kekeringan, yang penting untuk ketahanan pangan di masa depan.',
        'Perlindungan Bencana Alam': 'Hutan memantapkan tanah, mengurangi luncuran tanah, dan menyerap limpasan yang memperkecil dampak banjir.',
        'Investasi Ekonomi': 'Nilai ekonomi hutan mencakup jasa ekosistem, produk kayu, dan jasa budaya; investasi dalam pelestarian memiliki manfaat jangka panjang yang jelas.',
        'Ringkasan Poin Penting': 'Ringkasan ini menekankan hal-hal yang paling penting untuk diingat: nilai ekologis, nilai ekonomi, dan langkah nyata untuk bertindak.',
        'Aksi Tingkat Individu': 'Langkah individu sederhana termasuk mengurangi konsumsi kertas, memilih produk berlabel, dan berpartisipasi dalam kegiatan penanaman kembali.',
        'Aksi Tingkat Komunitas': 'Komunitas dapat mengembangkan model ekonomi yang berkelanjutan seperti agroforestry dan ekowisata untuk menggantikan praktik penghancuran hutan.',
        'Aksi Tingkat Kebijakan': 'Kebijakan efektif mencakup penegakan hukum, insentif ekonomi untuk pelestarian, dan pembiayaan hijau untuk proyek restorasi.',
        'Aksi Global & Teknologi': 'Kerja sama internasional dan teknologi modern membuka peluang untuk pemantauan yang lebih baik dan pendanaan yang transparan.'
    };

    document.querySelectorAll('.content-box').forEach(box => {
        if (box.querySelector('.detail')) return; // sudah ada
        const titleEl = box.querySelector('h3');
        const title = titleEl ? titleEl.textContent.trim() : '';
        const detailText = map[title] || 'Informasi tambahan: pelajari sumber-sumber referensi terkait dan gabungkan langkah praktis untuk pelestarian hutan.';
        const btn = document.createElement('button');
        btn.className = 'detail-btn';
        btn.textContent = 'Lihat detail';
        btn.onclick = function() { toggleDetail(this); };
        const detail = document.createElement('div');
        detail.className = 'detail';
        detail.innerHTML = '<p>' + detailText + '</p>';
        box.appendChild(btn);
        box.appendChild(detail);
    });
}

// Quiz: selectAnswer & resetQuiz
let score = 0;
function selectAnswer(el, qid, choice, correct) {
    const question = document.querySelector('.question[data-question="' + qid + '"]');
    if (!question || question.dataset.answered === 'true') return;
    question.dataset.answered = 'true';
    const answerBox = question.querySelector('.answer');
    if (correct) { score++; }
    document.getElementById('score').textContent = 'Skor: ' + score + '/10';
    // tampilkan jawaban
    if (answerBox) answerBox.style.display = 'block';
}

function resetQuiz() {
    score = 0;
    document.getElementById('score').textContent = 'Skor: 0/10';
    document.querySelectorAll('.question').forEach(q => {
        q.dataset.answered = 'false';
        const ans = q.querySelector('.answer');
        if (ans) ans.style.display = 'none';
    });
}

// Inisialisasi tampilan dan inject details saat halaman siap
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan landing saat pertama kali
    showSection('landing');
    injectDetails();

    // Observe semua content box untuk animasi saat masuk viewport
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    document.querySelectorAll('.content-box').forEach(el => {
        observer.observe(el);
    });
    
    // Attach nav link handlers (no inline onclicks)
    document.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (target) showSection(target);
        });
    });

    // CTA buttons with data-target
    document.querySelectorAll('.btn-cta[data-target], .btn-secondary[data-target]').forEach(b => {
        b.addEventListener('click', function() {
            const t = this.getAttribute('data-target');
            if (t) showSection(t);
        });
    });

    // Tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const tabName = this.getAttribute('data-target');
            if (!tabName) return;
            // emulate openTab behavior
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(tb => tb.classList.remove('active'));
            const content = document.getElementById(tabName);
            if (content) content.classList.add('active');
            this.classList.add('active');
        });
    });

    // Quiz option clicks (data attributes)
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', function() {
            const q = this.getAttribute('data-q');
            const choice = this.getAttribute('data-choice');
            const correct = this.getAttribute('data-correct') === 'true';
            selectAnswer(this, q, choice, correct);
        });
    });

    // Reset quiz button
    const resetBtn = document.getElementById('reset-quiz');
    if (resetBtn) resetBtn.addEventListener('click', resetQuiz);
});

// Fungsi untuk membuka tab
function openTab(evt, tabName) {
    // Sembunyikan semua content tab
    var tabcontent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Hapus class active dari semua button
    var tabbuttons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    // Tampilkan tab yang dipilih dan tandai buttonnya
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}
var quizScore = 0;
var answeredQuestions = 0;

// Cursor tracking functionality
document.addEventListener('mousemove', function(e) {
    const cursorBg = document.querySelector('.cursor-bg');
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    cursorBg.style.setProperty('--mouse-x', x + '%');
    cursorBg.style.setProperty('--mouse-y', y + '%');
    

    // Change body background based on cursor position
    const hue = 120 + (x - 50) * 0.3; // Green hue with slight variation
    const saturation = 60 + (y - 50) * 0.2; // More saturated at bottom
    const lightness = 85 - (y - 50) * 0.2; // More green at bottom, whiter at top
    
    document.body.style.background = `linear-gradient(135deg, 
        hsl(${hue}, ${saturation}%, ${lightness}%), 
        hsl(${hue + 15}, ${saturation + 10}%, ${lightness - 5}%), 
        hsl(${hue + 5}, ${saturation + 20}%, ${lightness - 10}%))`;
});

function selectAnswer(element, questionNum, answer, isCorrect) {
    // Prevent re-answering the same question
    var questionElement = element.closest('.question');
    if (questionElement.classList.contains('answered')) {
        return;
    }

    // Mark question as answered
    questionElement.classList.add('answered');
    answeredQuestions++;

    // Remove previous selections in this question
    var options = questionElement.querySelectorAll('.options li');
    options.forEach(function(option) {
        option.style.pointerEvents = 'none';
    });

    // Add selected class to clicked option
    element.classList.add('selected');

    // Show correct/incorrect feedback
    if (isCorrect) {
        element.classList.add('correct');
        quizScore++;
        // Show explanation
        document.getElementById('answer' + questionNum).style.display = 'block';
    } else {
        element.classList.add('incorrect');
        // Show the correct answer
        var correctOption = questionElement.querySelector('.options li:nth-child(' + 
            (answer === 'a' ? '1' : answer === 'b' ? '2' : '3') + ')');
        if (correctOption) {
            correctOption.classList.add('correct');
        }
        // Show explanation
        document.getElementById('answer' + questionNum).style.display = 'block';
    }

    // Update score
    updateScore();

    // Show final result when all questions are answered
    if (answeredQuestions === 10) {
        setTimeout(function() {
            showFinalResult();
        }, 1000);
    }
}

function updateScore() {
    document.getElementById('score').textContent = 'Skor: ' + quizScore + '/10';
    
    // Add color coding based on score
    var scoreElement = document.getElementById('score');
    var percentage = (quizScore / 10) * 100;
    
    if (percentage >= 80) {
        scoreElement.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
    } else if (percentage >= 60) {
        scoreElement.style.background = 'linear-gradient(135deg, #FF9800, #F57C00)';
    } else {
        scoreElement.style.background = 'linear-gradient(135deg, #F44336, #D32F2F)';
    }
}

function showFinalResult() {
    var percentage = (quizScore / 10) * 100;
    var message = '';
    var emoji = '';

    if (percentage >= 90) {
        message = 'Luar biasa! Anda sangat memahami tentang kelestarian hutan!';
        emoji = '🏆';
    } else if (percentage >= 80) {
        message = 'Bagus! Anda memiliki pemahaman yang baik tentang hutan!';
        emoji = '🌟';
    } else if (percentage >= 70) {
        message = 'Cukup baik! Terus belajar tentang kelestarian hutan!';
        emoji = '👍';
    } else if (percentage >= 60) {
        message = 'Perlu lebih banyak pembelajaran tentang kelestarian hutan!';
        emoji = '📚';
    } else {
        message = 'Jangan menyerah! Pelajari lebih banyak tentang hutan!';
        emoji = '💪';
    }

    alert(emoji + ' ' + message + '\n\nSkor Anda: ' + quizScore + '/10 (' + percentage + '%)');
}

function resetQuiz() {
    // Reset variables
    quizScore = 0;
    answeredQuestions = 0;

    // Reset all questions
    var questions = document.querySelectorAll('.question');
    questions.forEach(function(question) {
        question.classList.remove('answered');
        var options = question.querySelectorAll('.options li');
        options.forEach(function(option) {
            option.className = '';
            option.style.pointerEvents = 'auto';
        });

        var answer = question.querySelector('.answer');
        if (answer) {
            answer.style.display = 'none';
        }
    });

    // Reset score
    updateScore();
}

function showSection(sectionId) {
    // Hide all sections
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to the clicked nav link
    var clickedLink = document.querySelector('nav a[onclick*="' + sectionId + '"]');
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

// Show the first section by default
document.addEventListener('DOMContentLoaded', function() {
    showSection('pengantar');
    updateScore();
});
