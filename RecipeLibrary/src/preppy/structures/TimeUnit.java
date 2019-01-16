package preppy.structures;


import org.json.JSONObject;

public class TimeUnit {
	public String units = "min";
	public int count = 0;
	
	public JSONObject getJSON() {
		JSONObject rec = new JSONObject();
		rec.put("units", units);
		rec.put("count", count);
		
		return rec;
	}
	
	public static TimeUnit parseTimeUnit(String s) {
		TimeUnit ret = new TimeUnit();
		
		// clean input
		s = s.trim();
		s = s.toLowerCase();
		
		// tokenize
		String[] toks = s.split(" ");
		
		// parse
		ret.count = Integer.parseInt(toks[0]);
		ret.units = toks[1];
		
		return ret;
	}
}
