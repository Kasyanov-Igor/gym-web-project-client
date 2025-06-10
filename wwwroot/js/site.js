
﻿// Проверяем, был ли уже инициализирован скрипт
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
        const eventModal = document.getElementById('modelRecord');
        const bookButton = document.getElementById('bookButton');

        // Переменная для хранения текущего workId и данных бронирования
        let newClient = null;
        let currentWorkId = null;

        if (!eventModal || !bookButton) {
            console.error('Не найдены необходимые элементы: модальное окно или кнопка бронирования');
            return;
        }

        // Обработчик открытия модального окна
        eventModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            if (!button) {
                console.warn('Событие show.bs.modal вызвано без relatedTarget');
                return;
            }

            // Получаем данные из атрибутов data-*
            currentWorkId = button.getAttribute('work-id');
            newClient = button.getAttribute('client-name');
            const title = button.getAttribute('data-title') || 'Без названия';
            const coach = button.getAttribute('data-coach') || 'Не указан';
            const duration = button.getAttribute('data-duration') || 'Не указано';
            const gym = button.getAttribute('data-gym') || 'Не указан';
            const description = button.getAttribute('data-description') || '';

            // Заполняем элементы модального окна
            eventModal.querySelector('#modalTitle').textContent = title;
            eventModal.querySelector('#modalCoach').textContent = coach;
            eventModal.querySelector('#modalDuration').textContent = duration;
            eventModal.querySelector('#modalGym').textContent = gym;
            eventModal.querySelector('#modalDescription').textContent = description;
        });

        // Обработчик клика по кнопке бронирования
        bookButton.addEventListener('click', () => {
            if (!currentWorkId) {
                alert('Ошибка: не выбран тренинг для бронирования.');
                return;
            }

            $.ajax({
                url: `http://localhost:5067/Workout/AddClinet/${encodeURIComponent(currentWorkId)}?clientName=${encodeURIComponent(newClient)}`,
                type: 'POST',
                success: () => {
                    const modalInstance = bootstrap.Modal.getInstance(eventModal);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                    alert('Бронирование успешно!');
                },
                error: (jqXHR) => {
                    alert(`Ошибка бронирования: ${jqXHR.responseText || jqXHR.statusText}`);
                }
            });

        });

    });
}


