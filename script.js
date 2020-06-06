//on load of window
window.onload = function () {
  //get all employees
  let request = new this.XMLHttpRequest();
  request.open(
    "GET",
    "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php"
  );
  request.send();
  request.onload = () => {
    //if the request status is ok send the data to the function to display
    if (request.status === 200) {
      //parse the response to json and send to the function
      display(JSON.parse(request.response));
      //display all the roles at the top to search
      getRoles();
    } else {
      //if there is an error tell me why
      this.console.log(
        "Error: " + request.status + " Text: " + request.statusText
      );
    }
  };

  //function to display all roles
  function getRoles() {
    let request = new this.XMLHttpRequest();
    let output = document.getElementById("roles");
    request.open(
      "GET",
      "http://sandbox.bittsdevelopment.com/code1/fetchroles.php"
    );
    request.send();
    request.onload = () => {
      //if the request status is ok send the data to the function to display
      if (request.status === 200) {
        //parse the response to json
        var roles = JSON.parse(request.response);
        var html = "";
        html += "<div class='card_Badges'><div class='row'>";
        for (let y = 0; y < roles.length; y++) {
          html +=
            "<div class='card_Badge' onclick=showEmp(" +
            roles[y].roleid +
            "); style='background-color: " +
            roles[y].rolecolor +
            "'>";
          html += "<h3>" + roles[y].rolename + "</h3>";
          html += "</div>";
        }
        html += "</div></div></div>";
        output.innerHTML = html;
      } else {
        //if there is an error tell me why
        this.console.log(
          "Error: " + request.status + " Text: " + request.statusText
        );
      }
    };
  }
};
//if the user clicks one of the role buttons get users with only that role
function showEmp(id) {
  let request = new this.XMLHttpRequest();
  //add the id of the role to the request
  request.open(
    "GET",
    "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php?roles=" + id
  );
  request.send();
  request.onload = () => {
    //if the request status is ok send the data to the function to display
    if (request.status === 200) {
      //parse the response to json and send to the function to show one employee
      display(JSON.parse(request.response));
    } else {
      //if there is an error tell me why
      this.console.log(
        "Error: " + request.status + " Text: " + request.statusText
      );
    }
  };
}
//show employees/employee
function display(obj) {
    //output div
  var output = document.getElementById("output");
  //variable to add all output divs
  var outputHTML = "";
  //outer div and row div
  outputHTML += "<div class='container'><div class='row'>";

  //for each object in the given response output employee
  for (let x = 1; x <= Object.keys(obj).length; x++) {
    outputHTML += "<div class='card'>";

    let crownHTML = "";
    let picHTML = "";

    //if the employee is featured add a crown
    if (obj[x].employeeisfeatured == 1) {
      crownHTML += "<div class='card_crown'><p>👑</p></div>";
    } else {
      crownHTML += "";
    }

    outputHTML += crownHTML + "<div class='card_Image_Title'>";

    //if the employee has a picture add it using the id of the employee
    if (obj[x].employeehaspic == 1) {
      picHTML +=
        "<img class='card_Image' src='http://sandbox.bittsdevelopment.com/code1/employeepics/" +
        obj[x].employeeid +
        ".jpg' alt='Picture of " +
        obj[x].employeefname +
        " " +
        obj[x].employeelname +
        "'/>";
    } else {
      picHTML +=
        "<img class='card_Image' src='/img/no-image.jpg' alt='No image for " +
        obj[x].employeefname +
        " " +
        obj[x].employeelname +
        "'/>";
    }

    outputHTML += picHTML + "<h2>" +obj[x].employeefname +" " +obj[x].employeelname +"</h2></div>";

    outputHTML += "<div class='card_Description'>";
    outputHTML += "<p>" + obj[x].employeebio + "</p></div>";
    outputHTML += "<div class='card_Badges'><div class='row'>";

    //for each role the user has output the role 
    for (let y = 0; y < obj[x].roles.length; y++) {
      outputHTML +=
        "<div class='card_Badge' style='background-color: " +
        obj[x].roles[y].rolecolor +
        "'>";
      outputHTML += "<h3>" + obj[x].roles[y].rolename + "</h3>";
      outputHTML += "</div>";
    }//END ROLE FOR LOOP
    outputHTML += "</div></div></div>";

  }//END EMPLOYEE FOR LOOP

  outputHTML += "</div></div>";
  //output the employees to html
  output.innerHTML = outputHTML;
}
