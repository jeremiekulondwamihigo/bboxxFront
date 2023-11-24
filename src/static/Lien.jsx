// eslint-disable-next-line no-undef

import axios from "axios";

export const lien = "http://localhost:5000/bboxx/support";
// export const lien = "http://localhost:5000/bboxx/support";
export const lien_image = "http://localhost:5000/bboxx/image";
export const config = {
  headers: {
    "Content-Type": "Application/json",
    Authorization: "Bearer " + localStorage.getItem("supportoken"),
  },
};
export const dateUrl = async () => {
  axios
    .get("http://worldtimeapi.org/api/timezone/Africa/Lubumbashi")
    .then((response) => {
      return response.data;
    });
};
export const isEmpty = (value) => {
  if (
    value === undefined ||
    value === null ||
    value == [] ||
    value.length === 0 ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
};

export const dateFrancais =(donner)=>{
  let dates = new Date(donner)
 return `${dates.getDate()}/${dates.getMonth()+1}/${dates.getFullYear()}`
}
