// scripts.js - Updated to improve image layout and add lightbox functionality

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    
    // Handle navigation menu toggle
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            navbar.style.display = "flex";
        } else {
            navbar.style.display = "none";
        }
    }
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    menuToggle.addEventListener("click", function () {
        navbar.style.display = navbar.style.display === "none" ? "flex" : "none";
    });

    // Lightbox effect for project images
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);
    
    lightbox.style.position = "fixed";
    lightbox.style.top = "0";
    lightbox.style.left = "0";
    lightbox.style.width = "100%";
    lightbox.style.height = "100%";
    lightbox.style.background = "rgba(0, 0, 0, 0.8)";
    lightbox.style.display = "none";
    lightbox.style.alignItems = "center";
    lightbox.style.justifyContent = "center";
    lightbox.style.zIndex = "1000";
    
    const lightboxImage = document.createElement("img");
    lightbox.appendChild(lightboxImage);
    
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    document.querySelectorAll(".gallery img").forEach(img => {
        img.addEventListener("click", e => {
            lightboxImage.src = e.target.src;
            lightbox.style.display = "flex";
        });
    });

    // Form validation for contact form
    const contactForm = document.querySelector("form");
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        let valid = true;
        
        if (name.value.trim() === "") {
            showError(name, "Name is required");
            valid = false;
        } else {
            clearError(name);
        }

        if (!validateEmail(email.value)) {
            showError(email, "Valid email is required");
            valid = false;
        } else {
            clearError(email);
        }

        if (message.value.trim() === "") {
            showError(message, "Message cannot be empty");
            valid = false;
        } else {
            clearError(message);
        }
        
        if (valid) {
            alert("Form submitted successfully!");
            contactForm.submit();
        }
    });

    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("error")) {
            error = document.createElement("span");
            error.classList.add("error");
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
        input.style.borderColor = "red";
    }

    function clearError(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains("error")) {
            error.remove();
        }
        input.style.borderColor = "";
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
