using gym_project_business_logic.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GymProjectClient.Pages
{
	public class CoachWorkDataModel : PageModel
	{
		public Coach? Coach { get; set; }

		private HttpClient _httpClient = new HttpClient();

		public void OnGet(string id)
		{
			this.Coach = this.GetCoachByIdAsync(Convert.ToInt32(id)).Result;
		}

		public async Task<Coach> GetCoachByIdAsync(int id)
		{
			var response = await this._httpClient.GetAsync($"http://localhost:5067/Coach/1");
			var coachNew = await response.Content.ReadFromJsonAsync<Coach>();

			return coachNew;
		}
	}
}
