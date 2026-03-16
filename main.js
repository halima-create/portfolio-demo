// js/main.js
document.addEventListener("DOMContentLoaded", function () {
  // Highlight current page in navigation
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (currentPath === linkHref) {
      link.classList.add("active");
    }
  });

  // Contact form submission
  const quickForm = document.getElementById("quickContact");
  if (quickForm) {
    quickForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! I will get back to you soon.");
      quickForm.reset();
    });
  }
});
