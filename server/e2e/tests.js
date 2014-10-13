/**
 * Created by david on 12-06-14.
 */

describe('Flexicon homepage', function() {
    it('Schoud give you the word of the week.', function() {
        browser.get('http://localhost:3001/#/home');
        var woordVanDeWeek = element(by.binding('woord'));
        expect(woordVanDeWeek.getText()).toEqual('" Stoer "');
    });
    var ptor = protractor.getInstance();
    it('change page and current url', function() {
        element(by.binding('inzending.definitie')).click();
        ptor.waitForAngular();
        expect(ptor.getCurrentUrl()).toContain('http://localhost:3001/#/reacties/inzending/');
    });
});

describe('Flexicon loginpage', function() {
    it('Schoud give a false login message.', function() {
        browser.get('http://localhost:3001/#/login');
        element(by.model('login.email')).sendKeys('dt.stam@gmail.nl');
        element(by.model('login.wachtwoord')).sendKeys('afgk');
        element(protractor.By.id('login')).click();

        var message = element(by.binding('loginMessage'));
        expect(message.getText()).toEqual('De ingvulde gegevens zijn niet juist.');
    });

    it('Schoud give false entered data message.', function() {
        browser.get('http://localhost:3001/#/login');
        element(by.model('register.email')).sendKeys('dt.stam@gmail.com');
        element(by.model('register.gebruikersnaam')).sendKeys('David');
        element(by.model('register.wachtwoord')).sendKeys('admin');
        element(by.model('register.bevestigWachtwoord')).sendKeys('afgk');
        element(protractor.By.id('register')).click();

        var message = element(by.binding('registreerMessage'));
        expect(message.getText()).toEqual('Vul de volgende velden volledig en juist in:');
    });


    it('Schoud give a enter-email message.', function() {
        browser.get('http://localhost:3001/#/login');
        element(protractor.By.id('wachtwoordVergeten')).click();

        var message = element(by.binding('loginMessage'));
        expect(message.getText()).toEqual('Vul een valide e-mail adres in.');
    });

});
