/**
 * Created by david on 29-05-14.
 */

var veranderZoekIcon = function (img, boolean) {
    if (boolean) {
        img.src = "./images/flexiconBar/zoekIcon-hover.png";
    } else {
        img.src = "./images/flexiconBar/zoekIcon.png";
    }
}

var veranderAccountIcon = function (img, boolean) {
    if (boolean) {
        img.src = "./images/flexiconBar/accountIcon-hover.png";
    } else {
        img.src = "./images/flexiconBar/accountIcon.png";
    }
}

var flexiconBar = function ($scope, $window, dbService) {
    /**
        De boolean die aangeeft of de header zichtbaar is of niet
    */
    var toontWoordVanDeWeek = true;

    /**
        Hier wordt de gebruiker naar een pagina gestuurd. Als de gebruiker is ingelogd 
        zal hij naar zijn account pagina gestuurd worden. Is de gebruiker niet 
        ingelogd dan zal hij naar de inlog/registreer pagina gestuurd woden
        @res     : dit is een object die bestaat uit data (de gevonden gegevens) en 
                   een message (of de actie geslaagd is of niet)
    */
    $scope.accountSettings = function () {
        dbService.login.get(function (res) {
            if (res.ingelogd) {
               $window.location = "/#/account/" + res.gebruikerId;
            } else {
                $window.location = "/#/login";
            }
        });
    }

    /**
        Deze functie toont de header onder het menu
    */
    var toonWoordVanDeWeek = function () {
        var i;
        document.getElementById("header").style.visibility = "visible";
        document.getElementById("header").style.height = "200px";
        document.getElementById("flex-bar-pijlIcon").setAttribute("src", "./images/flexiconBar/pijlIcon.png");
        if (document.getElementsByClassName("positie-content-container")) {
            for (i = 0; i < document.getElementsByClassName("positie-content-container").length; i += 1) {
                document.getElementsByClassName("positie-content-container")[i].style.marginTop = "200px";
            }
        }
    }

    /**
        Deze functie verbergd de header onder het menu
    */
    var verbergWoordVanDeWeek = function () {
        var i;
        document.getElementById("header").style.visibility = "hidden";
        document.getElementById("header").style.height = "0px";
        document.getElementById("flex-bar-pijlIcon").setAttribute("src", "./images/flexiconBar/pijlIconOmhoog.png");
        if (document.getElementsByClassName("positie-content-container")) {
            for (i = 0; i < document.getElementsByClassName("positie-content-container").length; i += 1) {
                document.getElementsByClassName("positie-content-container")[i].style.marginTop = "0px";
            }
        }
    }

    /**
        Deze functie wordt uitgevoerd als de gebruiker op de header toggle knop drukt.
        De functie zal als de header zichtbaar een andere functie aanroepen dan als deze
        ontzichtbaar is. Standaard is de header zichtbaar
    */
    $scope.toonVerbergWoordVanDeWeek = function () {
        if (toontWoordVanDeWeek) {
            verbergWoordVanDeWeek();
        } else {
            toonWoordVanDeWeek();
        }
        toontWoordVanDeWeek = !toontWoordVanDeWeek;
    }

    $scope.zoekOpties = function () {
        $window.location = "/#/zoeken/" + $scope.zoekTerm;
    }
}