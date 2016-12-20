(function () {
    'use strict';

    function Config () {}

    // ###########################################################################
    // ###  ATTRIBUTES  ##########################################################
    // ###########################################################################

    Object.defineProperties(Config.prototype, {
        // debug
        enableGlobalVars        : { get : function () { return this._config.debug.enableGlobalVars; }},
        stats                   : { get : function () { return this._config.debug.stats; }},
        logGameStates           : { get : function () { return this._config.debug.logGameStates; }},
        authoritativeSystemInfo : { get : function () { return this._config.debug.authoritativeSystemInfo; }},
        logLoading              : { get : function () { return this._config.debug.logLoading; }},
        // paths
        paths                   : { get : function () { return this._config.paths; }},
        imagesPath              : { get : function () { return this._config.paths.imagesPath; }},
        soundsPath              : { get : function () { return this._config.paths.soundsPath; }},
        videoPath               : { get : function () { return this._config.paths.videoPath; }},
        pdfPath                 : { get : function () { return this._config.paths.pdfPath; }},
        txtPath                 : { get : function () { return this._config.paths.txtPath; }},
        fontsPath               : { get : function () { return this._config.paths.fontsPath; }},
    });

    // ###########################################################################
    // ###  PUBLIC METHODS  ######################################################
    // ###########################################################################

    Config.prototype.request = function requestConfig (path, callback) {
        
        if (path.split('.').pop() !== 'json') path = path + '/config.json';
        console.info("[Config] Requesting config file at " + path);

        this._onRequestSuccess = callback;
        this.httpRequest = new XMLHttpRequest();

        if (!this.httpRequest) {
          alert('Giving up =( Cannot create an XMLHTTP instance');
          return false;
        }

        this.httpRequest.onreadystatechange = this._onStateChange.bind(this);
        this.httpRequest.open('GET', path);
        this.httpRequest.send();
    };

    Config.prototype.url = function url (path) {
        return path + '?' + KALULU_VERSION;
    };

    // ###########################################################################
    // ###  PRIVATE METHODS  #####################################################
    // ###########################################################################

    Config.prototype._onStateChange = function _onStateChange () {
        if (this.httpRequest.readyState === XMLHttpRequest.DONE) {
          if (this.httpRequest.status === 200) {
            //console.info(this.httpRequest);
            this._init(JSON.parse(this.httpRequest.responseText));
            this._onRequestSuccess();
          } else {
            this._onRequestFailure();
          }
        }
    };

    Config.prototype._init = function initConfig (config) {
        
        this._config = config;
    };

    Config.prototype._onRequestSuccess = function onConfigRequestSuccess () {
        
        console.info('Config was properly initialised !');
    };

    Config.prototype._onRequestFailure = function onConfigRequestFailure () {
        
        console.error('There was a problem with the Config request.');
    };

    module.exports = new Config();
})();