package framework;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.json.JSONObject;

import preppy.structures.IngredientListing;
import preppy.structures.Recipe;

public class Processor {
	
	public static final String inDirectory = "recipes_JSON";
	public static final String outDirectory = "recipes_processed_JSON";
	public static final String outOtherDirectory = "recipes_processed_other";
	
	public static Object lock = new Object();
	public static int missCounter = 0;
	
	public static void processRecipe(Recipe r) {
		// get the list of ingredients here
		List<IngredientListing> ingreds = r.ingredients;
		
		// create a new, empty ingredient list in this recipe
		r.ingredients = new ArrayList<IngredientListing>();
		
		// populate the ingredient list with properly parsed ingredients
		for (IngredientListing l : ingreds) {
			r.ingredients.add(IngredientListing.parseIngredientListing(l.raw));
		}
	}

	public static void main(String[] args) {
		if (args.length < 1 || args.length > 3) {
			System.out.println("Incorrect usage. Use:");
			System.out.println("(numThreads) [startingRecipeID] [endingRecipeID]");
			System.exit(1);
		}
		
		// parse variables
		final int numThreads;
		if (args.length >= 1) {
			numThreads = Integer.parseInt(args[0]);
		} else {
			numThreads = 1;
		}
		
		final int startingIndex;
		if (args.length >= 2) {
			startingIndex = Integer.parseInt(args[1]);
		} else {
			startingIndex = 0;
		}
		
		final int endingIndex;
		if (args.length >= 3) {
			endingIndex = Integer.parseInt(args[2]);
		} else {
			endingIndex = 225000;
		}
		
		System.out.println("Parsing recipes " + startingIndex + " to " + endingIndex);
		System.out.println("Using " + numThreads + " threads");
		
		// create the containing collection
		List<Recipe> recipes = Collections.synchronizedList(new ArrayList<Recipe>());
		
		// determine scope of each thread
		int threadAmt = (endingIndex - startingIndex) / numThreads;
		
		// get threads started
		List<Thread> threadList = new ArrayList<Thread>();
		for (int i = 0; i < numThreads; i++) {
			final int threadNum = i;
			
			Thread t = new Thread(new Runnable() {
				public void run() {						
					// loop from thread's starting recipe ID to ending recipe ID
					int firstThreadRecipe = startingIndex + (threadNum * threadAmt);
					int lastThreadRecipe = (threadNum + 1 == numThreads) ?
							(endingIndex + 1) :
							(startingIndex + ((threadNum + 1) * threadAmt));
					for (int recipeNum = firstThreadRecipe;
						 recipeNum < lastThreadRecipe;
						 recipeNum++) {
						
						// convert the current ID to a string, and pad it with 0s
						//String indexStr = Integer.toString(recipeNum);
						//while (indexStr.length() < 6) {
						//	indexStr = "0" + indexStr;
						//}
						
						// open the file, convert to document
						try {
							Recipe r = Recipe.readRecipeJSON(inDirectory + "/" + recipeNum + ".json");
							if (r == null) {
								throw new IOException();
							}
							
							processRecipe(r);
							recipes.add(r);
						} catch (IOException e) {
							synchronized (lock) {
								missCounter++;
							}
						}
					}
				}
			});
			threadList.add(t);
			t.start();
		}
		
		// wait for all the threads to finish, checking progress every N seconds
		while (true) {
			// pause for a couple seconds
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			// check all threads to see if any are alive
			boolean alive = false;
			for (Thread t : threadList) {
				if (t.isAlive()) {
					alive = true;
					break;
				}
			}
			
			// compute the number of recipes done being parsed
			int numTried = recipes.size() + missCounter;
			System.out.println("done " + numTried +
							   " out of " + (endingIndex - startingIndex) +
							   " - " + ((double)numTried / (double)(endingIndex - startingIndex)) * 100.0 + "%");
			
			// if no threads are alive, break
			if (!alive) {
				break;
			}
		}
		
		// write all the recipes
		System.out.println("WRITING " + recipes.size() + " RECIPES...");
		
		// create needed directories if they dont exist
		File outDir = new File(outDirectory);
		if (!outDir.exists()) {
			outDir.mkdir();
		}
		File out2Dir = new File(outOtherDirectory);
		if (!out2Dir.exists()) {
			out2Dir.mkdir();
		}
		
		// write individual JSONs to file
		for (Recipe r : recipes) {
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
		HTMLParser.writeRecipeJSON(outOtherDirectory, recipes);
		HTMLParser.writeAbridgedJSON(outOtherDirectory, recipes);
		HTMLParser.writeMisc(outOtherDirectory, recipes);
		System.out.println(recipes.size() + " RECIPES PARSED");
	}

}
