(function(global, jq){
//now we have safe code
    var Greetr = function(firstName, lastName, language)
    {
        return new Greetr.init(firstName, lastName, language);
    }
    //these are not exposed to the outer world unless the source code is changed
    var supportedLangs = ['en', 'es'];

    var greetings = {
        en:'Hello',
        es:'Hola'
    }

    var formalGreetings = {
        en:'greetings',
        es:'saludos'
    }

    var logMessages = {
        en: 'Logged in',
        es: 'Inicio session'
    }

    //inside the prototype is exposed to the outer world
    Greetr.prototype = {
        fullName: function()
        {
            return this.firstName + ' ' + this.lastName;
        },
        validate:function(language)
        {
            if(supportedLangs.indexOf(language) == -1){
                throw "Invalid language"
            }
        },
        greeting: function()
        {
            return greetings[this.language] + ', '+ this.fullName();
        },
        greet: function()
        {
            console.log(this.greeting());
            return this;//chainable method
        }
    };
    var init = Greetr.init = function(firstName, lastName, language)
    {
            this.firstName = firstName|| '';
            this.lastName = lastName || '';
            this.language = language || '';

            
    }

    init.prototype = Greetr.prototype;
    window.G$ = Greetr;
}(window, jQuery))