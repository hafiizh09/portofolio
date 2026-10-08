// Navbar effect on scroll
const navbar = document.querySelector('.navbar');


// Scroll Progress Bar
const scrollProgress = document.getElementById("scroll-progress");

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }
});

// Typewriter Effect
const textArray = ["Front-End Development", "Back-End API", "Fullstack System"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeWriterElement = document.getElementById("typewriter");

function typeWriter() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
        typeWriterElement.innerText = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.innerText = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeWriter, typeSpeed);
}
typeWriter();

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progressHeight = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progressHeight}%`;
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Burger Animation
    burger.classList.toggle('toggle');
    const lines = burger.querySelectorAll('div');
    if (burger.classList.contains('toggle')) {
        lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        const lines = burger.querySelectorAll('div');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    });
});

// Active link switching on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Add reveal class to elements
document.querySelector('.about-content').classList.add('reveal');
document.querySelectorAll('.service-card').forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${index * 0.1}s`;
});
const chatContainer = document.querySelector('.chat-container');
if (chatContainer) chatContainer.classList.add('reveal');
document.querySelector('.contact-container').classList.add('reveal');

// AI Chatbot Logic
const chatWindow = document.getElementById('chat-window');

const responses = {
    1: "Tentu! Berikut adalah kode dasar Python:<br><br><code>print('Hello World!')</code><br><br>Sangat simpel dan elegan!",
    2: "API (Application Programming Interface) ibarat pelayan di restoran. Anda (klien) memesan makanan via pelayan (API), pelayan memberitahu dapur (Server), lalu membawa makanan (Data) kembali ke Anda.",
    3: "Ide menarik: Buatlah aplikasi Web pendeteksi penyakit daun tanaman menggunakan kamera HP dengan integrasi TensorFlow.js. Sangat berguna untuk petani!"
};

window.sendPrompt = function (text, id) {
    if (!chatWindow) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerHTML = `<div class="msg-bubble">${text}</div><img src="https://ui-avatars.com/api/?name=You&background=1e293b&color=fff" alt="User">`;
    chatWindow.appendChild(userMsg);

    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Disable buttons temporarily
    const btns = document.querySelectorAll('.prompt-btn');
    btns.forEach(b => b.style.pointerEvents = 'none');

    // Simulate typing
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot';
        botMsg.innerHTML = `<img src="https://ui-avatars.com/api/?name=AI&background=38bdf8&color=fff" alt="AI"><div class="msg-bubble">${responses[id]}</div>`;
        chatWindow.appendChild(botMsg);

        chatWindow.scrollTop = chatWindow.scrollHeight;
        btns.forEach(b => b.style.pointerEvents = 'auto');
    }, 1000);
}

function sendUserPrompt() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    // Use a default response id (e.g., 1) for free-form queries
    sendPrompt(text, 1);
}

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function reveal() {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal(); // Trigger on load

// FAQ Accordion functionality
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        const isOpen = answer.classList.contains('open');
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(a => {
            a.classList.remove('open');
            a.style.maxHeight = null;
        });
        document.querySelectorAll('.faq-question').forEach(btn => btn.classList.remove('active'));
        if (!isOpen) {
            q.classList.add('active');
            answer.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ============================================================
// KIRIM OTOMATIS KE WA MENGGUNAKAN FONNTE API
// Daftarkan device di: https://fonnte.com
// Ganti FONNTE_TOKEN di bawah dengan token dari dashboard Fonnte
// ============================================================
const FONNTE_TOKEN = 'ZLUHFhAYRcQzcwPsQtEv'; // <-- isi token dari fonnte.com
const WA_PENERIMA = '6285696090552'; // Nomor WA tujuan (tanpa + dan tanpa 0 di awal)

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nama = document.getElementById('contact-nama').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const pesan = document.getElementById('contact-pesan').value.trim();

    // Validasi
    if (!nama || !email || !pesan) {
        showFormError('Harap isi semua kolom terlebih dahulu!');
        return;
    }

    // Format pesan yang akan dikirim otomatis ke WA
    const pesanWA =
        `📩 *Pesan Baru dari Portofolio*\n\n` +
        `👤 *Nama :* ${nama}\n` +
        `📧 *Email :* ${email}\n\n` +
        `💬 *Pesan :*\n${pesan}\n\n` +
        `—\nDikirim otomatis via portofolio 🚀`;

    // Animasi tombol loading
    const btn = document.getElementById('btn-kirim');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Mengirim...</span>';

    try {
        const response = await fetch('https://api.fonnte.com/send', {
            method: 'POST',
            headers: {
                'Authorization': FONNTE_TOKEN
            },
            body: new URLSearchParams({
                target: WA_PENERIMA,
                message: pesanWA,
                countryCode: '62'
            })
        });

        const result = await response.json();

        if (result.status === true) {
            // ✅ Berhasil terkirim otomatis
            showToastSukses();
            this.reset();
        } else {
            // Token belum diisi / error dari Fonnte
            showFormError('Gagal mengirim. Pastikan token Fonnte sudah benar.');
            console.error('Fonnte error:', result);
        }
    } catch (err) {
        showFormError('Koneksi gagal. Periksa koneksi internet Anda.');
        console.error('Fetch error:', err);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fab fa-whatsapp"></i> <span>Kirim via WhatsApp</span>';
        btn.style.background = '';
    }
});

function showToastSukses() {
    const toast = document.getElementById('success-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function showFormError(msg) {
    const err = document.getElementById('form-error');
    const errMsg = document.getElementById('form-error-msg');
    if (err && errMsg) {
        errMsg.textContent = msg;
        err.classList.add('show');
        setTimeout(() => err.classList.remove('show'), 4000);
    }
}

