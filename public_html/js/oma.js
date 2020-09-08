/* 
 * Author: Maria Järvinen
 */
$(document).ready(function () {

    $("[data-toggle='popover']").popover();
    /**
     * Calculates the body mass index
     * @param {number} height   height in cm
     * @param {number} weight   weight in kg
     * @returns {number}    body mass index  
     */

    function getBMI(height, weight) {
        let BMI = weight / Math.pow(height / 100, 2.5) * 1.3;
        BMI = BMI.toFixed(1);
        return BMI;
    }

    /**
     * Calculates upper and lower bounds for the normal weight.
     * @param {Number} value    Persons height in cm
     * @param {Number} factor   18.5 >> lower pound, 24.9 >> upper bound
     * @returns {Number}        Normal weight bound as integer    
     */

    function getWeightLimit(value, factor) {
        let limit = (factor / 1.3) * Math.pow(value / 100, 2.5);
        limit = limit.toFixed(0);
        return limit;
    }


        //luetaan paino ja pituus, lasketaan bmi
    $("#bmi_nappi").click(function () {
        let paino = Number($("#paino").val());
        let pituus = Number($("#pituus").val());
        let tulos = getBMI(pituus, paino);
        let vuosi = Number($("#vuosi").val());
        $("#tulos").html(tulos);

        if (validateInput() === false) {
            return;
        }
//        if (validateInput() === true) {
//            return;
//        }

        //lasketaan vaihteluväli jos täpätty valinta
        if ($(".vaihtelu").prop("checked") === true) {
            let pituus = Number($("#pituus").val());
            let min = getWeightLimit(pituus, 18.5);
            let max = getWeightLimit(pituus, 24.9);
            $($(".vaihtelu").attr("data-result")).html(min + " - " + max);
        }


        //merkataan laskettu tulos sinisellä taustavärillä
        if (tulos < 17) {
            $("#merkittävä").addClass("exp");
        } else if (tulos === 17 || tulos < 18.5) {
            $("#alipaino").addClass("exp");
        } else if (tulos === 18.5 || tulos < 25) {
            $("#normaali").addClass("exp");
        } else if (tulos === 25 || tulos < 30) {
            $("#lievähkö").addClass("exp");
        } else if (tulos === 30 || tulos < 35) {
            $("#merk").addClass("exp");
        } else if (tulos === 35 || tulos < 40) {
            $("#vaikea").addClass("exp");
        } else {
            $("#sairas").addClass("exp");
        }
    });

    //luetaan syötteet
    $("#vyötärö_ymp").click(function () {
        let ymp = Number($("#vyötärö").val());
        let skp = Number($("[name=sukupuoli]:checked").val());

    //merkataan laskettu tulos sinisellä taustavärilä
        if (skp === 1) { //mies
            if (ymp < 90) {
                $("#ei").addClass("exp");
            } else if (ymp === 90 || ymp <= 100) {
                $("#lievä").addClass("exp");
            } else {
                $("#suuri").addClass("exp");
            }
        } else { //nainen
            if (ymp < 80) {
                $("#ei").addClass("exp");
            } else if (ymp === 80 || ymp <= 90) {
                $("#lievä").addClass("exp");
            } else {
                $("#suuri").addClass("exp");
            }
        }
    });

    //tyhjentää kentät
    $("[name=täytä]").focusin(function () {
        $("#tulos").html(""); /* tyhjentää input elementin*/
        $("#normal").html("");
        $(".list-group").children().removeClass("exp");
        $(this).select();

    });
    $("[name=vaihteluväli]").click(function () {
        $("#tulos").html(""); /* tyhjentää input elementin*/
        $("#normal").html("");
        $(".list-group").children().removeClass("exp");
    });
//   
    $("#vyötärö").focusin(function () {
        $(".list-group").children().removeClass("exp");
        $(this).select();/* tyhjentää input elementin*/
    });
    $("[name=sukupuoli]").click(function () {
        $(".list-group").children().removeClass("exp");
        $(this).empty();
    });

////    /*
//     * Check that all input data is written. Shows yhe error message.
//     * @returns [Boolean] true >> ok, false >> not of
//     */

//tarkistaa että kaikki kentät on täytetty ja että ikä on oikea
    function validateInput() {
        let vuosi = Number(document.getElementById("vuosi").value);
        let pituus = Number(document.getElementById("pituus").value);
        let paino = Number(document.getElementById("paino").value);
        let today = new Date();
        let current_year = today.getFullYear();
        let ikä = current_year - vuosi;

        //virheilmoitukset jos jotain häikkää
        if (vuosi === 0 || pituus === 0 || paino === 0) {
            $("#otsikko").html("Missing input.");
            $("#tieto").html("You need to write all input data.");
            $("#error").modal("show");
            return false;
        } else if (ikä < 20 || ikä > 60) {
            $("#otsikko").html("Note the age.");
            $("#tieto").html("BMI results are for person aged 20-60.");
            $("#error").modal("show");
            return true;

        } else {
            return true;
        }

    }




});