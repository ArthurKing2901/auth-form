//<<!!! ИМПОРТ !!!>>
import { LOGIN, PASSWORD } from './auth.js'

//<<!! ССЫЛКИ !!>>
const form = document.getElementById('auth-form')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const agree = document.getElementById('checkbox')
const submitBtn = document.getElementById('login-btn')

toggleSubmitButton()

// <<!!! ОБРАБОТЧИКИ СОБЫТИЙ !!!>>

//Обработчики событий для поля "Email"
emailInput.addEventListener('blur', checkEmail)
emailInput.addEventListener('input', toggleSubmitButton)

//Обработчик событий для поля "Password"
passwordInput.addEventListener('blur', checkPassword)
passwordInput.addEventListener('input', toggleSubmitButton)

//Обработчик событий для чекбокса
agree.addEventListener('change', checkAgree)
agree.addEventListener('change', toggleSubmitButton)

// Обработчик отправки формы
form.addEventListener('submit', function (e) {
	e.preventDefault()
	validSubmit()
})

// <<!!! ФУНКЦИИ !!!>>

//Функция проверки поля "Email"
function checkEmail() {
	const email = emailInput.value.trim()

	if (!email) {
		showError(emailInput, 'Поле обязательно для заполнения!')
	} else if (!isValidEmail(email)) {
		showError(emailInput, 'Неверный email адрес')
	} else {
		showSuccess(emailInput)
		clearError(emailInput)
	}
}

//Функция валидации email-адреса
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/
	return emailRegex.test(email)
}

//Функция проверки поля "Password"
function checkPassword() {
	const password = passwordInput.value.trim()

	if (!password) {
		showError(passwordInput, 'Поле обязательно для заполнения!')
	} else {
		clearError(passwordInput)
		showSuccess(passwordInput)
	}
}

//Функция проверки чекбокса
function checkAgree() {
	const agreeError = document.getElementById('checkbox-error')
	if (!agree.checked) {
		agreeError.innerText =
			'Вы должны ознакомиться с пользовательским соглашением!'
	} else {
		agreeError.innerText = ''
	}
}

// Функция проверки заполнения формы
function isFormValid() {
	const email = emailInput.value.trim()
	const password = passwordInput.value.trim()
	const agreeChecked = agree.checked

	return email && isValidEmail(email) && password && agreeChecked
}

// Функции перехода на страницу "SHOP"
function validSubmit() {
	const email = emailInput.value.trim()
	const password = passwordInput.value.trim()

	if (email != LOGIN) {
		showError(emailInput, 'Email не найден')
	} else if (password !== PASSWORD) {
		showError(passwordInput, 'Неверный пароль!')
	} else {
		window.location.href = '/auth-form/shop.html'
	}
}

// Функция блокировки кнопки "Login"
function toggleSubmitButton() {
	submitBtn.disabled = !isFormValid()
}

//Функция отображения ошибок
function showError(input, message) {
	const errorElement = input.nextElementSibling
	errorElement.innerText = message
	input.classList.add('error')
	input.classList.remove('success')
}

//Функция очистки ошибок
function clearError(input) {
	input.classList.remove('error')
	input.nextElementSibling.innerText = ''
}

//Функция успешной валидации полей
function showSuccess(input) {
	input.classList.add('success')
	input.classList.remove('error')
}
