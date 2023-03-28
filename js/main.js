import { LOGIN, PASSWORD } from "./auth.js";

// Получаем ссылки на поля ввода и кнопку отправки формы
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const agree = document.getElementById("checkbox");
const submitBtn = document.getElementById("login-btn");

let validForm = true

//Обработчик событий для поля "Email"
emailInput.addEventListener("blur", checkEmail);
//Функция проверки поля "Email"
function checkEmail() {
  const email = emailInput.value.trim();

  if (!email) {
    showError(emailInput, "Поле обязательно для заполнения!");
  } else if (!isValidEmail(email)) {
    showError(emailInput, "Неверный email адрес");
  } else {
    showSuccess(emailInput);
    clearError(emailInput);
  }
}

//Обработчик событий для поля "Password"
passwordInput.addEventListener("blur", checkPassword);
//Функция проверки поля "Password"
function checkPassword() {
  const password = passwordInput.value.trim();

  if (!password) {
    showError(passwordInput, "Поле обязательно для заполнения!");
  } else {
    clearError(passwordInput);
    showSuccess(passwordInput);
  }
}

//Обработчик событий для чекбокса
agree.addEventListener("change", checkAgree);
//Функция проверки чекбокса
function checkAgree() {
  const agreeError = document.getElementById("checkbox-error");
  if (!agree.checked) {
    agreeError.innerText =
      "Вы должны ознакомиться с пользовательским соглашением!";
  } else {
    agreeError.innerText = "";
  }
}

// //Обработчик формы для блокировки кнопки
// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const emailError = checkEmail();
//   const passwordError = checkPassword();
//   const checkboxError = checkAgree();

//   if (emailError || passwordError || checkboxError) {
//     submitBtn.disabled = true;
//     return;
//   }
// });

//Функция валидации email-адреса
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  return emailRegex.test(email);
}

//Функция отображения ошибок
function showError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.innerText = message;
  input.classList.add("error");
  input.classList.remove("success");
}

//Функция успешной валидации полей
function showSuccess(input) {
  input.classList.add("success");
  input.classList.remove("error");
}

//Функция очистки ошибок
function clearError(input) {
  input.classList.remove("error");
  input.nextElementSibling.innerText = "";
}
