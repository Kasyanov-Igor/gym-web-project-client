// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification

function transitionClient(ajaxUrl, requestToken, redirectUrl, response) {
    $.ajax({
        type: "POST",
        url: ajaxUrl,
        headers: {
            "RequestVerificationToken": requestToken
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            Id: response.Id,
        }),
        success: () => {
            console.log("AJAX запрос успешно выполнен.");
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                console.warn("Отсутствует data-redirect-url для перенаправления.");
            }
        },
        error: (xhr, status, error) => {
            console.error("Ошибка при выполнении AJAX запроса:", status, error, xhr.responseText);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    let btn = document.getElementById('UserLogin');

    let ajaxUrl = null;

    let redirectUrl = null;

    let requestToken = null;

    if (btn != null) {
        btn.addEventListener("click", function () {

            ajaxUrl = this.dataset.ajaxUrl;       // URL для AJAX
            redirectUrl = this.dataset.redirectUrl; // URL для перенаправления
            requestToken = this.dataset.requestToken; // Токен
        });
    }

    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        var formData = $(this).serialize(); // Собираем данные формы

        $.ajax({
            url: 'http://localhost:5067/Client/login',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: formData,
            success: function (response) {
                if (response.success) {
                    $('#loginSuccessMessage').text(response.message).show();
                } else {
                    $('#loginErrorMessage').text(response.message).show();
                    $('#loginSuccessMessage').hide();

                    transitionClient(ajaxUrl, requestToken, redirectUrl, response);
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
                            errorMessage = "Пользователя с таким логином не существует !"; // Если сервер вернул простой текст ошибки
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
});

document.addEventListener('DOMContentLoaded', () => {
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

    $('#loginFormCoach').on('submit', function (event) {
        event.preventDefault();

        var formData = $(this).serialize(); // Собираем данные формы

        $.ajax({
            url: 'http://localhost:5067/Coach/login',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: formData,
            success: function (response) {
                if (response.success) {
                    $('#loginSuccessMessage').text(response.message).show();
                } else {
                    $('#loginErrorMessage').text(response.message).show();
                    $('#loginSuccessMessage').hide();

                    //transitionClient(ajaxUrl, requestToken, redirectUrl, response);
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
                            errorMessage = "Пользователя с таким логином не существует !"; // Если сервер вернул простой текст ошибки
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



