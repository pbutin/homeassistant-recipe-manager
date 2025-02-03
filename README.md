# Home Assistant Recipe Manager

This is a custom component for Home Assistant that allows you to store and manage cooking recipes.

## Features
- Add, remove, and list recipes
- Stores ingredients and steps
- Display recipes in Lovelace UI

## Installation
 1. Clone this repository into `custom_components/recipe_manager/`:
git clone [https://github.com/pbutin/homeassistant-recipe-manager.git](https://github.com/pbutin/homeassistant-recipe-manager.git)

 2. Restart Home Assistant.
 3. Add the following to `configuration.yaml`:
```yaml
recipe_manager:
  recipes:
    - name: "Pasta Carbonara"
      ingredients:
        - "200g spaghetti"
        - "100g pancetta"
        - "2 eggs"
        - "50g parmesan"
      steps:
        - "Boil pasta"
        - "Fry pancetta"
        - "Mix eggs and parmesan"
        - "Combine everything"
```

 4. Check Developer Tools → States for `sensor.recipe_manager`.
 5. Install Lovelace UI component
Move `recipe-card.js` to the `www` folder 
Open Home Assistant UI → Go to Settings → Dashboards.
Click on Resources and add this entry :
 - URL: /local/recipe-card.js
 - Type: JavaScript Module
## Usage

 1.   Call `recipe_manager.add_recipe` to add a recipe. Go to `Devellopers tools`, `actions` ans search `Recipe Manager: add_recipe`
Change the data for:
```JSON
{
  "name": "Chocolate Cake",
  "ingredients": ["2 cups flour", "1 cup sugar", "2 eggs"],
  "steps": ["Mix ingredients", "Bake for 30 minutes"]
}
```
 3.   Use a Lovelace card to display recipes using the YAML : `type: custom:recipe-card`

## License

MIT
