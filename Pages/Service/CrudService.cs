using System.Text.Json;

namespace GymProjectClient.Pages.Service
{
	public class CrudService
	{
		private HttpClient _httpClient;

		public CrudService()
		{
			this._httpClient = new HttpClient();
		}

		public async Task<T> GetEntityByIdAsync<T>(int id, string entityType)
		{
			string url = $"http://localhost:5067/{entityType}/{id}";
			var response = await this._httpClient.GetAsync(url);
			response.EnsureSuccessStatusCode();

			return await response.Content.ReadFromJsonAsync<T>();
		}

		public async Task<T> GetEntityAsync<T>(string entityType)
		{
			string url = $"http://localhost:5067/{entityType}/current";
			var response = await this._httpClient.GetAsync(url);
			response.EnsureSuccessStatusCode();

			return await response.Content.ReadFromJsonAsync<T>();
		}

		public async Task<List<T>?> GetListEntity<T>(string apiEndpoint)
		{
			var response = await _httpClient.GetAsync(apiEndpoint);
			response.EnsureSuccessStatusCode();

			try
			{
				return await response.Content.ReadFromJsonAsync<List<T>>();
			}
			catch (JsonException ex)
			{
				Console.Error.WriteLine($"Ошибка десериализации JSON: {ex.Message}");
				return null;
			}
		}
	}
}
