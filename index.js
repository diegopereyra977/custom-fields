// Trello plugin code
import { Trello } from "trello";

// Create a new custom field type
export const CustomField = {
  name: "Custom Field",
  type: "text"
};

// Add a custom field to a card
export function addCustomField(boardId, listId, cardId) {
  const trello = new Trello();
  const card = trello.cards.get(boardId, listId, cardId);
  const field = {
    name: "",
    type: "text",
    value: ""
  };
  // Show a pop-up to create the name and type of the custom field
  const popup = document.getElementById("custom-field-popup");
  popup.style.display = "block";
  // Get the name of the custom field
  const fieldNameInput = document.getElementById("custom-field-name");
  // Get the type of the custom field
  const fieldTypeSelect = document.getElementById("custom-field-type");
  // Add the options to the pick list
  fieldTypeSelect.innerHTML = "";
  for (const type of [
    "text",
    "number",
    "date",
    "checkbox"
  ]) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    fieldTypeSelect.appendChild(option);
  }
  // Handle the submit button
  const submitButton = document.getElementById("custom-field-submit");
  submitButton.addEventListener("click", () => {
    // Get the name and type of the custom field
    const fieldName = fieldNameInput.value;
    const fieldType = fieldTypeSelect.value;
    // Add the custom field to the card
    addCustomField(boardId, listId, cardId, fieldName, fieldType);
    // Hide the pop-up
    popup.style.display = "none";
  });
}

// Get the value of a custom field on a card
export function getCustomFieldValue(boardId, listId, cardId, fieldName) {
  const trello = new Trello();
  const card = trello.cards.get(boardId, listId, cardId);
  return card.customFields.get(fieldName);
}

// Update the value of a custom field on a card
export function updateCustomFieldValue(boardId, listId, cardId, fieldName, value) {
  const trello = new Trello();
  const card = trello.cards.get(boardId, listId, cardId);
  const field = card.customFields.get(fieldName);
  field.value = value;
  card.customFields.update(field);
  card.save();
}

// Delete a custom field from a card
export function deleteCustomField(boardId, listId, cardId, fieldName) {
  const trello = new Trello();
  const card = trello.cards.get(boardId, listId, cardId);
  card.customFields.remove(fieldName);
  card.save();
}
