import axios from "axios";


var serverURL = "http://localhost:5000";
const getData = async (url) => {
  try {

    //
    let headers = {};
    if (localStorage.getItem("TOKEN")) {
      headers = { headers: { Authorization: localStorage.getItem("TOKEN") } };
    }
    //

    var response = await axios.get(`${serverURL}/${url}`, headers);
    var result = await response.data;

    return result;
  } catch (e) {
    // jab token expire ho jayega tab ye call hoga. //
     if(e.response.status == 401)
     {
       localStorage.clear();
       window.location.replace("/admin_login");
     }
    // --------------------------------------------//
  }
};

const postData = async (url, body) => {
  try {

    //
   // alert(localStorage.getItem("TOKEN"))
    let headers = {};
    if (localStorage.getItem("TOKEN")) {
      headers = { headers: { Authorization: localStorage.getItem("TOKEN") } };
    }
    //
    
    var response = await axios.post(`${serverURL}/${url}`, body, headers);
    var result = await response.data;

    return result;
  } catch (e) {
    // jab token expire ho jayega tab ye call hoga. //
    if(e.response.status == 401)
    {
      localStorage.clear();
      window.location.replace("/admin_login");
    }
    // --------------------------------------------//
  }
};

export { serverURL, getData, postData };
