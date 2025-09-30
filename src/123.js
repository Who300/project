document.addEventListener('DOMContentLoaded', () => {
  const dlg = document.getElementById('contactDialog');
  const openBtn = document.getElementById('openDialog');
  const closeBtn = document.getElementById('closeDialog');
  const form = document.getElementById('contactForm');
  let lastActive = null;

  // Открытие модалки
  openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
  });

  // Закрытие модалки
  closeBtn.addEventListener('click', () => dlg.close('cancel'));

  // Валидация и отправка формы
  form.addEventListener('submit', (e) => {
    // Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    if (!form.checkValidity()) {
      e.preventDefault();
      const email = form.elements.email;
      if (email?.validity.typeMismatch) {
        email.setCustomValidity('Введите корректный e-mail, например name@example.com');
      }
      form.reportValidity();

      // aria-invalid для доступности
      [...form.elements].forEach(el => {
        if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
      });
      return;
    }

    // Успешная отправка (без сервера)
    e.preventDefault();
    dlg.close('success');
    form.reset();
  });

  // Возврат фокуса на последнюю активную кнопку
  dlg.addEventListener('close', () => {
    lastActive?.focus();
  });
});
