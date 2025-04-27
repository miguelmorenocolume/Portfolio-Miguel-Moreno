(function () {

    /** Lógica del efecto Parallax **/
    // Selecciona el elemento de fondo solo una vez
    const background = document.getElementById("background");

    // Evento que activa el efecto parallax cuando el ratón se mueve
    document.addEventListener("mousemove", function (event) {
        // Obtiene las dimensiones de la ventana
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        // Obtiene las coordenadas X y Y del ratón
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        // Calcula la cantidad de movimiento del fondo según la posición del ratón
        let moveAmountX = (mouseX - windowWidth / 2) * 0.01; // Movimiento horizontal
        let moveAmountY = (mouseY - windowHeight / 2) * 0.01; // Movimiento vertical

        // Utiliza requestAnimationFrame para que la animación sea más fluida (sin parpadeos)
        requestAnimationFrame(() => {
            // Aplica el movimiento al fondo con la propiedad CSS transform
            background.style.transform = `translate(${moveAmountX}px, ${moveAmountY}px)`;
        });
    });

    /** Lógica para cambiar el subtítulo en la página de inicio (landing page) **/
    document.addEventListener('DOMContentLoaded', () => {
        const body = document.querySelector('body');
        const dataBtn = document.getElementById('data');
        const fullstackBtn = document.getElementById('fullstack');
        const softwareBtn = document.getElementById('software');
        const subtitle = document.querySelector('.main-page__container-subtitle');
        const allButtons = [dataBtn, fullstackBtn, softwareBtn];

        // Función para cambiar la clase activa entre los botones
        const setActive = (button) => {
            // Elimina la clase 'active' de todos los botones
            allButtons.forEach(btn => btn.classList.remove('active'));
            // Añade la clase 'active' al botón clickeado
            button.classList.add('active');
        };

        // Lógica para manejar el clic en el botón "Data Engineer"
        dataBtn.addEventListener('click', () => {
            // Cambia las clases del body para aplicar el estilo correspondiente
            body.classList.remove('body--fullstack');
            body.classList.add('body--data');
            // Cambia el subtítulo
            subtitle.textContent = 'Data Engineer';
            setActive(dataBtn); // Marca el botón "Data Engineer" como activo
        });

        // Lógica para manejar el clic en el botón "Fullstack Developer"
        fullstackBtn.addEventListener('click', () => {
            body.classList.remove('body--data');
            body.classList.add('body--fullstack');
            subtitle.textContent = 'Fullstack Developer';
            setActive(fullstackBtn); // Marca el botón "Fullstack Developer" como activo
        });

        // Lógica para manejar el clic en el botón "Software Developer"
        softwareBtn.addEventListener('click', () => {
            body.classList.remove('body--data', 'body--fullstack');
            subtitle.textContent = 'Software Developer';
            setActive(softwareBtn); // Marca el botón "Software Developer" como activo
        });
    });

    /** Lógica del menú móvil **/
    document.addEventListener("DOMContentLoaded", () => {
        // Selecciona los elementos que controlarán la apertura y cierre del menú
        const menuIcon = document.querySelector(".header__icon");
        const mobileMenu = document.getElementById("mobileMenu");
        const closeButton = document.getElementById("closeMenu");
        const header = document.querySelector(".header");
        const generalContainer = document.querySelector(".general-page__container");

        // Abre el menú móvil al hacer clic en el icono del menú
        menuIcon?.addEventListener("click", () => {
            mobileMenu.classList.add("open"); // Muestra el menú
            header.classList.add("hiden"); // Oculta el header

            // Obtiene el ancho real del menú y del viewport
            const menuWidth = window.getComputedStyle(mobileMenu).width;
            const viewportWidth = window.innerWidth + 'px';

            // Si el menú ocupa toda la pantalla, oculta el fondo
            if (menuWidth === viewportWidth && generalContainer) {
                generalContainer.style.opacity = "0"; // Hace el fondo transparente
                generalContainer.style.visibility = "hidden"; // Oculta el fondo visualmente
                generalContainer.style.pointerEvents = "none"; // Desactiva la interacción con el fondo
            }
        });

        // Cierra el menú móvil al hacer clic en el botón de cerrar
        closeButton?.addEventListener("click", () => {
            mobileMenu.classList.remove("open"); // Oculta el menú
            header.classList.remove("hiden"); // Muestra el header

            // Restaura la visibilidad e interactividad del fondo
            if (generalContainer) {
                generalContainer.style.opacity = "1"; // Restaura la visibilidad
                generalContainer.style.visibility = "visible";
                generalContainer.style.pointerEvents = "auto"; // Restaura la interacción con el fondo
            }
        });
    });

    /** Lógica para abrir el modal al hacer clic en un proyecto **/
    document.querySelectorAll('.project-card').forEach((card, index) => {
        // Lista de IDs de los modales (si si quiere añadir más, se debe añadir aquí el ID del modal correspondiente)
        const modals = ['modal-light', 'modal-data', 'modal-django'];
        card.addEventListener('click', () => {
            const modalId = modals[index]; // Obtiene el ID del modal correspondiente
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex'; // Muestra el modal
                document.body.classList.add('body-no-scroll'); // Bloquea el scroll del body para evitar que el contenido se mueva
            }
        });
    });

    /** Función para cerrar el modal y pausar video (si existe) **/
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none'; // Oculta el modal

            // Pausa el video si el modal contiene un iframe
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                const src = iframe.src;
                iframe.src = ''; // Detiene el video al quitar el src
                iframe.src = src; // Reinicia el iframe para detener el video
            }

            document.body.classList.remove('body-no-scroll'); // Restaura el scroll del body
        }
    }

    // Cierra el modal al hacer clic en el botón de cierre
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const targetId = closeBtn.getAttribute('data-target');
            const modal = document.getElementById(targetId);
            closeModal(modal); // Llama a la función para cerrar el modal
        });
    });

    // Cierra el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target); // Llama a la función para cerrar el modal
        }
    });

    /** Lógica del carrusel de imágenes en el CV **/
    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.getElementById('cvCarousel');
        const images = carousel.querySelectorAll('.cv-carousel__img');
        const dotsContainer = document.getElementById('cvCarouselDots');
        const dots = dotsContainer.querySelectorAll('.dot');

        let current = 0; // Índice de la imagen actual del carrusel

        // Función para mostrar la diapositiva correspondiente
        function showSlide(index) {
            // Quita la clase 'active' de la imagen y el punto actual
            images[current].classList.remove('active');
            dots[current].classList.remove('active');
            // Actualiza el índice actual
            current = index;
            // Añade la clase 'active' a la nueva imagen y al nuevo punto
            images[current].classList.add('active');
            dots[current].classList.add('active');
        }

        // Cambia la diapositiva al hacer clic en el carrusel
        carousel.addEventListener('click', () => {
            const nextIndex = (current + 1) % images.length; // Calcula el siguiente índice del carrusel
            showSlide(nextIndex); // Muestra la siguiente diapositiva
        });

        // Cambia la diapositiva al hacer clic en un punto
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index); // Muestra la diapositiva correspondiente al hacer clic en un punto
            });
        });
    });

})();
