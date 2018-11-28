package framework;

import java.util.ArrayList;

import org.jsoup.nodes.Document;

public class Main {
	public static boolean DEBUG = true;
	public static boolean PROGRESS = true;
	
	public static int requestDelayMS = 3000;
	
	public static final int firstIndex = 006663;
	public static final int chickenMarsala = 219763;
	
	public static void main(String[] args) {
		if (args.length > 2) {
			System.out.println("incorrect usage. optionally takes one argument:");
			System.out.println("(numRecipes) [startingRecipeID]");
			System.exit(1);
		}
		
		// set the index to start at, if defined
		int startingIndex = chickenMarsala;
		if (args.length == 2) {
			startingIndex = Integer.parseInt(args[1]);
		}
		
		// set the number of recipes to parse
		int numToParse = Integer.parseInt(args[0]);
		
		// grab the HTML page and parse the recipe
		int currIndex = startingIndex;
		int numComplete = 0;
		ArrayList<Recipe> recipes = new ArrayList<Recipe>();
		while (currIndex < (startingIndex + numToParse)) {
			// convert the current ID to a string, and pad it with 0s
			String indexStr = Integer.toString(currIndex);
			while (indexStr.length() < 6) {
				indexStr = "0" + indexStr;
			}
			
			// retrieve and parse the recipe
			Document doc = HTTPInterfacer.getAllrecipesHTML(indexStr);
			String nameString;
			if (doc != null) {
				HTMLParser.saveHTML(doc, "out/" + indexStr + ".html");
				Recipe recipe = HTMLParser.parseAllrecipesHTML(doc);
				recipes.add(recipe);
				nameString = recipe.name;
			} else {
				nameString = "NOT FOUND";
			}
			
			// print progress
			System.out.println("(" + numComplete + "/" + numToParse + ") " + indexStr + ": " + nameString);
			
			// increment the index and counter
			currIndex++;
			numComplete++;
			
			// wait a few seconds so that the server doesn't think we're doxxing it
			try {
				Thread.sleep(requestDelayMS);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		// write all the recipes
		System.out.println(recipes.size() + " RECIPES PARSED");
		HTMLParser.writeRecipeJSONs(recipes);
	}
}