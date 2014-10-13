/**
 * Created by david on 19-05-14.
 */

/**
    Op dit moment is het niet gewenst dat de gebruiker uit kan loggen. Toch hebben 
    ywe deze variabele laten staan om aan te geven dat de functionaliteit gemaakt kan worden
*/
var logoutController = function (dbService, $window) {

    },

    loginController = function ($scope, dbService, $window) {
        "use strict";
        /**
            Voordat er andere functies uitgevoerd worden worden er eerst een aantal 
            standaard berichten op de pagina getoont.
        */
        $scope.loginMessage = "Login met je Flexicon account.";
        $scope.registreerMessage = "Maak een Flexicon account aan.";
        
        /**
            Hier wordt een bepaalde functie aangeroepen als het email adres valide is of niet 
            in het registratie vak
            @param email : het email adres dat gecontroleerd moet worden
        */
        var setKleurEmailRegister = function (email) {
                if (!valideerEmailAdres(email)) {
                    veranderTextveldKleurRood("maile_reg");
                    return false;
                } else {
                    resetVeld("maile_reg");
                    return true;
                }
            },

            /**
                Hier wordt een bepaalde functie aangeroepen als het wachtwoord én bevestigWachtwoord valide is of niet
                in het registratie vak
                @param wachtwoord : het wachtwoord die gecontroleerd moet worden
                @param bevesctigWachtwoord : het confirmatie wachtwoord die overeen moet komen met het wachtwoord
            */
            setKleurWachtwoordRegister = function (wachtwoord, bevestigWachtwoord) {
                if (!checkWachtwoorden(wachtwoord, bevestigWachtwoord)) {
                    veranderTextveldKleurRood("wachtwoord_reg");
                    veranderTextveldKleurRood("bevestigWachtwoord_reg");
                    return false;
                } else {
                    resetVeld("wachtwoord_reg");
                    resetVeld("bevestigWachtwoord_reg");
                    return true;
                }
            },

            /**
                Hier wordt een bepaalde functie aangeroepen als de username valide is of niet in het registratie vak
                @param gebruikersnaam : de gebruikersnaam dat gecontroleerd moet worden
            */
            setKleurGebruikersnaamRegister = function (gebruikersnaam) {
                if (!valideerGebruikersnaam(gebruikersnaam)) {
                    veranderTextveldKleurRood("gebruikersnaam_reg");
                    return false;
                } else {
                    resetVeld("gebruikersnaam_reg");
                    return true;
                }
            },

            /**
                Hier wordt een bepaalde functie aangeroepen als het email adres valide is of niet 
                in het login vak
                @param email : het email adres dat gecontroleerd moet worden
            */
            setKleurEmailLogin = function (email) {
                if (!valideerEmailAdres(email)) {
                    veranderTextveldKleurRood("maile_log");
                    return false;
                } else {
                    resetVeld("maile_log");
                    return true;
                }
            },

            /**
                Hier wordt een bepaalde functie aangeroepen als het wachtwoord valide is of niet 
                in het login vak
                @param wachtwoord : het wachtwoord dat gecontroleerd moet worden
            */
            setKleurWachtwoordLogin = function (wachtwoord) {
                if (!valideerWachtwoord(wachtwoord)) {
                    veranderTextveldKleurRood("wachtwoord_log");
                    return false;
                } else {
                    resetVeld("wachtwoord_log");
                    return true;
                }
            },

            /**
                Hier wordt gecontroleerd of het wachtwoord langer is dan 4 karakters
                @param wachtwoord : het wachtwoord dat gecontroleerd moet worden
            */
            valideerWachtwoord = function (wachtwoord) {
                if (wachtwoord.length > 4) {
                    return true;
                }
                return false;
            },


            /**
                Hier wordt gecontroleerd of er geen velden leeg gelaten zijn
                @param gegevens : een object gevuld met een aantal waardes die gecontroleerd moeten wroden
            */
            valideerLoginGegevens = function (gegevens) {
                var isValid = true;
                if (!gegevens.email) {
                    veranderTextveldKleurRood("maile_log");
                    isValid = false;
                } else {
                    resetVeld("maile_log");
                }
                if (!gegevens.wachtwoord) {
                    veranderTextveldKleurRood("wachtwoord_log");
                    isValid = false;
                } else {
                    resetVeld("wachtwoord_log");
                }
                if (isValid) {
                    return true;
                }
                return false;
            },

            /**
                Hier wordt gecontroleerd of het email adres daadwerkelijk een email adres is
                @param email  : het email adres dat gecontroleerd moet worden

                @return : deze functie geeft true of false terug n.a.v. een reguliere expressie 
            */
            valideerEmailAdres = function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },

            /**
                Hier wordt gecontroleerd of de gebruikersnaam lang genoeg is
                @param gebruikersnaam : de gebruikersnaam die gecontroleerd moet worden
            */
            valideerGebruikersnaam = function (gebruikersnaam) {
                if (gebruikersnaam.length > 4) {
                    return true;
                }
                return false;
            },

            /**
                Hier wordt gecontrolleerd of het wachtwoord lang genoeg is en of het overeen komt met 
                het confirmatie wachtwoord
                @param wachtwoord           : het wachtwoord dat gecontroleerd moet worden  
                @param bevestigWachtwoord   : het confirmatie wachtwoord dat gecontroleerd moet worden
            */
            checkWachtwoorden = function (wachtwoord, bevestigWachtwoord) {
                if (wachtwoord === bevestigWachtwoord && wachtwoord.length > 4) {
                    return true;
                }
                return false;
            },

            /**
                Hier wordt een gebruiker aan gemaakt en aangegeven of dit gelukt is, ook wordt het 
                aangegeven als het email adres al in gebruik is
                @param gegevens : de door de gebruiker opgegeven gegevens vanuit het formulier
            */
            registreerGebruiker = function (gegevens) {
                dbService.gebruikers.post({}, gegevens, function (res) {
                    if (res.message === "Het gegeven e-mail adres bestaat al.") {
                        veranderTextveldKleurRood("maile_reg");
                    }
                    if (res.geslaagd) {
                        //login({"email": gegevens.email, "wachtwoord": gegevens.wachtwoord});
                        $scope.registreerMessage = "U bent geregistreerd, log in met uw gegevens.";
                    }
                });
            },

            /**
                Hier wordt de gebruiker ingelogd. Deze functie wordt ook aangeroepen nadat een nieuw account geregistreerd is
                @param gegevens : de gegevens van de gebruiker die moet worden ingelogd
            */
            login = function (gegevens) {
                dbService.login.post(gegevens, function (res) {
                    if (!res.ingelogd) {
                        veranderTextveldKleurRood("maile_log");
                        veranderTextveldKleurRood("wachtwoord_log");
                    }
                    else {
                        $window.location = "/#/home";
                    }
                    $scope.loginMessage = res.message;
                });
            },

            /**
                Hier word een nieuw willekeurig wachtwoord gegenereerd voor een gebruiker die zijn wachtwoord is vergeten
                @param gegevens : hier zit alleen het email adres in van een mogenlijke gebruiker
            */
            nieuwWachtwoord = function (gegevens) {
                dbService.wachtwoordVergeten.post(gegevens, function (nieuw) {
                    $scope.loginMessage = nieuw.message;
                });
            },

            /**
                Deze functie zet de border kleur naar de standaard kleur (grijs) en wordt bijvoorbeeld gebruikt als error meldingen worden verbeterd
                tijdens het registreren en inloggen
                @param veldId : het id van het onderdeel waarvan de originele kleur hersteld moet worden
            */
            resetVeld = function (veldId) {
                document.getElementById(veldId).style.border = "1px solid #b3b3b3";
            },

            /**
                Deze functie zet de border kleur naar rood en wordt bijvoorbeeld gebruikt voor de error meldingen tijdens
                het registreren en inloggen
                @param veldId : het id van het onderdeel waarvan de border rood moet worden
            */
            veranderTextveldKleurRood = function (veldId) {
                document.getElementById(veldId).style.border = "1px solid #f00";
            },

            /**
                Hier wordt gecontroleerd of er geen velden leeg gelaten zijn
                @param gegevens : een object gevuld met een aantal waardes die gecontroleerd moeten wroden
            */
            valideerRegistreerGegevens = function (gegevens) {
                var isValid = true;
                if (!gegevens.email) {
                    veranderTextveldKleurRood("maile_reg");
                    isValid = false;
                }
                else {
                    resetVeld("maile_reg");
                }
                if (!gegevens.wachtwoord || !gegevens.bevestigWachtwoord) {
                    veranderTextveldKleurRood("wachtwoord_reg");
                    veranderTextveldKleurRood("bevestigWachtwoord_reg");
                    isValid = false;
                }
                else {
                    resetVeld("wachtwoord_reg");
                    resetVeld("bevestigWachtwoord_reg");
                }
                if (!gegevens.gebruikersnaam) {
                    veranderTextveldKleurRood("gebruikersnaam_reg");
                    isValid = false;
                }
                else {
                    resetVeld("gebruikersnaam_reg");
                }
                if (isValid) {
                    return true;
                }
                return false;
            };

        /**
            Deze functie wordt uitgevoerd als de gebruiker zijn loginformulier submit. Hier worden 
            verschillende functies aangeroepen n.a.v uitkomste van gegevens controlles en worden 
            de uitkomsten gemeld aan de gebruiker
            @param gegevens : de gegevens die de gebruiker in het loginformulier heeft ingevuld
        */
        $scope.loginForm = function (gegevens) {
            var isValid = true;
            if (!valideerLoginGegevens(gegevens)) {
                $scope.loginMessage = "De ingvulde gegevens zijn niet juist.";
                return;
            }
            if (!setKleurEmailLogin(gegevens.email)) {
                isValid = false;
            }
            if (!setKleurWachtwoordLogin(gegevens.wachtwoord)) {
                isValid = false;
            }
            if (isValid) {
                login(gegevens);
            }
            else {
                $scope.loginMessage = "De ingvulde gegevens zijn niet juist.";
            }
        }

        /**
            Deze functie wordt uitgevoerd als de gebruiker zijn registratieformulier submit. Hier worden 
            verschillende functies aangeroepen n.a.v uitkomste van gegevens controllesen worden de uitkomsten 
            gemeld aan de gebruiker
            @param gegevens : de gegevens die de gebruiker in het registratieformulier heeft ingevuld
        */
        $scope.registerForm = function (gegevens) {
            var isValid = true;
            console.log(gegevens.email + gegevens.wachtwoord + gegevens.bevestigWachtwoord);
            if (!valideerRegistreerGegevens(gegevens)) {
                $scope.registreerMessage = "Vul de volgende velden volledig in:";
                return;
            }
            if (!setKleurEmailRegister(gegevens.email)) {
                isValid = false;
            }
            if (!setKleurWachtwoordRegister(gegevens.wachtwoord, gegevens.bevestigWachtwoord)) {
                isValid = false;
            }
            if (!setKleurGebruikersnaamRegister(gegevens.gebruikersnaam)) {
                isValid = false;
            }
            if (isValid) {
                registreerGebruiker(gegevens);
            } else {
                $scope.registreerMessage = "Vul de volgende velden volledig en juist in:";
            }
        }

        /**
            Deze functie wordt uitgevoerd als de gebruiker op wachtwoord vergeten klikt. Hier worden 
            verschillende functies aangeroepen n.a.v uitkomste van gegevens controlles en worden de 
            uitkomsten gemeld aan de gebruiker
            @param gegevens : de gegevens die de gebruiker in het login formulier heeft ingevuld
        */
        $scope.wachtwoordVergeten = function (gegevens) {
            var isValid = true;
            if (!setKleurEmailLogin(gegevens.email)) {
                isValid = false;
            }
            if (isValid) {
                nieuwWachtwoord(gegevens);
            }
            else {
                $scope.loginMessage = "Vul een valide e-mail adres in.";
            }
        }
    }

/**
    Deze functie toont de minimale eisen per registratieveld
    @param nummer    : een nummer dat wordt gebruikt om de positie van de popup te berekenen
    @param boodschap : de inhoud van de popup met de minimale eisen
*/
var toonEisenVeld = function (nummer, boodschap) {
    var hoogteInputveld = 82;
    document.getElementById("eisenBoodschap").innerHTML = boodschap;
    document.getElementById("eisen").style.visibility = "visible";
    document.getElementById("eisen").style.marginTop = (hoogteInputveld * nummer) + "px";
}

/**
    Deze functie verbergt de minimale eisen per registratieveld
*/
var verbergEisenVeld = function () {
    document.getElementById("eisen").style.visibility = "hidden";
}