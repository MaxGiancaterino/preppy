package framework;

import java.io.IOException;

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
}
