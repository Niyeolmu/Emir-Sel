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
            iconClass = "fa-mug-hot"; // Sabah kahvesi
        } else if (hour >= 12 && hour < 18) {
            message = "İyi Günler! İzmir'in güneşli sokaklarını keşfedin.";
            iconClass = "fa-compass"; // Gezi/Keşif
        } else {
            message = "İyi Akşamlar! Kordon'da gün batımı bir başkadır.";
            iconClass = "fa-star-and-crescent"; // Akşam/Yıldız
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
                    icon.className = 'fa-solid fa-sun'; // Gündüze dönmek için güneş
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

    // --- 4. MODAL DİNAMİK ZOOM ANİMASYONU ---
    document.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const modal = event.target;
        const dialog = modal.querySelector('.modal-dialog');

        if (button && dialog) {
            const rect = button.getBoundingClientRect();
            // Butonun merkez noktasını hesapla
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Transform origin'i butonun olduğu yere sabitle
            dialog.style.transformOrigin = `${x}px ${y}px`;
        }
    });

    document.addEventListener('hide.bs.modal', (event) => {
        const modal = event.target;
        const dialog = modal.querySelector('.modal-dialog');
        
        // Kapanırken de aynı origin'den küçülmesini sağla
        // Bootstrap zaten animasyonu bitirene kadar 'show' class'ını tutar
        // Origin zaten set edilmiş durumda kalmalı, ancak dilerseniz sıfırlayabilirsiniz
        // Ama genellikle bırakmak kapanış animasyonu için daha iyidir.
    });
});
