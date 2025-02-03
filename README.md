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
## Usage

 6.   Call `recipe_manager.add_recipe` to add a recipe.
 7.   Use a Lovelace card to display recipes.

## License

MIT
