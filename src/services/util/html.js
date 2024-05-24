export const scrollToElement = (target, container) => {
  if (target != HTMLElement) {
    container = container || "body,html";
    const parent = document.querySelector(container);
    target = parent.querySelector(`label[for='${target}']`);
  }

  if (target != null && target.scrollIntoView) {
    target.scrollIntoView();
  }
};
