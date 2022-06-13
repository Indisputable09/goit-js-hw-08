import throttle from 'lodash.throttle';
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('[name=email]'),
    comment: document.querySelector('[name=message]'),
    submitBtn: document.querySelector('button'),
};
const LOCAL_STORAGE_KEY = 'feedback-form-state';
let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

restoreFormData();

function onFormSubmit(e) {

    const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    e.preventDefault();
    console.log(savedData);
    e.target.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    formData = {};
}

function onFormInput(e) {
formData[e.target.name] = e.target.value;

localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function restoreFormData() {

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
    
    const parsedData = JSON.parse(savedData)
    const elements = refs.form.querySelectorAll(`[name]`)

    for (const element of elements) {
        if (Object.keys(parsedData).includes(element.name)) {
            element.value = parsedData[element.name];}
        }
    }
    
    return;
}