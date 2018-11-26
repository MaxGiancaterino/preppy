package framework;

import org.json.JSONObject;

public class IngredientListing {
	public static String[] ingredUnits = {"cup",
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
	                                     "cubes"};
	
	public double quantity = 0;
	public String unit = "";
	public String ingredient = "";
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("ingredient", ingredient);
		rec.put("unit", unit);
		rec.put("amount", quantity);
		
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
			for (String s : ingredUnits) {
				if (tokens[i].equals(s)) {
					unit = s;
					unitIndex = i;
					break;
				}
			}
			
			if (!unit.isEmpty())
				break;
		}
		
		// if the unit couldn't be identified
		if (unit.isEmpty()) {
			ret.ingredient = ingredString;
			return ret;
		}
		
		// try getting the quantity
		String quantityString = tokens[unitIndex - 1];
		double quantity = parseDouble(quantityString);
		if (quantity == -1.0) {
			ret.ingredient = ingredString;
		} else {
			ret.quantity = quantity;
			ret.unit = tokens[unitIndex];
			for (int i = unitIndex + 1; i < tokens.length; i++) {
				ret.ingredient += tokens[i] + " ";
			}
			ret.ingredient = ret.ingredient.trim();
		}
		
		return ret;
	}
}
