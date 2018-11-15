package framework;

import java.util.ArrayList;

import org.json.JSONObject;

public class Recipe {
	public String name = "";
	public ArrayList<String> ingredients = new ArrayList<String>();
	public ArrayList<String> preparation = new ArrayList<String>();
	public String prepTime = "";
	public int numServings = -1;
	public String imgURL = "";
	public String rating = "";
	public String pageURL = "";
	public ArrayList<String> nutrition = new ArrayList<String>();
	public RecipeEnum source;
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("name", name);
		for (String i : ingredients) {
			rec.append("ingredients", i);
		}
		for (String i : preparation) {
			rec.append("preparation", i);
		}
		rec.put("prepTime", prepTime);
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
