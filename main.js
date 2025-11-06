document.addEventListener("DOMContentLoaded", () => {

    // --- 1. LÓGICA DE LA PUERTA (GATE) ---
    const gate = document.getElementById("gate");
    const enterButton = document.getElementById("gate-enter");
    const mainContent = document.getElementById("main-content");

    if (gate && enterButton && mainContent) {
        enterButton.addEventListener("click", () => {
            gate.classList.add("hidden");
            setTimeout(() => {
                mainContent.classList.add("visible");
                // MODIFICADO: Devuelve el scroll a #main-content
                mainContent.style.overflowY = 'scroll'; 
            }, 500); // Sincronizado con la transición de clip-path
        });
    }

    // MODIFICADO: Ya no se necesita el control de overflow del body
    if (!gate.classList.contains("hidden")) {
        // El CSS maneja el overflow de #main-content (hidden por defecto)
        // No es necesario JS aquí.
    }

    // --- 2. LÓGICA DE SCROLL-REVEAL (La que te gusta) ---
    const revealElements = document.querySelectorAll(".reveal-fade");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 3. LÓGICA DEL VEREDICTO V5 (FILTRO POR OPCIONES) ---

    // Elementos del formulario
    const benchSelect = document.getElementById("bench-press-range");

    // Elementos de resultado
    const resultBox = document.getElementById("verdict-result");
    const resultMessage = document.getElementById("verdict-message");
    const recSpan = document.querySelector("#verdict-recommendation .product-name-rec");

    // Todas las tarjetas de producto
    const productCards = document.querySelectorAll(".product-card");

    // Nombres de productos
    const productNames = {
        P1: "Novato Extremo",
        P2: "Guerrero",
        P3: "Bestia Absoluta"
    };

    if (benchSelect) {
        // Escucha el evento 'change' CADA VEZ que el usuario cambia la opción
        benchSelect.addEventListener("change", () => {
            
            const recommendedProductID = benchSelect.value;
            let message;

            // 1. Ocultar la caja de resultado si vuelve a "Elegir"
            if (recommendedProductID === "none") {
                resultBox.classList.add("hidden");
                updateProductGrid(null); // Ocultar todos
                return;
            }

            // 2. Calcular Veredicto
            switch (recommendedProductID) {
                case "P1":
                    message = "AÚN ERES DÉBIL, PERO HAY POTENCIAL.";
                    break;
                case "P2":
                    message = "ERES FUERTE. ES HORA DE SER PELIGROSO.";
                    break;
                case "P3":
                    message = "ERES UNA BESTIA. BIENVENIDO A LA ÉLITE.";
                    break;
            }

            // 3. Mostrar Veredicto
            resultMessage.textContent = message;
            recSpan.textContent = productNames[recommendedProductID];
            resultBox.classList.remove("hidden");

            // 4. Actualizar la parrilla de productos
            updateProductGrid(recommendedProductID);
        });
    }

    /**
     * Actualiza la parrilla de productos, añadiendo la clase 'not-worthy'
     * a todos los productos EXCEPTO al recomendado.
     */
    function updateProductGrid(recommendedID) {
        productCards.forEach(card => {
            const cardID = card.getAttribute('data-product-id');
            
            if (cardID === recommendedID) {
                // Es el producto recomendado: quitar overlay
                card.classList.remove("not-worthy");
            } else {
                // No es el producto: añadir overlay
                card.classList.add("not-worthy");
            }
        });
    }
    
    // Ocultar todos los productos al inicio
    updateProductGrid(null); // 'null' hará que todos sean 'not-worthy' al cargar

});