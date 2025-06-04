const steps = document.querySelectorAll('.form__step');
const dots = document.querySelectorAll('.form__dot');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const topics = document.querySelectorAll('.form__topic');

const btnStep1 = document.getElementById('btn-step-1');
const btnStep2 = document.getElementById('btn-step-2');
const btnConfirm = document.getElementById('btn-confirm');

let selectedTopics = [];

// Step 1 validation
btnStep1.addEventListener('click', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();


  localStorage.setItem('name', name);
  localStorage.setItem('email', email);

  showStep(1);
});

// Topic selection
topics.forEach(topic => {
  topic.addEventListener('click', () => {
    topic.classList.toggle('form__topic--selected');
  });
});

// Step 2 validation
btnStep2.addEventListener('click', (e) => {
  e.preventDefault();
  selectedTopics = Array.from(document.querySelectorAll('.form__topic--selected')).map(t => t.innerText);

  if (selectedTopics.length === 0) {
    alert('Please select at least one topic.');
    return;
  }

  localStorage.setItem('topics', JSON.stringify(selectedTopics));
  showStep(2);

});

// Confirm
btnConfirm.addEventListener('click', (e) => {
  e.preventDefault();
  alert('✅ Success');
});

// Step display logic
function showStep(stepIndex) {
  steps.forEach((step, i) => {
    step.classList.toggle('form__step--active', i === stepIndex);
    dots[i].classList.toggle('form__dot--active', i === stepIndex);
  });
}

// Populate summary
function populateSummary() {
  document.getElementById('summary-name').innerText = localStorage.getItem('name');
  document.getElementById('summary-email').innerText = localStorage.getItem('email');

  const topicsList = document.getElementById('summary-topics');
  topicsList.innerHTML = '';
  JSON.parse(localStorage.getItem('topics')).forEach(topic => {
    const li = document.createElement('li');
    li.innerText = topic;
    topicsList.appendChild(li);
  });
}
