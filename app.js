// 1. place to hold the dashboard
const vizContainer = document.getElementById("vizContainer");
// 2. URL for the automatic sized dashboard
const autoURL = "yourAutomaticSizedDashboardURL";
//   3. URL for the fixed sized dashboard
const fixedURL = "yourFixedSizeDashboardURL";
let viz;
const options = {
  height: window.innerHeight,
  width: window.innerWidth,
  hideToolbar: true,
  onFirstInteractive: () => {
    console.log(`Viz has loaded`);
  },
};

// when the page loads we want to see the dashboard
function initViz() {
  viz = new tableau.Viz(vizContainer, fixedURL, options);
}

function autoResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  viz.setFrameSize(width, height);
}

function reSizeFixedDashboard() {
  const sheet = viz.getWorkbook().getActiveSheet();
  sheet
    .changeSizeAsync({
      behavior: "EXACTLY",
      maxSize: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    })
    .then(viz.setFrameSize(window.innerWidth, window.innerHeight));
}

window.addEventListener("resize", () => {
  console.log(
    `Resizing the window ${window.innerHeight}, ${window.innerWidth}`
  );
  reSizeFixedDashboard();
});

document.addEventListener("DOMContentLoaded", initViz());
