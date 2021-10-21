const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const hasWeekPassed =
  localStorage.getItem("weeklyVisitTime") &&
  Date.now() - localStorage.getItem("weeklyVisitTime") > 604800000
    ? true
    : false;

if (!localStorage.getItem("uniqueId")) {
  localStorage.setItem("uniqueId", generateUniqueId());
} else if (hasWeekPassed) {
  localStorage.setItem("weeklyVisitTime", Date.now());
}

const addTrackingToHyperlinks = () => {
  for (const item of document.querySelectorAll('a')) {
    item.addEventListener("click", () => {
      trackUserClick(item.getAttribute("href"));
    });
  };
};

const trackUserClick = (targetUrl) => {
  const data = {
    userId: localStorage.getItem("uniqueId"),
    clickTime: Date.now(),
    currentPage: window.location.href,
    targetPage: targetUrl,
    eventType: "userClickthrough"
  };

  sendTrackingData(data);
};

const trackUserVisit = () => {
  const data = {
    userId: localStorage.getItem("uniqueId"),
    visitTime: Date.now(),
    currentPage: window.location.href,
    weekPassed: hasWeekPassed,
    eventType: "userVisits"
  };

  sendTrackingData(data);
};

window.addEventListener("beforeunload", () => {
  const data = {
    userId: localStorage.getItem("uniqueId"),
    visitTime: Date.now(),
    currentPage: window.location.href,
    eventType: "userLeaves"
  };

  sendTrackingData(data);
});

const sendTrackingData = (data) => {
  console.log(data);
  /*
  fetch('__API__', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
    body: JSON.stringify(data),
  })
  */
};

trackUserVisit();
addTrackingToHyperlinks();