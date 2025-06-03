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



