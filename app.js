// ============================================================
// THE SMOKEHOUSE PRODUCTION DATA — MENU VER. 4 UPDATE
// Recipe ingredient quantities are PREPARED/CUTTED quantities.
// Raw shopping amounts are calculated from prep yields below.
// Unknown supplier pricing is shown as PRICE NEEDED instead of guessed.
// ============================================================

const INGREDIENTS = {
  "Meat": { rawName: "Meat", rawCost: 7.00, prepYield: 5 },
  "Onion": { rawName: "Onion", rawCost: 3.00, prepYield: 5 },
  "Carrot": { rawName: "Carrot", rawCost: 5.00, prepYield: 5 },
  "Lettuce": { rawName: "Lettuce", rawCost: 3.00, prepYield: 5 },
  "Tomato": { rawName: "Tomato", rawCost: 4.00, prepYield: 5 },
  "Wheat": { rawName: "Wheat", rawCost: 2.00, prepYield: 5 },
  "Flour": { rawName: "Wheat", rawCost: 2.00, prepYield: 5 },
  "Cutted Potato": { rawName: "Potato", rawCost: 3.00, prepYield: 5 },
  "Apple": { rawName: "Apple", rawCost: 2.00, prepYield: 5 },
  "Peach": { rawName: "Peach", rawCost: 6.00, prepYield: 5 },
  "Banana": { rawName: "Banana", rawCost: 2.00, prepYield: 5 },
  "Lemon": { rawName: "Lemon", rawCost: 1.00, prepYield: 5 },
  "Corn": { rawName: "Corn", rawCost: 3.00, prepYield: 1 },
  "Ice Cube": { rawName: "Ice Cube", rawCost: 2.00, prepYield: 1 },
  "Coffee Beans": { rawName: "Coffee Beans", rawCost: 10.00, prepYield: 1 },
  "Tequila": { rawName: "Tequila", rawCost: 9.00, prepYield: 1 },
  "Whiskey": { rawName: "Whiskey", rawCost: 9.00, prepYield: 1 },
  "Lime Juice": { rawName: "Lime Juice", rawCost: 4.00, prepYield: 1 },
  "Tonic Water": { rawName: "Tonic Water", rawCost: 2.00, prepYield: 1 }
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
  },
  {
    id: "cottontail-stew",
    name: "Creed's Cottontail Stew",
    ingredients: { "Meat": 3, "Onion": 2, "Carrot": 1 }
  },
  {
    id: "brisket-stack",
    name: "Smokehouse Brisket Stack",
    ingredients: { "Meat": 3, "Onion": 2, "Wheat": 1 }
  },
  {
    id: "sun-brewed-tea",
    name: "Smokehouse Sun-Brewed Sweet Tea",
    ingredients: { "Coffee Beans": 1, "Lemon": 1, "Ice Cube": 1 }
  },
  {
    id: "buckshot-burger",
    name: "Bucky's Buckshot Burger",
    ingredients: { "Onion": 3, "Meat": 2, "Wheat": 1 }
  },
  {
    id: "buck-country-chili",
    name: "Buck Country Chili",
    ingredients: { "Onion": 3, "Meat": 2, "Tomato": 1 }
  },
  {
    id: "dirty-weenies",
    name: "Dirty Weenies",
    ingredients: { "Onion": 2, "Meat": 2, "Wheat": 1, "Tomato": 1 }
  },
  {
    id: "country-cornbread",
    name: "Country Cornbread",
    ingredients: { "Corn": 1, "Flour": 1, "Onion": 2 }
  },
  {
    id: "drunkin-apple-pie",
    name: "Drunkin' Apple Pie",
    ingredients: { "Flour": 2, "Whiskey": 1, "Apple": 3 }
  },
  {
    id: "nanner-puddin",
    name: "Mamaw's Nanner Puddin'",
    ingredients: { "Banana": 3, "Wheat": 2 }
  },
  {
    id: "peach-cobbler",
    name: "Georgia Peach Cobbler",
    ingredients: { "Peach": 3, "Wheat": 2 }
  },
  {
    id: "pecan-log",
    name: "Southern Pecan Log",
    ingredients: { "Coffee Beans": 1, "Flour": 3, "Banana": 2 }
  },
  {
    id: "sweet-potato-pie",
    name: "Sweet Potato Pie",
    ingredients: { "Cutted Potato": 3, "Flour": 2, "Banana": 1 }
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
  if (!recipe.ingredients) return recipe.note || "Recipe data unavailable.";
  return Object.entries(recipe.ingredients)
    .map(([ingredient, qty]) => `${qty} ${ingredient}`)
    .join(", ");
}

function renderRecipes() {
  recipeGrid.innerHTML = RECIPES.map(recipe => {
    const disabled = !recipe.ingredients;
    return `
      <label class="recipe-row${disabled ? " recipe-unavailable" : ""}">
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
          aria-label="${escapeHtml(recipe.name)} craft quantity"
          ${disabled ? "disabled" : ""}>
      </label>
    `;
  }).join("");
}

function getPreparedTotals() {
  const preparedTotals = {};

  for (const recipe of RECIPES) {
    if (!recipe.ingredients) continue;
    const recipeQty = quantities[recipe.id] || 0;
    for (const [ingredient, perRecipeQty] of Object.entries(recipe.ingredients)) {
      preparedTotals[ingredient] = (preparedTotals[ingredient] || 0) + (recipeQty * perRecipeQty);
    }
  }

  return preparedTotals;
}

function getRawPurchases(neededPrepared) {
  const grouped = new Map();

  for (const [ingredient, preparedQty] of neededPrepared) {
    const data = INGREDIENTS[ingredient];
    if (!data) continue;

    const key = `${data.rawName}|${data.prepYield}|${data.rawCost ?? "unknown"}`;
    const current = grouped.get(key) || {
      rawName: data.rawName,
      rawCost: data.rawCost,
      prepYield: data.prepYield,
      preparedQty: 0
    };

    current.preparedQty += preparedQty;
    grouped.set(key, current);
  }

  return [...grouped.values()].sort((a, b) => a.rawName.localeCompare(b.rawName));
}

function calculate() {
  const preparedTotals = getPreparedTotals();
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

  const rawPurchases = getRawPurchases(neededPrepared);
  let totalCash = 0;
  let missingPriceCount = 0;

  shoppingList.innerHTML = rawPurchases.map(data => {
    const rawQty = Math.ceil(data.preparedQty / data.prepYield);
    const preparedAvailable = rawQty * data.prepYield;
    const leftover = preparedAvailable - data.preparedQty;
    const hasPrice = Number.isFinite(data.rawCost);
    const lineCost = hasPrice ? rawQty * data.rawCost : null;

    if (hasPrice) totalCash += lineCost;
    else missingPriceCount += 1;

    const detail = data.prepYield > 1
      ? `${data.preparedQty} prepared needed • ${preparedAvailable} prepared after purchase • ${leftover} leftover`
      : `${data.preparedQty} needed`;

    return `
      <div class="result-row">
        <div>
          <span><strong>${rawQty}</strong> × ${escapeHtml(data.rawName)}</span>
          <small>${escapeHtml(detail)}</small>
        </div>
        <strong>${hasPrice ? money(lineCost) : "PRICE NEEDED"}</strong>
      </div>
    `;
  }).join("");

  cashTotal.textContent = missingPriceCount
    ? `${money(totalCash)} + ${missingPriceCount} missing price${missingPriceCount === 1 ? "" : "s"}`
    : money(totalCash);
}

function buildCopyText() {
  const preparedTotals = getPreparedTotals();
  const neededPrepared = Object.entries(preparedTotals)
    .filter(([, qty]) => qty > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  if (!neededPrepared.length) return "";

  const rawPurchases = getRawPurchases(neededPrepared);
  let totalCash = 0;
  let missingPriceCount = 0;
  const lines = ["THE SMOKEHOUSE SHOPPING LIST", "------------------------------"];

  for (const data of rawPurchases) {
    const rawQty = Math.ceil(data.preparedQty / data.prepYield);
    const hasPrice = Number.isFinite(data.rawCost);
    const lineCost = hasPrice ? rawQty * data.rawCost : null;

    if (hasPrice) totalCash += lineCost;
    else missingPriceCount += 1;

    const yieldNote = data.prepYield > 1
      ? ` (${data.preparedQty} prepared needed; ${data.prepYield} per raw)`
      : "";

    if (hasPrice) {
      lines.push(`${rawQty}x ${data.rawName} @ ${money(data.rawCost)} — ${money(lineCost)}${yieldNote}`);
    } else {
      lines.push(`${rawQty}x ${data.rawName} — PRICE NEEDED${yieldNote}`);
    }
  }

  lines.push("------------------------------");
  lines.push(missingPriceCount
    ? `KNOWN CASH: ${money(totalCash)} + ${missingPriceCount} missing price${missingPriceCount === 1 ? "" : "s"}`
    : `CASH TO BRING: ${money(totalCash)}`);

  return lines.join("\n");
}

recipeGrid.addEventListener("input", event => {
  const input = event.target.closest(".qty-input");
  if (!input || input.disabled) return;

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
