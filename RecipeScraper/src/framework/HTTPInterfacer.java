package framework;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;

import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class HTTPInterfacer {
	
	public static Document getAllrecipesHTML(String recipeID) {
		// continue trying to get the document
		Document doc = null;
		while (true) {
			try {
				doc = Jsoup.connect("https://www.allrecipes.com/recipe/" + recipeID + "/").get();
				break;
			} catch (HttpStatusException e) {
				if (e.getStatusCode() == 404) {
					break;
				}
			} catch (IOException e) {
				e.printStackTrace();
			}

			// if this doesn't work the first time,
			// wait a few seconds so that the server doesn't think we're doxxing it
			try {
				Thread.sleep(Main.requestDelayMS);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		// return the doc
		return doc;
	}
	
	
	public static Document getCookbooksHTML(String recipeID) {
		// continue trying to get the document
		Document doc = null;
		while (true) {
			try {
				doc = Jsoup.connect("http://www.cookbooks.com/Recipe-Details.aspx?id=" + recipeID).get();
				break;
			} catch (HttpStatusException e) {
				if (e.getStatusCode() == 404) {
					break;
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		// check for corrupted document
		if (doc.select("p.H2 font").size() == 0) {
			return null;
		}
		
		// return the doc
		return doc;
	}
	
	// save this document object as a text file
	public static void saveHTML(Document d, String filename) {
		try {
			PrintWriter writer = new PrintWriter(filename, "UTF-8");
			writer.print(d.html());
			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// attempt to load a document
	public static Document loadHTML(String filename) {
		try {
			// open a file reader
			File file = new File(filename); 
			if (!file.exists()) {
				return null;
			}
			BufferedReader br = new BufferedReader(new FileReader(file)); 
			
			// build a string containing the file contents
			StringBuilder docString = new StringBuilder();
			String tempString = null;
			while ((tempString = br.readLine()) != null) {
				docString.append(tempString);
			} 
			br.close();
		
			// create a document object
			Document doc = new Document(filename);
			doc.html(docString.toString());
			return doc;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
