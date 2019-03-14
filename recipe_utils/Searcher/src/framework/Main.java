package framework;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map.Entry;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;

import preppy.structures.IngredientListing;
import preppy.structures.Recipe;

public class Main implements Runnable {
	public static boolean DEBUG = true;
	public static boolean PROGRESS = true;
	
    private static String appName = "Recipe Finder";
    
    public static JPanel controlPanel;
    public static JScrollPane ingredientSearchResultPane;
    public static JPanel ingredientSearchResultList;
    public static JScrollPane ingredientPantryPane;
    public static JPanel ingredientPantryList;
    public static JScrollPane foundRecipesPane;
    public static JPanel foundRecipesList;
    
    public static HashMap<String, Integer> ingredientFrequencies;
    
    public static HashSet<String> pantry;
    public static List<Recipe> recipeList;
    
    public final static String inDirectory = "recipe_stats";
	
	/*
	 * Gets the Jaro distance between two strings.
	 * 
	 * Code found at:
	 * https://rosettacode.org/wiki/Jaro_distance#Java
	 */
	public static double jaroDistance(String s, String t) {
        int s_len = s.length();
        int t_len = t.length();
 
        if (s_len == 0 && t_len == 0) return 1;
 
        int match_distance = Integer.max(s_len, t_len) / 2 - 1;
 
        boolean[] s_matches = new boolean[s_len];
        boolean[] t_matches = new boolean[t_len];
 
        int matches = 0;
        int transpositions = 0;
 
        for (int i = 0; i < s_len; i++) {
            int start = Integer.max(0, i-match_distance);
            int end = Integer.min(i+match_distance+1, t_len);
 
            for (int j = start; j < end; j++) {
                if (t_matches[j]) continue;
                if (s.charAt(i) != t.charAt(j)) continue;
                s_matches[i] = true;
                t_matches[j] = true;
                matches++;
                break;
            }
        }
 
        if (matches == 0) return 0;
 
        int k = 0;
        for (int i = 0; i < s_len; i++) {
            if (!s_matches[i]) continue;
            while (!t_matches[k]) k++;
            if (s.charAt(i) != t.charAt(k)) transpositions++;
            k++;
        }
 
        return (((double)matches / s_len) +
                ((double)matches / t_len) +
                (((double)matches - transpositions/2.0) / matches)) / 3.0;
    }
	
	public void run() {
        System.out.println();
	    System.out.println("---------------------");
	    System.out.println(appName);
        System.out.println("---------------------");
        System.out.println();
        
		// load all the recipes found in the recipes JSON
		recipeList = Parser.readRecipeJSONs(inDirectory + "/recipes.JSON");
				
		// assemble the frequency list of ingredients
		ingredientFrequencies = new HashMap<String, Integer>();
		for (Recipe r : recipeList) {
			for (IngredientListing i : r.ingredients) {
				if (ingredientFrequencies.containsKey(i.ingID)) {
					ingredientFrequencies.put(i.ingID, ingredientFrequencies.get(i.ingID) + 1);
				} else {
					ingredientFrequencies.put(i.ingID, 1);
				}
			}
		}
		
        // create the control frame and panel
		final JFrame controlFrame = new JFrame(appName);
       	controlPanel = new JPanel();
       	controlFrame.setLayout(new BorderLayout());
       	controlFrame.add(controlPanel, BorderLayout.CENTER);
       	controlFrame.pack();
       	controlFrame.setSize(700, 500);
       	controlFrame.setLocation(50, 50);
       	controlFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		controlFrame.setVisible(true);
		controlFrame.addComponentListener(new ComponentAdapter() {
            public void componentResized(ComponentEvent e) {
            	controlPanel.setSize(controlFrame.getWidth(), controlFrame.getHeight());
            }
        });
		buildControlPanel(controlPanel);
	}

	public static void buildControlPanel(JPanel panel) {
	    ingredientSearchResultList = new JPanel();
	    ingredientSearchResultList.setLayout(new BoxLayout(ingredientSearchResultList, BoxLayout.PAGE_AXIS));
		ingredientPantryList = new JPanel();
		ingredientPantryList.setLayout(new BoxLayout(ingredientPantryList, BoxLayout.PAGE_AXIS));
	    foundRecipesList = new JPanel();
	    foundRecipesList.setLayout(new BoxLayout(foundRecipesList, BoxLayout.PAGE_AXIS));
	    
	    JPanel settingsPanel = new JPanel();
	    settingsPanel.setLayout(new BoxLayout(settingsPanel, BoxLayout.PAGE_AXIS));
	    
	    JLabel searchLabel = new JLabel("Search for an ingredient:");
	    settingsPanel.add(searchLabel);
	    
	    JTextField searchField = new JTextField();
	    settingsPanel.add(searchField);
	    
	    JButton searchButton = new JButton("Search");
	    searchButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				// clear the result panel
				ingredientSearchResultList.removeAll();
				ingredientSearchResultList.validate();
				ingredientSearchResultList.repaint();
				
				// take whatever is in the searchField and find ingredinets
				String ingredientSearch = searchField.getText();
				HashMap<String, Double> searchResults = new HashMap<String, Double>();
				for (Entry<String, Integer> en : ingredientFrequencies.entrySet()) {
					double jaroDist = jaroDistance(ingredientSearch, en.getKey());
					if (jaroDist > 0.6) {
						searchResults.put(en.getKey(), jaroDist);
					}
				}
				
				// sort search results
				ArrayList<Entry<String, Double>> searchResultList = new ArrayList<Entry<String, Double>>(searchResults.entrySet());
				Collections.sort(searchResultList, new Comparator<Entry<String, Double>>() {
					public int compare(Entry<String, Double> e0, Entry<String, Double> e1) {
						if (e0.getValue() > e1.getValue())
							return -1;
						else if (e0.getValue() == e1.getValue())
							return 0;
						else
							return 1;
					}
				});
				
				// create a new button for each matched ingredient
				for (Entry<String, Double> result : searchResultList) {
					JButton ingredientButton = new JButton(result.getKey());
					ingredientButton.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent ee) {
							pressIngredientResultButton(ingredientButton);
						}
					});
					
					ingredientSearchResultList.add(ingredientButton);
					ingredientSearchResultList.setPreferredSize(new Dimension(100, 30 * ingredientSearchResultList.getComponentCount()));
					ingredientSearchResultList.validate();
					ingredientSearchResultList.repaint();
					
					ingredientSearchResultPane.validate();
					ingredientSearchResultPane.repaint();
				}
			}
	    });
	    settingsPanel.add(searchButton);
	    
	    addSpacer(settingsPanel);
	    
	    JButton refreshRecipesButton = new JButton("Refresh Matching Recipes");
	    refreshRecipesButton.addActionListener(new ActionListener() {
	    	public void actionPerformed(ActionEvent e) {
	    		refreshRecipeList();
	    	}
	    });
	    settingsPanel.add(refreshRecipesButton);
	    
	    panel.add(settingsPanel);

	    /*
	     * Create the search result panel
	     */
	    
	    JPanel searchResultPanel = new JPanel();
	    searchResultPanel.setLayout(new BoxLayout(searchResultPanel, BoxLayout.PAGE_AXIS));
	    
	    JLabel searchResultLabel = new JLabel("Search results:");
	    searchResultPanel.add(searchResultLabel);
	    
	    ingredientSearchResultPane = new JScrollPane(ingredientSearchResultList);
	    ingredientSearchResultPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
	    ingredientSearchResultPane.setPreferredSize(new Dimension(150, 400));
	    searchResultPanel.add(ingredientSearchResultPane);
	    
	    panel.add(searchResultPanel);
	    
	    /*
	     * Create the pantry panel
	     */
	    
	    pantry = new HashSet<String>();
	    
	    JPanel pantryPanel = new JPanel();
	    pantryPanel.setLayout(new BoxLayout(pantryPanel, BoxLayout.PAGE_AXIS));
	    
	    JLabel pantryLabel = new JLabel("Pantry:");
	    pantryPanel.add(pantryLabel);
	    
	    ingredientPantryPane = new JScrollPane(ingredientPantryList);
	    ingredientPantryPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
	    ingredientPantryPane.setPreferredSize(new Dimension(150, 400));
	    pantryPanel.add(ingredientPantryPane);
	    
	    panel.add(pantryPanel);
	    
	    /*
	     * Create the found recipes panel
	     */

	    JPanel foundRecipesPanel = new JPanel();
	    foundRecipesPanel.setLayout(new BoxLayout(foundRecipesPanel, BoxLayout.PAGE_AXIS));
	    
	    JLabel foundRecipesLabel = new JLabel("Found recipes:");
	    foundRecipesPanel.add(foundRecipesLabel);
	    
	    foundRecipesPane = new JScrollPane(foundRecipesList);
	    foundRecipesPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
	    foundRecipesPane.setPreferredSize(new Dimension(150, 400));
	    foundRecipesPanel.add(foundRecipesPane);
	    
	    panel.add(foundRecipesPanel);
	}
	
	/*
	 * This method is called when an ingredient in the search results panel is clicked.
	 * This causes the ingredient to be removed from the search result panel and added to the pantry panel
	 */
	public static void pressIngredientResultButton(JButton b) {
		pantry.add(b.getText());
		refreshPantryList();
	}
	
	/*
	 * This method is called when the button of an ingredient in the pantry is clicked.
	 * The ingredient is removed from the pantry.
	 */
	public static void pressIngredientPantryButton(JButton b) {
		pantry.remove(b.getText());
		refreshPantryList();
	}
	
	/*
	 * This method is called whenever the pantry is added to or removed from
	 */
	public static void refreshPantryList() {
		// remove everything in the list
		ingredientPantryList.removeAll();
		
		// for each string in the pantry
		for (String s : pantry) {
			JButton removeIngredientButton = new JButton(s);
			removeIngredientButton.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					pressIngredientPantryButton(removeIngredientButton);
				}
			});
			ingredientPantryList.add(removeIngredientButton);
		}
		
		ingredientPantryList.setPreferredSize(new Dimension(100, 30 * ingredientPantryList.getComponentCount()));
		ingredientPantryList.validate();
		ingredientPantryList.repaint();
	}
	
	/*
	 * This method is called when the "refresh recipes" button is clicked
	 */
	public static void refreshRecipeList() {
		// clear the list
		foundRecipesList.removeAll();
		
		// get all ingredient IDs currently in the found ingredsients list
		HashSet<String> ingredients = new HashSet<String>();
		for (Component c : ingredientPantryList.getComponents()) {
			ingredients.add(((JButton)c).getText());
		}
		
		// check each recipe to see if its ingredients are all found in the set
		HashSet<Recipe> matchedRecipes = new HashSet<Recipe>();
		for (Recipe r : recipeList) {
			boolean match = true;
			for (IngredientListing i : r.ingredients) {
				if (!ingredients.contains(i.ingID) && !i.ingID.isEmpty()) {
					match = false;
					break;
				}
			}
			
			if (match) {
				matchedRecipes.add(r);
			}
		}
		
		// add all recipes to the found recipes list
		for (Recipe r : matchedRecipes) {
			JLabel recipeLabel = new JLabel(r.recipeID + " - " + r.name);
			foundRecipesList.add(recipeLabel);
			foundRecipesList.setPreferredSize(new Dimension(100, 30 * foundRecipesList.getComponentCount()));
			foundRecipesList.validate();
			foundRecipesList.repaint();
		}
	}
	
	public static void addSpacer(JPanel panel) {
	    JPanel space = new JPanel();
	    panel.add(space);
	}
	
	public static void main(String[] args) {
		SwingUtilities.invokeLater(new Main());
	}
}