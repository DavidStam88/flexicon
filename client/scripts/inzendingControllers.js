/**
 * Created by david on 16-06-14.
 */

var veranderAddTag = function (img, boolean) {
    if (boolean) {
        img.src = "./images/voorstel/add-hover.png";
    } else {
        img.src = "./images/voorstel/add.png";
    }
}

var veranderTag = function (img, boolean) {
    if (boolean) {
        img.src = "./images/voorstel/kruisje-hover.png";
    } else {
        img.src = "./images/voorstel/kruisje.png";
    }
}

var veranderPijltje = function (img, boolean, richting) {
    if (richting === 'up') {
        if (boolean) {
            img.src = "./images/voorstel/up-hover.png";
        } else {
            img.src = "./images/voorstel/up.png";
        }
    } else {
        if (boolean) {
            img.src = "./images/voorstel/down-hover.png";
        } else {
            img.src = "./images/voorstel/down.png";
        }
    }
}

var veranderSom = function (img, boolean, richting) {
    if (richting === 'plus') {
        if (boolean) {
            img.src = "./images/voorstel/plus-hover.png";
        } else {
            img.src = "./images/voorstel/plus.png";
        }
    } else {
        if (boolean) {
            img.src = "./images/voorstel/min-hover.png";
        } else {
            img.src = "./images/voorstel/min.png";
        }
    }
}

var veranderTwitter = function (img, boolean) {
    if (boolean) {
        img.src = "./images/inzending/share-twitter-hover.png";
    } else {
        img.src = "./images/inzending/share-twitter.png";
    }
}

var veranderFacebook = function (img, boolean) {
    if (boolean) {
        img.src = "./images/inzending/share-facebook-hover.png";
    } else {
        img.src = "./images/inzending/share-facebook.png";
    }
}

var veranderFavorite = function (img, boolean) {
    if (boolean) {
        img.src = "./images/inzending/add-favorite-hover.png";
    } else {
        img.src = "./images/inzending/add-favorite.png";
    }
}

var veranderFlexpoint = function (img, boolean, richting) {
    if (richting === 'plus') {
        if (boolean) {
            img.src = "./images/inzending/plus-flexpoints-hover.png";
        } else {
            img.src = "./images/inzending/plus-flexpoints.png";
        }
    } else {
        if (boolean) {
            img.src = "./images/inzending/min-flexpoints-hover.png";
        } else {
            img.src = "./images/inzending/min-flexpoints.png";
        }
    }
}

var toonVerdwijn = function (x, geenVoorbeeldElementen) {
    var i;
    for (i = 0; i < x.length; i += 1) {
        x[i].style.visibility = geenVoorbeeldElementen;
    }
}

var voorbeeld = function (voorbeeld) {
    var voorbeeldElementen,
        geenVoorbeeldElementen,
        x;
    if (voorbeeld) {
        voorbeeldElementen = "visible";
        geenVoorbeeldElementen = "hidden";
    } else {
        voorbeeldElementen = "hidden";
        geenVoorbeeldElementen = "visible";
    }
    document.getElementById('flexpointsVoorbeeld').style.visibility = voorbeeldElementen;
    document.getElementById('socialMediaIcons').style.visibility = voorbeeldElementen;
    document.getElementById('voorstellen').style.visibility = geenVoorbeeldElementen;

    x = document.getElementsByClassName('navArrow');
    toonVerdwijn(x, geenVoorbeeldElementen);
    x = document.getElementsByClassName('sizeArrow');
    toonVerdwijn(x, geenVoorbeeldElementen);
    x = document.getElementsByClassName('fontArrow');
    toonVerdwijn(x, geenVoorbeeldElementen);
}

var inzendingController = function ($scope, dbService, $window, $routeParams) {
    $scope.afbeeldingenThema = [];
    $scope.thumbnailsThema = [];
    $scope.inzending = {};
    var marginThumbnails = 170;
    var startThumbnails = -275;
    var eindThumbnails;
    var marginAfbeeldingenThema = 300;
    var startAfbeeldingenThema = -600;
    var eindAfbeeldingenThema;
    var geselecteerdeAfbeeldingThema = 2;
    var geselecteerdeFont = 1;
    var thema = {};
    var letterGrootte = 45;

    var checkOfingelogd = function () {
        dbService.login.get(function (resp) {
            if (resp.ingelogd) {
                $scope.inzending.gebruikerId = resp.gebruikerId;
            } else {
                $window.location = "/#/login";
            }
        });
    }
    checkOfingelogd();

    var setLetterGrootte = function () {
        var slangWoorden = document.getElementsByClassName("slangWoord");
        var i;
        for (i = 0; i < slangWoorden.length; i += 1) {
            slangWoorden[i].style.fontSize = letterGrootte + "px";
        }
    }
    setLetterGrootte();

    $scope.veranderLetterGrootte = function (richting) {
        if (richting === "up") {
            if ((letterGrootte + 1) < 51 && (letterGrootte + 1) > 39) {
                letterGrootte += 1;
                setLetterGrootte();
            }
        }
        if (richting === "down") {
            if ((letterGrootte - 1) < 51 && (letterGrootte - 1) > 39) {
                letterGrootte -= 1;
                setLetterGrootte();
            }
        }
    }

    var setAfbeeldingenThema = function (array) {
            $scope.afbeeldingenThema = array;
        },
        setThumbnailsThema = function (array) {
            $scope.thumbnailsThema = array;
        },
        beweegThumbnailBeneden = function () {
        var timer;
        var voorstellen = document.getElementById("voorstellen");
        timer = setInterval(function () {
            if (startThumbnails + 7 > eindThumbnails) {
                startThumbnails = eindThumbnails;
                clearInterval(timer);
            } else {
                voorstellen.style.marginTop = (startThumbnails + 7) + "px";
                startThumbnails += 7;
            }
        }, 10);
    }
    var beweegThumbnailOmhoog = function () {
        var timer;
        var voorstellen = document.getElementById("voorstellen");
        timer = setInterval(function () {
            if (startThumbnails - 7 < eindThumbnails) {
                startThumbnails = eindThumbnails;
                clearInterval(timer);
            } else {
                voorstellen.style.marginTop = (startThumbnails - 7) + "px";
                startThumbnails -= 7;
            }
        }, 10);
    }

    var setEindThumnails = function (getal, richting) {
        if (getal < 235 && getal > -785) {
            eindThumbnails = getal;
            if (richting === "up") {
                beweegThumbnailOmhoog();
            } else if (richting === "down") {
                beweegThumbnailBeneden();
            }
        }
    }

    var beweegThemaAfbeeldingBeneden = function () {
        var timer;
        var themaAfbeeldingen = document.getElementById("themaAfbeeldingen");
        timer = setInterval(function () {
            if (startAfbeeldingenThema + 10 > eindAfbeeldingenThema) {
                startAfbeeldingenThema = eindAfbeeldingenThema;
                clearInterval(timer);
            } else {
                themaAfbeeldingen.style.marginTop = (startAfbeeldingenThema + 10) + "px";
                startAfbeeldingenThema += 10;
            }
        }, 10);
    }
    var beweegThemaAfbeeldingOmhoog = function () {
        var timer;
        var themaAfbeeldingen = document.getElementById("themaAfbeeldingen");
        timer = setInterval(function () {
            if (startAfbeeldingenThema - 10 < eindAfbeeldingenThema) {
                startAfbeeldingenThema = eindAfbeeldingenThema;
                clearInterval(timer);
            } else {
                themaAfbeeldingen.style.marginTop = (startAfbeeldingenThema - 10) + "px";
                startAfbeeldingenThema -= 10;
            }
        }, 10);
    }

    var setEindThemaAfbeeldingen = function (getal, richting) {
        if (getal < 300 && getal > -1500) {
            eindAfbeeldingenThema = getal;
            if (richting === "up") {
                geselecteerdeAfbeeldingThema += 1;
                beweegThemaAfbeeldingOmhoog();
            } else if (richting === "down") {
                geselecteerdeAfbeeldingThema -= 1;
                beweegThemaAfbeeldingBeneden();
            }
        }
    }

    $scope.veranderThemaFoto = function (richting) {
        if (startAfbeeldingenThema === -1500 || startAfbeeldingenThema === -1200 || startAfbeeldingenThema === -900
            || startAfbeeldingenThema === -600 || startAfbeeldingenThema === -300 || startAfbeeldingenThema === 0 ||
            startAfbeeldingenThema === 300) {
            var nieuweMargeThumbnails,
                nieuweMargeThemaAfbeeldingen;
            if (richting === "up") {
                nieuweMargeThumbnails = startThumbnails - 170;
                nieuweMargeThemaAfbeeldingen = startAfbeeldingenThema - 300;
            } else if (richting === "down") {
                nieuweMargeThumbnails = startThumbnails + 170;
                nieuweMargeThemaAfbeeldingen = startAfbeeldingenThema + 300;
            }
            setEindThumnails(nieuweMargeThumbnails, richting);
            setEindThemaAfbeeldingen(nieuweMargeThemaAfbeeldingen, richting);
        }
    };

    var fonts = [],
        eindFonts,
        startFonts = -90;

    var setFonts = function (array) {
            fonts = array;
            var slangWoorden = document.getElementsByClassName("slangWoord");
            var i;
            for (i = 0; i < slangWoorden.length; i += 1) {
                slangWoorden[i].style.fontFamily = fonts[i];
            }
        },
        beweegFontOmhoog = function () {
            var timer;
            var fonts = document.getElementById("fonts");
            timer = setInterval(function () {
                if (startFonts - 5 < eindFonts) {
                    startFonts = eindFonts;
                    clearInterval(timer);
                } else {
                    fonts.style.marginTop = (startFonts - 5) + "px";
                    startFonts -= 5;
                }
            }, 10);
        },
        beweegFontOmlaag = function () {
            var timer;
            var fonts = document.getElementById("fonts");
            timer = setInterval(function () {
                if (startFonts + 5 > eindFonts) {
                    startFonts = eindFonts;
                    clearInterval(timer);
                } else {
                    fonts.style.marginTop = (startFonts + 5) + "px";
                    startFonts += 5;
                }
            }, 10);
        },
        setEindFonts = function (getal, richting) {
        if (getal < 1 && getal > -181) {
            eindFonts = getal;
            if (richting === "up") {
                geselecteerdeFont += 1;
                beweegFontOmhoog();
            } else if (richting === "down") {
                geselecteerdeFont -= 1;
                beweegFontOmlaag();
            }
        }
    }
    $scope.veranderFont = function (richting) {
        if (startFonts === -180 || startFonts === -90 || startFonts === 0 || startFonts === 90) {
            var nieuweMargeFonts;
            if (richting === "up") {
                nieuweMargeFonts = startFonts - 90;
            } else if (richting === "down") {
                nieuweMargeFonts = startFonts + 90;
            }
            setEindFonts(nieuweMargeFonts, richting);
        }
    };

    var maakThumbnailArray = function () {
        var i,
            thumbnailArray = [];
        for (i = 0; i < thema.afbeeldingen.length; i += 1) {
            thumbnailArray[thumbnailArray.length] = thema.afbeeldingen[i].thumbnail;
        }
        setThumbnailsThema(thumbnailArray);
    }

    var maakAfbeeldingArray = function () {
        var i,
            afbeeldingArray = [];
        for (i = 0; i < thema.afbeeldingen.length; i += 1) {
            afbeeldingArray[afbeeldingArray.length] = thema.afbeeldingen[i].path;
        }
        setAfbeeldingenThema(afbeeldingArray);
    }

    var maakFontArray = function () {
        var i,
            fontArray = [];
        for (i = 0; i < thema.fonts.length; i += 1) {
            fontArray[fontArray.length] = thema.fonts[i].naam;
        }
        setFonts(fontArray);
    }

    var getThemaFonts = function () {
        dbService.lettertypes.get({id : thema.themaId}, function (resp) {
            if (resp.data) {
                thema.fonts = resp.data;
                maakFontArray();
            }
        });
    }

    var getAfbeeldingenThema = function () {
        dbService.themaAfbeeldingen.get({id : thema.themaId}, function (resp) {
            if (resp.data) {
                thema.afbeeldingen = resp.data;
                maakAfbeeldingArray();
                maakThumbnailArray();
            }
        });
    }

    var getThemaGegevens = function (themaId) {
        dbService.thema.get({id : themaId}, function (resp) {
            if (resp.data) {
                thema.naam = resp.data.naam;
                thema.themaId = resp.data._id;
                getThemaFonts();
                getAfbeeldingenThema();
            }
        });
    }

    $scope.veranderThema = function (themaId) {
        getThemaGegevens(themaId);
    }

    var getThemas = function () {
        dbService.themas.get(function (resp) {
            if (resp.data) {
                $scope.themas = resp.data;
                getThemaGegevens(resp.data[0]._id);
            }
        });
    }
    getThemas();

    var setTags = function (array) {
        var alleTags = [],
            i;
        for (i = 0; i < array.length; i += 1) {
            alleTags[i] = {
                naam : array[i],
                id : i
            };
        }
        $scope.tags = alleTags;
    }

    var zoekWoord = function () {
        dbService.woordenboek.get(function (resp) {
            if (resp.data) {
                $scope.woord = resp.data.woord;
                $scope.inzending.origineelId = resp.data._id;
                setTags(resp.data.tags);
            }
        });
    }
    zoekWoord();

    $scope.addTag = function () {
        if ($scope.tags.length < 4) {
            $scope.tags.push({
                naam : $scope.tagNew,
                id : $scope.tags.length
            });
            $scope.tagNew = "";
        } else {
            alert ("Meer dan 4 tags is niet toegestaan.");
        }
    }

    $scope.deleteTag = function (id) {
        var i,
            newArray = [];
        $scope.tags.splice(id, 1);
        for (i = 0; i < $scope.tags.length; i += 1) {
            newArray[i] = $scope.tags[i].naam;
        }
        setTags(newArray);
    }

    var maakTagsVoorVerzenden = function () {
        var array = [],
            i;
        for (i = 0; i < $scope.tags.length; i += 1) {
            array[i] = $scope.tags[i].naam;
        }
        return array;
    }

    var getAfbeeldingId = function () {
        return thema.afbeeldingen[geselecteerdeAfbeeldingThema]._id;
    }

    var getLettertypeId = function () {
        return thema.fonts[geselecteerdeFont]._id;
    }

    $scope.flexificeren = function () {
        $scope.inzending.afbeeldingId = getAfbeeldingId();
        $scope.inzending.lettertypeId = getLettertypeId();
        $scope.inzending.themaId = thema.themaId;
        $scope.inzending.video = "Dit wordt een video.";
        $scope.inzending.lettergrootte = letterGrootte;
        $scope.inzending.tags = maakTagsVoorVerzenden();
        console.log($scope.inzending);
        dbService.inzending.post($scope.inzending, function (resp) {
            if (resp.data) {
                if (resp.message === "Het opslaan van de inzending is gelukt.") {
                    $window.location = "/#/home";
                } else {
                    toonMessage(resp.message);
                }
            }
        });
    }

    //Videodeel

    var canvas,
        opnemen,
        speelTerug,
        ctx,
        video,
        startOpenemen,
        recordVideo,
        videoCanvas,
        videoArray = [],
        x = 0;

    function onFailure(err) {
        $window.location = "/#/home";
    }

    function gewensteMedia() {
        return {
            video : true,
            audio : false
        }
    }

    var setWaardes = function () {
        videoCanvas = document.getElementById("video-canvas");
        canvas = document.getElementById("video-canvas");
        ctx = canvas.getContext('2d');
        opnemen = document.getElementById("opnemen");
        speelTerug = document.getElementById("speelTerug");

        video = document.getElementsByTagName("video")[0];
        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        if (navigator.getUserMedia) {
            navigator.getUserMedia(gewensteMedia(), function (localMediaStream) {
                video.src = window.URL.createObjectURL(localMediaStream);

            }, onFailure);
        }
        else {
            alert('OOPS No browser Support');
        }
    }

    var stopOpnemen = function () {
        speelTerug.style.visibility = "visible";
        opnemen.style.visibility = "visible";
        opnemen.style.marginLeft = 138 + "px";
        clearInterval(startOpenemen);
        clearInterval(recordVideo);
    }

    $scope.record = function () {
        videoArray = [],
        opnemen.style.visibility = "hidden";
        speelTerug.style.visibility = "hidden";
        startOpenemen = setTimeout(function() { stopOpnemen(); }, 10000);
        recordVideo = setInterval(function() {
            snapshot();
        }, 20);
    }

    function tekenFrame () {
        x += 1;
        videoCanvas.width = 270;
        videoCanvas.height = 270;
        var n = videoCanvas.getContext('2d')
        if (x === videoArray.length - 1) {
            clearInterval(recordVideo);
            speelTerug.style.visibility = "visible";
            opnemen.style.visibility = "visible";
            n.putImageData(videoArray[x], 0, 0);
        } else {
            n.putImageData(videoArray[x], 0, 0);
        }
    }

    $scope.toonVideo = function () {
        x = 0;
        speelTerug.style.visibility = "hidden";
        opnemen.style.visibility = "hidden";
        recordVideo = setInterval(function() {
            tekenFrame();
        }, 25);
    }

    function snapshot() {
        canvas.width = 270;
        canvas.height = 270;
        ctx.drawImage(video, -220, -200);
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        videoArray[videoArray.length] = imgData;
    }
    setWaardes();
};