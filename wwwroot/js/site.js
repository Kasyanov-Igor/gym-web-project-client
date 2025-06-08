// Проверяем, был ли уже инициализирован скрипт
if (!window.__myAppHandlersInitialized) {
    window.__myAppHandlersInitialized = true;

    $(document).ready(function () {
        // Обработчик для формы регистрации клиента
        $("#registrationForm").one("submit", function (event) {
            event.preventDefault();
            console.log("Submit registrationForm");

            const formData = $(this).serialize();

            $.ajax({
                url: "http://localhost:5067/Client/register",
                type: "POST",
                data: formData,
                dataType: "json",
                success: function (response) {
                    if (response.success) {
                        $("#successMessage").text(response.message).show();
                        $("#errorMessage").hide();
                    } else {
                        $("#errorMessage").text(response.message).show();
                        $("#successMessage").hide();
                    }
                },
                error: function (jqXHR) {
                    console.error("Ошибка AJAX Registration:", jqXHR.statusText);
                    $("#errorMessage").text("Произошла ошибка. Попробуйте позже.").show();
                    $("#successMessage").hide();
                }
            });
        });

        // Обработчик для формы регистрации тренера
        $("#registrationFormCoach").one("submit", function (event) {
            event.preventDefault();
            console.log("Submit registrationFormCoach");

            const formData = $(this).serialize();

            $.ajax({
                url: "http://localhost:5067/Coach/register",
                type: "POST",
                data: formData,
                dataType: "json",
                success: function (response) {
                    if (response.success) {
                        $("#successMessage").text(response.message).show();
                        $("#errorMessage").hide();
                    } else {
                        $("#errorMessage").text(response.message).show();
                        $("#successMessage").hide();
                    }
                },
                error: function (jqXHR) {
                    console.error("Ошибка AJAX Coach Registration:", jqXHR.statusText);
                    $("#errorMessage").text("Произошла ошибка. Попробуйте позже.").show();
                    $("#successMessage").hide();
                }
            });
        });

        // Обработчик для формы слотов
        $("#slotForm").one("submit", function (event) {
            event.preventDefault();
            console.log("Submit slotForm");

            const formData = $(this).serialize();

            $.ajax({
                url: "http://localhost:5067/Workout",
                type: "POST",
                data: formData,
                dataType: "json",
                success: function (response) {
                    if (response.success) {
                        $("#successMessage").text(response.message).show();
                        $("#errorMessage").hide();
                    } else {
                        $("#errorMessage").text(response.message).show();
                        $("#successMessage").hide();
                    }
                },
                error: function (jqXHR) {
                    console.error("Ошибка AJAX Workout:", jqXHR.statusText);
                    $("#errorMessage").text("Произошла ошибка. Попробуйте позже.").show();
                    $("#successMessage").hide();
                }
            });
        });

        // Здесь можно добавить другие обработчики, если нужно
    });
}
