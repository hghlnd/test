let items = JSON.parse(localStorage.getItem("items")) || [];

// Toast popup
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// Initial render
document.addEventListener("DOMContentLoaded", displayItems);

// Add item
document.getElementById("addItemButton").addEventListener("click", () => {
  const name = document.getElementById("itemName").value.trim();
  const location = document.getElementById("itemLocation").value.trim();

  if (!name) {
    showToast("Please enter an item name.");
    return;
  }

  items.push({ name, location });
  localStorage.setItem("items", JSON.stringify(items));
  displayItems();

  document.getElementById("itemName").value = "";
  document.getElementById("itemLocation").value = "";

  showToast("Item added!");
});

// Display items
function displayItems() {
  const list = document.getElementById("itemList");
  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = "<li><em>No items yet</em></li>";
    return;
  }

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const locText = item.location ? ` (${item.location})` : " (no location)";

    li.innerHTML = `
      <span class="item-info">
        ${index + 1}. <strong>${item.name}</strong>${locText}
      </span>

      <button class="delete-btn" onclick="deleteItem(${index})">
        <img src="delete-icon.png" alt="Delete" />
      </button>
    `;

    list.appendChild(li);
  });
}

// Delete item
function deleteItem(i) {
  items.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(items));
  displayItems();
  showToast("Item deleted");
}

// Reminders
let reminderIntervalId = null;

document.getElementById("setReminderButton").addEventListener("click", () => {
  const mins = parseInt(document.getElementById("reminderInterval").value);

  if (isNaN(mins) || mins <= 0) {
    showToast("Enter a valid number of minutes.");
    return;
  }

  if (reminderIntervalId) clearInterval(reminderIntervalId);

  reminderIntervalId = setInterval(() => {
    if (items.length === 0) {
      alert("Check your pockets!");
      return;
    }

    const listText = items
      .map(i => `${i.name}${i.location ? ` (${i.location})` : ""}`)
      .join(", ");

    alert("Reminder! Items: " + listText);
  }, mins * 60 * 1000);

  showToast("Reminder set!");
});
