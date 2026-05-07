document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DİNAMİK KARŞILAMA MESAJI ---
    const greetingBanner = document.getElementById('greetingBanner');
    const userGreeting = document.getElementById('userGreeting');
    const userGreetingIcon = document.getElementById('userGreetingIcon');
    
    if (greetingBanner && userGreeting && userGreetingIcon) {
        const hour = new Date().getHours();
        let message = "";
        let iconClass = "";

        if (hour >= 5 && hour < 12) {
            message = "Günaydın! İzmir'de sabahın keyfini çıkarın.";
            iconClass = "fa-sun";
        } else if (hour >= 12 && hour < 18) {
            message = "İyi Günler! İzmir'in güneşli sokaklarını keşfedin.";
            iconClass = "fa-cloud-sun";
        } else {
            message = "İyi Akşamlar! Kordon'da gün batımı bir başkadır.";
            iconClass = "fa-moon";
        }

        userGreeting.textContent = message;
        userGreetingIcon.className = `fa-solid ${iconClass}`;
        
        greetingBanner.style.display = 'block';
        
        // 5 saniye sonra modern animasyonla gizle
        setTimeout(() => {
            greetingBanner.classList.add('fade-out');
            setTimeout(() => {
                greetingBanner.style.display = 'none';
            }, 1000);
        }, 5000);
    }

    // --- 2. GECE/GÜNDÜZ MODU ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                if (body.classList.contains('dark-mode')) {
                    icon.className = 'fa-solid fa-sun';
                } else {
                    icon.className = 'fa-solid fa-moon';
                }
            }
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-sun';
        }
    }

    // --- 3. FORM VALİDASYONU ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('nameInput');
            const emailInput = document.getElementById('emailInput');
            const messageInput = document.getElementById('messageInput');
            
            let isValid = true;

            if (nameInput.value.trim() === "") {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            if (messageInput.value.trim() === "") {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
                messageInput.classList.add('is-valid');
            }

            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i> Mesajınız İletildi!';
                    submitBtn.classList.replace('btn-custom', 'btn-success');
                    submitBtn.setAttribute('disabled', 'true');
                    
                    setTimeout(() => {
                        contactForm.reset();
                        nameInput.classList.remove('is-valid');
                        emailInput.classList.remove('is-valid');
                        messageInput.classList.remove('is-valid');
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.replace('btn-success', 'btn-custom');
                        submitBtn.removeAttribute('disabled');
                    }, 3000);
                }
            }
        });
    }
});
