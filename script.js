document.getElementById("year").textContent = new Date().getFullYear();

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menu?.addEventListener("click", () => {
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";
  if (!open) {
    nav.style.position = "absolute";
    nav.style.top = "78px";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.padding = "20px 7vw";
    nav.style.flexDirection = "column";
    nav.style.alignItems = "flex-start";
    nav.style.background = "#051027";
  }
});

function submitForm(e) {
  e.preventDefault();
  const note = document.getElementById("form-note");
  note.textContent = "Thank you. Your enquiry form is ready to connect to your WhatsApp/email backend.";
}
