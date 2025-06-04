document.addEventListener('DOMContentLoaded', function () {
  const formStep1 = document.querySelector('.form-step1');
  const formStep2 = document.querySelector('.form-step2');
  const formStep3 = document.querySelector('.form-step3');
  const checkboxes = document.querySelectorAll('input[name="topic"]');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');

  const nameDisplay = document.querySelector('[data-cy="summary-name"]');
  const emailDisplay = document.querySelector('[data-cy="summary-email"]');
  const topicsList = document.querySelector('[data-cy="summary-topics"]');

  const stepperValue = document.querySelector('[data-cy="stepper-value"]');
  const stepperCircles = document.querySelectorAll('.stepper__circle');

  function updateStepper(stepNumber) {
    stepperValue.textContent = stepNumber;

    stepperCircles.forEach((circle, index) => {
      if (index < stepNumber) {
        circle.classList.add('stepper__circle--active');
      } else {
        circle.classList.remove('stepper__circle--active');
      }

      if (index === stepNumber - 1) {
        circle.classList.add('stepper__circle--current');
      } else {
        circle.classList.remove('stepper__circle--current');
      }
    });
  }

  function loadSummaryData() {
    const name = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const topics = JSON.parse(localStorage.getItem('topics') || '[]');

    nameDisplay.innerText = name || '(No name)';
    emailDisplay.innerText = email || '(No email)';

    topicsList.innerHTML = '';
    topics.forEach(topic => {
      const li = document.createElement('li');
      li.textContent = topic;
      topicsList.appendChild(li);
    });
  }

  formStep1.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    formStep1.classList.add('form--hidden');
    formStep2.classList.remove('form--hidden');
    updateStepper(2);
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const label = this.closest('.form-step2__label');
      if (this.checked) {
        label.classList.add('form-step2__label--checked');
      } else {
        label.classList.remove('form-step2__label--checked');
      }
    });
  });

  formStep2.addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedTopics = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    if (selectedTopics.length === 0) {
      alert('Please select at least one topic');
      return;
    }

    localStorage.setItem('topics', JSON.stringify(selectedTopics));

    formStep2.classList.add('form--hidden');
    formStep3.classList.remove('form--hidden');
    updateStepper(3);
    loadSummaryData();
  });

  formStep3.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('✅ Success');

    formStep3.classList.add('form--hidden');
    formStep1.classList.remove('form--hidden');
    updateStepper(1);

    usernameInput.value = localStorage.getItem('username') || '';
    emailInput.value = localStorage.getItem('email') || '';
  });

  updateStepper(1);
});
