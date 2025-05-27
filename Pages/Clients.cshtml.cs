using gym_project_business_logic.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;


namespace GymProjectClient.Pages
{
	public class ClientsModel : PageModel
	{
        private readonly HttpClient _httpClient;

        [BindProperty]
        public string Login { get; set; }

        [BindProperty]
        public string Password { get; set; }

        public string ErrorMessage { get; set; }

        public ClientsModel(HttpClient httpClient)
		{
            this._httpClient = httpClient;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page(); // Возвращаем текущую страницу с ошибками валидации
            }

            var loginData = new Dictionary<string, string>
            {
                { "Login", Login },
                { "Password", Password }
            };

            var content = new FormUrlEncodedContent(loginData); // API ожидает [FromForm]

            try
            {
                var apiResponse = await _httpClient.PostAsync("http://localhost:5067/Client/login", content);

                if (apiResponse.IsSuccessStatusCode)
                {
                    var client = await apiResponse.Content.ReadFromJsonAsync<Client>();
;

                    if (client != null)
                    {
                        return RedirectToPage("/ClientMain", new { id = client.Id });
                    }
                    else
                    {
                        // Неожиданная ситуация: API вернул успех, но объект Coach пустой
                        ErrorMessage = "Login successful, but coach data was not returned.";
                        return Page();
                    }
                }
                else if (apiResponse.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    var problemDetails = await apiResponse.Content.ReadFromJsonAsync<ProblemDetails>();
                    ErrorMessage = problemDetails?.Detail ?? "Неверные учетные данные.";

                    return Page();
                }
                else
                {
                    ErrorMessage = $"Произошла ошибка при входе: {apiResponse.StatusCode}";
                    return Page();
                }
            }
            catch (HttpRequestException ex)
            {
                ErrorMessage = $"Не удалось подключиться к серверу: {ex.Message}";
                return Page();
            }
        }


    }
}
