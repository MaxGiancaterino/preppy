package framework;

import java.util.ArrayList;

import org.json.JSONObject;

public class Recipe {
	public String name = "";
	public ArrayList<IngredientListing> ingredients = new ArrayList<IngredientListing>();
	public ArrayList<PrepStep> preparation = new ArrayList<PrepStep>();
	public TimeUnit prepTime = new TimeUnit();
	public TimeUnit cookTime = new TimeUnit();
	public int numServings = -1;
	public String imgURL = "";
	public String rating = "";
	public String pageURL = "";
	public ArrayList<String> nutrition = new ArrayList<String>();
	public RecipeEnum source;
	public boolean allRecipesNewFormat = false;
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("name", name);
		for (IngredientListing i : ingredients) {
			rec.append("ingredients", i.getJSON());
		}
		for (PrepStep i : preparation) {
			rec.append("preparation", i.getJSON());
		}
		rec.put("prepTime", prepTime.getJSON());
		rec.put("cookTime", cookTime.getJSON());
		rec.put("numServings", numServings);
		rec.put("imgURL", imgURL);
		rec.put("rating", rating);
		rec.put("pageURL", pageURL);
		for (String n : nutrition) {
			rec.append("nutrition", n);
		}
		rec.put("source", source.toString());
		
		return rec;
	}
}
