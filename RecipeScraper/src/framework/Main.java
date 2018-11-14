package framework;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;

import org.apache.http.client.ClientProtocolException;
import org.jsoup.nodes.Document;

public class Main {
	public static boolean DEBUG = true;
	public static boolean PROGRESS = true;
	
	public static final int firstIndex = 006663;
	public static final int chickenMarsala = 219763;
	
	public static void main(String[] args) {
		if (args.length > 2) {
			System.out.println("incorrect usage. optionally takes one argument:");
			System.out.println("(numRecipes) [startingRecipeID]");
			System.exit(1);
		}
		
		// set the index to start at, if defined
		int startingIndex = firstIndex;
		if (args.length == 2) {
			startingIndex = Integer.parseInt(args[1]);
		}
		
		// set the number of recipes to parse
		int numToParse = Integer.parseInt(args[0]);
		
		// grab the HTML page and parse the recipe
		int currIndex = startingIndex;
		ArrayList<Recipe> recipes = new ArrayList<Recipe>();
		while (currIndex < (startingIndex + numToParse)) {
			// convert the current ID to a string, and pad it with 0s
			String indexStr = Integer.toString(currIndex);
			while (indexStr.length() < 6) {
				indexStr = "0" + indexStr;
			}
			
			// retrieve and parse the recipe
			Document doc = HTTPInterfacer.getCookbooksHTML(Integer.toString(currIndex));
			if (doc != null) {
				Recipe recipe = HTTPInterfacer.parseCookbooksHTML(doc);
				recipes.add(recipe);
				System.out.println(currIndex + ": " + recipe.name);
			} else {
				System.out.println(currIndex + ": NOT FOUND");
			}
			
			// increment the index
			currIndex++;
			
			// wait a few seconds so that the server doesn't think we're doxxing it
			try {
				Thread.sleep(3000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		// write all the recipes
		System.out.println(recipes.size() + " RECIPES PARSED");
		HTTPInterfacer.writeRecipeJSONs(recipes);
		
		/*
		// parse organization file for UUIDs
		System.out.println("Parsing organizations' UUIDs...");
		ArrayList<String> orgUUIDsUnclean = new ArrayList<String>(CSVUtils.parseOrgFileUUIDs(args[0]));
		ArrayList<String> orgUUIDs = new ArrayList<String>();
		for (String s : orgUUIDsUnclean)
			orgUUIDs.add(s.replace("-", ""));
		orgUUIDsUnclean.clear();
		Collections.sort(orgUUIDs);
		System.out.println("...parsed " + orgUUIDs.size() + " org UUIDs");
		
		// create an iterator to go through organization UUIDs
		Iterator<String> itUUIDs = orgUUIDs.iterator();
		int subsetCounter = 0;
		final int startingSubset = Integer.parseInt(args[1]);
		final int numSubsets = Integer.parseInt(args[2]);
		final int subsetSize = Integer.parseInt(args[3]);
		for (int i = 0; i < startingSubset; i++) {
			for (int j = 0; j < subsetSize; j++)
				itUUIDs.next();
			subsetCounter++;
		}
		while (itUUIDs.hasNext() && subsetCounter < startingSubset + numSubsets) {
			// start clock
			long startTime = System.currentTimeMillis();
			
			// dump a subset of org UUIDs into a smaller hashset
			HashSet<String> subsetUUIDs = new HashSet<String>();
			while (itUUIDs.hasNext() && subsetUUIDs.size() < subsetSize) {
				subsetUUIDs.add(itUUIDs.next());
			}
			
			// get the data of this subset of orgs
			try {
				System.out.println("Retrieving data from Crunchbase API...");
				HTTPInterfacer.downloadData(subsetUUIDs);
				System.out.println("...Retrieved " + 
									orgs.size() + " orgs, " + 
									investments.size() + " investments, " +
									ipos.size() + " ipos, " +
									acquisitions.size() + " acquisitions, " +
									pastTeamJobs.size() + " past team jobs, " + 
									currentTeamJobs.size() + " current team jobs, " +
									boardJobs.size() + " board jobs, and " +
									persons.size() + " persons");
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			// write all parsed and fetched data to file
			System.out.println("Writing data subset " + subsetCounter + " to file...");
			System.out.println("Writing orgs to file...");
			Organization.writeOrgs("cache/orgs_" + subsetCounter, orgs);
			System.out.println("Writing investments to file...");
			Investment.writeInvestments("cache/investments_" + subsetCounter, investments);
			System.out.println("Writing IPOs to file...");
			IPO.writeIPOs("cache/ipos_" + subsetCounter, ipos);
			System.out.println("Writing acquisitions to file...");
			Acquisition.writeAcquisitions("cache/acquisitions_" + subsetCounter, acquisitions);
			System.out.println("Writing past team jobs to file...");
			Job.writeJobs("cache/past_team_jobs_" + subsetCounter, pastTeamJobs);
			System.out.println("Writing current team jobs to file...");
			Job.writeJobs("cache/current_team_jobs_" + subsetCounter, currentTeamJobs);
			System.out.println("Writing board jobs to file...");
			Job.writeJobs("cache/board_jobs_" + subsetCounter, boardJobs);
			System.out.println("Writing persons to file...");
			Person.writePersons("cache/persons_" + subsetCounter, persons);
			System.out.println("Writing funding rounds to file...");
			FundingRound.writeFundingRounds("cache/funding_rounds_" + subsetCounter, fundingRounds);
			System.out.println("...done writing raw output to file");
			
			// stop clock
			long endTime = System.currentTimeMillis();
			long duration = (endTime - startTime);
			long mins = duration / 60000;
			long sec = (duration % 60000) / 1000;
			System.out.println("This chunk took " + mins + " minutes and " + sec + " seconds");
			
			// empty out data structures
			orgs.clear();
			investments.clear();
			ipos.clear();
			acquisitions.clear();
			pastTeamJobs.clear();
			currentTeamJobs.clear();
			boardJobs.clear();
			persons.clear();
			fundingRounds.clear();
			
			// increment file counter
			subsetCounter++;
		}
		*/
	}

}