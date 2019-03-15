package preppy.structures;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

public class Recipe {
	public String name = "";
	public int recipeID = -1;
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
	
	public Recipe() {};
	
	public Recipe(JSONObject json) {
		name = json.getString("name");
		recipeID = json.getInt("id");
		
		JSONArray ingredientJSONs = json.getJSONArray("ingredients");
		for (int i = 0; i < ingredientJSONs.length(); i++) {
			JSONObject o = ingredientJSONs.getJSONObject(i);
			ingredients.add(new IngredientListing(o));
		}
		
		JSONArray prepStepJSONs = json.getJSONArray("preparation");
		for (int i = 0; i < prepStepJSONs.length(); i++) {
			JSONObject o = prepStepJSONs.getJSONObject(i);
			preparation.add(new PrepStep(o));
		}
		
		prepTime = new TimeUnit(json.getJSONObject("prepTime"));
		cookTime = new TimeUnit(json.getJSONObject("cookTime"));
		numServings = json.getInt("numServings");
		imgURL = json.getString("imgURL");
		rating = json.getString("rating");
		pageURL = json.getString("pageURL");
		
		JSONArray nutritionStrings = json.getJSONArray("nutrition");
		for (int i = 0; i < nutritionStrings.length(); i++) {
			nutrition.add(nutritionStrings.getString(i));
		}
		
		source = RecipeEnum.valueOf(json.getString("source"));
	}
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("name", name);
		rec.put("id", recipeID);
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
	
	/**
	 * @param recipeFile A file containing a single recipe in JSON
	 * @return A Recipe object
	 */
	public static Recipe readRecipeJSON(String recipeFile) throws IOException {
		// read the file into a stringbuilder
		StringBuilder sb = new StringBuilder(1000);
		BufferedInputStream reader = new BufferedInputStream(new FileInputStream(recipeFile));
		int c = 0;
        while ((c = reader.read()) != -1) {
            sb.append((char) c);
        }
        reader.close();
		
		// convert string to JSON
		JSONObject recipeObj = new JSONObject(sb.toString());
		return new Recipe(recipeObj);
	}
}
