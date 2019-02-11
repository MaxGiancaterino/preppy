package preppy.structures;

import java.util.HashMap;
import java.util.Map.Entry;

import org.json.JSONObject;

public class IngredientListing {
	public static HashMap<String, Integer> commonUnits = new HashMap<String, Integer>();
	
	public static HashMap<String, String> translations = new HashMap<String, String>();
	
	static {
		translations.put("bread flour", "all-purpose flour");
		translations.put("salted butter", "butter");
		translations.put("dijon-style mustard", "dijon mustard");
		translations.put("egg white", "egg");
		translations.put("egg yolk", "egg");
		translations.put("kosher salt", "salt");
		translations.put("extra virgin olive oil", "olive oil");
		translations.put("fluid ounce", "ounce"); // TODO: remove, possibly
	}
	
	public static String[] ingredUnits = {
			"cup",
	        "tablespoon",
	        "teaspoon",
	        "ounce",
	        "pinch",
	        "clove",
	        "pound",
	        "cube",
	        "pint",
	        "quart"
	};
	
	public static String[] selfUnits = {
			"egg",
			"apple",
			"orange",
			"lemon",
			"chive",
			"carrot",
			"banana",
			"onion",
			"zucchini",
			"potato"
	};
	
	public static String[] ambiguousUnits = {
			"package",
			"can",
			"jar",
			"container"
	};
	
	public static String[] descPhrases = {
			"low fat",
			"reduced fat",
			"very ripe",
			"at room temperature",
			"room temperature",
			"for frying",
			"(for spreading)",
			"or as needed",
			"as needed",
			"cut into small pieces"
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
			"chilled",
			"packed",
			"cubed",
			"beaten",
			"thawed",
			"sifted",
			"rinsed",
			"separated",
			
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
			"ripe",
			
			// misc
			"large",
			"canned",
			"cooked",
			"cooled"
	};
	
	public double quantity = 0;
	public String unit = "";
	public boolean optional = false;
	
	// DEBUG USE
	public String raw = "";
	public String ingID = "";
	
	public IngredientListing() {}
	
	public IngredientListing(JSONObject json) {
		unit = json.getString("unit");
		quantity = json.getDouble("amount");
		optional = json.getBoolean("optional");
		raw = json.getString("raw");
		ingID = json.getString("ingID");
	}
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("unit", unit);
		rec.put("amount", quantity);
		rec.put("optional", optional);
		
		// DEBUG USE
		rec.put("raw", raw);
		rec.put("ingID", ingID);
		
		return rec;
	}
	
	public static String removeWhitespace(String s) {
		while (s.contains("  ")) {
			s = s.replaceAll("  ", " ");
		}
		s = s.trim();
		return s;
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
	
	public static IngredientListing parseIngredientListing(String input) {
		IngredientListing ret = new IngredientListing();
		ret.raw = input;
		
		String processed = input;
		
		// clean input
		processed = processed.toLowerCase();
		processed = processed.replaceAll(",", "");
		processed = removeWhitespace(processed);
		
		// replace all cognates
		for (Entry<String, String> e : translations.entrySet()) {
			processed.replaceAll(e.getKey(), e.getValue());
		}
		
		// check for optional
		if (processed.contains("(optional)")) {
			processed = processed.replace("(optional)", "");
			processed = removeWhitespace(processed);
			
			ret.optional = true;
		}
		
		// check for ambiguous amounts
		String ambiguous = "";
		if (processed.contains("to taste")) {
			ambiguous = "to taste";
		}
		if (!ambiguous.isEmpty()) {
			processed = processed.replace(ambiguous, "");
			processed = removeWhitespace(processed);
			
			ret.unit = ambiguous;
			return ret;
		}
				
		// check for and remove parentheticals
		String parenthetical = "";
		while (processed.contains("(")) {
			int startingIndex = processed.indexOf("(");
			int endingIndex = processed.indexOf(")");
			parenthetical = processed.substring(startingIndex, endingIndex + 1);
			
			processed = processed.replace(parenthetical, "");
			processed = removeWhitespace(processed);
		}
		
		// remove descriptive phrases
		for (String s : descPhrases) {
			if (processed.contains(s)) {
				processed = processed.replace(s, "");
			}
			processed = removeWhitespace(processed);
		}
		
		// split into tokens
		String[] tokens = processed.split(" ");
		
		// check each token for a unit
		String unit = "";
		int unitIndex = -1;
		boolean ambigUnit = false;
		for (int i = 0; i < tokens.length; i++) {
			tokens[i] = tokens[i].trim();
			
			// check if this token matches an ingredient unit
			for (String s : ingredUnits) {
				if (tokens[i].equals(s) || tokens[i].equals(s + "s")) {
					unit = s;
					unitIndex = i;
					break;
				}
			}
			
			// check if this token is an ambiguous unit
			for (String s : ambiguousUnits) {
				if (tokens[i].equals(s) || tokens[i].equals(s + "s")) {
					unit = s;
					unitIndex = i;
					ambigUnit = true;
					break;
				}
			}
			
			// check if this token matches an ingredient "item-unit"
			for (String s : selfUnits) {
				if (tokens[i].equals(s) || tokens[i].equals(s + "s")) {
					unit = "unit";
					unitIndex = i;
					ret.ingID = s;
					break;
				}
			}
			
			// if a unit has been identified, go to the next section
			if (!unit.isEmpty())
				break;
		}
		
		// if the unit couldn't be identified
		if (unit.isEmpty()) {
			return ret;
		}
		
		// try getting the quantity
		double quantity;
		if (unitIndex == 0) { // if no amount is specified for the unit, assume 1
			quantity = 1;
		} else { // if amount was specified, parse it
			String quantityString = tokens[unitIndex - 1];
			quantity = parseDouble(quantityString);
			
			// check for an additional token of quantity (i.e., "1 1/2 cups")
			try {
				double addit = parseDouble(tokens[unitIndex - 2]);
				quantity += addit;
			} catch (Exception e) {
				// do nothing
			}
			
			// if this is an ambiguous unit, reassign to value within parenthetical
			if (ambigUnit) {
				parenthetical = parenthetical.replaceAll("[()]", "");
				String[] parenUnit = parenthetical.split(" ");
				if (parenUnit.length == 2) {
					quantity = quantity * parseDouble(parenUnit[0]);
					unit = parenUnit[1];
				}
			}
		}
		
		// if the quantity was successfully parsed
		if (quantity != -1.0) {
			ret.quantity = quantity;
			if (unit.equals("unit")) {
				ret.unit = "unit";
			} else {
				ret.unit = unit;
			}

			if (commonUnits.containsKey(unit)) {
				commonUnits.put(unit, commonUnits.get(unit) + 1);
			} else {
				commonUnits.put(unit, 1);
			}
		}
		
		// if the unit type is "unit", we already have the ingredient's ID
		if (ret.unit.equals("unit")) {
			return ret;
		}
		
		// remove descriptors to get the ingredient's ID
		for (int i = unitIndex + 1; i < tokens.length; i++) {
			boolean matched = false;
			for (String s : descriptors) {
				if (tokens[i].equals(s) || tokens[i].equals("and")) {
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
		
		return ret;
	}
}
