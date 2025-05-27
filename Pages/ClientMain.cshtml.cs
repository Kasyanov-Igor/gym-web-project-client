using gym_project_business_logic.Model;
using GymProjectClient.Pages.Service;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Model.Entities;

namespace GymProjectClient.Pages
{
    public class ClientMainModel : PageModel
    {
        public List<Gym>? Gyms { get; set; }

        public List<Workout>? Workouts { get; set; }

        private CrudService _crudService;

        public DateTime Date;

        public Client Client;

        public async Task OnGetAsync(string id)
        {
            this.Client = await this.GetClientByIdAsync(Convert.ToInt32(id));
            this.Gyms = await this.GetGyms();
            this.Workouts = await this.GetWorkouts();
        }

        public ClientMainModel() 
        {
            this.Date = DateTime.Now;
            this._crudService = new CrudService();
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

        public async Task<Client> GetClientByIdAsync(int id)
        {
            return await this._crudService.GetEntityByIdAsync<Client>(id, "Client");
        }
    }
}
