export const getValueInRange = (min, max, value) => {
  let ret_value = value;
  if (min != null) if (ret_value < min) return min;
  if (max != null) if (ret_value > max) return max;
  return ret_value;
};

export function isTokenExpired(token) {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

export function heatmapData(inputArray) {
  return inputArray.map((item) => {
    const { date, ...rest } = item;
    const data = Object.keys(rest).map((key) => ({
      x: key,
      y: rest[key],
    }));
    return { id: date, data: data };
  });
}

export const signOut = (setPathName) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("profile");
  setPathName("/login/");
};

export function convertToTitleCase(input) {
  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const getLabelValueData = (data, key, value) => {
  return data.map((item) => {
    return { id: item[key], label: item[key], value: item[value] };
  });
};

export const requestWrapper = (request, setPathName) => {
  if (isTokenExpired(localStorage.getItem("refreshToken"))) {
    signOut(setPathName);
  } else {
    if (isTokenExpired(localStorage.getItem("accessToken"))) {
      const xhr = new XMLHttpRequest();
      const url = `${process.env.REACT_APP_API}/user/reauthenticate/`;
      const refreshToken = localStorage.getItem("refreshToken");

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const newAccessToken = response.access; // Assuming the new access token is in 'access'
          localStorage.setItem("accessToken", newAccessToken);
          request();
        } else {
          console.error("Error refreshing token:", xhr.responseText);
        }
      };

      xhr.onerror = function () {
        console.error("Request failed");
      };

      const body = JSON.stringify({ refresh: refreshToken });
      xhr.send(body);
    } else {
      request();
    }
  }
};

export function setChoices(url, setFun) {
  const accessToken = localStorage.getItem("accessToken");
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((data) => data.json())
    .then((data) => setFun(data));
}


const GRAPH_COLORS = [
  "#FF5733", // Vivid Red
  // "#33FF57",  // Bright Green
  // "#3357FF",  // Bright Blue
  "#F1C40F", // Sunflower Yellow
  "#E67E22", // Carrot Orange
  "#2ECC71", // Emerald Green
  "#3498DB", // Peter River Blue
  "#9B59B6", // Amethyst Purple
  "#E74C3C", // Alizarin Red
  "#34495E", // Wet Asphalt Grey
  "#1ABC9C", // Turquoise
  "#F39C12", // Orange
  "#D35400", // Pumpkin
  "#2C3E50", // Midnight Blue
  "#16A085", // Green Sea
  "#2980B9", // Bright Sea Blue
  "#8E44AD", // Wisteria Purple
  "#C0392B", // Red
  "#7F8C8D", // Concrete Grey
  "#F4D03F", // Bright Yellow
  "#BDC3C7", // Silver Grey
  "#EAB8C9", // Pale Pink
  "#F1A7A1", // Light Coral
  "#D5DBDB", // Light Grey
  "#C8E6C9", // Light Green
  "#FFF3E0", // Light Cream
  "#B2EBF2", // Light Cyan
  "#FFCCBC", // Light Orange
  "#F8BBD0", // Light Pink
  "#D1C4E9", // Light Purple
  "#FFABAB", // Soft Red
  "#FFE2E2", // Soft Pink
  "#D4E157", // Lime Green
  "#FBC02D", // Bright Amber
  "#FFB74D", // Light Amber
  "#FF8A65", // Coral
  "#A1887F", // Light Brown
  "#6D4C41", // Dark Brown
  "#B0BEC5", // Blue Grey
  "#7E57C2", // Light Purple
  "#FFAB91", // Light Salmon
  "#90A4AE", // Grey Blue
  "#FFF9C4", // Light Yellow
  "#DCE775", // Light Lime
  "#FFD740", // Bright Yellow
  "#FF5722", // Deep Orange
  "#388E3C", // Green
  "#0277BD", // Dark Blue
  "#512DA8", // Dark Purple
  "#D500F9", // Electric Violet
  "#FF1744", // Neon Red
  "#4DD0E1", // Sky Blue
  "#F06292", // Light Pink
  "#C2185B", // Deep Pink
  "#F57C00", // Medium Orange
  "#009688", // Teal
  "#0288D1", // Bright Blue
  "#AEEA00", // Bright Lime
  "#673AB7", // Purple Medium
  "#CDDC39", // Lime
  "#FFA726", // Orange Medium
  "#B3E5FC", // Light Blue
  "#D32F2F", // Crimson Red
  "#3F51B5", // Indigo
  "#5C6BC0", // Light Indigo
  "#FFCC80", // Light Caramel
  "#D1C4E9", // Light Lavender
  "#B2DFDB", // Light Teal
  "#FFF59D", // Pale Yellow
];

export function getGraphColor(index) {
  return GRAPH_COLORS[index % GRAPH_COLORS.length];
}
