package framework;

import java.io.File;

import org.jsoup.nodes.Document;

public class Main {
	public static boolean DEBUG = true;
	public static boolean PROGRESS = true;
	
	public static int requestDelayMS = 1500;
	
	public static final int firstIndex = 006663;
	public static final int chickenMarsala = 219763;
	
	public static final String outDirectory = "recipes_HTML";
	
	public static void main(String[] args) {
		if (args.length > 2) {
			System.out.println("Incorrect usage. Use:");
			System.out.println("[startingRecipeID] [numToDownload]");
			System.out.println("-set (numToDownload) negative to download indefinitely");
			System.exit(1);
		}
		
		// parse variables
		int startingIndex = chickenMarsala;
		if (args.length >= 1) {
			startingIndex = Integer.parseInt(args[0]);
		}
		int numToDownload = 0;
		if (args.length >= 2) {
			numToDownload = Integer.parseInt(args[1]);
			if (numToDownload < 0)
				numToDownload = Integer.MAX_VALUE / 2;
		}
		
		// create the directory to dump the files, if it doesn't exist
		File f = new File(outDirectory);
		if (!f.exists()) {
			f.mkdirs();
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
				HTTPInterfacer.saveHTML(doc, outDirectory + "/" + indexStr + ".html");
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
	}
}