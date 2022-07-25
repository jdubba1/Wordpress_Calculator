$(document).ready(function() {

    // Execute on Enter Press
    $("#speed_input").keypress(function(e) {
        if(e.keyCode==13){$("#calculate").click();}
    });
    $("#power_input").keypress(function(e) {
        if(e.keyCode==13){$("#calculate").click();}
    });

    // Recalculate on Input Change
    $("#power_units").on("input change", function(e) {
        $("#recommended tr").remove();
        document.getElementById("recommendation").hidden = true;
        document.getElementById("clearButton").hidden = true;
        calculateTorque();
    });

    $("#calculate").click(function() {
        $("#recommended tr").remove(); 
        calculateTorque();
    });

    $("#clear").click(function() {
        $("#recommended tr").remove(); 
        document.getElementById("recommendation").hidden = true;
        document.getElementById("clearButton").hidden = true;
        document.getElementById("power_input").value = "";
        document.getElementById("speed_input").value = "";
        document.getElementById("estimate").value = "";
    });
});


function calculateTorque() {

    if( !$("#speed_input").val() || !$("#power_input").val()) {
        $("#estimate").val("Undefined");
        alert("One or more fields are empty.");
    }

    else if ($("#speed_input").val() < 1 || $("#speed_input").val() > 10000){
        alert("Speed input must be between 1 and 10,000 RPMs.");
    }

    else if ($("#power_input").val() < 1 || $("#power_input").val() > 1000){
        alert("Power input must be between 1 and 1,000 Horsepower.");
    }

    else{

        if ($("#power_units").val() == "kW") {
            console.log("kW");
            const estimate = (1000 * 9.5488 * Number($("#power_input").val()) / Number($("#speed_input").val())).toFixed(2);
            $("#estimate").val(estimate);
            findCompatible(estimate);
        }
        
        else if ($("#power_units").val() == "HP") {
            console.log("HP");
            const estimate = (.7457 * 1000 * 9.5488 * Number($("#power_input").val()) / Number($("#speed_input").val())).toFixed(2);
            $("#estimate").val(estimate);
            findCompatible(estimate);
        }
    }
}

// Motor objects are pre-sorted in the following hierarchy
// 1. Frame type 2. Hp 3. Max Rpm  (all low to high)
// Follow this format when adding a new motor object

var motors = [
    {
        "catalog_Number": "IEs130-5-4200-460",
        "frame": "IEs130",
        "diameter": '14.0"',
        "hp": 5,
        "kw": 3.7,
        "rpm": 3600,
        "torque": 9.9,
        "max_torque": 10.9,
        "min_speed": 720,
        "max_speed": 3960,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411074155411-IEs130-5HP-3600RPM-Specification"
    },
    {
        "catalog_Number": "IEs130-5-4200-460",
        "frame": "IEs130",
        "diameter": '14.0"',
        "hp": 5,
        "kw": 3.7,
        "rpm": 4200,
        "torque": 8.5,
        "max_torque": 9.3,
        "min_speed": 720,
        "max_speed": 4620,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411067465875-IEs130-5HP-4200RPM-Specification"
    },
    {
        "catalog_Number": "IEs150-5-1800-460",
        "frame": "IEs150",
        "diameter": '15.9"',
        "hp": 5,
        "kw": 3.7,
        "rpm": 1800,
        "torque": 19.8,
        "max_torque": 21.8,
        "min_speed": 540,
        "max_speed": 1980,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411074021651-IEs150-5HP-1800RPM-Specification"
    },
    {
        "catalog_Number": "IEs150-5-2400-460",
        "frame": "IEs150",
        "diameter": '15.9"',
        "hp": 5,
        "kw": 3.7,
        "rpm": 2400,
        "torque": 14.8,
        "max_torque": 16.3,
        "min_speed": 540,
        "max_speed": 2640,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411052345875-IEs150-5HP-2400RPM-Specification"
    },
    {
        "catalog_Number": "IEs150-7.5-2400-460",
        "frame": "IEs150",
        "diameter": '15.9"',
        "hp": 7.5,
        "kw": 5.6,
        "rpm": 2400,
        "torque": 22.3,
        "max_torque": 24.5,
        "min_speed": 540,
        "max_speed": 2640,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411066640787-IEs150-7-5HP-2400RPM-Specification"
    },
    {
        "catalog_Number": "IEs150-3-7.5-3600-460",
        "frame": "IEs150",
        "diameter": '15.9"',
        "hp": 7.5,
        "kw": 5.6,
        "rpm": 3600,
        "torque": 14.8,
        "max_torque": 16.3,
        "min_speed": 540,
        "max_speed": 3960,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4410874801171-IEs150-7-5HP-3600RPM-Specification"
    },
    {
        "catalog_Number": "IEs180-2-7.5-1800-460",
        "frame": "IEs180",
        "diameter": '17.9"',
        "hp": 7.5,
        "kw": 5.6,
        "rpm": 1800,
        "torque": 29.7,
        "max_torque": 32.6,
        "min_speed": 520,
        "max_speed": 1980,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411077212691-IEs180-7-5HP-1800RPM-Specification"
    },
    {
        "catalog_Number": "IEs180-2-7.5-2400-460",
        "frame": "IEs180",
        "diameter": '17.9"',
        "hp": 7.5,
        "kw": 5.6,
        "rpm": 2400,
        "torque": 22.3,
        "max_torque": 24.5,
        "min_speed": 540,
        "max_speed": 2640,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411077439123-IEs180-7-5HP-2400RPM-Specification"
    },
    {
        "catalog_Number": "IEs180-2-10-2400-460",
        "frame": "IEs180",
        "diameter": '17.9"',
        "hp": 10,
        "kw": 7.5,
        "rpm": 2400,
        "torque": 29.7,
        "max_torque": 32.6,
        "min_speed": 540,
        "max_speed": 2640,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411067602067-IEs180-10HP-2400RPM-Specification"
    },
    {
        "catalog_Number": "IEs180-10-3600-460",
        "frame": "IEs180",
        "diameter": '17.9"',
        "hp": 10,
        "kw": 7.5,
        "rpm": 1800,
        "torque": 39.6,
        "max_torque": 43.5,
        "min_speed": 720,
        "max_speed": 1980,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4411074852371-IEs180-10HP-3600RPM-Specification"
    },
    {
        "catalog_Number": "IEs205-1-10-1800-460",
        "frame": "IEs205",
        "diameter": '20.2"',
        "hp": 10,
        "kw": 7.5,
        "rpm": 1800,
        "torque": 39.6,
        "max_torque": 43.5,
        "min_speed": 540,
        "max_speed": 1980,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4410881773203-IEs205-10HP-1800RPM-Specification"
    },
    {
        "catalog_Number": "IEs205-15-2400-460",
        "frame": "IEs205",
        "diameter": '20.2"',
        "hp": 15,
        "kw": 11.2,
        "rpm": 2400,
        "torque": 44.5,
        "max_torque": 49.0,
        "min_speed": 540,
        "max_speed": 2640,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4410881713555-IEs205-15HP-2400RPM-Specification"
    },
    {
        "catalog_Number": "IEs205-15-3600-460",
        "frame": "IEs205",
        "diameter": '20.2"',
        "hp": 15,
        "kw": 11.2,
        "rpm": 3600,
        "torque": 29.7,
        "max_torque": 32.6,
        "min_speed": 720,
        "max_speed": 3960,
        "link": "https://support.infinitumelectric.com/hc/en-us/articles/4410889499667-IEs205-15HP-3600RPM-Specification"
    },                 
]    

// sort motors by ascending torque for now
// in phase 2, a full sort method for any variable will be implemented

motors.sort((a,b) => {
    return a.torque - b.torque;
});

function findCompatible() {

    let results = [];

    for (const motor of motors){
        if (motor.max_speed >= Number($("#speed_input").val()) && motor.min_speed <= Number($("#speed_input").val()) ) {
            if ($("#power_units").val() == "kW") {
                if (motor.kw >= Number($("#power_input").val())) {
                    // if (motor.torque >= arguments[0] && motor.max_torque > arguments[0]){
                    //     results.push(motor); 
                    // }
                    if (motor.max_torque >= arguments[0]){
                        results.push(motor); 
                    }
                }
            }
            else if ($("#power_units").val() == "HP") {
                if (motor.hp >= Number($("#power_input").val())) {
                    // if (motor.torque >= arguments[0] && motor.max_torque > arguments[0]){
                    //     results.push(motor); 
                    // }
                    if (motor.max_torque >= arguments[0]){
                        results.push(motor); 
                    }
                }
            }
        }
    } 

    if (results.length != 0) { 

        document.getElementById("recommended").hidden = false;
        document.getElementById("recommendation").hidden = false;
        document.getElementById("clearButton").hidden = false;

        var table = document.getElementById("recommended");

        // Populate Table Header
        var tableheader = table.createTHead();
        var headerrow = tableheader.insertRow(0);

            var headercell0 = headerrow.insertCell(0);
            headercell0.innerHTML = "Catalog Number";
            headercell0.className = "C0";

            var headercell1 = headerrow.insertCell(1);
            headercell1.innerHTML = "Frame";
            headercell1.className = "C1";

            var headercell2 = headerrow.insertCell(2);
            headercell2.innerHTML = "Diameter";
            headercell2.className = "C2";
            
            if ($("#power_units").val() == "kW") {
                var headercell3 = headerrow.insertCell(3);
                headercell3.innerHTML = "kW";
                headercell3.className = "C3";
            }    
            else if ($("#power_units").val() == "HP") {
                var headercell3 = headerrow.insertCell(3);
                headercell3.innerHTML = "HP";
                headercell3.className = "C3";
            }

            var headercell4 = headerrow.insertCell(4);
            headercell4.innerHTML = "RPM";
            headercell4.className = "C4";

            var headercell5 = headerrow.insertCell(5);
            headercell5.innerHTML = "Torque";
            headercell5.className = "C5";

            var headercell6 = headerrow.insertCell(6);
            headercell6.innerHTML = "Max Torque";
            headercell6.className = "C6";

            var headercell7 = headerrow.insertCell(7);
            headercell7.innerHTML = "Min Speed";
            headercell7.className = "C7";

            var headercell8 = headerrow.insertCell(8);
            headercell8.innerHTML = "Max Speed";
            headercell8.className = "C8";

            var headercell9 = headerrow.insertCell(9);
            headercell9.innerHTML = "Link";
            headercell9.className = "C9";
        
        // Populate Table Rows
        for (const result of results){
            
            var newRow = table.insertRow(table.length);
            
            if (document.getElementById("estimate").value > result.torque && document.getElementById("estimate").value <= result.max_torque ){
                newRow.className = "yellow";
            }
            else { 
                newRow.className = "green";
            }

                var cell0 = newRow.insertCell(0);
                cell0.innerHTML = result.catalog_Number;
                cell0.className = "C0";

                var cell1 = newRow.insertCell(1);
                cell1.innerHTML = result.frame;
                cell1.className = "C1";

                var cell2 = newRow.insertCell(2);
                cell2.innerHTML = result.diameter;
                cell2.className = "C2";

                if ($("#power_units").val() == "kW") {
                    var cell3 = newRow.insertCell(3);
                    cell3.innerHTML = result.kw;
                    cell3.className = "C3";
                }    
                else if ($("#power_units").val() == "HP") {
                    var cell3 = newRow.insertCell(3);
                    cell3.innerHTML = result.hp;
                    cell3.className = "C3";
                }
                
                var cell4 = newRow.insertCell(4);
                cell4.innerHTML = result.rpm;
                cell4.className = "C4";

                var cell5 = newRow.insertCell(5);
                cell5.innerHTML = result.torque;
                cell5.className = "C5";

                var cell6 = newRow.insertCell(6);
                cell6.innerHTML = result.max_torque;
                cell6.className = "C6";

                var cell7 = newRow.insertCell(7);
                cell7.innerHTML = result.min_speed;
                cell7.className = "C7";

                var cell8 = newRow.insertCell(8);
                cell8.innerHTML = result.max_speed;
                cell8.className = "C8";

                var cell9 = newRow.insertCell(9);
                cell9.innerHTML = '<a href="'+result.link+'">specs</a>';
                cell9.className = "C9";
        }
    }

    
    else {
        
        document.getElementById("recommended").hidden = true;
        alert("No compatible motors were found.");
    }
}     