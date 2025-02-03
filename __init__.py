import logging
import json
import os
import voluptuous as vol
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.entity import Entity

_LOGGER = logging.getLogger(__name__)

DOMAIN = "recipe_manager"
CONF_RECIPES = "recipes"

CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {
                vol.Optional(CONF_RECIPES, default=[]): vol.All(cv.ensure_list, [dict]),
            }
        ),
    },
    extra=vol.ALLOW_EXTRA,
)

def setup(hass, config):
    """Set up the Recipe Manager component."""
    recipes = config[DOMAIN].get(CONF_RECIPES, [])
    manager = RecipeManager(hass, recipes)

    # Ensure loaded recipes are restored
    hass.data[DOMAIN] = manager

    # Update sensor with the loaded recipes
    hass.states.set("sensor.recipe_manager", len(manager.recipes), {"recipes": manager.recipes})
    _LOGGER.info("Recipe Manager Sensor Created: sensor.recipe_manager with %d recipes", len(manager.recipes))

    def handle_add_recipe(call):
        """Add a recipe via service."""
        name = call.data.get("name")
        ingredients = call.data.get("ingredients", [])
        steps = call.data.get("steps", [])

        manager.add_recipe(name, ingredients, steps)

        # Update the sensor state
        hass.states.set("sensor.recipe_manager", len(manager.recipes), {"recipes": manager.recipes})
        _LOGGER.info(f"Recipe Added: {name}")

    hass.services.register(DOMAIN, "add_recipe", handle_add_recipe)

    return True


class RecipeManager:
    """Manage recipes in Home Assistant."""

    def __init__(self, hass, recipes):
        self.hass = hass
        self.recipes = recipes
        self.file_path = hass.config.path("recipes.json")
        self._load_recipes()

    def _load_recipes(self):
        """Load recipes from JSON file."""
        if os.path.exists(self.file_path):
            with open(self.file_path, "r") as f:
                self.recipes = json.load(f)

    def add_recipe(self, name, ingredients, steps):
        """Add a new recipe."""
        self.recipes.append({"name": name, "ingredients": ingredients, "steps": steps})
        self._save_recipes()
        _LOGGER.info(f"Added recipe: {name}")

    def _save_recipes(self):
        """Save recipes to JSON file."""
        with open(self.file_path, "w") as f:
            json.dump(self.recipes, f)
