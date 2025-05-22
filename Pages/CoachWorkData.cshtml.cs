using System.Net.Http;
using gym_project_business_logic.Model;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace GymProjectClient.Pages
{
	public class CoachWorkDataModel : PageModel
	{
		public int ciachId;

		public Coach? Coach { get; set; }

        private static readonly HttpClient httpClient = new HttpClient();

        public void OnPost(int id)
		{
			this.Coach = this.GetCoachByIdAsync(id);
        }
		public Coach GetCoachByIdAsync(int id)
		{

            string url = "http://localhost:5067/Coach/1"; // ”кажите нужный URL

          
            var response = httpClient.GetAsync(url).Result;

                var a = response.Content.ReadAsStringAsync().Result;
                var coach = JsonConvert.DeserializeObject<Coach>(a);
                return coach; 
               
        }
	}
}
