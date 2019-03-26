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

import preppy.structures.*;

public class JSONWriter {

	public static void writeRecipeJSON(String directory, List<Recipe> recipes) {
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
			PrintWriter writer = new PrintWriter(directory + "/recipes.json", "UTF-8");
			writer.println(parentObj.toString(4));
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public static void writeAbridgedJSON(String directory, List<Recipe> recipes) {
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
			PrintWriter writer = new PrintWriter(directory + "/recipesSummary.json", "UTF-8");
			writer.println(parentObj.toString(4));
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public static void writeMisc(String directory, List<Recipe> recipes) {
		// gather frequency of each ingredient and each unit
		HashMap<String, Integer> ingredientFrequency = new HashMap<String, Integer>();
		HashMap<String, Integer> unitFrequency = new HashMap<String, Integer>();
		for (Recipe r : recipes) {
			for (IngredientListing i : r.ingredients) {
				if (ingredientFrequency.containsKey(i.ingID)) {
					ingredientFrequency.put(i.ingID, ingredientFrequency.get(i.ingID) + 1);
				} else {
					ingredientFrequency.put(i.ingID, 1);
				}
				
				if (unitFrequency.containsKey(i.unit)) {
					unitFrequency.put(i.unit, unitFrequency.get(i.unit) + 1);
				} else {
					unitFrequency.put(i.unit, 1);
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
			PrintWriter writer = new PrintWriter(directory + "/ingredient_frequency.txt", "UTF-8");
			for (Entry<String, Integer> e : ingredEntries) {
				writer.println(e.getValue() + " : " + e.getKey());
			}
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		// write ingredient threshholds to file
		try {
			PrintWriter writer = new PrintWriter(directory + "/ingredient_thresholds.txt", "UTF-8");
			
			// manually-set thresholds
			int t1 = 10000;
			int t2 = 1000;
			int t3 = 100;
			
			// print thresholds
			writer.println(t1 + "+ uses:");
			for (Entry<String, Integer> e : ingredEntries) {
				if (e.getValue() >= t1) {
					writer.println(e.getKey());
				}
			}
			writer.println(" ");
			writer.println(t2 + "+ uses:");
			for (Entry<String, Integer> e : ingredEntries) {
				if (e.getValue() >= t2) {
					writer.println(e.getKey());
				}
			}
			writer.println(" ");
			writer.println(t3 + "+ uses:");
			for (Entry<String, Integer> e : ingredEntries) {
				if (e.getValue() >= t3) {
					writer.println(e.getKey());
				}
			}
			writer.println(" ");
			
			// close the writer
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		// sort unit frequency entries
		List<Entry<String, Integer>> unitEntries = new ArrayList<Entry<String, Integer>>(unitFrequency.entrySet());
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
			PrintWriter writer = new PrintWriter(directory + "/unit_frequency.txt", "UTF-8");
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
