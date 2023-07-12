function PopupModal(settings) {
  this.setings = {
    animationDuration: 300,
  };
  const modalNodes = document.querySelectorAll(".modal");

  this.modals = {};

  const removeItem = (element) => {
    let parent = element.parentElement;
    parent.removeChild(element);
  };
  Array.from(modalNodes).forEach((modal) => {
    if (!modal.id) return;
    this.modals[modal.id] = modal;
    removeItem(modal);
  });

  this.close = (element) => {
    document.body.classList.remove("active");
    document.body.style.paddingRight = "";

    const modal = typeof element === "string" ? this.modals[element] : element;
    const parent = modal.parentElement;

    modal.classList.add("exit");
    if (parent) {
      parent.classList.add("exit");
    }

    setTimeout(() => {
      modal.classList.remove("exit");
      removeItem(modal);

      if (parent && parent.classList.contains("modal__wrapper"))
        removeItem(parent);
    }, this.setings.animationDuration);
  };
  this.show = (modalId) => {
    document.body.classList.add("active");
    document.body.style.paddingRight =
      window.innerWidth - document.documentElement.clientWidth;
    createModal(this.modals[modalId]);
  };

  const createModal = (modal) => {
    const modalWrapper = document.createElement("div");
    const modalClose = document.createElement("button");
    modalWrapper.className = "modal__wrapper";
    modalClose.className = "modal-close";

    modal.append(modalClose);
    modalWrapper.append(modal);

    modalClose.onclick = () => this.close(modal);

    document.body.append(modalWrapper);

    modalWrapper.classList.add("enter");
    modal.classList.add("enter");

    setTimeout(() => {
      modalWrapper.classList.remove("enter");
      modal.classList.remove("enter");
    }, this.setings.animationDuration);
  };
}

const modals = new PopupModal();

document.querySelectorAll('[data-event="modal"]').forEach((button) => {
  const modal = button.dataset.modal;
  if (!modal) return;

  button.onclick = () => modals.show(modal);
});
