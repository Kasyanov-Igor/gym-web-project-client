using gym_project_business_logic.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GymProjectClient.Pages
{
	public class ClientsModel : PageModel
	{
		public Client client { get; set; }
		public void OnGet()
		{
		}

		public void OnPostLogin([FromBody] Client clientLogin) 
		{ 
			this.client = clientLogin;
		}
	}
}
