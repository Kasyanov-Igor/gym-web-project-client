using gym_project_business_logic.Model;
using GymProjectClient.Pages.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
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

		public List<SelectListItem> Gyms { get; set; }

        [BindProperty]
        public int? SelectedGymId { get; set; }

        public List<Workout> Workouts { get; set; }

        [BindProperty]
        public DateTime Date { get; set; }

        private CrudService _crudService;

        public string ErrorMessage { get; set; }

        public async Task OnGetAsync(string id)
		{
			this.Coach = await this.GetCoachByIdAsync(Convert.ToInt32(id));

            this.Gyms = this.LoadGyms(await this.GetGyms());

            this.Workouts = await this.GetWorkoutsForGym(SelectedGymId);
        }

        public async Task OnPostAsync(string id)
        {
            this.Coach = await this.GetCoachByIdAsync(Convert.ToInt32(id));

            this.Gyms = this.LoadGyms(await this.GetGyms());

            this.Workouts = await this.GetWorkoutsForGym(SelectedGymId);
        }

        public async Task<Coach> GetCoachByIdAsync(int id)
		{
			return await this._crudService.GetEntityByIdAsync<Coach>(id, "Coach");
		}

        private List<SelectListItem> LoadGyms(List<Gym> coachesList)
        {
            return coachesList.Select(c => new SelectListItem
            {
                Value = c.Id.ToString(),
                Text = c.Name,
            }).ToList();
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

        public async Task<List<Workout>?> GetWorkoutsForGym(int? GymId)
        {
            if (!GymId.HasValue)
            {
                return null;
            }

            string url = $"http://localhost:5067/Workout/ByGym/{GymId}";
            return await _crudService.GetListEntity<Workout>(url);
        }
    }
}
