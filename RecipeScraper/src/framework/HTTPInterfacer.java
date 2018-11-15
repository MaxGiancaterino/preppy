package framework;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.json.*;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

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
		}
		
		// return the doc
		return doc;
	}
	
	public static Recipe parseAllrecipesHTML(Document doc) {
		Recipe ret = new Recipe();
		ret.name = doc.select("#recipe-main-content").first().text();
		Elements ingredientLists = doc.select("div#polaris-app ul");
		for (Element l : ingredientLists) {
			for (Element e : l.select("li")) {
				String ingredientItem = e.select("label").first().attr("title");
				if (!ingredientItem.isEmpty())
					ret.ingredients.add(ingredientItem);
			}
		}
		Elements directions = doc.select("ol.recipe-directions__list li");
		for (Element e : directions) {
			String directionItem = e.select("span").first().text();
			if (!directionItem.isEmpty())
				ret.preparation.add(directionItem);
		}
		ret.prepTime = doc.select("span.ready-in-time").first().text();
		ret.numServings = Integer.parseInt(doc.select("meta#metaRecipeServings").first().attr("content"));
		ret.imgURL = doc.select("img.rec-photo").first().attr("src");
		ret.rating = doc.select("div.rating-stars").first().attr("data-ratingstars");
		ret.pageURL = doc.baseUri();
		Elements nutrition = doc.select("div.nutrition-body");
		for (Element e : nutrition) {
			String nutrientName = e.select("span.nutrient-name").first().text();
			String nutrientValue = e.select("span.nutrient-value").first().text();
			ret.nutrition.add(nutrientName + " " + nutrientValue);
		}
		ret.source = RecipeEnum.ALLRECIPES;
		
		return ret;
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
	
	public static Recipe parseCookbooksHTML(Document doc) {
		Recipe ret = new Recipe();
		
		// parse the name of the recipe
		ret.name = doc.select("p.H2 font").first().text();

		// parse the ingredients
		Element ingredientsDiv = doc.select("tbody tr td span.H2:contains(ingredients)").first().parent();
		String ingredString = ingredientsDiv.select("p.H1").first().html();
		String[] ingredTokens = ingredString.split("<br>");
		
		for (String s : ingredTokens) {
			ret.ingredients.add(s);
		}
		
		// parse the instructions
		Element prepDiv = doc.select("tbody tr td span.H2:contains(preparation)").first().parent();
		Elements prepChunks = prepDiv.select("p.H1");
		String prepString = "";
		for (int i = 0; i < prepChunks.size(); i++) {
			prepString += prepChunks.get(i).text();
		}
		//ret.preparation = prepString;
		
		ret.source = RecipeEnum.COOKBOOKS;
		
		return ret;
	}
	
	public static void writeRecipeJSONs(ArrayList<Recipe> recipes) {
		// for each recipe
		JSONObject parentObj = new JSONObject();
		for (Recipe r : recipes) {
			// create the this recipe's JSON
			JSONObject rec = r.getJSON();
			
			// add this JSON to the parent
			parentObj.accumulate("recipes", rec);
		}
		
		// write the JSON to file
		try {
			PrintWriter writer = new PrintWriter("out/recipes.json", "UTF-8");
			writer.println(parentObj.toString(4));
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
}
