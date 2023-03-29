import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const feedbackFormEl = document.querySelector('.feedback-form');

const emailInputEl = feedbackFormEl.elements.email;
const messageTextareaEl = feedbackFormEl.elements.message;

let feedbackData = {};

populateDataOutput();

feedbackFormEl.addEventListener('input', throttle(onInputChange, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);

function onInputChange(evt) {
  feedbackData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (emailInputEl.value !== '' && messageTextareaEl.value !== '') {
    console.log(feedbackData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    feedbackData = {};
    return;
  }
  alert('Please, fill in all fields!');
}

function populateDataOutput() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    feedbackData = JSON.parse(savedData);
    emailInputEl.value = feedbackData.email || '';
    messageTextareaEl.value = feedbackData.message || '';
  }
}
