package framework;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashSet;

import org.json.JSONObject;

import preppy.structures.IngredientListing;
import preppy.structures.Recipe;

public class Filterer {
	
	public static final String inDirectory = "processed_JSON";
	public static final String optionsDirectory = "filter_options";
	public static final String outDirectory = "filter_JSON";
	public static final String outCumulativeDirectory = "filter_cumulative";

	public static void main(String[] args) {
		if (args.length < 1 || args.length > 3) {
			System.out.println("Incorrect usage. Use:");
			System.out.println("[startingRecipeID] [endingRecipeID]");
			System.exit(1);
		}
		
		// parse variables
		final int startingIndex;
		if (args.length >= 1) {
			startingIndex = Integer.parseInt(args[0]);
		} else {
			startingIndex = 0;
		}
		
		final int endingIndex;
		if (args.length >= 2) {
			endingIndex = Integer.parseInt(args[1]);
		} else {
			endingIndex = 225000;
		}
		
		System.out.println("Filtering recipes " + startingIndex + " to " + endingIndex);
		
		// read all recipe files in range
		ArrayList<Recipe> recipes = new ArrayList<Recipe>();
		for (int i = startingIndex; i < endingIndex; i++) {
			Recipe r;
			try {
				r = Recipe.readRecipeJSON(inDirectory + "/" + i + ".json");
				recipes.add(r);
			} catch (IOException e) {
				// do nothing
			}
		}

		// read acceptable ingredients from file
		HashSet<String> ingredients = new HashSet<String>();
		try {
			BufferedReader reader = new BufferedReader(new FileReader(optionsDirectory + "/" + "accepted_ingredients.txt"));
			
			while (true) {
				String line = reader.readLine();
				if (line == null) {
					break;
				} else {
					ingredients.add(line.trim());
				}
			}
	        reader.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		for (String s : ingredients) {
			System.out.println(s);
		}
		
		// create a set containing only recipes that contain only these ingredients
		ArrayList<Recipe> filteredRecipes = new ArrayList<Recipe>();
		for (Recipe r : recipes) {
			boolean acceptRecipe = true;
			for (IngredientListing i : r.ingredients) {
				if (!ingredients.contains(i.ingID)) {
					acceptRecipe = false;
					break;
				}
			}
			
			if (acceptRecipe) {
				filteredRecipes.add(r);
			}
		}
		
		// create needed directories if they dont exist
		File filterDir = new File(outDirectory);
		if (!filterDir.exists()) {
			filterDir.mkdir();
		}
		File filter2Dir = new File(outCumulativeDirectory);
		if (!filter2Dir.exists()) {
			filter2Dir.mkdir();
		}
		
		// write individual JSONs to file
		for (Recipe r : filteredRecipes) {
			JSONObject recipeObj = r.getJSON();
			try {
				PrintWriter writer = new PrintWriter(outDirectory + "/" + r.recipeID + ".json");
				writer.println(recipeObj.toString(4));
				writer.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		}
		
		// write cumulative JSONs to file
		HTMLParser.writeRecipeJSON(outCumulativeDirectory, filteredRecipes);
		HTMLParser.writeAbridgedJSON(outCumulativeDirectory, filteredRecipes);
		HTMLParser.writeMisc(outCumulativeDirectory, filteredRecipes);
	}

}
