package framework;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.jsoup.nodes.Document;

public class Main {
	public static boolean DEBUG = true;
	public static boolean PROGRESS = true;
	
	public static int requestDelayMS = 3000;
	
	public static final int firstIndex = 006663;
	public static final int chickenMarsala = 219763;
	
	public static void main(String[] args) {
		if (args.length > 4) {
			System.out.println("Incorrect usage. Use one of:");
			System.out.println("download [startingRecipeID] [numToDownload]");
			System.out.println("-set (numToDownload) negative to download indefinitely");
			System.out.println("parse (numThreads) [startingRecipeID] [endingRecipeID]");
			System.exit(1);
		}
		
		// check the current mode
		if (args[0].equals("download")) {
			// parse variables
			int startingIndex = chickenMarsala;
			if (args.length >= 2) {
				startingIndex = Integer.parseInt(args[1]);
			}
			int numToDownload = 0;
			if (args.length >= 3) {
				numToDownload = Integer.parseInt(args[2]);
				if (numToDownload < 0)
					numToDownload = Integer.MAX_VALUE / 2;
			}
			
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
		} else if (args[0].equals("parse")) {
			// parse variables
			final int numThreads;
			if (args.length >= 2) {
				numThreads = Integer.parseInt(args[1]);
			} else {
				numThreads = 1;
			}
			
			final int startingIndex;
			if (args.length >= 3) {
				startingIndex = Integer.parseInt(args[2]);
			} else {
				startingIndex = 0;
			}
			
			final int endingIndex;
			if (args.length >= 4) {
				endingIndex = Integer.parseInt(args[3]);
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
			for (int i = 0; i < numThreads + 1; i++) {
				final int threadNum = i;
				
				Thread t = new Thread(new Runnable() {
					public void run() {
						
						// loop from thread's starting recipe ID to ending recipe ID
						for (int recipeNum = startingIndex + threadNum * threadAmt;
							 recipeNum < startingIndex + (threadNum + 1) * threadAmt;
							 recipeNum++) {
							
							// convert the current ID to a string, and pad it with 0s
							String indexStr = Integer.toString(recipeNum);
							while (indexStr.length() < 6) {
								indexStr = "0" + indexStr;
							}
							
							// open the file, convert to document
							Document doc = HTTPInterfacer.loadHTML("recipecache/" + indexStr + ".html");
							if (doc == null) { // if this recipe hasn't been downloaded
								continue;
							}
							
							System.out.println("thread " + threadNum + " done parsing recipe " + indexStr);
							Recipe recipe = HTMLParser.parseAllrecipesHTML(doc);
							recipes.add(recipe);
						}
					}
				});
				threadList.add(t);
				t.start();
			}
			
			// wait for all the threads to finish
			for (Thread t : threadList) {
				try {
					t.join();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			
			// OLD PARSER CODE
			/*
			for (int i = startingIndex; i < endingIndex; i++) {
				
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
			*/
			
			// write all the recipes
			System.out.println(recipes.size() + " RECIPES PARSED");
			HTMLParser.writeRecipeJSONs(recipes);
			HTMLParser.writeAbridgedJSON(recipes);
		}
	}
}