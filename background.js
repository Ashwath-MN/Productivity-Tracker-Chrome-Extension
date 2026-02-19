// Track active website + total time every 5 seconds

setInterval(() => {

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){

    if(!tabs[0] || !tabs[0].url) return;

    try{
      let url = new URL(tabs[0].url);
      let site = url.hostname;

      chrome.storage.local.get(["sites", "timeSpent"], function(data){

        let sites = data.sites || {};
        let totalTime = data.timeSpent || 0;

        // website time
        sites[site] = (sites[site] || 0) + 5;

        // total time
        totalTime += 5;

        chrome.storage.local.set({
          sites: sites,
          timeSpent: totalTime
        });

      });

    }catch(e){
      console.log("Invalid URL");
    }

  });

}, 5000);
