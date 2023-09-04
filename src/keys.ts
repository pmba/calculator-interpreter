export function setupKeys() {
  document.querySelectorAll(`button[id$="-btn"`).forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.textContent);
    });
  });
}
