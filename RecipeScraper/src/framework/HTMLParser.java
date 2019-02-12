package framework;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import preppy.structures.*;

public class HTMLParser {
	
	public static Recipe parseAllrecipesNew(Document doc) {		
		// create the item, parse the name
		Recipe ret = new Recipe();
		ret.name = doc.select("div.intro h1.headline").first().text();
		
		// parse the URL
		ret.pageURL = doc.select("link[rel=canonical]").first().attr("href");
		
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
		for (Element e : metaInformation) {
			if (e.text().toLowerCase().contains("prep")) {
				ret.prepTime = TimeUnit.parseTimeUnit(e.select("div.recipe-meta-item-body").first().text());
			} else if (e.text().toLowerCase().contains("cook")) {
				ret.cookTime = TimeUnit.parseTimeUnit(e.select("div.recipe-meta-item-body").first().text());
			} else if (e.text().toLowerCase().contains("servings")) {
				ret.numServings = Integer.parseInt(e.select("div.recipe-meta-item-body").first().text());
			}
		}
		
		/*
		ret.prepTime = TimeUnit.parseTimeUnit(metaInformation.get(0).select("div.recipe-meta-item-body").first().text());
		ret.cookTime = TimeUnit.parseTimeUnit(metaInformation.get(1).select("div.recipe-meta-item-body").first().text());
		ret.numServings = Integer.parseInt(metaInformation.get(3).select("div.recipe-meta-item-body").first().text());
		*/

		// parse remaining details
		if (doc.select("span.lazy-image.ugc-photos-link").size() > 0) {
			ret.imgURL = doc.select("span.lazy-image.ugc-photos-link").first().attr("data-src");
		} else {
			ret.imgURL = "null";
		}
		//ret.rating = doc.select("div.rating-stars").first().attr("data-ratingstars");
		
		// parse nutrition (work on this)
		String nutrition = doc.select("div.recipe-nutrition-section div.section-body").first().text();
		String[] nutritionItems = nutrition.split(";");
		for (int i = 0; i < nutritionItems.length; i++) {
			String currItem = nutritionItems[i];
			currItem = currItem.trim().toLowerCase();
			ret.nutrition.add(currItem);
		}
		
		// set format specifier
		ret.allRecipesNewFormat = true;
		
		return ret;
	}
	
	public static Recipe parseAllrecipesOld(Document doc) {		
		// create blank recipe and parse name
		Recipe ret = new Recipe();
		ret.name = doc.select("#recipe-main-content").first().text();
		
		// parse the URL
		ret.pageURL = doc.select("link[rel=canonical]").first().attr("href");
		
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
		// for some recipes, cook time and/or prep time are not present
		if (doc.select("time[itemprop=prepTime]").size() > 0) {
			ret.prepTime = TimeUnit.parseTimeUnit(doc.select("time[itemprop=prepTime]").first().text());
		}
		if (doc.select("time[itemprop=cookTime]").size() > 0) {
			ret.cookTime = TimeUnit.parseTimeUnit(doc.select("time[itemprop=cookTime]").first().text());
		}
		
		// parse misc
		ret.numServings = Integer.parseInt(doc.select("meta#metaRecipeServings").first().attr("content"));
		ret.imgURL = doc.select("img.rec-photo").first().attr("src");
		ret.rating = doc.select("div.rating-stars").first().attr("data-ratingstars");
		
		// parse nutrition
		// two formats: "footnote" format and "nutrition" format
		if (doc.select("section[itemprop=nutrition]").size() > 0) {
			String calorieContent = doc.select("span[itemprop=calories]").first().text();
			String fatContent = doc.select("span[itemprop=fatContent]").first().text() + "g fat";
			String carbContent = doc.select("span[itemprop=carbohydrateContent]").first().text() + "g carbohydrates";
			String proteinContent = doc.select("span[itemprop=proteinContent]").first().text() + "g protein";
			String cholesterolContent = doc.select("span[itemprop=cholesterolContent]").first().text() + "mg cholesterol";
			String sodiumContent = doc.select("span[itemprop=sodiumContent]").first().text() + "mg sodium";
			calorieContent = calorieContent.replaceAll(";", "").trim();
			fatContent = fatContent.trim();
			carbContent = carbContent.trim();
			proteinContent = proteinContent.trim();
			cholesterolContent = cholesterolContent.trim();
			sodiumContent = sodiumContent.trim();
			ret.nutrition.add(calorieContent);
			ret.nutrition.add(fatContent);
			ret.nutrition.add(carbContent);
			ret.nutrition.add(proteinContent);
			ret.nutrition.add(cholesterolContent);
			ret.nutrition.add(sodiumContent);
		} else {
			Elements els = doc.select("section.recipe-footnotes ul li");
			
			// get the line item that actually contains nutritional info
			String nutritionString = null;
			for (int i = 0; i < els.size(); i++) {
				if (els.get(i).text().contains("Nutrition Information Per Serving")) {
					nutritionString = els.get(i).text();
					break;
				}
			}
			
			// check for null
			if (nutritionString == null) {
				ret.nutrition.add("not available");
			} else {
				// parse the nutrients
				nutritionString = nutritionString.replaceAll("Nutrition Information Per Serving: ", "");
				String[] nutrientArray = nutritionString.split(", ");
				for (String s : nutrientArray) {
					ret.nutrition.add(s);
				}
			}
		}
		
		// set format specifier
		ret.allRecipesNewFormat = false;
		
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
	
	public static void writeRecipeJSONs(List<Recipe> recipes) {
		// for each recipe
		JSONObject parentObj = new JSONObject();
		for (Recipe r : recipes) {
			// create the this recipe's JSON
			JSONObject rec = r.getJSON();
			
			// add this JSON to the parent
			parentObj.accumulate("recipes", rec);
		}
		
		// write cumulative JSON to file
		try {
			PrintWriter writer = new PrintWriter("out/recipes.json", "UTF-8");
			writer.println(parentObj.toString(4));
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		// write individual JSONs to file
		for (Recipe r : recipes) {
			JSONObject recipeObj = r.getJSON();
			try {
				PrintWriter writer = new PrintWriter("out/recipes_individual/" + r.recipeID + ".json");
				writer.println(recipeObj.toString(4));
				writer.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		}
	}
	
	public static void writeAbridgedJSON(List<Recipe> recipes) {
		// for each recipe
		JSONObject parentObj = new JSONObject();
		for (Recipe r : recipes) {
			// create an abridged JSON for this recipe
			JSONObject rec = new JSONObject();
			rec.put("name", r.name);
			rec.put("imgURL", r.imgURL);
			rec.put("ID", r.recipeID);
			
			JSONArray ingredIDs = new JSONArray();
			for (IngredientListing il : r.ingredients) {
				ingredIDs.put(il.ingID);
			}
			rec.put("ingredientIDs", ingredIDs);
			
			// add this JSON to the parent
			parentObj.accumulate("recipes", rec);
		}
		
		// write the JSON to file
		try {
			PrintWriter writer = new PrintWriter("out/recipesSummary.json", "UTF-8");
			writer.println(parentObj.toString(4));
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public static void writeMisc(List<Recipe> recipes) {
		// gather frequency of each ingredient
		HashMap<String, Integer> ingredientFrequency = new HashMap<String, Integer>();
		for (Recipe r : recipes) {
			for (IngredientListing i : r.ingredients) {
				if (ingredientFrequency.containsKey(i.ingID)) {
					ingredientFrequency.put(i.ingID, ingredientFrequency.get(i.ingID) + 1);
				} else {
					ingredientFrequency.put(i.ingID, 1);
				}
			}
		}
		
		// sort ingredient frequency entries
		List<Entry<String, Integer>> ingredEntries = new ArrayList<Entry<String, Integer>>(ingredientFrequency.entrySet());
		Collections.sort(ingredEntries, new Comparator<Entry<String, Integer>>() {
			public int compare(Entry<String, Integer> e0, Entry<String, Integer> e1) {
				if (e0.getValue() < e1.getValue())
					return -1;
				else if (e0.getValue() == e1.getValue())
					return 0;
				else
					return 1;
			}
		});
		Collections.reverse(ingredEntries);

		// write to file
		try {
			PrintWriter writer = new PrintWriter("out/ingredient_frequency.txt", "UTF-8");
			for (Entry<String, Integer> e : ingredEntries) {
				writer.println(e.getValue() + " : " + e.getKey());
			}
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		// sort unit frequency entries
		List<Entry<String, Integer>> unitEntries = new ArrayList<Entry<String, Integer>>(IngredientListing.commonUnits.entrySet());
		Collections.sort(unitEntries, new Comparator<Entry<String, Integer>>() {
			public int compare(Entry<String, Integer> e0, Entry<String, Integer> e1) {
				if (e0.getValue() < e1.getValue())
					return -1;
				else if (e0.getValue() == e1.getValue())
					return 0;
				else
					return 1;
			}
		});
		Collections.reverse(unitEntries);

		// write common units
		try {
			PrintWriter writer = new PrintWriter("out/unit_frequency.txt", "UTF-8");
			for (Entry<String, Integer> e : unitEntries) {
				writer.println(e.getValue() + " : " + e.getKey());
			}
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
}
