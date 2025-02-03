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
                :host {
                    --primary-color: #2196F3;
                    --secondary-color: #F5F5F5;
                    --text-color: #333;
                    --border-color: #E0E0E0;
                }
                .recipe-name {
                    cursor: pointer;
                    font-weight: bold;
                    padding: 10px;
                    display: block;
                    border-radius: 4px;
                    transition: background-color 0.3s ease;
                }
                .recipe-name:hover {
                    background-color: #515b63;
                }
                .recipe-details {
                    display: none;
                    margin-top: 5px;
                    padding: 15px;
                    border: 1px solid black;
                    border-radius: 4px;
                }
                .recipe-details ul, 
                .recipe-details ol {
                    padding-left: 20px;
                    margin: 10px 0;
                }
                .recipe-details ul li, 
                .recipe-details ol li {
                    margin-bottom: 5px;
                    color: white;
                }
                .recipe-details p {
                    margin: 10px 0;
                    font-weight: bold;
                    color: white;
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
                        <p>Ingredients:</p>
                        <ul>
                            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                        </ul>
                        <p>Steps:</p>
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
