// change language
if (ninja.getQueryString()["culture"] != undefined) {
	ninja.translator.translate(ninja.getQueryString()["culture"]);
} else {
	ninja.translator.autodetectTranslation();
}
if (ninja.getQueryString()["showseedpool"] == "true" || ninja.getQueryString()["showseedpool"] == "1") {
	document.getElementById("seedpoolarea").style.display = "block";
}
// change currency
var currency = ninja.getQueryString()["currency"] || "LBRY Credits";
currency = currency.toLowerCase();
for(i = 0; i < janin.currencies.length; i++) {
	if (janin.currencies[i].name.toLowerCase() == currency)
		janin.currency.useCurrency(i);
}

// run unit tests
if (ninja.getQueryString()["unittests"] == "true" || ninja.getQueryString()["unittests"] == "1") {
	ninja.unitTests.runSynchronousTests();
	ninja.translator.showEnglishJson();
}
// run async unit tests
if (ninja.getQueryString()["asyncunittests"] == "true" || ninja.getQueryString()["asyncunittests"] == "1") {
	ninja.unitTests.runAsynchronousTests();
}
// Extract i18n
if (ninja.getQueryString()["i18nextract"]) {
    var culture = ninja.getQueryString()["i18nextract"];
    var div = document.createElement("div");
    div.innerHTML = "<h3>i18n</h3>";
    div.setAttribute("style", "text-align: center");
    var elem = document.createElement("textarea");
    elem.setAttribute("rows", "30");
    elem.setAttribute("style", "width: 99%");
    elem.setAttribute("wrap", "off");
    
    a=document.getElementsByClassName("i18n");    
    
    var i18n = "\"" + culture + "\": {\n";
    for(x=0; x<a.length; x++) {
        i18n += "\t";
        i18n += "\"" + a[x].id + "\": \"";
        if(ninja.translator.translations[culture] && ninja.translator.translations[culture][a[x].id])
            i18n += cleani18n(ninja.translator.translations[culture][a[x].id]);
        else
            i18n += "(ENGLISH)" + cleani18n(a[x].innerHTML);
        i18n += "\",\n";
    }
    for(x=0; x<ninja.translator.staticID.length; x++) {
        i18n += "\t";
        i18n += "\"" + ninja.translator.staticID[x] + "\": \"";
        if(ninja.translator.translations[culture] && ninja.translator.translations[culture][ninja.translator.staticID[x]])
            i18n += cleani18n(ninja.translator.translations[culture][ninja.translator.staticID[x]]);
        else
            i18n += "(ENGLISH)" + cleani18n(ninja.translator.translations["en"][ninja.translator.staticID[x]]);
        i18n += "\",\n";
    }
    
    i18n += "},"
    
    elem.innerHTML = i18n;
    div.appendChild(elem);
    document.body.appendChild(div);
}
function cleani18n(string) {
    return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '') // remove leading and trailing space
                .replace(/\s*\n+\s*/g, '\\n') // replace new line
                .replace(/"/g, '\\"');
}

ninja.envSecurityCheck();
ninja.browserSecurityCheck();
