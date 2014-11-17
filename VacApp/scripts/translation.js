var english = kendo.observable({
    "Acceder" : "Sign in",
    "Registrar" : "Register",
    "Usuario" : "User",
    "Password" : "Password",
    "Confirmar_borrado" : "Confirm deletions",
    "Idioma" : "Language",
    "Cerrar_sesion" : "Sign out",
    "Volver" : "Return",
    "Subiendo_cambios" : "Please wait, the changes are being uploaded to the server...",
    "Resolviendo_peticiones" : "Resolving requests...",
    "Vacunas" : "Vaccines",
    "Añadir_vacuna" : "Add vaccine...",
    "Prescripciones" : "Prescriptions",
    "Añadir_prescripcion" : "Add prescription...",
    "Historial" : "Record",
    "Añadir_PHR" : "Add PHR..."
});

var spanish = kendo.observable({
    "Acceder" : "Acceder",
    "Registrar" : "Registrar",
    "Usuario" : "Usuario",
    "Password" : "Contraseña",
    "Confirmar_borrado" : "Confirmar borrado",
    "Idioma" : "Idioma",
    "Cerrar_sesion" : "Cerrar sesión",
    "Volver" : "Volver",
    "Subiendo_cambios" : "Por favor, espere, se están subiendo los cambios al servidor...",
    "Resolviendo_peticiones" : "Resolviendo peticiones...",
    "Vacunas" : "Vacunas",
    "Añadir_vacuna" : "Añadir vacuna...",
    "Prescripciones" : "Prescripciones",
    "Añadir_prescripcion" : "Añadir prescripción...",
    "Historial" : "Historial",
    "Añadir_PHR" : "Añadir PHR..."
});

var catalan = kendo.observable({
    "Acceder" : "Accedir",
    "Registrar" : "Registrar",
    "Usuario" : "Usuari",
    "Password" : "Contrasenya",
    "Confirmar_borrado" : "Confirmar esborrat",
    "Idioma" : "Idioma",
    "Cerrar_sesion" : "Tanca sessió",
    "Volver" : "Tornar",
    "Subiendo_cambios" : "Esperi, si us plau, els canvis s'estan pujant al servidor...",
    "Resolviendo_peticiones" : "Resolent peticions...",
    "Vacunas" : "Vacunes",
    "Añadir_vacuna" : "Afegir vacuna...",
    "Prescripciones" : "Prescripcions",
    "Añadir_prescripcion" : "Afegir prescripció...",
    "Historial" : "Historial",
    "Añadir_PHR" : "Afegir PHR..."
});

var dict = {
    "english" : english,
    "spanish" : spanish,
    "catalan" : catalan
}

function languageSelected(){
    var viewModel = dict[(document.getElementById("language-select").value)];
    kendo.bind($("span"), viewModel);
}

function _L(){
    //return dict[language];
    
    var viewModel = dict[language];
    kendo.bind($("span"), viewModel);
}