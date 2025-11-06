<!-- ==========================
     JAVASCRIPT PARA ELEMENTOR
     Cole no widget HTML ou antes do </body>
     ========================== -->

<!-- Carregar bibliotecas necessárias -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar os cards
    const cards = document.querySelectorAll('.card-brilhante');
    
    cards.forEach(card => {
        // Criar elementos necessários se não existirem
        if (!card.querySelector('.brilho-effect')) {
            const brilho = document.createElement('div');
            brilho.className = 'brilho-effect';
            card.insertBefore(brilho, card.firstChild);
        }
        
        if (!card.querySelector('.card-glow')) {
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            card.insertBefore(glow, card.firstChild);
        }
        
        if (!card.querySelector('.particles')) {
            const particles = document.createElement('div');
            particles.className = 'particles';
            card.insertBefore(particles, card.firstChild);
        }
        
        const brilho = card.querySelector('.brilho-effect');
        const particles = card.querySelector('.particles');
        
        // Efeito de brilho líquido com deformação (compatível sem GSAP)
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Usar GSAP se disponível, senão usar CSS direto
            if (typeof gsap !== 'undefined') {
                gsap.to(brilho, {
                    duration: 0.6,
                    x: x - 150,
                    y: y - 150,
                    ease: "power2.out"
                });
            } else {
                brilho.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
            }
            
            // Criar partículas ocasionalmente
            if (Math.random() > 0.85) {
                createParticle(particles, x, y);
            }
        });

        card.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(brilho, {
                    scale: 1.2,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                });
            } else {
                brilho.style.transform += ' scale(1.2)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(brilho, {
                    opacity: 0,
                    scale: 1,
                    duration: 0.3
                });
            } else {
                brilho.style.opacity = '0';
                brilho.style.transform = 'scale(1)';
            }
        });
    });

    // Função para criar partículas animadas
    function createParticle(container, x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        container.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        if (typeof gsap !== 'undefined') {
            gsap.to(particle, {
                x: endX - x,
                y: endY - y,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(particle, {
                opacity: 0,
                duration: 0.5,
                delay: 0.3,
                onComplete: () => particle.remove()
            });
        } else {
            // Animação CSS alternativa
            particle.style.transition = 'all 0.8s ease-out';
            particle.style.opacity = '1';
            setTimeout(() => {
                particle.style.transform = `translate(${endX - x}px, ${endY - y}px)`;
                particle.style.opacity = '0';
            }, 10);
            setTimeout(() => particle.remove(), 800);
        }
    }

    // Inicializar Vanilla Tilt (efeito 3D)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.card-brilhante'), {
            max: 8,
            speed: 400,
            scale: 1.05,
            glare: false
        });
    }

    // Animação de entrada dos cards
    if (typeof gsap !== 'undefined') {
        gsap.from('.card-brilhante', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
});
</script>
