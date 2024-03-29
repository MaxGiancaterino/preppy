package framework;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.jsoup.nodes.Document;

import preppy.structures.Recipe;

public class Parser {

	public static final String inDirectory = "scraped_HTML";
	public static final String outDirectory = "parsed_JSON";
	
	public static int hitCounter = 0;
	public static int missCounter = 0;
	public static Object lock = new Object();
	
	public static Object indexLock = new Object();
	public static int currIndex = 0;

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
		
		System.out.println("Parsing recipes " + startingIndex + " to " + endingIndex);
		System.out.println("Using " + numThreads + " threads");
		
		// create output directory if it doesn't exist
		File f = new File(outDirectory);
		if (!f.exists()) {
			f.mkdir();
		}
		
		// get threads started
		List<Thread> threadList = new ArrayList<Thread>();
		for (int i = 0; i < numThreads; i++) {
			
			Thread t = new Thread(new Runnable() {
				public void run() {						
					// loop until done
					while (true) {
						
						// get an integer
						int index = 0;
						synchronized (indexLock) {
							index = currIndex;
							currIndex++;
						}
						
						// if this index is greater than the maximum, kill the thread
						if (index > endingIndex) {
							break;
						}
						
						// convert the current ID to a string, and pad it with 0s
						String indexStr = Integer.toString(index);
						while (indexStr.length() < 6) {
							indexStr = "0" + indexStr;
						}
						
						// open the file, convert to document
						Document doc = HTMLParser.loadHTML(inDirectory + "/" + indexStr + ".html");
						if (doc == null) { // if this recipe hasn't been downloaded
							synchronized (lock) {
								missCounter++;
							}
							continue;
						} else {
							hitCounter++;
						}
						
						// parse the recipe from HTML
						Recipe recipe = HTMLParser.parseAllrecipesHTML(doc);
						recipe.recipeID = index;
						
						// write the recipe to file
						JSONObject recipeObj = recipe.getJSON();
						try {
							PrintWriter writer = new PrintWriter(outDirectory + "/" + recipe.recipeID + ".json");
							writer.println(recipeObj.toString(4));
							writer.close();
						} catch (FileNotFoundException e) {
							e.printStackTrace();
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
			int numTried = hitCounter + missCounter;
			System.out.println("done " + numTried +
							   " out of " + (endingIndex - startingIndex) +
							   " - " + ((double)numTried / (double)(endingIndex - startingIndex)) * 100.0 + "%");
			
			// if no threads are alive, break
			if (!alive) {
				break;
			}
		}
		
		// close up
		System.out.println("-----DONE-----");
		System.out.println(hitCounter + " RECIPES PARSED");
		System.out.println(missCounter + " RECIPES NOT FOUND");
	}
	
}
