document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DİNAMİK KARŞILAMA MESAJI ---
    const greetingBanner = document.getElementById('greetingBanner');
    const userGreeting = document.getElementById('userGreeting');
    
    if (greetingBanner && userGreeting) {
        const hour = new Date().getHours();
        let message = "";
        let icon = "";

        if (hour >= 5 && hour < 12) {
            message = "Günaydın! İzmir'de sabahın keyfini çıkarın.";
            icon = "fa-sun";
        } else if (hour >= 12 && hour < 18) {
            message = "İyi Günler! İzmir'in güneşli sokaklarını keşfedin.";
            icon = "fa-cloud-sun";
        } else {
            message = "İyi Akşamlar! Kordon'da gün batımı bir başkadır.";
            icon = "fa-moon";
        }

        userGreeting.innerHTML = `<i class="fa-solid ${icon} me-2 text-warning"></i> ${message}`;
        
        // Banner'ı göster ve 5 saniye sonra gizle (hoş bir giriş efekti)
        greetingBanner.style.display = 'block';
        setTimeout(() => {
            greetingBanner.classList.add('fade');
            setTimeout(() => greetingBanner.style.display = 'none', 1000);
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
                    darkModeToggle.classList.replace('btn-outline-primary', 'btn-outline-warning');
                } else {
                    icon.className = 'fa-solid fa-moon';
                    darkModeToggle.classList.replace('btn-outline-warning', 'btn-outline-primary');
                }
            }
            
            // Kullanıcı tercihini saklayabiliriz (Bonus)
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        // Sayfa yüklendiğinde tercihi hatırla
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-sun';
            darkModeToggle.classList.replace('btn-outline-primary', 'btn-outline-warning');
        }
    }

    // --- 3. FORM VALİDASYONU ---
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('nameInput') as HTMLInputElement;
            const emailInput = document.getElementById('emailInput') as HTMLInputElement;
            const messageInput = document.getElementById('messageInput') as HTMLTextAreaElement;
            
            let isValid = true;

            // İsim Kontrolü
            if (nameInput.value.trim() === "") {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
                nameInput.classList.add('is-valid');
            }

            // E-posta Kontrolü (Basit Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            // Mesaj Kontrolü
            if (messageInput.value.trim() === "") {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
                messageInput.classList.add('is-valid');
            }

            if (isValid) {
                // Başarılı gönderim mesajı (Simülasyon)
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
