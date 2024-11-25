// menu icon on the navigation bar 

let menuIcon = document.getElementById('menu-icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navBar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
}

// ============Sticky Nav=======

let header = document.querySelector('header');
let section = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header .navbar a')
window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offSet = sec.offsetTop - 150
        let height = sec.offsetHeight
        let id = sec.getAttribute('id');


        if (top >= offSet && top < offSet + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*= ' + id + ']').classList.add('active')
            })
        }
    })
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove Navbar when active link (click) 

    navBar.classList.remove('active');
    menuIcon.classList.remove('bx-x');

}
// =================Typing Animation JavaScript==============

var typed = new Typed('.type-animation', {
    strings: ['Tatuador'],
    typeSpeed: 150,
    loop: true,
    backSpeed: 150,
});





const swiper = new Swiper('.slider-wrapper', {
    // Optional parameters
    spaceBetween: 30,
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        700: {
            slidesPerView: 2
        },
        1240: {
            slidesPerView: 3
        },
    }

});

// ================Scroll Reveal JavaScript=============//


ScrollReveal({
    reset: true,
    distance: '100px',
    duration: 2500
});

ScrollReveal().reveal('.home-content, .heading, .service-box', { origin: 'top' });
ScrollReveal().reveal('.slider-wrapper, button, .portfoli-box, form, .text-typing-about', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img, .service-box p, .left-section-details, .footer-text, .social-media ', { origin: 'left' });
ScrollReveal().reveal('.text-about-content, .home-content p, .footer-icon', { origin: 'right' });


// Inicialização do EmailJS
(function () {
    emailjs.init({
        publicKey: "o2m2ctx-ecBtgAwTa",
    });
})();

// Função para obter informações do dispositivo
function getDeviceInfo() {
    const ua = navigator.userAgent;
    const browser = navigator.appName;
    const platform = navigator.platform;
    return `${browser} - ${platform}`;
}

// Função para obter IP (usando serviço externo)
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Erro ao obter IP:', error);
        return 'Não detectado';
    }
}

// Evento de envio do formulário
document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    const formData = new FormData(event.target);

    try {
        const ipAddress = await getIPAddress();
        const deviceInfo = getDeviceInfo();

        const templateParams = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            currentDate: new Date().toLocaleString('pt-BR', {
                dateStyle: 'full',
                timeStyle: 'short'
            }),
            ipAddress: ipAddress,
            deviceInfo: deviceInfo
        };

        const response = await emailjs.send(
            'service_te46h5v',
            'template_s4ibysh',
            templateParams
        );

        console.log(response); // Verifique a resposta

        // Redirecionar para página de obrigado com atraso
        window.location.href = 'obrigado.html';
         // 1 segundo de atraso
    } catch (error) {
        console.error('Erro no envio:', error);
        alert('❌ Falha no envio. Tente novamente.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
});