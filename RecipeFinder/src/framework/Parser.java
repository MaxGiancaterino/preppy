package framework;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import preppy.structures.Recipe;

public class Parser {
	
	public static List<Recipe> readRecipeJSONs(String recipeFile) {
		// read the file into a stringbuilder
		StringBuilder sb = new StringBuilder(1000);
		try {
			BufferedInputStream reader = new BufferedInputStream(new FileInputStream(recipeFile));
			int c = 0;
	        while ((c = reader.read()) != -1) {
	            sb.append((char) c);
	        }
	        reader.close();
		} catch (IOException e) {
	        throw new RuntimeException(e);
	    }
		
		// convert string to JSON
		JSONObject parentObj = new JSONObject(sb.toString());
		JSONArray recipeJSONArray = parentObj.getJSONArray("recipes");
		
		// parse a recipe object from each recipe JSON
		ArrayList<Recipe> recipes = new ArrayList<Recipe>();
		for (int i = 0; i < recipeJSONArray.length(); i++) {
			JSONObject o = recipeJSONArray.getJSONObject(i);
			recipes.add(new Recipe(o));
		}
		
		return new ArrayList<Recipe>();
	}
	
}
