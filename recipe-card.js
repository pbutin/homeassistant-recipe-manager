class RecipeCard extends HTMLElement {
    setConfig(config) {
        this.config = config;

        if (!this.shadowRoot) {
            this.attachShadow({ mode: "open" });
        }

        this.shadowRoot.innerHTML = `
            <ha-card header="Recipe Manager">
                <div id="recipe-content" class="card-content">
                    Loading recipes...
                </div>
            </ha-card>
        `;
    }

    set hass(hass) {
        if (!this.config || !this.shadowRoot) return;

        const entity = hass.states["sensor.recipe_manager"];
        const recipes = entity ? entity.attributes.recipes : [];

        let content = "<p>No recipes found.</p>";
        if (recipes.length > 0) {
            content = recipes.map(recipe => `
                <b>${recipe.name}</b>
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
                <p>Steps:</p>
                <ol>
                    ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
                </ol>
                <hr>
            `).join("");
        }

        this.shadowRoot.getElementById("recipe-content").innerHTML = content;
    }

    getCardSize() {
        return 3;
    }
}

customElements.define("recipe-card", RecipeCard);
