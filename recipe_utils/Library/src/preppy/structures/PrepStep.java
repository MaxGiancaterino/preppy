package preppy.structures;

import org.json.JSONObject;

public class PrepStep {
	public String instruction = "";
	public int stepNumber = 0;
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("step", stepNumber);
		rec.put("text", instruction);
		
		return rec;
	}
}
