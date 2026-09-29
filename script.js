document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CURRENT YEAR
    // =========================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =========================
    // CONTACT FORM
    // =========================

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (!name || !email || !message) {

                formMessage.innerHTML = `
                    <div class="alert alert-danger">
                        Please fill in all fields.
                    </div>
                `;

                return;
            }


            /*
             * This is a static website.
             *
             * Therefore this form does NOT actually send
             * an email yet.
             *
             * Later we can connect it to:
             *
             * - Formspree
             * - EmailJS
             * - Google Forms
             * - Your own API
             */

            formMessage.innerHTML = `
                <div class="alert alert-success">
                    Thank you, ${escapeHtml(name)}!
                    Your message has been received.
                </div>
            `;

            contactForm.reset();

        });

    }


    // =========================
    // SIMPLE HTML ESCAPING
    // =========================

    function escapeHtml(value) {

        const div = document.createElement("div");

        div.textContent = value;

        return div.innerHTML;
    }

});