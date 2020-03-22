function setup() {
    // Creates the dropdown for safety levels
    fnCreateDropdown("input", SAFETY_LEVELS, "pickSafety", DISPLAY_TEXT);
    fnCreateDropdown("input", LOCATION_TYPES, "pickType", DISPLAY_TEXT);
    fnCreateDropdown("input", UNIT_MULTIPLIERS, "pickMetric", DISPLAY_TEXT);
    fnCreateDropdown("input", ORDER_BY, "pickOrder", DISPLAY_TEXT);
    fnCreateSearchBar("input", "pickDistance", DISTANCE_MESSAGE);
}

// Sets the text of the button in the dropdown
function fnSetParentText(event) {
    var parent = event.target.parentElement.parentElement
    var target = parent.querySelector('.dropdown-toggle');
    target.innerHTML = event.target.innerHTML;
    target.setAttribute("value", event.target.getAttribute("value"));

    if(safeLocs != []) {
        fnClearResults();

        if(parent.id != "pickSafety" && parent.id != "pickType"){
            fnAllSearchResults(safeLocs);
        } else {
            safeLocs = [];
        }
    }
}

function fnAllSearchResults(inputArray) {
    safeLocs.sort(function(a,b){ return sortingFunctions(a,b,Number($('#button-pickOrder')[0].value)) });

    fnClearResults();

    for (var i = 0; i < inputArray.length; i++) {
        fnFormatSearchResult("searchResults", inputArray[i]);
    }
}

// Function that creates dropdown values programmatically
function fnCreateDropdown(mainParent, inputList, id, textSource) {
    // Gets the main container
    var container = $("#" + mainParent)[0];

    var displayGrid = document.createElement("div")
    displayGrid.classList += "container";

    var row = document.createElement("div");
    row.classList += "row";

    var btnInstruction = document.createElement("div");
    btnInstruction.classList += "col-5 btnInstruction";

    var btnButton = document.createElement("div");
    btnButton.classList += "col-7 btnButton";

    console.log($(window).width());

    if($(window).width() < 400) {
        btnInstruction.classList += " min";
        btnButton.classList += " min";
    }

    // Creates an outer div
    var dropdown = document.createElement('div');
    dropdown.classList += "dropdown center";
    dropdown.id = id;

    // Creates a title for the given button
    var title = document.createElement('h2');
    title.innerHTML = textSource[id] + ":";

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

    // Adding as children
    dropdown.appendChild(button);
    dropdown.appendChild(menu);

    btnInstruction.appendChild(title);
    btnButton.appendChild(dropdown);

    row.appendChild(btnInstruction);
    row.appendChild(btnButton);

    displayGrid.appendChild(row);

    container.appendChild(displayGrid);
}

function fnCreateSearchBar(mainParent, main_id, message) {
    // Gets the main container
    var container = $("#" + mainParent)[0];

    // Creates an outer div
    var innerContainer = document.createElement('div');
    innerContainer.id = "inner-" + mainParent;

    var inputBar = document.createElement('input');
    inputBar.classList += "form-control center";
    inputBar.id = main_id;
    inputBar.setAttribute("type", "number");
    inputBar.setAttribute("placeholder", message);
    inputBar.onkeypress = function(e){
        if(e.keyCode == 13) {
            fnSearchSafeLocs();
        }
    };

    var searchButton = document.createElement('button');
    searchButton.classList += "btn btn-secondary";
    searchButton.id = "searchButton";
    searchButton.setAttribute("type", "button");
    searchButton.innerHTML = "Search";
    searchButton.onclick = fnSearchSafeLocs;

    innerContainer.appendChild(inputBar);
    innerContainer.appendChild(searchButton);
    container.appendChild(innerContainer);
}

function fnSearchSafeLocs() {
    safeLocs = []

    fnClearResults();

    fnCreateLodingScreen();

    if($("#pickDistance")[0].value > MAX_DISTANCE) {
        $("#pickDistance")[0].value = MAX_DISTANCE
    }
    distance = $("#pickDistance")[0].value*$("#pickMetric")[0].value;

    searchCriteria = $("#button-pickType")[0].value;
    dangerCutoff = $("#button-pickSafety")[0].value;

    $("#loaderText")[0].innerHTML = "Gathering Location Data...";

    getLocation(safeLocs, fnAllSearchResults);
}

function fnCreateLodingScreen() {
    $("#searchResults")[0].innerHTML = "<div class='loader'></div>";
    $("#searchResults")[0].innerHTML += "<p id='loaderText'></p>";
}

function fnClearResults() {
    while ($("#searchResults")[0].firstChild) {
        $("#searchResults")[0].removeChild($("#searchResults")[0]
        .firstChild);
    }
}

function fnToggle(e) {
    var parent = e.target.parentNode.parentNode.parentNode;
    var expanding = parent.querySelector('.expanded-result');

    if (expanding.style.display === "none") {
        expanding.style.display = "block";
    } else {
        expanding.style.display = "none";
    }
}

function fnFormatSearchResult(mainParent, inputArray) {
    var container = $("#" + mainParent)[0];

    var searchResult = document.createElement("div");
    searchResult.classList += "searchResult";
    searchResult.onclick = fnToggle;

    var containerHeader = document.createElement("div")
    containerHeader.classList += "container searchResult";

    var row = document.createElement("div");
    row.classList += "row";

    var srName = document.createElement("div");
    srName.classList += "col sub-searchResult sr-name";
    srName.innerHTML = inputArray["name"];

    var srDistance = document.createElement("div");
    srDistance.classList += "col-3 sub-searchResult sr-distance";

    var multiplier = Number($("#button-pickMetric")[0].getAttribute("value"));
    var unit = $("#button-pickMetric")[0].innerHTML;

    srDistance.innerHTML = (inputArray["distance"] * multiplier).toFixed(1) + " " + unit;

    var expandedResult = document.createElement("div");
    expandedResult.classList += "container expanded-result";
    expandedResult.style.display = "none";

    var info = document.createElement("div");
    info.classList += "sub-expanded-result info";
    info.innerHTML += `We estimate that the danger metric for this location is ${inputArray["danger"].toFixed(1)}`;

    var mapsLink = document.createElement("div");
    mapsLink.classList += "sub-expanded-result maps-link";

    var link = document.createElement("a");
    link.setAttribute("href", inputArray["link"]);
    link.setAttribute("target", "_blank");
    link.innerHTML = "Open in Google Maps";

    mapsLink.appendChild(link);

    expandedResult.appendChild(info);
    expandedResult.appendChild(mapsLink);

    row.appendChild(srName);
    row.appendChild(srDistance);

    containerHeader.appendChild(row);

    searchResult.appendChild(containerHeader);
    searchResult.appendChild(expandedResult);

    container.appendChild(searchResult);
}
