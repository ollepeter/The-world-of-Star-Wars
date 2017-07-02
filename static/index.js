var app = app || {};

var pathPlanets = "http://swapi.co/api/planets/";
var previousPagePath = "";
var nextPagePath = "";


// Fetch JSON data
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) {
                    callback(data)
                }
                
            }
        }
    }
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

// Create Planet Table
fetchJSONFile(pathPlanets, createTablePlanets);
function createTablePlanets(tableData) {
    $("#planets thead").empty();
    $("#planets tbody").empty();
    var tableHeadersPlanets = {name:"Name",
                           diameter:"Diameter",
                           climate:"Climate",
                           terrain:"Terrian",
                           surface_water:"Surface Water Percentage",
                           population:"Population",
                           residents:"Residents"};
    var tableHeader = "<tr>";
    for (var title in tableHeadersPlanets) {
        tableHeader += "<th>" + tableHeadersPlanets[title] + "</th>";
    }
    tableHeader += "</tr>"
    $("#planets thead").append(tableHeader);
    for (var i = 0; i < tableData.results.length; i++) {
        var tableRow = "<tr>";
        for (var selector in tableHeadersPlanets) {
            var cellData = tableData.results[i][selector];
            switch (selector) {
                case "residents":
                    if (cellData.length === 0) {
                        tableRow += "<td>" + "No known residents" + "</td>";
                    } else {
                        var numberResidents = cellData.length
                        var idString = i.toString();
                        tableRow += '<td><button type="button" class="btn btn-basic btn-md resident" data-index=' + idString + '>'
                        + numberResidents + ' Resident(s)</button></td>';
                    }
                    break;
                case "diameter":
                        if (cellData === "unknown") {
                            tableRow += "<td>" + "unknown" + "</td>";
                    } else {
                        tableRow += "<td>" + (parseInt(cellData)).toLocaleString() + " km" + "</td>";
                    }
                    break;
                case "population":
                    if (cellData === "unknown") {
                        tableRow += "<td>" + cellData + "</td>";
                    } else {
                        tableRow += "<td>" + (parseInt(cellData)).toLocaleString() + " people" + "</td>";
                    }
                    break;
                case "surface_water":
                    if (cellData === "unknown") {
                        tableRow += "<td>" + cellData + "</td>";
                    } else {
                        tableRow += "<td>" + (parseInt(cellData)).toLocaleString() + " %" + "</td>";
                    }
                    break;
                default:
                    tableRow += "<td>" + cellData + "</td>";
                    break;
            }
        }
    tableRow += "</tr>";
    $("#planets thead").append(tableRow);
    }

    //Collect residents data
    $(document).ready(function(){
        $(document).ready(function() {
                $('#residentsModal').modal('hide');
            });
        $('.resident').click(function () {
            var planetIndex= $(this).data("index");
            var residentsPaths = tableData.results[planetIndex].residents;
            var planetName = tableData.results[planetIndex].name
            $(".modal-body thead").empty();
            $(".modal-body tbody").empty();
            $(".modal-header .modal-title").empty();

            $(document).ready(function() {
            $(".modal-header .modal-title").append("Residents of " + planetName);
            });
        
            var tableHeader = "<tr>";
            for (var title in tableHeadersResidents) {
                tableHeader += "<th>" + tableHeadersResidents[title] + "</th>";
            }
            tableHeader += "</tr>";
            $(document).ready(function() {
            $(".modal-body thead").append(tableHeader);
            });
        
            for (i = 0; i < residentsPaths.length; i++) {
                fetchJSONFile(residentsPaths[i], createTableResidents);
            }
            $(document).ready(function() {
                $('#residentsModal').modal('show');
            });
            
        });
    });
    //Set pagepath for pagination and hide/show pagination buttons
    previousPagePath = tableData.previous;
    nextPagePath = tableData.next;
    if (previousPagePath === null) {
        $("button[value='previous']").hide();
    } else {
        $("button[value='previous']").show();
    }
    if (nextPagePath === null) {
        $("button[value='next']").hide();
    } else {
        $("button[value='next']").show();
    }
}

//Create residents table for modal
var tableHeadersResidents = {name:"Name",
                             height:"Height",
                             mass:"Mass",
                             hair_color:"Hair color",
                             skin_color:"Skin color",
                             eye_color:"Eye color",
                             birth_year: "Birth year",
                             gender:"Gender"};

function createTableResidents(residentData) {
    tableRow = "<tr>";
    for (selector in tableHeadersResidents) {
        cellData = residentData[selector];
        switch (selector) {
            case "height":
                if (cellData === "unknown") {
                        tableRow += "<td>" + cellData + "</td>";
                    } else {
                        tableRow += "<td>" + (parseInt(cellData)) / 100 + " m" + "</td>";
                    }
                break;
            case "mass":
                 if (cellData === "unknown") {
                        tableRow += "<td>" + cellData + "</td>";
                    } else {
                        tableRow += "<td>" + (parseInt(cellData)) + " kg" + "</td>";
                    }
                break;
            default:
                tableRow += "<td>" + cellData + "</td>";
                break;
        }   
    }
    tableRow += "</tr>";
    $(document).ready(function() {
        $(".modal-body tbody").append(tableRow);
    });  
}

//Activate paginating buttons
$('.paginatingButtons .btn').click(function () {
    var buttonValue= $(this).attr("value");
    if (buttonValue === "previous") {
        fetchJSONFile(previousPagePath, createTablePlanets);
    } else {
        fetchJSONFile(nextPagePath, createTablePlanets);
    }
});
