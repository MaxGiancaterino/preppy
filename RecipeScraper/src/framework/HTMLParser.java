package framework;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import org.json.JSONObject;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class HTMLParser {
	
	public static Recipe parseAllrecipesNew(Document doc) {
		System.out.println("detected NEW html format");
		
		// create the item, parse the name
		Recipe ret = new Recipe();
		ret.name = doc.select("div.intro h1.headline").first().text();
		
		// parse the ingredient list
		Elements ingredients = doc.select("li.ingredients-item");
		for (Element e : ingredients) {
			String itemString = e.select("label.checkbox-list").first().text();
			if (!itemString.isEmpty())
				ret.ingredients.add(IngredientListing.parseIngredientListing(itemString));
		}
		
		// parse the direction
		Elements directions = doc.select("li.instructions-section-item");
		for (int i = 0; i < directions.size(); i++) {
			Element e = directions.get(i);
			String directionItem = e.select("div.section-body p").first().text();
			if (!directionItem.isEmpty()) {
				PrepStep step = new PrepStep();
				step.instruction = directionItem;
				step.stepNumber = i + 1;
				ret.preparation.add(step);
			}
		}
		
		// parse the prep time, cook time, num servings
		Elements metaInformation = doc.select("div.recipe-meta-item");
		ret.prepTime = TimeUnit.parseTimeUnit(metaInformation.get(0).select("div.recipe-meta-item-body").first().text());
		ret.cookTime = TimeUnit.parseTimeUnit(metaInformation.get(1).select("div.recipe-meta-item-body").first().text());
		ret.numServings = Integer.parseInt(metaInformation.get(3).select("div.recipe-meta-item-body").first().text());

		// parse remaining details
		ret.imgURL = doc.select("span.lazy-image.ugc-photos-link").first().attr("data-src");
		//ret.rating = doc.select("div.rating-stars").first().attr("data-ratingstars");
		ret.pageURL = doc.baseUri();
		
		// parse nutrition (work on this)
		String nutrition = doc.select("div.recipe-nutrition-section div.section-body").first().text();
		String[] nutritionItems = nutrition.split(";");
		for (int i = 0; i < nutritionItems.length; i++) {
			String currItem = nutritionItems[i];
			currItem = currItem.trim().toLowerCase();
			ret.nutrition.add(currItem);
		}
		
		return ret;
	}
	
	public static Recipe parseAllrecipesOld(Document doc) {
		System.out.println("detected OLD html format");
		
		// create blank recipe and parse name
		Recipe ret = new Recipe();
		ret.name = doc.select("#recipe-main-content").first().text();
		
		// parse ingredients
		Elements ingredientLists = doc.select("div#polaris-app ul");
		for (Element l : ingredientLists) {
			for (Element e : l.select("li")) {
				String ingredientItem = e.select("label").first().attr("title");
				if (!ingredientItem.isEmpty())
					ret.ingredients.add(IngredientListing.parseIngredientListing(ingredientItem));
			}
		}
		
		// parse directions
		Elements directions = doc.select("ol.recipe-directions__list li");
		for (int i = 0; i < directions.size(); i++) {
			Element e = directions.get(i);
			String directionItem = e.select("span").first().text();
			if (!directionItem.isEmpty()) {
				PrepStep step = new PrepStep();
				step.instruction = directionItem;
				step.stepNumber = i + 1;
				ret.preparation.add(step);
			}
		}
		
		// parse prep and cook time
		ret.prepTime = TimeUnit.parseTimeUnit(doc.select("time[itemprop=prepTime]").first().text());
		ret.cookTime = TimeUnit.parseTimeUnit(doc.select("time[itemprop=cookTime]").first().text());
		
		// parse misc
		ret.numServings = Integer.parseInt(doc.select("meta#metaRecipeServings").first().attr("content"));
		ret.imgURL = doc.select("img.rec-photo").first().attr("src");
		ret.rating = doc.select("div.rating-stars").first().attr("data-ratingstars");
		ret.pageURL = doc.baseUri();
		
		// parse nutrition
		Elements nutrition = doc.select("div.nutrition-body");
		for (Element e : nutrition) {
			String nutrientName = e.select("span.nutrient-name").first().text();
			String nutrientValue = e.select("span.nutrient-value").first().text();
			ret.nutrition.add(nutrientName + " " + nutrientValue);
		}
		
		return ret;
	}

	public static Recipe parseAllrecipesHTML(Document doc) {
		Recipe ret = null;
		if (doc.select("#recipe-main-content").size() == 0) {
			ret = parseAllrecipesNew(doc);
		} else {
			ret = parseAllrecipesOld(doc);
		}
		
		ret.source = RecipeEnum.ALLRECIPES;
		return ret;
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
			ret.ingredients.add(IngredientListing.parseIngredientListing(s));
		}
		
		// parse the instructions
		/*
		Element prepDiv = doc.select("tbody tr td span.H2:contains(preparation)").first().parent();
		Elements prepChunks = prepDiv.select("p.H1");
		String prepString = "";
		for (int i = 0; i < prepChunks.size(); i++) {
			prepString += prepChunks.get(i).text();
		}
		ret.preparation = prepString;
		*/
		
		ret.source = RecipeEnum.COOKBOOKS;
		
		return ret;
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
