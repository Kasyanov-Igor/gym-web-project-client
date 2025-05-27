using gym_project_business_logic.Model;
using GymProjectClient.Pages.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Model.Entities;

namespace GymProjectClient.Pages
{
	public class CoachWorkDataModel : PageModel
	{
        public CoachWorkDataModel()
		{
			this.Date = DateTime.Now;
			this._crudService = new CrudService();
        }
        public Coach? Coach { get; set; }

		public List<Gym> Gyms { get; set; }

		public List<Workout> Workouts { get; set; }

		public DateTime Date;

		private CrudService _crudService;

        public string ErrorMessage { get; set; }

        public async Task OnGet(string id)
		{
			this.Coach = await this.GetCoachByIdAsync(Convert.ToInt32(id));

            this.Gyms = await this.GetGyms();

			this.Workouts = await this.GetWorkouts();
        }

		public async Task<Coach> GetCoachByIdAsync(int id)
		{
			return await this._crudService.GetEntityByIdAsync<Coach>(id, "Coach");
		}

		public async Task<List<Gym>?> GetGyms()
		{
			string url = "http://localhost:5067/Gyms";

            return await this._crudService.GetListEntity<Gym>(url);
        }

        public async Task<List<Workout>?> GetWorkouts()
        {
            string url = "http://localhost:5067/Workout";

            return await this._crudService.GetListEntity<Workout>(url);
        }
    }
}
