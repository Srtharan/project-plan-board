document.addEventListener("DOMContentLoaded", () => {
    const mainBoard = document.getElementById("main-board");
    const themeToggle = document.getElementById("theme-toggle");
    let currentTheme = "system"; // Default theme
    let segmentCount = 0;
    const stickerColors = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];
  
    // Toggle Theme
    themeToggle.addEventListener("click", () => {
      const body = document.body;
      currentTheme = currentTheme === "light" ? "dark" : currentTheme === "dark" ? "system" : "light";
      themeToggle.textContent = `Theme: ${currentTheme[0].toUpperCase() + currentTheme.slice(1)}`;
      body.classList.remove("light", "dark");
      if (currentTheme !== "system") body.classList.add(currentTheme);
    });
  
    // Add Segment
    document.querySelector(".add-segment").addEventListener("click", () => {
      const segment = document.createElement("div");
      segment.className = "segment";
      const segmentColor = stickerColors[segmentCount % stickerColors.length];
      segment.style.setProperty("--segment-color", segmentColor);
  
      segment.innerHTML = `
        <div class="title" contenteditable="true">Segment ${segmentCount + 1}</div>
        <button class="add-sticker">+ Add Sticker</button>
      `;
      mainBoard.insertBefore(segment, document.querySelector(".add-segment"));
  
      segmentCount++;
  
      // Add Sticker Functionality
      segment.querySelector(".add-sticker").addEventListener("click", () => {
        const sticker = document.createElement("div");
        sticker.className = "sticker";
        sticker.contentEditable = true;
        sticker.textContent = "New Sticker";
        sticker.style.background = stickerColors[Math.floor(Math.random() * stickerColors.length)];
        segment.appendChild(sticker);
      });
    });
  
    // Download PDF
    document.getElementById("download-pdf").addEventListener("click", () => {
      html2canvas(document.body).then(canvas => {
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // Fit to A4
        pdf.save("workboard.pdf");
      });
    });
  
    // Download PNG
    document.getElementById("download-png").addEventListener("click", () => {
      html2canvas(document.body).then(canvas => {
        const link = document.createElement("a");
        link.download = "workboard.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    });
  });
  