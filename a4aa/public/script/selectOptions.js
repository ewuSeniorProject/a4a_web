/**
 * Variables that are common between JS files
 * and typically related to generating select options for the views
 */
var bodyHtml = "";
var yesNoNAOptions = ["Yes","No","N/A"];
var freePaidNAOptions = ["Free","Paid","N/A"];
var meteredNotOptions = ["Metered","Not Metered","N/A"];
var dayNightOptions = ["Day","Night","N/A"];
var topBottomOptions = ["Top","Bottom","N/A"];
var shoppingAssistOptions = ["Shopping Assistance","Delivery","NA"];
var lowMedHighOptions = ["Low","Medium","High","N/A"];
var textOnLineOptions = ["Text","On-line","Phone","NA"];
var leftRightNoneOptions = ["Left","Right","None","N/A"];
var lowMedBrightOptions = ["Low","Medium","Bright","N/A"];
var earbudNeckLoopOptions = ["Earbud","Neckloop","Headphones","Other","N/A"];
var slideOpenOtherOptions = ["Slide To Side","Open Out","Open In","Other","N/A"];
var realTiemOpenOptions = ["Real Time","Open Captions","Rear Window","Other","N/A"];
var brailleLargePrintOptions = ["Braille","Large Print","Recorded Audio","Video","Other","N/A"];
var infraRedLoopOptions = ["Infra­red Loop","Induction Loop","FM","Amplification","Other","N/A"];


function generateSelectOptions(data, options) {

    switch (options.length) {
        case 3:
            return genThree(data, options);
            break;
        case 4:
            return genFour(data, options);
            break;
        case 5:
            return genFive(data, options);
            break;
        case 6:
            return genSix(data, options);
            break;
        default:
            return '<p> Error </p>';
    }
}

function genThree(data, options) {
    if (data === options[0]) {
        bodyHtml = '<option value="'+options[0]+'" selected>&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>';
    }
    else if (data === options[1]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" selected>&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>';
    }
    else {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" selected>&nbsp; '+options[2]+'</option>';
    }
    return bodyHtml;
}

function genFour(data, options) {
    if (data === options[0]) {
        bodyHtml = '<option value="'+options[0]+'" selected>&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>';
    }
    else if (data === options[1]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" selected>&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>';
    }
    else if (data === options[2]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" selected>&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>';
    }
    else {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" selected>&nbsp; '+options[3]+'</option>';
    }
    return bodyHtml;
}

function genFive(data, options) {
    if (data === options[0]) {
        bodyHtml = '<option value="'+options[0]+'" selected>&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>';
    }
    else if (data === options[1]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" selected>&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>';
    }
    else if (data === options[2]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" selected>&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>';
    }
    else if (data === options[3]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" selected>&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>';
    }
    else {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" selected>&nbsp; '+options[4]+'</option>';
    }
    return bodyHtml;
}

function genSix(data, options) {
    if (data === options[0]) {
        bodyHtml = '<option value="'+options[0]+'" selected>&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>\n ' +
            '<option value="'+options[5]+'" >&nbsp; '+options[5]+'</option>';
    }
    else if (data === options[1]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" selected>&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>\n ' +
            '<option value="'+options[5]+'" >&nbsp; '+options[5]+'</option>';
    }
    else if (data === options[2]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" selected>&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>\n ' +
            '<option value="'+options[5]+'" >&nbsp; '+options[5]+'</option>';
    }
    else if (data === options[3]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" selected>&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>\n ' +
            '<option value="'+options[5]+'" >&nbsp; '+options[5]+'</option>';
    }
    else if (data === options[4]) {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" selected>&nbsp; '+options[4]+'</option>\n ' +
            '<option value="'+options[5]+'" >&nbsp; '+options[5]+'</option>';
    }
    else {
        bodyHtml = '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>\n ' +
            '<option value="'+options[5]+'" selected>&nbsp; '+options[5]+'</option>';
    }
    return bodyHtml;
}

function addGenSelectOptions(options) {

    switch (options.length) {
        case 3:
            return addGenThree(options);
            break;
        case 4:
            return addGenFour(options);
            break;
        case 5:
            return addGenFive(options);
            break;
        case 6:
            return addGenSix(options);
            break;
        default:
            return '<p> Error </p>';
    }
}

function addGenThree(options) {
    return  '<option value="" disabled selected>Please select one</option>\n' +
            '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>';
}

function addGenFour(options) {
    return  '<option value="" disabled selected>Please select one</option>\n' +
            '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>';
}

function addGenFive(options) {
    return  '<option value="" disabled selected>Please select one</option>\n' +
            '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>';
}

function addGenSix(options) {
    return  '<option value="" disabled selected>Please select one</option>\n' +
            '<option value="'+options[0]+'" >&nbsp; '+options[0]+'</option>\n' +
            '<option value="'+options[1]+'" >&nbsp; '+options[1]+'</option>\n ' +
            '<option value="'+options[2]+'" >&nbsp; '+options[2]+'</option>\n ' +
            '<option value="'+options[3]+'" >&nbsp; '+options[3]+'</option>\n ' +
            '<option value="'+options[4]+'" >&nbsp; '+options[4]+'</option>\n ' +
            '<option value="'+options[5]+'" >&nbsp; '+options[5]+'</option>';
}