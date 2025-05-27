using gym_project_business_logic.Model;
using gym_project_business_logic.Model.Domains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GymProjectClient.Pages
{
	public class CoachLoginModel : PageModel
	{
		private readonly HttpClient _httpClient;

		[BindProperty]
		public string Login { get; set; }

		[BindProperty]
		public string Password { get; set; }

		public string ErrorMessage { get; set; }

		public CoachLoginModel(HttpClient httpClient)
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

			var content = new FormUrlEncodedContent(loginData);

			try
			{
				var apiResponse = await _httpClient.PostAsync("http://localhost:5067/Coach/login", content);

				if (apiResponse.IsSuccessStatusCode)
				{
					var coach = await apiResponse.Content.ReadFromJsonAsync<Coach>();

                    if (coach != null)
					{
						return RedirectToPage("/CoachWorkData", new { id = coach.Id });
					}
					else
					{
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
