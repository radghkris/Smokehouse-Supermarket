// ============================================================
// THE SMOKEHOUSE PRODUCTION DATA
// Recipe ingredient quantities are PREPARED/CUTTED quantities.
// Raw shopping amounts are calculated from prep yields below.
// ============================================================

const INGREDIENTS = {
  "Meat":        { rawName: "Meat",        rawCost: 7.00, prepYield: 5 },
  "Onion":       { rawName: "Onion",       rawCost: 3.00, prepYield: 5 },
  "Carrot":      { rawName: "Carrot",      rawCost: 5.00, prepYield: 5 },
  "Lettuce":     { rawName: "Lettuce",     rawCost: 3.00, prepYield: 5 },
  "Tomato":      { rawName: "Tomato",      rawCost: 4.00, prepYield: 5 },
  "Wheat":       { rawName: "Wheat",       rawCost: 1.00, prepYield: 5 },
  "Lemon":       { rawName: "Lemon",       rawCost: 1.00, prepYield: 5 },
  "Corn":        { rawName: "Corn",        rawCost: 3.00, prepYield: 1 },
  "Ice Cube":    { rawName: "Ice Cube",    rawCost: 2.00, prepYield: 1 },
  "Tequila":     { rawName: "Tequila",     rawCost: 9.00, prepYield: 1 },
  "Lime Juice":  { rawName: "Lime Juice",  rawCost: 4.00, prepYield: 1 },
  "Tonic Water": { rawName: "Tonic Water", rawCost: 3.00, prepYield: 1 }
};

const RECIPES = [
  {
    id: "scnd",
    name: "Smoked Chicken N' Dumplings",
    ingredients: { "Onion": 3, "Carrot": 1, "Wheat": 1, "Meat": 1 }
  },
  {
    id: "brunswick",
    name: "Brunswick Stew",
    ingredients: { "Onion": 2, "Meat": 2, "Corn": 1, "Tomato": 1 }
  },
  {
    id: "french-onion",
    name: "French Onion Soup",
    ingredients: { "Onion": 4, "Wheat": 2 }
  },
  {
    id: "blossom",
    name: "Premium Smokehouse Blossom",
    ingredients: { "Onion": 4, "Wheat": 1, "Meat": 1 }
  },
  {
    id: "meat-sweats",
    name: "Meat Sweats Burger",
    ingredients: { "Meat": 3, "Onion": 2, "Wheat": 1 }
  },
  {
    id: "collards",
    name: "Southern Collard Greens",
    ingredients: { "Lettuce": 3, "Onion": 2, "Meat": 1 }
  },
  {
    id: "burnt-ends",
    name: "Pitmaster's Burnt Ends",
    ingredients: { "Meat": 2, "Onion": 1 }
  },
  {
    id: "lemonade",
    name: "Fresh-Squeezed Lemonade",
    ingredients: { "Lemon": 1, "Ice Cube": 1 }
  },
  {
    id: "ranch-water",
    name: "Ranch Water",
    ingredients: { "Tequila": 1, "Lime Juice": 1, "Tonic Water": 1, "Ice Cube": 1 }
  }
];

const quantities = Object.fromEntries(RECIPES.map(recipe => [recipe.id, 0]));

const recipeGrid = document.querySelector("#recipeGrid");
const preparedList = document.querySelector("#preparedList");
const shoppingList = document.querySelector("#shoppingList");
const cashTotal = document.querySelector("#cashTotal");
const status = document.querySelector("#status");

function money(value) {
  return `$${Number(value).toFixed(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function recipeSummary(recipe) {
  return Object.entries(recipe.ingredients)
    .map(([ingredient, qty]) => `${qty} ${ingredient}`)
    .join(", ");
}

function renderRecipes() {
  recipeGrid.innerHTML = RECIPES.map(recipe => `
    <label class="recipe-row">
      <div>
        <h3>${escapeHtml(recipe.name)}</h3>
        <small>${escapeHtml(recipeSummary(recipe))}</small>
      </div>
      <input
        class="qty-input"
        type="number"
        min="0"
        step="1"
        inputmode="numeric"
        value="0"
        data-recipe-id="${recipe.id}"
        aria-label="${escapeHtml(recipe.name)} craft quantity">
    </label>
  `).join("");
}

function calculate() {
  const preparedTotals = {};

  for (const recipe of RECIPES) {
    const recipeQty = quantities[recipe.id] || 0;

    for (const [ingredient, perRecipeQty] of Object.entries(recipe.ingredients)) {
      preparedTotals[ingredient] = (preparedTotals[ingredient] || 0) + (recipeQty * perRecipeQty);
    }
  }

  const neededPrepared = Object.entries(preparedTotals)
    .filter(([, qty]) => qty > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  if (!neededPrepared.length) {
    preparedList.innerHTML = '<p class="empty">Enter recipe quantities to begin.</p>';
    shoppingList.innerHTML = '<p class="empty">No ingredients needed yet.</p>';
    cashTotal.textContent = money(0);
    return;
  }

  preparedList.innerHTML = neededPrepared.map(([ingredient, qty]) => `
    <div class="result-row">
      <span>${escapeHtml(ingredient)}</span>
      <strong>${qty}</strong>
    </div>
  `).join("");

  let totalCash = 0;

  shoppingList.innerHTML = neededPrepared.map(([ingredient, preparedQty]) => {
    const data = INGREDIENTS[ingredient];
    const rawQty = Math.ceil(preparedQty / data.prepYield);
    const preparedAvailable = rawQty * data.prepYield;
    const leftover = preparedAvailable - preparedQty;
    const lineCost = rawQty * data.rawCost;
    totalCash += lineCost;

    const detail = data.prepYield > 1
      ? `${preparedQty} needed • ${preparedAvailable} prepared after purchase • ${leftover} leftover`
      : `${preparedQty} needed`;

    return `
      <div class="result-row">
        <div>
          <span><strong>${rawQty}</strong> × ${escapeHtml(data.rawName)}</span>
          <small>${escapeHtml(detail)}</small>
        </div>
        <strong>${money(lineCost)}</strong>
      </div>
    `;
  }).join("");

  cashTotal.textContent = money(totalCash);
}

function buildCopyText() {
  const preparedTotals = {};

  for (const recipe of RECIPES) {
    const recipeQty = quantities[recipe.id] || 0;
    for (const [ingredient, perRecipeQty] of Object.entries(recipe.ingredients)) {
      preparedTotals[ingredient] = (preparedTotals[ingredient] || 0) + (recipeQty * perRecipeQty);
    }
  }

  const neededPrepared = Object.entries(preparedTotals)
    .filter(([, qty]) => qty > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  if (!neededPrepared.length) return "";

  let totalCash = 0;
  const lines = ["THE SMOKEHOUSE SHOPPING LIST", "------------------------------"];

  for (const [ingredient, preparedQty] of neededPrepared) {
    const data = INGREDIENTS[ingredient];
    const rawQty = Math.ceil(preparedQty / data.prepYield);
    const lineCost = rawQty * data.rawCost;
    totalCash += lineCost;
    const yieldNote = data.prepYield > 1
      ? ` (${preparedQty} prepared needed; ${data.prepYield} per raw)`
      : "";
    lines.push(`${rawQty}x ${data.rawName} @ ${money(data.rawCost)} — ${money(lineCost)}${yieldNote}`);
  }

  lines.push("------------------------------", `CASH TO BRING: ${money(totalCash)}`);
  return lines.join("\n");
}

recipeGrid.addEventListener("input", event => {
  const input = event.target.closest(".qty-input");
  if (!input) return;

  const parsed = Number.parseInt(input.value, 10);
  const safeQty = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;

  quantities[input.dataset.recipeId] = safeQty;
  input.value = safeQty;
  calculate();
});

document.querySelector("#clearButton").addEventListener("click", () => {
  for (const recipe of RECIPES) quantities[recipe.id] = 0;
  document.querySelectorAll(".qty-input").forEach(input => input.value = 0);
  status.textContent = "";
  calculate();
});

document.querySelector("#copyButton").addEventListener("click", async () => {
  const text = buildCopyText();

  if (!text) {
    status.textContent = "Enter at least one recipe quantity first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  }

  status.textContent = "Shopping list copied.";
  window.setTimeout(() => status.textContent = "", 2500);
});

document.querySelector("#printButton").addEventListener("click", () => window.print());

renderRecipes();
calculate();
