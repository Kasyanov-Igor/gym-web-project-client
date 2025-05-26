using gym_project_business_logic.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GymProjectClient.Pages
{
	public class CoachWorkDataModel : PageModel
	{
        public CoachWorkDataModel()
		{
			this.Date = DateTime.Now;
		}
        public Coach? Coach { get; set; }

		public List<Gym> Gyms { get; set; }

		public DateTime Date;

		private HttpClient _httpClient = new HttpClient();

        public string ErrorMessage { get; set; }

        public void OnGet(string id)
		{
			this.Coach = this.GetCoachByIdAsync(Convert.ToInt32(id)).Result;

            this.Gyms = this.GetGyms().Result;
        }

		public async Task<Coach> GetCoachByIdAsync(int id)
		{
			var response = await this._httpClient.GetAsync($"http://localhost:5067/Coach/1");
			var coachNew = await response.Content.ReadFromJsonAsync<Coach>();

			return coachNew;
		}

		public async Task<List<Gym>?> GetGyms()
		{
			var response = await _httpClient.GetAsync("http://localhost:5067/Gyms");

			var gyms = await response.Content.ReadFromJsonAsync<List<Gym>>();
			return gyms;
		}
    }
}
