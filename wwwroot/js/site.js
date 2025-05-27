// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification

document.addEventListener('DOMContentLoaded', () => {

	$("#registrationForm").on("submit", function (event) {
		event.preventDefault();

		const formData = $(this).serialize(); // Получение всех полей формы в виде строки формата key=value

		$.ajax({
			url: "http://localhost:5067/Client/register", // Путь на сервер для обработки регистрации
			type: "POST",               // Тип запроса — POST
			data: formData,             // Данные формы
			dataType: 'json',           // Ожидаем JSON ответ от сервера
			success: function (response) {
				if (response.success) {
					// Успешная регистрация
					$("#successMessage").text(response.message).show();
					$("#errorMessage").hide(); // Скрываем сообщение об ошибке
				} else {
					$("#errorMessage").text(response.message).show();
					$("#successMessage").hide(); // Скрываем сообщение об успехе
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.error(`Ошибка AJAX Registration: ${jqXHR.statusText}`, jqXHR.responseText);
				// Улучшенная обработка ошибок, как в предыдущем примере
				var errorMessage = "Что-то пошло не так. Попробуйте снова позже.";
				if (jqXHR.responseText) {
					try {
						var errorResponse = JSON.parse(jqXHR.responseText);
						if (errorResponse.message) {
							errorMessage = errorResponse.message;
						} else {
							errorMessage = jqXHR.responseText;
						}
					} catch (e) {
						errorMessage = jqXHR.responseText;
					}
				}
				$("#errorMessage").text(errorMessage).show();
				$("#successMessage").hide();
			}
		});
	});

	$("#registrationFormCoach").on("submit", function (event) {
		event.preventDefault();

		const formData = $(this).serialize(); // Получение всех полей формы в виде строки формата key=value

		$.ajax({
			url: "http://localhost:5067/Coach/register", // Путь на сервер для обработки регистрации
			type: "POST",               // Тип запроса — POST
			data: formData,             // Данные формы
			dataType: 'json',           // Ожидаем JSON ответ от сервера
			success: function (response) {
				if (response.success) {
					// Успешная регистрация
					$("#successMessage").text(response.message).show();
					$("#errorMessage").hide(); // Скрываем сообщение об ошибке
				} else {
					$("#errorMessage").text(response.message).show();
					$("#successMessage").hide(); // Скрываем сообщение об успехе
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.error(`Ошибка AJAX Registration: ${jqXHR.statusText}`, jqXHR.responseText);
				// Улучшенная обработка ошибок, как в предыдущем примере
				var errorMessage = "Что-то пошло не так. Попробуйте снова позже.";
				if (jqXHR.responseText) {
					try {
						var errorResponse = JSON.parse(jqXHR.responseText);
						if (errorResponse.message) {
							errorMessage = errorResponse.message;
						} else {
							errorMessage = jqXHR.responseText;
						}
					} catch (e) {
						errorMessage = jqXHR.responseText;
					}
				}
				$("#errorMessage").text(errorMessage).show();
				$("#successMessage").hide();
			}
		});
	});

	$("#slotForm").on("submit", function (event) {
		event.preventDefault();

		const formData = $(this).serialize(); // Получение всех полей формы в виде строки формата key=value

		$.ajax({
			url: "http://localhost:5067/Workout", // Путь на сервер для обработки регистрации
			type: "POST",               // Тип запроса — POST
			data: formData,             // Данные формы
			dataType: 'json',           // Ожидаем JSON ответ от сервера
			success: function (response) {
				if (response.success) {
					// Успешная регистрация
					$("#successMessage").text(response.message).show();
					$("#errorMessage").hide(); // Скрываем сообщение об ошибке
				} else {
					$("#errorMessage").text(response.message).show();
					$("#successMessage").hide(); // Скрываем сообщение об успехе
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.error(`Ошибка AJAX Registration: ${jqXHR.statusText}`, jqXHR.responseText);
				// Улучшенная обработка ошибок, как в предыдущем примере
				var errorMessage = "Что-то пошло не так. Попробуйте снова позже.";
				if (jqXHR.responseText) {
					try {
						var errorResponse = JSON.parse(jqXHR.responseText);
						if (errorResponse.message) {
							errorMessage = errorResponse.message;
						} else {
							errorMessage = jqXHR.responseText;
						}
					} catch (e) {
						errorMessage = jqXHR.responseText;
					}
				}
				$("#errorMessage").text(errorMessage).show();
				$("#successMessage").hide();
			}
		});
	});
});

document.querySelectorAll('.today-date button').forEach(button => {
	button.addEventListener('click', function () {
		// Получаем текущее время
		let currentDate = new Date();
		let time = this.closest('td').previousElementSibling.textContent.trim();
		let formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${time}`; // Форматируем дату и время

		document.querySelector('input[name="BookingTime"]').value = formattedDateTime;
	});
});

document.querySelectorAll('.second-day-date button').forEach(button => {
	button.addEventListener('click', function () {
		let currentDate = new Date();

		currentDate.setDate(currentDate.getDate() + 1); // Плюс 1 день

		const time = this.closest('td').previousElementSibling.previousElementSibling.textContent.trim();

		let formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${time}`; // Форматируем дату и время

		document.querySelector('input[name="BookingTime"]').value = formattedDateTime;
	});
});

document.querySelectorAll('.third-day-date button').forEach(button => {
	button.addEventListener('click', function () {
		let currentDate = new Date();

		currentDate.setDate(currentDate.getDate() + 2);

		const time = this.closest('td').previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim();

		let formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${time}`; // Форматируем дату и время

		document.querySelector('input[name="BookingTime"]').value = formattedDateTime;
	});
});

document.querySelectorAll('.fourth-day-date button').forEach(button => {
	button.addEventListener('click', function () {
		let currentDate = new Date();

		currentDate.setDate(currentDate.getDate() + 3);

		const time = this.closest('td').previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim();

		let formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${time}`; // Форматируем дату и время

		document.querySelector('input[name="BookingTime"]').value = formattedDateTime;
	});
});

document.querySelectorAll('.fifth-day-date button').forEach(button => {
	button.addEventListener('click', function () {
		let currentDate = new Date();

		currentDate.setDate(currentDate.getDate() + 4);

		const time = this.closest('td').previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim();

		let formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${time}`; // Форматируем дату и время

		document.querySelector('input[name="BookingTime"]').value = formattedDateTime;
	});
});

document.querySelectorAll('.sixth-day-date button').forEach(button => {
	button.addEventListener('click', function () {
		let currentDate = new Date();

		currentDate.setDate(currentDate.getDate() + 5);

		const time = this.closest('td').previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim();

		let formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${time}`; // Форматируем дату и время

		document.querySelector('input[name="BookingTime"]').value = formattedDateTime;
	});
});

document.querySelectorAll('.seventh-day-date button').forEach(button => {
	button.addEventListener('click', function () {
		let currentDate = new Date();

		currentDate.setDate(currentDate.getDate() + 6);

		const time = this.closest('td').previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim();

		let formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${time}`; // Форматируем дату и время

		document.querySelector('input[name="BookingTime"]').value = formattedDateTime;
	});
});



