document.addEventListener("DOMContentLoaded", () => {
  const textareas = document.querySelectorAll(".copiedText");
  const copyBtns = document.querySelectorAll(".copyBtn");
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  const toast = document.getElementById("toast");

  // Show toast notification
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1500);
  }

  // Copy text functionality
  copyBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const text = textareas[index].value.trim();
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast("Copied!");
        }).catch(() => {
          showToast("Failed to copy!");
        });
      } else {
        showToast("Nothing to copy!");
      }
    });
  });

  // Delete / Clear text functionality
  deleteBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      textareas[index].value = "";
      showToast("Cleared!");
    });
  });


  // Load saved texts from storage
  chrome.storage.local.get("savedTexts", (data) => {
    const savedTexts = data.savedTexts || [];
    textareas.forEach((ta, index) => {
      ta.value = savedTexts[index] || "";
    });
  });

  // Save current texts to storage
  function saveTexts() {
    const texts = Array.from(textareas).map(ta => ta.value);
    chrome.storage.local.set({ savedTexts: texts });
  }

  // Save texts on any input change
  textareas.forEach((ta) => {
    ta.addEventListener("input", saveTexts);
  });

});
