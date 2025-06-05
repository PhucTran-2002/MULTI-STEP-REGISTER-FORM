document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements for each form step
  const formStep1 = document.querySelector('.form-step1');
  const formStep2 = document.querySelector('.form-step2');
  const formStep3 = document.querySelector('.form-step3');

  // Select DOM elements for form inputs
  const checkboxes = document.querySelectorAll('input[name="topic"]'); 
  const usernameInput = document.getElementById('username'); 
  const emailInput = document.getElementById('email');       

  // Select DOM elements for displaying summary data
  const nameDisplay = document.querySelector('[data-cy="summary-name"]');   
  const emailDisplay = document.querySelector('[data-cy="summary-email"]'); 
  const topicsList = document.querySelector('[data-cy="summary-topics"]');  

  // Select DOM elements for the stepper component
  const stepperValue = document.querySelector('[data-cy="stepper-value"]'); 
  const stepperCircles = document.querySelectorAll('.stepper__circle');    

  /**
   * Updates the visual state of the stepper component based on the current step number.
   * @param {number} stepNumber 
   */
  function updateStepper(stepNumber) {
    stepperValue.textContent = stepNumber; 
    stepperCircles.forEach((circle, index) => {
     
      if (index < stepNumber) {
        circle.classList.add('stepper__circle--active');
      } else {
        circle.classList.remove('stepper__circle--active');
      }

      // Add 'stepper__circle--current' class to the circle representing the current step
      if (index === stepNumber - 1) {
        circle.classList.add('stepper__circle--current');
      } else {
        circle.classList.remove('stepper__circle--current');
      }
    });
  }

 
  function loadSummaryData() {
    const name = localStorage.getItem('username'); // Get username from local storage
    const email = localStorage.getItem('email');   // Get email from local storage
  
    const topics = JSON.parse(localStorage.getItem('topics') || '[]');

   
    nameDisplay.innerText = name || '(No name)';
   
    emailDisplay.innerText = email || '(No email)';

    topicsList.innerHTML = ''; // Clear existing topics in the list
  
    topics.forEach(topic => {
      const li = document.createElement('li');
      li.textContent = topic;
      topicsList.appendChild(li);
    });
  }

  // Event listener for the submission of form step 1
  formStep1.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const username = usernameInput.value.trim(); // Get trimmed username value
    const email = emailInput.value.trim();       // Get trimmed email value
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // Store username and email in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    formStep1.classList.add('form--hidden');    
    formStep2.classList.remove('form--hidden'); 
    updateStepper(2);                           
  });

  // Event listeners for each topic checkbox to add/remove a class when checked/unchecked
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
    
      const label = this.closest('.form-step2__label'); 
      if (this.checked) {
        label.style.backgroundColor = '#652cd1';
        label.style.fontWeight = '400'; 
        label.style.color = 'white';  
      } else {
        label.style.backgroundColor = '';  
      }
    });
  });

  // Event listener for the submission of form step 2
  formStep2.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get an array of selected topic values (only checked checkboxes)
    const selectedTopics = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    // If no topics are selected, show an alert and stop the submission
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic');
      return;
    }

    // Store selected topics in local storage as a JSON string
    localStorage.setItem('topics', JSON.stringify(selectedTopics));

    formStep2.classList.add('form--hidden');    
    formStep3.classList.remove('form--hidden'); 
    updateStepper(3);                           
    loadSummaryData();                          
  });

  
  formStep3.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('✅ Success');
    window.location.reload(); 
    localStorage.clear();// Show a success message
    updateStepper(1);                           

  
    usernameInput.value = localStorage.getItem('username') || '';
    emailInput.value = localStorage.getItem('email') || '';
  });

 
  updateStepper(1);
});