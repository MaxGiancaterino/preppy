package framework;

import java.util.ArrayList;

import org.json.JSONObject;

public class Recipe {
	public String name = "";
	public ArrayList<String> ingredients = new ArrayList<String>();
	public String preparation = "";
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("name", name);
		for (String i : ingredients) {
			rec.append("ingredients", i);
		}
		rec.put("prep", preparation);
		
		return rec;
	}
}
