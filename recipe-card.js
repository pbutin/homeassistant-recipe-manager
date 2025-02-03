class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.openRecipes = {}; // Store open/closed state
    }

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
            <style>
                .recipe-name {
                    cursor: pointer;
                    font-weight: bold;
                    color: #007bff;
                    text-decoration: underline;
                }
                .recipe-details {
                    display: none;
                    margin-top: 5px;
                    padding-left: 10px;
                    border-left: 2px solid #ddd;
                }
            </style>
        `;
    }

    set hass(hass) {
        if (!this.config || !this.shadowRoot) return;

        const entity = hass.states["sensor.recipe_manager"];
        const recipes = entity ? entity.attributes.recipes : [];

        let content = "<p>No recipes found.</p>";
        if (recipes.length > 0) {
            content = recipes.map((recipe, index) => `
                <div>
                    <span class="recipe-name" data-index="${index}">${recipe.name}</span>
                    <div class="recipe-details" id="recipe-${index}" style="display: ${this.openRecipes[index] ? "block" : "none"};">
                        <p><b>Ingredients:</b></p>
                        <ul>
                            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                        </ul>
                        <p><b>Steps:</b></p>
                        <ol>
                            ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
                        </ol>
                    </div>
                </div>
            `).join("");
        }

        this.shadowRoot.getElementById("recipe-content").innerHTML = content;

        // Add event listeners to toggle recipe details
        this.shadowRoot.querySelectorAll(".recipe-name").forEach(item => {
            item.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                this.openRecipes[index] = !this.openRecipes[index]; // Toggle state
                this.shadowRoot.getElementById(`recipe-${index}`).style.display = this.openRecipes[index] ? "block" : "none";
            });
        });
    }

    getCardSize() {
        return 3;
    }
}

customElements.define("recipe-card", RecipeCard);
