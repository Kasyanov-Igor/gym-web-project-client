using gym_project_business_logic.Model;
using GymProjectClient.Pages.Service;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Model.Entities;

namespace GymProjectClient.Pages
{
	public class TimetableModel : PageModel
	{
		public List<SelectListItem> DateOptions { get; set; }
		public List<Workout>? Workouts { get; set; }
		public List<SelectListItem> Coaches { get; set; }

		private readonly CrudService _crudService;

		[BindProperty]
		public DateTime Date { get; set; }

        public string token;

        [BindProperty]
		public int? SelectedCoachId { get; set; }

		public Client Client { get; set; }

		public TimetableModel()
		{
            //this.Date = DateTime.Now;
            //this._crudService = new CrudService();
            //InitializeDateOptions();
        }

		public async Task OnGetAsync()
		{
            var token2 = Request.Cookies["authToken"];

            if (!string.IsNullOrEmpty(token))
            {
				
            }
            //this.Client = await GetEntityAsync();
            this.Coaches = this.LoadCoaches(await GetCoaches());
			//this.Workouts = await GetWorkoutsForCoach(SelectedCoachId);
			//InitializeDateOptions();
		}

		public async Task OnPostAsync()
		{
			//this.Client = await GetEntityAsync();
			//this.Coaches = this.LoadCoaches(await GetCoaches());
			//this.Workouts = await GetWorkoutsForCoach(SelectedCoachId);
			//InitializeDateOptions();
		}

		private void InitializeDateOptions()
		{
			DateOptions = new List<SelectListItem>
			{
				new SelectListItem { Value = DateTime.Today.ToString("yyyy-MM-dd"), Text = DateTime.Today.ToString("dd MMMM yyyy", new CultureInfo("ru-RU")) },
				new SelectListItem { Value = DateTime.Today.AddDays(1).ToString("yyyy-MM-dd"), Text = DateTime.Today.AddDays(1).ToString("dd MMMM yyyy", new CultureInfo("ru-RU")) },
				new SelectListItem { Value = DateTime.Today.AddDays(2).ToString("yyyy-MM-dd"), Text = DateTime.Today.AddDays(2).ToString("dd MMMM yyyy", new CultureInfo("ru-RU")) },
				new SelectListItem { Value = DateTime.Today.AddDays(3).ToString("yyyy-MM-dd"), Text = DateTime.Today.AddDays(3).ToString("dd MMMM yyyy", new CultureInfo("ru-RU")) },
				new SelectListItem { Value = DateTime.Today.AddDays(4).ToString("yyyy-MM-dd"), Text = DateTime.Today.AddDays(4).ToString("dd MMMM yyyy", new CultureInfo("ru-RU")) },
				new SelectListItem { Value = DateTime.Today.AddDays(5).ToString("yyyy-MM-dd"), Text = DateTime.Today.AddDays(5).ToString("dd MMMM yyyy", new CultureInfo("ru-RU")) },
				new SelectListItem { Value = DateTime.Today.AddDays(6).ToString("yyyy-MM-dd"), Text = DateTime.Today.AddDays(6).ToString("dd MMMM yyyy", new CultureInfo("ru-RU")) }
			};
		}

		private List<SelectListItem> LoadCoaches(List<Coach> coachesList)
		{
			return coachesList.Select(c => new SelectListItem
			{
				Value = c.Id.ToString(),
				Text = c.FullName
			}).ToList();
		}

		public async Task<Client> GetClientByIdAsync(int id)
		{
			return await this._crudService.GetEntityByIdAsync<Client>(id, "Client");
		}

		public async Task<Client> GetEntityAsync()
		{
			return await this._crudService.GetEntityAsync<Client>("Client");
		}

		public async Task<List<Coach>?> GetCoaches()
		{
			string url = "http://localhost:5067/Coach";

			return await this._crudService.GetListEntity<Coach>(url);
		}

		public async Task<List<Workout>?> GetWorkoutsForCoach(int? coachId)
		{
			if (!coachId.HasValue)
			{
				return await this._crudService.GetListEntity<Workout>("http://localhost:5067/Workout");
			}

			string url = $"http://localhost:5067/Workout/ByCoach/{coachId}";
			return await _crudService.GetListEntity<Workout>(url);
		}
	}
}

