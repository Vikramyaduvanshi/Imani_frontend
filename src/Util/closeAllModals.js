export default function closeAllModals() {

  document.querySelectorAll(".modal.show")
    .forEach(m => m.classList.remove("show"));

  document.querySelectorAll(".modal-backdrop")
    .forEach(el => el.remove());

  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}