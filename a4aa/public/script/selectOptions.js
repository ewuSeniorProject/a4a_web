
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
    var bodyHtml = "";
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
    var bodyHtml = "";
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
    var bodyHtml = "";
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

function Six(data, options) {
    var bodyHtml = "";
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