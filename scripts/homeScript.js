/*
    This file contains all of the functions that are required to run the main
    page
*/

/*
DESC:
    This function runs the setup for the main page. It runs on pageload
INPUT:
    None
OUTPUT:
    None
*/
function setup() {
    // Creates the dropdown for safety levels
    fnCreateDropdown("input", SAFETY_LEVELS, "pickSafety", DISPLAY_TEXT, DESCR_TEXT);
    // Creates the dropdown for location types
    fnCreateDropdown("input", LOCATION_TYPES, "pickType", DISPLAY_TEXT, DESCR_TEXT);
    // Creates the dropdown for unit selection
    fnCreateDropdown("input", UNIT_MULTIPLIERS, "pickMetric", DISPLAY_TEXT, DESCR_TEXT);
    // Creates the dropdown for sorting
    fnCreateDropdown("input", ORDER_BY, "pickOrder", DISPLAY_TEXT, DESCR_TEXT);
    // Creates the search bar and button
    fnCreateSearchBar("input", "pickDistance", DISTANCE_MESSAGE);
}


//  ============================================================================
function fnSetTrue(event)
{
  event.target.setAttribute("selected", "true");
}

function fnSetTextSafari (inputList) {
  var items = document.getElementsByClassName("dropdown-item");

  console.log("HERE");
  var i = 0;
  for (i = 0; i < inputList.length; i++) {
    if(items[i].getAttribute("selected") == "true")
    {
      //items[i].click();
      console.log(items[i].innerHTML);


      // Finds the parent of the event
      var parent = items[i].parentElement.parentElement
      // Finds the target of the event
      var target = parent.querySelector('.dropdown-toggle');
      // Sets the inner html
      target.innerHTML = items[i].innerHTML;
      // Sets the value

      console.log(target);

      target.setAttribute("value", items[i].getAttribute("value"));

      //  Creates an left arrow icon for the buttons
      var icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-chevron-left icon");
      target.appendChild(icon);

      // If there are results in safeLocs
      if(safeLocs != []) {
          // Clear the results
          fnClearResults();

          // If the sender is one of the following
          if(parent.id != "pickSafety" && parent.id != "pickType"){
              // Sort and populate the search results
              fnAllSearchResults(safeLocs);
          // Otherwise, empty the safe locations
          } else {
              safeLocs = [];
          }
      }
      break;
    }
  }
  items[i].setAttribute("selected","false");
}
//  ============================================================================

/*
DESC:
    Sets the text of the dropdown button to the selected value
INPUT:
    The event that triggered the function
OUTPUT:
    None
*/
function fnSetParentText(event) {
    //  set the event element to true for Safari
    event.target.setAttribute("selected","true");

    // Finds the parent of the event
    var parent = event.target.parentElement.parentElement
    // Finds the target of the event
    var target = parent.querySelector('.dropdown-toggle');
    // Sets the inner html
    target.innerHTML = event.target.innerHTML;
    // Sets the value
    target.setAttribute("value", event.target.getAttribute("value"));

    //  Creates an left arrow icon for the buttons
    var icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-chevron-left icon");
    target.appendChild(icon);

    // If there are results in safeLocs
    if(safeLocs != []) {
        // Clear the results
        fnClearResults();

        // If the sender is one of the following
        if(parent.id != "pickSafety" && parent.id != "pickType"){
            // Sort and populate the search results
            fnAllSearchResults(safeLocs);
        // Otherwise, empty the safe locations
        } else {
            safeLocs = [];
        }
    }
}

/*
DESC:
    Sorts the search results and displays them
INPUT:
    An input array of locations
OUTPUT:
    None
*/
function fnAllSearchResults(inputArray) {

    // Sort the array on the function chosen by the pickOrder dropdown
    safeLocs.sort(function(a,b) {
        return sortingFunctions(a,b,Number($('#button-pickOrder')[0].value))
    });

    // Clear all of the displayed results
    fnClearResults();

    // Display all of the search results
    for (var i = 0; i < inputArray.length; i++) {
        fnFormatSearchResult("searchResults", inputArray[i]);
    }
}

/*
DESC:
    Function that creates dropdown values programmatically
INPUT:
    The id of the div everything will be the child of, as mainParent,
    the list of input strings and values as inputList,
    the id of the dropdown item as id, and
    the string of instructions that will be displayed as textSource
OUTPUT:
    None
*/
function fnCreateDropdown(mainParent, inputList, id, textSource, textDescr) {
    // Gets the parent container
    var container = $("#" + mainParent)[0];

    // Creates a div for a bootstrap grid
    var displayGrid = document.createElement("div")
    displayGrid.classList += "container";

    // Creates a bootstrap row
    var row = document.createElement("div");
    row.classList += "row";

    // Creates the instructions for the button as a bootstrap column
    var btnInstruction = document.createElement("div");
    btnInstruction.classList += "col-5 btnInstruction";

    // Creates the drowdown as a bootstrap column
    var btnButton = document.createElement("div");
    btnButton.classList += "col-7 btnButton";

    // Creates an outer div for the dropdown menu
    var dropdown = document.createElement('div');
    dropdown.classList += "dropdown center";
    dropdown.id = id;

    // Creates a title for the given button
    var title = document.createElement('h2');
    title.innerHTML = textSource[id] + ":";

    // Creates description for each section
    var descr = document.createElement('h3');
    descr.innerHTML = textDescr[id];

    // Creates a button within the outer div
    var button = document.createElement('button');
    button.classList += "btn btn-secondary dropdown-toggle";
    button.id = "button-" + id;
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "dropdown");
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("value", inputList[0][1]);
    button.innerHTML = inputList[0][0];

    //  Creates an left arrow icon for the buttons
    var icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-chevron-left icon");
    button.appendChild(icon);

    // //  Set a scroll bar for pickType only
    // if (id == "pickType")
    // {
    //   // Creates a dropdown menu within the outer div
    //   var menu = document.createElement('select');
    //   menu.setAttribute("onblur", "fnSetTextSafari(LOCATION_TYPES)")
    //   menu.setAttribute("size", 10);
    //   menu.classList += "dropdown-menu";
    //   // button.setAttribute("aria-labelledby", button.id);
    //
    //   // var opt = document.createElement('option');
    //   // opt.classList += "default";
    //   // opt.setAttribute("value", "");
    //   // opt.setAttribute("selected", "");
    //   // opt.setAttribute("disabled", "");
    //   // opt.innerHTML = "Please select...";
    //   // menu.appendChild(opt);
    //
    //   // Populates the menu with dropdown options
    //   for (var i = 0; i < inputList.length; i++) {
    //       var a = document.createElement('option'); //  must be option to work
    //       a.classList += "dropdown-item";
    //       a.setAttribute("selected", "false");
    //       a.setAttribute("aria-expanded", "false");
    //       a.setAttribute("value", inputList[i][1]);
    //       a.addEventListener("click", fnSetParentText);
    //       //a.addEventListener("click", fnSetTrue);
    //       a.innerHTML = inputList[i][0];
    //
    //       // Adds as a child to the parent
    //       menu.appendChild(a);
    //   }
    // }
    //
    // else
    // {
      // Creates a dropdown menu within the outer div
      var menu = document.createElement('div');
      menu.classList += "dropdown-menu";
      button.setAttribute("aria-labelledby", button.id);

      // Populates the menu with dropdown options
      for (var i = 0; i < inputList.length; i++) {
          var a = document.createElement('a');
          a.classList += "dropdown-item";
          a.setAttribute("aria-expanded", "false");
          a.setAttribute("value", inputList[i][1]);
          a.addEventListener("click", fnSetParentText);
          a.innerHTML = inputList[i][0];

          // Adds as a child to the parent
          menu.appendChild(a);
      }
    // }

    // Adding as children
    dropdown.appendChild(button);
    dropdown.appendChild(menu);

    btnInstruction.appendChild(title);
    btnInstruction.appendChild(descr);
    btnButton.appendChild(dropdown);


    row.appendChild(btnInstruction);
    row.appendChild(btnButton);


    displayGrid.appendChild(row);

    container.appendChild(displayGrid);
}

/*
DESC:
    Function that creates the search bar
INPUT:
    The id of the div everything will be the child of, as mainParent,
    the id of the search bar as main_id, and
    the message that will be displayed inside the search bar as message
OUTPUT:
    None
*/
function fnCreateSearchBar(mainParent, main_id, message) {

    // Gets the main container
    var container = $("#" + mainParent)[0];

    // Creates an outer div
    var innerContainer = document.createElement('div');
    innerContainer.id = "inner-" + mainParent;

    // Creates the input bar
    var inputBar = document.createElement('input');
    inputBar.classList += "form-control center";
    inputBar.id = main_id;
    inputBar.setAttribute("type", "number");
    inputBar.setAttribute("placeholder", message);

    // Creates a listener for when the user presses enter
    inputBar.onkeypress = function(e){
        if(e.keyCode == 13) {
            // Searches for safe locations
            fnSearchSafeLocs();
        }
    };

    // Create the search button
    var searchButton = document.createElement('button');
    searchButton.classList += "btn btn-secondary";
    searchButton.id = "searchButton";
    searchButton.setAttribute("type", "button");
    searchButton.innerHTML = "Search";
    searchButton.onclick = fnSearchSafeLocs;

    var icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-search icon");
    searchButton.appendChild(icon);

    // Append everything together
    innerContainer.appendChild(inputBar);
    innerContainer.appendChild(searchButton);
    container.appendChild(innerContainer);
}

/*
DESC:
    Function that searches for safe locations
INPUT:
    None
OUTPUT:
    None
*/
function fnSearchSafeLocs() {


    // Creates a list of safe locations
    safeLocs = []

    // Clears the search results
    fnClearResults();

    // Creates a loading screen
    fnCreateLoadingScreen();

    // Set a hard limit on the search distance
    if($("#pickDistance")[0].value > MAX_DISTANCE) {
        $("#pickDistance")[0].value = MAX_DISTANCE
    }

    // Make sure that there is a valid value in the search function
    if($("#pickDistance")[0].value <= 0 ||
       $("#pickDistance")[0].value == "") {
           $("#pickDistance")[0].value = 10
       }

    // Convert the distance to the appropriate units
    distance = $("#pickDistance")[0].value*$("#pickMetric")[0].children[0].value;

    // Get the value of the dropdowns
    searchCriteria = $("#button-pickType")[0].value;
    dangerCutoff = $("#button-pickSafety")[0].value;

    // Update the loading text
    fnSetLoadingText("Gathering Location Data");

    // Get the user's location
    getLocation(safeLocs, fnAllSearchResults);
}

/*
DESC:
    Function that updates the text on the loading screen
INPUT:
    A string message as text
OUTPUT:
    None
*/
function fnSetLoadingText(text) {
    $("#loaderText")[0].innerHTML = text + "...";
}

/*
DESC:
    Function that creates a loading animation
INPUT:
    None
OUTPUT:
    None
*/
function fnCreateLoadingScreen() {
    $("#searchResults")[0].innerHTML = "<div class='loader'></div>";
    $("#searchResults")[0].innerHTML += "<p id='loaderText'></p>";
}

/*
DESC:
    Function that clears search results from the main page
INPUT:
    None
OUTPUT:
    None
*/
function fnClearResults() {
    // While there are any children
    while ($("#searchResults")[0].firstChild) {
        // Remove the first child
        $("#searchResults")[0].removeChild($("#searchResults")[0]
        .firstChild);
    }
}

/*
DESC:
    Function that toggles the min/maximization of dropdowns
INPUT:
    The event that triggered the function as e
OUTPUT:
    None
*/
function fnToggle(e) {

    // The parent element that called it
    var parent = e.target.parentNode.parentNode.parentNode;
    // The element that should be expanding
    var expanding = parent.querySelector('.expanded-result');

    // If hidden, display
    if (expanding.style.display === "none") {
        expanding.style.display = "block";
    // and vice versa
    } else {
        expanding.style.display = "none";
    }
}

//  Will toggle a subCircle to full or empty
function fnToggleCirc(e, super_dangerous) {
  $(e).toggleClass("subCircle subCircle-full");
  if (super_dangerous) $(e).toggleClass("super-dangerous");
}

/*
DESC:
    Function that creates a search result and populates it
INPUT:
    Takes in the id of the parent as mainParent, and an array of data as
    inputArray
OUTPUT:
    None
*/
function fnFormatSearchResult(mainParent, inputArray) {
    // Finds the parent container
    var container = $("#" + mainParent)[0];

    // Creates a div to hold the search result
    var searchResult = document.createElement("div");
    searchResult.classList += "searchResult";
    // searchResult.onclick = fnToggle // toggle for seeing map links

    // Creates a header for the search result
    // Bootstrap grid
    var containerHeader = document.createElement("div")
    containerHeader.classList += "container searchResult";

    // Creates a bootstrap row
    var row = document.createElement("div");
    row.classList += "searchRow";

    // Creates a column div and sets the name of the location
    var srName = document.createElement("div");
    srName.classList += "col sub-searchResult sr-name";
    srName.innerHTML = inputArray["name"];

    //  ------------------------------------------------------------------------
    //  Creats a column div for the circles
    var srCircle = document.createElement("div");
    srCircle.classList += "circle";

    //  sub circles for the circle Collumn
    var subCircle = document.createElement("div");
    subCircle.classList += "subCircle";

    //  create 5 sub circles
    srCircle.appendChild(subCircle);
    srCircle.appendChild(subCircle.cloneNode(true));
    srCircle.appendChild(subCircle.cloneNode(true));
    srCircle.appendChild(subCircle.cloneNode(true));
    srCircle.appendChild(subCircle.cloneNode(true));

    //  save parent of the sub circles
    var children = srCircle.childNodes;
    var danger = inputArray["danger"].toFixed(1);
    console.log(danger)

    //  Error check
    if (danger > 5)
    {
      console.log("ERROR! Danger is greater than 5. It should be inclusively between 0-5.");
    }


    for(let i = 0; i < Math.min(danger, 5); i++)
      fnToggleCirc(children[i], (danger > SAFETY_LEVELS[2][1]));

    //  ------------------------------------------------------------------------

    // Creates a column div and sets the distance to the location
    var srDistance = document.createElement("div");
    srDistance.classList += "col-3 sub-searchResult sr-distance";

    // Finds the units being used and displays in the correct units
    var multiplier = Number($("#button-pickMetric")[0].getAttribute("value"));
    var unit = $("#button-pickMetric")[0].textContent;

    srDistance.innerHTML = (inputArray["distance"] * multiplier).toFixed(1) + " " + unit;

    ////////////////////////////////////////////////////////////////////////////
    // Creates the expanded result
    var expandedResult = document.createElement("div");
    expandedResult.classList += "container expanded-result";
    expandedResult.style.display = "none";

    // Creates a set of info about the location
    var info = document.createElement("div");
    info.classList += "sub-expanded-result info";
    info.innerHTML += `We estimate that the danger metric for this location is ${inputArray["danger"].toFixed(1)}`;

    // Create a link to google maps
    var mapsLink = document.createElement("div");
    mapsLink.classList += "sub-expanded-result maps-link";
    ////////////////////////////////////////////////////////////////////////////

    //  Link Collumn
    var srLink = document.createElement("div");
    srLink.classList += "col-3 sub-searchResult sr-link";

    var link = document.createElement("a");
    link.setAttribute("href", inputArray["link"]);
    link.setAttribute("target", "_blank");
    link.setAttribute("class", "fas fa-link icon");

    // Append everything together
    mapsLink.appendChild(link);
    srLink.appendChild(link);

    //expandedResult.appendChild(info);
    //expandedResult.appendChild(mapsLink);

    row.appendChild(srName);
    row.appendChild(srCircle);
    row.appendChild(srDistance);
    row.appendChild(srLink);

    containerHeader.appendChild(row);

    searchResult.appendChild(containerHeader);
    //searchResult.appendChild(expandedResult);

    container.appendChild(searchResult);
}
