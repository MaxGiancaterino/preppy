package framework;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import org.json.JSONObject;

import preppy.structures.IngredientListing;
import preppy.structures.Recipe;

public class Processor {
	
	public static final String inDirectory = "parsed_JSON";
	public static final String outDirectory = "processed_JSON";
	public static final String outOtherDirectory = "processed_cumulative";
	
	public static final String inFilterDirectory = "filter_options";
	public static final String outFilterDirectory = "filter_JSON";
	public static final String outFilterCumulativeDirectory = "filter_cumulative";
	
	public static Object lock = new Object();
	public static int missCounter = 0;
	
	public static Object indexLock = new Object();
	public static int currIndex = 0;
	
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
		currIndex = startingIndex;
		
		final int endingIndex;
		if (args.length >= 3) {
			endingIndex = Integer.parseInt(args[2]);
		} else {
			endingIndex = 225000;
		}
		
		System.out.println("Processing recipes " + startingIndex + " to " + endingIndex);
		System.out.println("Using " + numThreads + " threads");
		
		// create the containing collection
		List<Recipe> recipes = Collections.synchronizedList(new ArrayList<Recipe>());
		
		// get threads started
		List<Thread> threadList = new ArrayList<Thread>();
		for (int i = 0; i < numThreads; i++) {			
			Thread t = new Thread(new Runnable() {
				public void run() {
					while (true) {
						
						// get the current index number
						int index = 0;
						synchronized (indexLock) {
							index = currIndex;
							currIndex++;
						}
						
						// if this index is greater than the maximum, kill the thread
						if (index > endingIndex) {
							break;
						}
						
						// open the file, convert to document
						try {
							Recipe r = Recipe.readRecipeJSON(inDirectory + "/" + index + ".json");
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
			
			// compute the number of recipes done being processed
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
		
		// announce finished processing
		System.out.println(recipes.size() + " RECIPES PROCESSED");
	}

}
