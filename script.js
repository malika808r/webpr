
document.addEventListener('DOMContentLoaded', () => {
    
    const animatedHeadings = document.querySelectorAll('.hero-heading');
    if ('IntersectionObserver' in window && animatedHeadings.length) {
        const animateHeading = (entry) => {
            entry.target.classList.add('animate__animated', 'animate__bounce');
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateHeading(entry);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        animatedHeadings.forEach(h => {
            h.classList.remove('animate__animated', 'animate__bounce');
            observer.observe(h);
        });
    }

    
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeBtn) {
        themeBtn.textContent = savedTheme === 'dark' ? 'Light mode' : 'Dark mode';
    }

    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeBtn.textContent = newTheme === 'dark' ? 'Light mode' : 'Dark mode';
        });
    }


    
    const greetingElement = document.getElementById('greeting');
    const askNameBtn = document.getElementById('askName');

    function showGreeting(name) {
        if (!greetingElement) return; 
        
        greetingElement.textContent = '';
        if (window.greetingTypewriterTimeouts) {
            window.greetingTypewriterTimeouts.forEach(clearTimeout);
        }
        window.greetingTypewriterTimeouts = [];

        
        const text = name ? `Hello, ${name}!` : 'Welcome!';
        
        function typeWriter(str, i) {
            if (i <= str.length) {
                greetingElement.textContent = str.slice(0, i);
                const timeout = setTimeout(() => typeWriter(str, i + 1), 60);
                window.greetingTypewriterTimeouts.push(timeout);
            }
        }
        typeWriter(text, 0);
    }

    
    showGreeting(localStorage.getItem('visitorName'));

    
    if (askNameBtn) {
        askNameBtn.addEventListener('click', () => {
            const name = prompt('What is your name?');
            if (name) {
                localStorage.setItem('visitorName', name);
            } else {
                localStorage.removeItem('visitorName');
            }
            showGreeting(localStorage.getItem('visitorName'));
        });
    }


    // --- 3. Burger Menu (Бургер-меню) ---
const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

if (burger && menu) {
  // Клик по бургеру — открыть/закрыть меню
  burger.addEventListener('click', () => {
    menu.classList.toggle('open');
    burger.classList.toggle('active');

    const isExpanded = menu.classList.contains('open');
    burger.setAttribute('aria-expanded', String(isExpanded));
  });

  // Закрыть меню при клике на ссылку
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

   

    // --- 4. Scroll to Top Button (Кнопка "Наверх") ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        const SHOW_AFTER = 300; 

        window.addEventListener('scroll', () => {
            if (window.scrollY > SHOW_AFTER) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    
    
    
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // --- 5. Custom Cursor (только для устройств с мышью) ---
    if (window.matchMedia && window.matchMedia('(pointer: fine) and (hover: hover)').matches) {
        const cursor = document.getElementById('customCursor');
        if (cursor) {
            let mouseX = 0, mouseY = 0;
            let rafId;

            const update = () => {
                
                cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
                rafId = requestAnimationFrame(update);
            };

            document.addEventListener('mousemove', (e) => {
                
                mouseX = e.clientX;
                mouseY = e.clientY;
                if (!rafId) update();
            });

            
            const interactive = 'a, button, .btn, input, textarea, label';
            document.querySelectorAll(interactive).forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('cursor-large'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-large'));
                el.addEventListener('mousedown', () => cursor.classList.add('cursor-action'));
                el.addEventListener('mouseup', () => cursor.classList.remove('cursor-action'));
            });

            document.addEventListener('mouseenter', () => cursor.classList.remove('cursor-hidden'));
            document.addEventListener('mouseleave', () => cursor.classList.add('cursor-hidden'));
        }
    }
});



document.addEventListener('DOMContentLoaded', function () {
  
 
  const form = document.querySelector('.contact-form');

  
  form.addEventListener('submit', function (event) {
    
    
    event.preventDefault();

    
    const formData = new FormData(form);
    
    
    const data = {
        name: form.querySelector('input[name="name"]').value,
        email: form.querySelector('input[name="email"]').value,
        message: form.querySelector('textarea[name="message"]').value
    };

    
    if (!data.name || !data.email || !data.message) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return; 
    }

    
    fetch('https://formspree.io/f/xnngwrwq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {

      if (response.ok) {
        return response.json();
      }
     
      throw new Error('Ошибка сети или сервера.');
    })
    .then(result => {
      
      alert('Спасибо! Ваше сообщение отправлено.');
      form.reset(); 
    })
    .catch(error => {
    
      console.error('Ошибка при отправке:', error);
      alert('К сожалению, произошла ошибка. Пожалуйста, попробуйте снова.');
    });

  });
});