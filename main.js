document.addEventListener("DOMContentLoaded", () => {
    const gate = document.getElementById("gate");
    const enterButton = document.getElementById("gate-enter");
    const mainContent = document.getElementById("main-content");

    if (gate && enterButton && mainContent) {
        enterButton.addEventListener("click", () => {
            gate.classList.add("hidden");
            setTimeout(() => {
                mainContent.classList.add("visible");
                mainContent.style.overflowY = 'scroll'; 
            }, 500); 
        });
    }

    // --- 2. LÓGICA DE SCROLL-REVEAL (IntersectionObserver) ---
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

    // --- 3. LÓGICA DEL VEREDICTO (FILTRO POR OPCIONES) ---
    const benchSelect = document.getElementById("bench-press-range");
    const resultBox = document.getElementById("verdict-result");
    const resultMessage = document.getElementById("verdict-message");
    const recSpan = document.querySelector("#verdict-recommendation .product-name-rec");
    const productCards = document.querySelectorAll(".product-card");

    const productNames = {
        P1: "PSYCHOTIC",
        P2: "MEDUSA",
        P3: "DMAA"
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
            // Solo aplica la lógica de "digno" a los pre-entrenos (P1, P2, P3)
            const cardID = card.getAttribute('data-product-id');
            if (cardID.startsWith("P")) { 
                if (cardID === recommendedID) {
                    // Es el producto recomendado: quitar overlay
                    card.classList.remove("not-worthy");
                } else {
                    // No es el producto: añadir overlay
                    card.classList.add("not-worthy");
                }
            }
            // Los productos de Ropa (R1, R2, R3) son ignorados y nunca se ocultan
        });
    }
    
    // Ocultar todos los pre-entrenos al inicio
    updateProductGrid(null); // 'null' hará que todos sean 'not-worthy' al cargar

    
    // --- LÓGICA DEL CARRITO ELIMINADA ---

});