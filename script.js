document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an internal anchor
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    // Close the mobile navbar if it's open
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }

                    // Calculate position considering the fixed navbar
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Add active class to nav links on scroll (ScrollSpy fallback if Bootstrap's fails)
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a small offset (80px) to trigger activation slightly before top
            if (pageYOffset >= sectionTop - 80) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});
