document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile navigation toggle
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen);
        });
    }

    // 2. Live Search Filtering for Services Page
    const searchInput = document.getElementById("service-search");
    const serviceCards = document.querySelectorAll("#service-card-grid .card");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase().trim();
            serviceCards.forEach(card => {
                const keywords = card.getAttribute("data-service") || "";
                const textContent = card.textContent.toLowerCase();
                if (keywords.includes(term) || textContent.includes(term)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // 3. Lightbox Gallery Functionality
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const galleryThumbs = document.querySelectorAll(".gallery-thumb");

    galleryThumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
            const fullSrc = thumb.getAttribute("data-full");
            if (lightboxModal && lightboxImg) {
                lightboxImg.src = fullSrc;
                lightboxModal.style.display = "flex";
            }
        });
    });

    if (lightboxClose && lightboxModal) {
        lightboxClose.addEventListener("click", () => {
            lightboxModal.style.display = "none";
        });
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = "none";
            }
        });
    }

    // 4. Enquiry Form Validation & Dynamic Response Processing
    const enquiryForm = document.getElementById("enquiry-form");
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const phone = document.getElementById("phone");
            const projectType = document.getElementById("project-type");
            const message = document.getElementById("message");
            const statusDiv = document.getElementById("enquiry-status");

            // Reset errors
            document.querySelectorAll(".error-msg").forEach(el => el.style.display = "none");

            if (name.value.trim().length < 2) {
                showError("name-error", "Please enter a valid full name (at least 2 characters).");
                isValid = false;
            }
            if (!email.value.includes("@") || !email.value.includes(".")) {
                showError("email-error", "Please enter a valid email address.");
                isValid = false;
            }
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                showError("phone-error", "Please enter a valid 10-digit phone number (e.g. 0828456999).");
                isValid = false;
            }
            if (!projectType.value) {
                showError("project-error", "Please select a project or enquiry type.");
                isValid = false;
            }
            if (message.value.trim().length < 10) {
                showError("message-error", "Please provide more details (at least 10 characters).");
                isValid = false;
            }

            statusDiv.style.display = "block";
            if (isValid) {
                // Dynamic Cost / Availability response simulation based on selection
                let responseDetails = "";
                if (projectType.value === "furniture") {
                    responseDetails = "Estimated Turnaround: 3 to 5 weeks. Estimated Cost: From R4,500 depending on timber selection.";
                } else if (projectType.value === "cabinetry") {
                    responseDetails = "Estimated Turnaround: 2 to 4 weeks. Estimated Cost: Custom quote following 3D site measurement.";
                } else if (projectType.value === "repair") {
                    responseDetails = "Estimated Turnaround: 5 to 10 business days. Estimated Cost: Inspection required.";
                } else if (projectType.value === "outdoor") {
                    responseDetails = "Estimated Turnaround: 2 to 3 weeks. Estimated Cost: R1,200 per square meter.";
                } else {
                    responseDetails = "Thank you for your volunteer/sponsorship enquiry! Our coordinator will contact you within 24 hours.";
                }

                statusDiv.style.background = "#e4f4e4";
                statusDiv.style.border = "1px solid #4c9a4c";
                statusDiv.style.color = "#245c24";
                statusDiv.innerHTML = `<strong>Enquiry Submitted Successfully!</strong><br>${responseDetails}`;
                enquiryForm.reset();
            } else {
                statusDiv.style.background = "#fde8e8";
                statusDiv.style.border = "1px solid #c53030";
                statusDiv.style.color = "#9b2c2c";
                statusDiv.textContent = "Please correct the highlighted errors above before submitting.";
            }
        });
    }

    // 5. Contact Form Validation & Mailto Compilation
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            const cName = document.getElementById("c-name");
            const cEmail = document.getElementById("c-email");
            const cSubject = document.getElementById("c-subject");
            const cMessage = document.getElementById("c-message");
            const cStatusDiv = document.getElementById("contact-status");

            if (cName.value.trim().length < 2) {
                showError("c-name-error", "Please enter your full name.");
                isValid = false;
            }
            if (!cEmail.value.includes("@") || !cEmail.value.includes(".")) {
                showError("c-email-error", "Please enter a valid email address.");
                isValid = false;
            }
            if (cMessage.value.trim().length < 10) {
                showError("c-message-error", "Message must be at least 10 characters long.");
                isValid = false;
            }

            cStatusDiv.style.display = "block";
            if (isValid) {
                cStatusDiv.style.background = "#e4f4e4";
                cStatusDiv.style.border = "1px solid #4c9a4c";
                cStatusDiv.style.color = "#245c24";
                cStatusDiv.textContent = "Validation successful! Compiling email client...";

                // Compile into mailto link as required for contact.html
                const recipient = "info@heritageandhand.co.za";
                const subjectLine = encodeURIComponent(`[Website Contact] ${cSubject.value} - ${cName.value}`);
                const bodyContent = encodeURIComponent(`Name: ${cName.value}\nEmail: ${cEmail.value}\n\nMessage:\n${cMessage.value}`);

                setTimeout(() => {
                    window.location.href = `mailto:${recipient}?subject=${subjectLine}&body=${bodyContent}`;
                }, 1000);
            } else {
                cStatusDiv.style.background = "#fde8e8";
                cStatusDiv.style.border = "1px solid #c53030";
                cStatusDiv.style.color = "#9b2c2c";
                cStatusDiv.textContent = "Please correct the errors in the form.";
            }
        });
    }

    function showError(elementId, message) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.style.display = "block";
        }
    }
});
