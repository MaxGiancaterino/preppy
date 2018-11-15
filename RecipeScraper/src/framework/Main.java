package framework;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;

import org.apache.http.client.ClientProtocolException;
import org.jsoup.nodes.Document;

public class Main {
	public static boolean DEBUG = true;
	public static boolean PROGRESS = true;
	
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
		ArrayList<Recipe> recipes = new ArrayList<Recipe>();
		while (currIndex < (startingIndex + numToParse)) {
			// convert the current ID to a string, and pad it with 0s
			String indexStr = Integer.toString(currIndex);
			while (indexStr.length() < 6) {
				indexStr = "0" + indexStr;
			}
			
			// retrieve and parse the recipe
			Document doc = HTTPInterfacer.getAllrecipesHTML(indexStr);
			if (doc != null) {
				Recipe recipe = HTTPInterfacer.parseAllrecipesHTML(doc);
				recipes.add(recipe);
				System.out.println(indexStr + ": " + recipe.name);
			} else {
				System.out.println(indexStr + ": NOT FOUND");
			}
			
			// increment the index
			currIndex++;
			
			// wait a few seconds so that the server doesn't think we're doxxing it
			try {
				Thread.sleep(3000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		// write all the recipes
		System.out.println(recipes.size() + " RECIPES PARSED");
		HTTPInterfacer.writeRecipeJSONs(recipes);
	}
}