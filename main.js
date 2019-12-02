var p,
    g,
    y,
    x;

var m,
    k,
    r,
    s;

var parametrosAcabados = false;
var firmaAcabada = false;

//#region PRIME FUNCTION AND EVENT
function handlePrime() {
    var primeNumber = bigInt(document.getElementById("primeNumber").value);
    if (primeNumber != "") {
        if (primeNumber.greater(0)) {
            var validPrime = document.getElementById("validPrime");
            if (primeNumber.isPrime()) {
                p = primeNumber;
                document.getElementById("clavePublicaP").innerText = `p: ${p}`;
                validPrime.style.color = "green";
                validPrime.innerHTML = "Numero primo";
            } else {
                p = undefined;
                document.getElementById("clavePublicaP").innerText = `p: no definido`;
                validPrime.style.color = "red";
                validPrime.innerHTML = "Numero no primo";
            }
        } else {
            validPrime.style.color = "red";
            validPrime.innerHTML = "Tiene que ser un primo mayor que 0";
        }
    } else {
        p = undefined;
        document.getElementById("clavePublicaP").innerText = `p: no definido`;
    }
}

var primeNumber = document.getElementById("primeNumber");
primeNumber.addEventListener("keyup", handlePrime, false);
primeNumber.addEventListener("change", handlePrime, false);

//#endregion

//#region RANDOM FUNCTION AND EVENT
function handleRandom() {
    var randNum = bigInt(document.getElementById("randomNumber").value);
    var validRand = document.getElementById("validRand");
    if (randNum != "") {
        if (p != undefined) {
            if (randNum.greater(0) && randNum.lesser(p)) {
                g = randNum;
                document.getElementById("clavePublicaG").innerText = `g: ${g}`;
                validRand.style.color = "green";
                validRand.innerHTML = "Correcto";
            } else {
                g = undefined;
                document.getElementById("clavePublicaG").innerText = `g: no definido`;
                validRand.style.color = "red";
                validRand.innerHTML = "El numero tiene que ser positivo y menor que el numero primo elegido";
            }
        } else {
            validRand.style.color = "red";
            validRand.innerHTML = "Primero asegurate de introducir el numero primo (p)";
        }
    } else {
        g = undefined;
        document.getElementById("clavePublicaG").innerText = `g: no definido`;
    }

}

var randomNumber = document.getElementById("randomNumber");
randomNumber.addEventListener("keyup", handleRandom, false);
randomNumber.addEventListener("change", handleRandom, false);
//#endregion

//#region CLAVE SECRETA AND EVENT
function handleClaveSecreta() {
    var claveSecreta = bigInt(document.getElementById("claveSecreta").value);
    var validClaveSecreta = document.getElementById("validClaveSecreta");
    if (claveSecreta != "") {
        if (claveSecreta.greater(0) && claveSecreta.lesserOrEquals(p - 2)) {
            x = claveSecreta;
            document.getElementById("clavePrivadaX").innerText = `x: ${x}`;
            validClaveSecreta.style.color = "green";
            validClaveSecreta.innerHTML = "Correcto";
        } else {
            x = undefined;
            document.getElementById("clavePrivadaX").innerText = `x: no definido`;
            validClaveSecreta.style.color = "red";
            validClaveSecreta.innerHTML = "La clave secreta tiene que estar en el rango indicado";
        }
    }
}

var setClaveSecreta = document.getElementById("claveSecreta");
setClaveSecreta.addEventListener("keyup", handleClaveSecreta, false);
setClaveSecreta.addEventListener("change", handleClaveSecreta, false);
//#endregion

//#region VALOR Y AND EVENT
function handleValorY() {
    var valorY = document.getElementById("valorY");
    var validValorY = document.getElementById("validValorY");
    if (g != undefined && x != undefined) {
        y = g.modPow(x, p);
        valorY.value = y;

        document.getElementById("clavePublicaY").innerText = `y: ${y}`;
        validValorY.innerHTML = "Correcto";
        validValorY.style.color = "green";

        parametrosAcabados = true;
    } else {
        validValorY.innerHTML = "Primero tienes que introducir el numero aleatorio y la clave secreta";
        validValorY.style.color = "red";
    }
}

var calcularValorY = document.getElementById("calcularValorY");
calcularValorY.addEventListener("click", handleValorY, false);
//#endregion

//#region MENSAJE AND EVENT
function handleMensaje() {
    var validMensaje = document.getElementById("validMensaje");
    if (parametrosAcabados) {
        var mensaje = bigInt(document.getElementById("mensaje").value);
        if (mensaje != "") {
            if (mensaje.greaterOrEquals(0) && mensaje.lesser(p - 1)) {
                m = mensaje;
                validMensaje.innerHTML = "Correcto";
                validMensaje.style.color = "green";
            } else {
                m = undefined;
                validMensaje.innerHTML = "El mensaje tiene que cumplir: (0 &le; m &lt; p-1)";
                validMensaje.style.color = "red";
            }
        } else {
            validMensaje.innerHTML = "Tienes que escribir un mensaje";
            validMensaje.style.color = "red";
        }
    } else {
        validMensaje.innerHTML = "Primero tienes que acabar los parametros de la firma.";
        validMensaje.style.color = "red";
    }

}

var setMensaje = document.getElementById("mensaje");
setMensaje.addEventListener("keyup", handleMensaje, false);
setMensaje.addEventListener("change", handleMensaje, false);
//#endregion

//#region K RANDOM AND EVENT
function handleRandomK() {
    var validnumeroKrand = document.getElementById("validnumeroKrand");
    if (parametrosAcabados) {
        var numeroKrand = bigInt(document.getElementById("numeroKrand").value);
        if (bigInt.gcd(numeroKrand, p - 1) == 1) {
            if (numeroKrand.greaterOrEquals(1) && numeroKrand.lesserOrEquals(p - 2)) {
                k = numeroKrand;
                validnumeroKrand.innerHTML = "Correcto";
                validnumeroKrand.style.color = "green";
            } else {
                validnumeroKrand.innerHTML = "El numero no cumple con el rango";
                validnumeroKrand.style.color = "red";
            }
        } else {
            validnumeroKrand.innerHTML = "El numero no es coprimo con el numero primo";
            validnumeroKrand.style.color = "red";
        }
    } else {
        validnumeroKrand.innerHTML = "Primero tienes que acabar los parametros de la firma.";
        validnumeroKrand.style.color = "red";
    }
}

var setnumeroKrand = document.getElementById("numeroKrand");
setnumeroKrand.addEventListener("keyup", handleRandomK, false);
setnumeroKrand.addEventListener("change", handleRandomK, false);
//#endregion

//#region CALCULAR VALOR R AND EVENT
function handleValorR() {
    var validnumeroR = document.getElementById("validnumeroR");
    if (parametrosAcabados) {
        if (k != undefined && g != undefined && p != undefined) {
            var numeroR = bigInt(document.getElementById("numeroR"));
            r = g.modPow(k, p);
            numeroR.value = r;

            document.getElementById("firmaR").innerText = `r: ${r}`;
            validnumeroR.innerHTML = "Correcto";
            validnumeroR.style.color = "green";
        }
    } else {
        validnumeroR.innerHTML = "Primero tienes que acabar los parametros de la firma.";
        validnumeroR.style.color = "red";
    }
}

var calcularValorR = document.getElementById("calcularValorR");
calcularValorR.addEventListener("click", handleValorR, false);
//#endregion

//#region CALCULAR VALOR S AND EVENT
function handleValorS() {
    var validnumeroS = document.getElementById("validnumeroS");
    if (parametrosAcabados) {
        if (k != undefined && g != undefined && p != undefined && r != undefined) {
            var numeroS = document.getElementById("numeroS");
            var kInv = bigInt(k.modInv(p - 1));
            var dentro = m.minus(x.multiply(r));
            s = bigInt(mod(kInv.multiply(dentro), p - 1));

            document.getElementById("firmaS").innerText = `s: ${s}`;
            numeroS.value = s;
            firmaAcabada = true;
            validnumeroS.innerHTML = "Correcto";
            validnumeroS.style.color = "green";
        }
    } else {
        validnumeroS.innerHTML = "Primero tienes que acabar los parametros de la firma.";
        validnumeroS.style.color = "red";
    }
}

var calcularValorS = document.getElementById("calcularValorS");
calcularValorS.addEventListener("click", handleValorS, false);
//#endregion

//#region VERIFICAR FIRMA AND EVENT
function handleVerificarFirma() {
    var verifySignature = document.getElementById("verifySignature");
    if (firmaAcabada) {
        console.log("p:", p, "g:", g, "y:", y, "x:", x);
        console.log("m:", m, "k:", k, "r:", r, "s:", s);
        if (r.greaterOrEquals(1) && r.lesserOrEquals(p - 1)) {

            var comp1 = y.pow(r).multiply(r.pow(s)).mod(p);
            var comp2 = g.modPow(m, p);

            if (comp1.equals(comp2)) {
                verifySignature.innerHTML = "CORRECTO";
                verifySignature.style.color = "green";
            } else {
                verifySignature.innerHTML = "second check";
                verifySignature.style.color = "red";
            }
        } else {
            verifySignature.innerHTML = "No se cumple que 0 &lt; r &lt; p & 0 &lt; s &lt; p-1";
        }
    } else {
        verifySignature.innerHTML = "Primero tienes que acabar de crear la firma"
        verifySignature.style.color = "red";
    }
}

var validSignature = document.getElementById("validSignature");
validSignature.addEventListener("click", handleVerificarFirma, false);
//#endregion

//#region VERIFICAR FIRMA MANUAL AND EVENT
function handleSignatureManual() {
    var manualP = bigInt(document.getElementById("manualP").value);
    var manualG = bigInt(document.getElementById("manualG").value);
    var manualM = bigInt(document.getElementById("manualM").value);
    var manualY = bigInt(document.getElementById("manualY").value);
    var manualR = bigInt(document.getElementById("manualR").value);
    var manualS = bigInt(document.getElementById("manualS").value);

    if (manualP != "" &&
        manualG != "" &&
        manualM != "" &&
        manualY != "" &&
        manualR != "" &&
        manualS != "") {

        var comp1 = manualY.pow(manualR).multiply(manualR.pow(manualS)).mod(manualP);
        var comp2 = manualG.modPow(manualM, manualP);

        var salidaManualComp = document.getElementById("salidaManualComp");
        if (comp1.equals(comp2)) {
            salidaManualComp.innerHTML = "CORRECTO!";
            salidaManualComp.style.color = "green";
        } else {
            salidaManualComp.innerHTML = "La firma no es valida";
            salidaManualComp.style.color = "red";
        }
    }
}

var validSignatureManual = document.getElementById("validSignatureManual");
validSignatureManual.addEventListener("click", handleSignatureManual, false);
//#endregion

//#region BORRAR TODO AND EVENT
var btnBorrarTodo = document.getElementById("btnBorrarTodo");

function handleBorrarTodo() {
    //Global vars
    p = undefined;
    g = undefined;
    y = undefined;
    x = undefined;
    m = undefined;
    k = undefined;
    r = undefined;
    s = undefined;

    //PRIME
    document.getElementById("primeNumber").value = "";
    document.getElementById("validPrime").innerHTML = "";
    document.getElementById("clavePublicaP").innerHTML = `p: no definido`;

    //RANDOM NUM
    document.getElementById("randomNumber").value = "";
    document.getElementById("validRand").innerHTML = "";
    document.getElementById("clavePublicaG").innerHTML = `g: no definido`;

    //CLAVE SECRETA
    document.getElementById("claveSecreta").value = "";
    document.getElementById("validClaveSecreta").innerHTML = "";
    document.getElementById("clavePrivadaX").innerHTML = `x: no definida`;

    //CLAVE PUBLICA
    document.getElementById("valorY").value = "";
    document.getElementById("validValorY").innerHTML = "";
    document.getElementById("clavePublicaY").innerHTML = `y: no definido`;

    //MENSAJE
    document.getElementById("mensaje").value = "";
    document.getElementById("validMensaje").innerHTML = "";

    //NUMERO ALEATORIO
    document.getElementById("numeroKrand").value = "";
    document.getElementById("validnumeroKrand").innerHTML = "";

    //NUMERO R
    document.getElementById("numeroR").value = "";
    document.getElementById("validnumeroR").innerHTML = "";
    document.getElementById("firmaR").innerHTML = "r: no definido";

    //NUMERO S
    document.getElementById("numeroS").value = "";
    document.getElementById("validnumeroS").innerHTML = "";
    document.getElementById("firmaS").innerHTML = "s: no definido";

    //VERIFICAR FIRMA
    document.getElementById("verifySignature").innerHTML = "";

    //MANUAL P
    document.getElementById("manualP").value = "";
    //MANUAL G
    document.getElementById("manualG").value = "";
    //MANUAL M
    document.getElementById("manualM").value = "";
    //MANUAL Y
    document.getElementById("manualY").value = "";
    //MANUAL R
    document.getElementById("manualR").value = "";
    //MANUAL S
    document.getElementById("manualS").value = "";
    //SALIDA MANUAL
    document.getElementById("salidaManualComp").value = "";


}

btnBorrarTodo.addEventListener("click", handleBorrarTodo, false);
//#endregion

function mod(n, m) {
    return ((n % m) + m) % m;
}
