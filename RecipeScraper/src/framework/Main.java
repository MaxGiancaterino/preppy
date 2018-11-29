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
		if (args.length > 3) {
			System.out.println("Incorrect usage. Use:");
			System.out.println("(refreshRecipes) [numRecipes] [startingRecipeID]");
			System.out.println("Set (refreshRecipes) to 0 to parse or 1 to download");
			System.exit(1);
		}
		
		// parse variables
		int mode = Integer.parseInt(args[0]);
		int numToDownload = 0;
		int startingIndex = chickenMarsala;
		if (args.length >= 2) {
			numToDownload = Integer.parseInt(args[1]);
		}
		if (args.length == 3) {
			startingIndex = Integer.parseInt(args[2]);
		}
		
		// check the current mode
		if (mode == 1) { // download recipes
			System.out.println("Downloading " + numToDownload + " recipes");
			System.out.println("Starting at " + startingIndex);
			
			int currIndex = startingIndex;
			int numComplete = 0;
			int numSuccess = 0;
			while (currIndex < (startingIndex + numToDownload)) {
				// convert the current ID to a string, and pad it with 0s
				String indexStr = Integer.toString(currIndex);
				while (indexStr.length() < 6) {
					indexStr = "0" + indexStr;
				}
				
				// retrieve and parse the recipe
				Document doc = HTTPInterfacer.getAllrecipesHTML(indexStr);
				String nameString;
				if (doc != null) {
					HTTPInterfacer.saveHTML(doc, "recipecache/" + indexStr + ".html");
					nameString = "SUCCESS";
					numSuccess++;
				} else {
					nameString = "NOT FOUND";
				}
				
				// increment the index and counter
				currIndex++;
				numComplete++;
				
				// print progress
				System.out.println("(" + numComplete + "/" + numToDownload + ") " + indexStr + ": " + nameString);
				
				// wait a few seconds so that the server doesn't think we're doxxing it
				try {
					Thread.sleep(requestDelayMS);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			
			System.out.println(numSuccess + " RECIPES DOWNLOADED");
		} else { // parse recipes
			System.out.println("Parsing all existing recipes");
			
			ArrayList<Recipe> recipes = new ArrayList<Recipe>();
			final int numToLoad = 1000000;
			for (int i = 0; i < numToLoad; i++) {
				
				// convert the current ID to a string, and pad it with 0s
				String indexStr = Integer.toString(i);
				while (indexStr.length() < 6) {
					indexStr = "0" + indexStr;
				}
				
				// open the file, convert to document
				Document doc = HTTPInterfacer.loadHTML("recipecache/" + indexStr + ".html");
				if (doc == null) { // if this recipe hasn't been downloaded
					continue;
				}
				System.out.println(indexStr);
				Recipe recipe = HTMLParser.parseAllrecipesHTML(doc);
				recipes.add(recipe);
				
				// print progress at a milestone
				if (i % 1000 == 0) {
					System.out.println(((double)i / (double)numToLoad) * 100.0 + "% done parsing");
				}
			}
			
			// write all the recipes
			System.out.println(recipes.size() + " RECIPES PARSED");
			HTMLParser.writeRecipeJSONs(recipes);
		}
	}
}