import throttle from 'lodash.throttle';
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('[name=email]'),
    comment: document.querySelector('[name=message]'),
    submitBtn: document.querySelector('button'),
};
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {

    if (refs.email.value === "" || refs.comment.value === "") {
        window.alert('All inputs must be filled');
    }
    else {
        const newFormData = new FormData(e.currentTarget);
        newFormData.forEach((value, name) => {
        
        console.log(`${name}: `, value);
        });
    }
    const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    e.preventDefault();
    console.log(savedData);
    e.target.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function onFormInput(e) {
formData[e.target.name] = e.target.value;

localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function getLocalStorageValue() {
    const localSavedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localSavedData) {
         refs.email.value = JSON.parse(localSavedData).email;
        refs.comment.value = JSON.parse(localSavedData).message;
    }
}
getLocalStorageValue();
