package framework;

import org.json.JSONObject;

public class IngredientListing {
	public static String[] ingredUnits = {
			"cup",
	        "cups",
	        "ounce",
	        "ounces",
	        "tablespoon",
	        "tablespoons",
	        "pinch",
	        "clove",
	        "pound",
	        "pounds",
	        "teaspoon",
	        "teaspoons",
	        "cube",
	        "cubes"
	};
	
	public static String[] selfUnits = {
			"egg",
			"eggs",
			"apple",
			"apples",
			"orange",
			"oranges",
			"lemon",
			"lemons"
	};
	
	public static String[] descriptors = {
			// water
			"hot",
			"cold",
			"warm",
			"lukewarm",
			"boiling",
			
			// pre-prep
			"chopped",
			"diced",
			"mashed",
			"diced",
			"pitted",
			"minced",
			"melted",
			"sliced",
			"ground",
			"softened",
			"shredded",
			"grated",
			"beaten",
			"drained",
			
			// sizes
			"large",
			"jumbo",
			"small",
			"extra",
			
			// adverbs
			"finely",
			"lightly",
			"thinly",
			"freshly",
			"coarsely",
			"stiffly",
			
			// meta
			"divided",
			
			// freshness
			"fresh",
			"dried"
	};
	
	public double quantity = 0;
	public String unit = "";
	public String ingredient = "";
	public boolean optional = false;
	
	// DEBUG USE
	public String raw = "";
	public String ingID = "";
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("ingredient", ingredient);
		rec.put("unit", unit);
		rec.put("amount", quantity);
		rec.put("optional", optional);
		
		// DEBUG USE
		rec.put("raw", raw);
		rec.put("ingID", ingID);
		
		return rec;
	}
	
	public static double parseDouble(String s) {
		try {
			if (s.contains("\u00BD")) {
				return 0.5;
			} else if (s.contains("\u00BC")) {
				return 0.25;
			} else if (s.contains("\u00BE")) {
				return 0.75;
			} else if (s.contains("/")) {
		        String[] rat = s.split("/");
		        return Double.parseDouble(rat[0]) / Double.parseDouble(rat[1]);
		    } else {
		    	return Double.parseDouble(s);
		    }
		} catch (Exception e) {
			return -1.0;
		}
	}
	
	public static IngredientListing parseIngredientListing(String ingredString) {
		IngredientListing ret = new IngredientListing();
		
		// clean input
		ingredString = ingredString.trim();
		ingredString = ingredString.toLowerCase();
		
		// check for optional
		if (ingredString.contains("(optional)")) {
			ingredString = ingredString.replace("(optional)", "");
			while (ingredString.contains("  ")) {
				ingredString = ingredString.replace("  ", " ");
			}
			ingredString = ingredString.trim();
			
			ret.optional = true;
		}
		
		// check for universal phrases
		String universal = "";
		if (ingredString.contains("to taste")) {
			universal = "to taste";
		}
		if (!universal.isEmpty()) {
			ingredString = ingredString.replace(universal, "");
			while (ingredString.contains("  ")) {
				ingredString = ingredString.replace("  ", " ");
			}
			ingredString = ingredString.trim();
			
			ret.ingredient = ingredString;
			ret.unit = universal;
			return ret;
		}
				
		// split into tokens
		String[] tokens = ingredString.split(" ");
		
		// check each token
		String unit = "";
		int unitIndex = -1;
		for (int i = 0; i < tokens.length; i++) {
			tokens[i] = tokens[i].trim();
			
			// check if this token matches an ingredient unit
			for (String s : ingredUnits) {
				if (tokens[i].equals(s)) {
					unit = s;
					unitIndex = i;
					break;
				}
			}
			
			// check if this token matches an ingredient "item-unit"
			for (String s : selfUnits) {
				if (tokens[i].equals(s)) {
					unit = "unit";
					unitIndex = i;
					ret.ingredient = s;
					break;
				}
			}
			
			// if a unit has been identified, go to the next section
			if (!unit.isEmpty())
				break;
		}
		
		// if the unit couldn't be identified
		if (unit.isEmpty()) {
			ret.ingredient = ingredString;
			return ret;
		}
		
		// try getting the quantity
		double quantity;
		if (unitIndex == 0) { // if no amount is specified for the unit, assume 1
			quantity = 1;
		} else { // if amount was specified, parse it
			String quantityString = tokens[unitIndex - 1];
			quantity = parseDouble(quantityString);
		}
		
		if (quantity == -1.0) { // if the quantity could not be parsed
			ret.ingredient = ingredString;
		} else { // if the quantity was successfully parsed
			ret.quantity = quantity;
			if (unit.equals("unit")) {
				ret.unit = "unit";
			} else {
				ret.unit = tokens[unitIndex];
			}
			for (int i = unitIndex + 1; i < tokens.length; i++) {
				ret.ingredient += tokens[i] + " ";
			}
			ret.ingredient = ret.ingredient.trim();
		}
		
		// remove descriptors to get the ingredient's ID
		for (int i = unitIndex + 1; i < tokens.length; i++) {
			boolean matched = false;
			for (String s : descriptors) {
				if (tokens[i].contains(s)) {
					matched = true;
					break;
				}
			}
			
			// if not matched, clean the string and add it
			if (!matched) {
				ret.ingID += tokens[i].replace(",", "").trim() + " ";
			}
		}
		ret.ingID = ret.ingID.trim();
		
		// set the ingredient's raw string
		ret.raw = ingredString;
		
		return ret;
	}
}
