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
        benchSelect.addEventListener("change", () => {
            
            const recommendedProductID = benchSelect.value;
            let message;

            if (recommendedProductID === "none") {
                resultBox.classList.add("hidden");
                updateProductGrid(null);
                return;
            }

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

            resultMessage.textContent = message;
            recSpan.textContent = productNames[recommendedProductID];
            resultBox.classList.remove("hidden");

            updateProductGrid(recommendedProductID);
        });
    }

    function updateProductGrid(recommendedID) {
        productCards.forEach(card => {
            const cardID = card.getAttribute('data-product-id');
            if (cardID.startsWith("P")) { 
                if (cardID === recommendedID) {
                    card.classList.remove("not-worthy");
                } else {
                    card.classList.add("not-worthy");
                }
            }
        });
    }
    
    updateProductGrid(null);
});