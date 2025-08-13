// CDU Builder - Preview
window.CDUPreview = {
  renderPreview: function (data) {
    const previewContent = document.getElementById("previewContent");

    let messagesHTML = "";
    if (data.initialMessage) {
      messagesHTML +=
        '<div class="message-preview">' +
        data.initialMessage.replace(/\n/g, "<br>") +
        "</div>";
    }
    if (data.secondMessage) {
      messagesHTML +=
        '<div class="message-preview">' +
        data.secondMessage.replace(/\n/g, "<br>") +
        "</div>";
    }

    let optionsHTML = '<div class="options-preview">';
    data.options.forEach(function (option) {
      optionsHTML +=
        '<div class="option-preview" onclick="CDUPreview.previewOptionClick(\'' +
        option.action +
        "')\">" +
        option.text +
        "</div>";
    });
    optionsHTML += "</div>";

    previewContent.innerHTML = messagesHTML + optionsHTML;
  },

  previewOptionClick: function (action) {
    CDUBuilder.showStatus("Opcion seleccionada: " + action, "success");
  },
};
