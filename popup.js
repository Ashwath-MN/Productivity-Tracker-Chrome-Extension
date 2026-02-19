// Save Goal function
function saveGoal(){
  let goal = document.getElementById("goal").value;

  chrome.storage.local.set({ dailyGoal: goal }, () => {
    alert("Goal saved!");
    loadData();
  });
}

// Load saved data
function loadData(){

  // Show total time spent
  chrome.storage.local.get(["timeSpent"], function(data){
    document.getElementById("time").innerText =
      data.timeSpent ? data.timeSpent + " seconds" : "0 seconds";
  });

  // Show saved goal
  chrome.storage.local.get(["dailyGoal"], function(data){
    document.getElementById("savedGoal").innerText =
      data.dailyGoal ? data.dailyGoal + " hours" : "Not set";
  });

  // ⭐ Show website usage
  chrome.storage.local.get(["sites"], function(data){
    let sites = data.sites || {};
    let siteDisplay = document.getElementById("sites");

    siteDisplay.innerHTML = "";

    if(Object.keys(sites).length === 0){
      siteDisplay.innerText = "No data yet";
      return;
    }

    for(let site in sites){
      let div = document.createElement("div");
      div.textContent = site + " → " + sites[site] + " sec";
      siteDisplay.appendChild(div);
    }
  });
}

// Run when popup opens
document.addEventListener("DOMContentLoaded", () => {
  loadData();

  document.getElementById("saveBtn")
    .addEventListener("click", saveGoal);
});
