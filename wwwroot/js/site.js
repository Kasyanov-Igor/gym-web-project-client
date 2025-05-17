// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


document.addEventListener("DOMContentLoaded", () => {
	let btn = document.getElementById('UserLogin');

	if (btn) {
		btn.addEventListener("click", function (event) {

			// Получаем значения из data-атрибутов кнопки, на которую кликнули
			const ajaxUrl = this.dataset.ajaxUrl;       // URL для AJAX
			const redirectUrl = this.dataset.redirectUrl; // URL для перенаправления
			const requestToken = this.dataset.requestToken; // Токен

			if (!ajaxUrl || !requestToken) {
				console.error("Отсутствуют необходимые data-атрибуты на кнопке:", this);
				return; // Прекращаем выполнение, если данных нет
			}

			// Выполняем AJAX запрос (если он нужен перед перенаправлением)
			$.ajax({
				type: "POST",
				url: ajaxUrl, // Используем URL из data-атрибута
				headers: {
					"RequestVerificationToken": requestToken // Используем токен из data-атрибута
				},
				contentType: "application/json; charset=utf-8",
				dataType: "text", // или "json", в зависимости от ответа сервера
				success: () => {
					console.log("AJAX запрос успешно выполнен.");
					// Просто перенаправляем на страницу без передачи параметров в URL (на стороне клиента)
					if (redirectUrl) {
						window.location.href = redirectUrl;
					} else {
						console.warn("Отсутствует data-redirect-url для перенаправления.");
						// Возможно, здесь нужно что-то другое, если нет URL для редиректа
					}
				},
				error: (xhr, status, error) => {
					console.error("Ошибка при выполнении AJAX запроса:", status, error, xhr.responseText);
					// Можно добавить отображение сообщения об ошибке пользователю
				}
			});
		});
	} else {
		console.warn("Элемент с ID 'UserLogin' не найден на странице.");
	}
});


$(document).ready(function () {
	$('#loginForm').on('submit', function (event) {
		event.preventDefault(); // Предотвращаем стандартную отправку формы

		var formData = $(this).serialize(); // Собираем данные формы

		$.ajax({
			url: 'http://localhost:5067/Client/login', // Адрес контроллера и метода для авторизации
			method: 'POST',
			dataType: 'json',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: formData,
			success: function (response) {
				if (response.success) {
					$('#loginSuccessMessage').text(response.message).show();
					$('#loginErrorMessage').hide(); // Скрываем сообщение об ошибке, если оно было видно
					$('#loginModal').modal('hide'); // Закрываем модальное окно (требуется Bootstrap или аналогичная библиотека) // Подождем немного перед перезагрузкой, чтобы модальное окно успело закрыться
					setTimeout(function () {
						window.location.reload(); // Перезагружаем страницу
					}, 500); // Задержка 500 миллисекунд

				} else {
					$('#loginErrorMessage').text(response.message).show();
					$('#loginSuccessMessage').hide(); // Скрываем сообщение об успехе
				}
			},
			error: function (xhr, status, error) {
				console.error("Ошибка AJAX:", status, error, xhr.responseText);
				var errorMessage = "Возникла ошибка при обработке вашего запроса.";
				if (xhr.responseText) {
					try {
						var errorResponse = JSON.parse(xhr.responseText);
						if (errorResponse.message) {
							errorMessage = errorResponse.message; // Если сервер вернул ошибку в JSON с полем message
						} else {
							errorMessage = xhr.responseText; // Если сервер вернул простой текст ошибки
						}
					} catch (e) {
						errorMessage = xhr.responseText; // Если ответ не JSON
					}
				}
				$('#loginErrorMessage').text(errorMessage).show();
				$('#loginSuccessMessage').hide();
			}
		});
	});
});


$(document).ready(function () { // Можно использовать один $(document).ready для всего файла
	$("#registrationForm").on("submit", function (event) {
		event.preventDefault();

		const formData = $(this).serialize(); // Получение всех полей формы в виде строки формата key=value

		// Выполняем AJAX-запрос
		$.ajax({
			// !!! Важно: Этот URL также хардкодный!
			// Рассмотрите возможность передачи его через data-атрибут, как обсуждалось ранее.
			url: "http://localhost:5067/Client/register", // Путь на сервер для обработки регистрации
			type: "POST",               // Тип запроса — POST
			data: formData,             // Данные формы
			dataType: 'json',           // Ожидаем JSON ответ от сервера
			success: function (response) {
				if (response.success) {
					// Успешная регистрация
					$("#successMessage").text(response.message).show();
					$("#errorMessage").hide(); // Скрываем сообщение об ошибке
					$("#registrationModal").modal("hide"); // Скрытие модала (требуется Bootstrap или аналогичная библиотека) // Опционально: что-то сделать после закрытия модала, например, показать сообщение об успехе на странице
					// или автоматически перейти на страницу логина/главную
					// setTimeout(function() { /* Ваш код здесь */ }, 500);

				} else {
					// Ошибочная регистрация
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



