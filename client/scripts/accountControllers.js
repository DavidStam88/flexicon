/**
 * Created by david on 03-06-14.
 */

flexiconApp.controller('accountController', function accountController($scope, dbService, $routeParams) {
    /**
        Hier wordt gecontroleerd of er tijdens het uploaden van een afbeelding iets fout gegaan is.
        Dit is een anonieme functie omdat de pagina herlaad als de afbeelding geupload is
    */
    if ($routeParams.mis) {
        $scope.avatarMessage = "Het bestand is te groot of is geen .jpg of .png.";
    } else {
        $scope.avatarMessage = "Wijzig je avatar door erop te klikken.";
    }

    /**
        Allereerst wordt er een bericht geladen die de gebruiker aangeeft dat de gegevens gewijzigd kunnen worden
    */
    $scope.formMessage = "Wijzig je gegevens."
    var gebruiker,
    /**
        Hier word de gebruiker opgezocht om zo de gegevens velden in te kunnen vinden met de gebruikergegevens
        @routeParams.id : het id van de te vinden gebruiker
        @resp     : dit is een object die bestaat uit data (de vernieuwde gegevens) en 
                    een message (of de actie geslaagd is of niet)
    */
        getGebruiker = function () {
            dbService.gebruikers.get({id : $routeParams.id}, function (resp) {
                if (resp.data) {
                    gebruiker = resp.data;
                    $scope.gebruiker = gebruiker;
                }
            });
        };
    getGebruiker();

    /**
        Deze functie wordt uigevoerd als de gebruiker zijn gegevens wilt veranderderen
        @param gegevens : de gegevens uit het formulier die de gebruiker heeft ingevuld
        @resp     : dit is een object die bestaat uit data (de vernieuwde gegevens) en 
                    een message (of de actie geslaagd is of niet)
    */
    $scope.update = function (gegevens) {
        dbService.gebruikers.update(gegevens, function (resp) {
            $scope.formMessage = resp.message;
        });
    };
});