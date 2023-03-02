//VARIABLEN DEKLARIEREN _____________________________________________________

max = 10;
min = -10;

counter = 0;

canvas = document.getElementById("polynom");
ctx = canvas.getContext("2d");

canvas2 = document.getElementById("ksystem");
ksystem = canvas2.getContext("2d");

canvas3 = document.getElementById("nullstellen");
nullstellen = canvas3.getContext("2d");

//KOORDINATENSYSTEM ZEICHNEN

draw_ksystem(500,500,"ksystem");


// HILFSFUNKTIONEN __________________________________________________________

function toCnavasX(x){
    return (x+(max-min)/2)*canvas.width/(max-min);
};
function toCnavasY(y){
    return canvas.height - (y+(max-min)/2)*canvas.height/(max-min);
};
function holeInput(){
    let a = parseFloat(document.getElementById("var_a").value);
    let b = parseFloat(document.getElementById("var_b").value);
    let c = parseFloat(document.getElementById("var_c").value);
    return [a,b,c]
}
function main(){
    holeInput();
    berechneNullstellen();
    zeichnePolynom();
}
function clickManager(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        nullstellen.clearRect(0,0,canvas.width, canvas.height);
        main();
        document.getElementById("var_a").value = "";
        document.getElementById("var_b").value = "";
        document.getElementById("var_c").value = "";
        document.getElementById("var_a").focus();
};

//PROGRAMMFUNKTIONEN
function berechneNullstellen(){
    // -- HTML Elemente
        params = holeInput();
        a = params[0];
        b = params[1];
        c = params[2];

    // -- Nutzerinfos deklarieren
        let error_message = "Eine der Eingegebenen Zahlen ("+a+b+c+") liegt nicht zwischen [-10|10]"
        let message = "Das Polynom "+a.toString()+"x"+"\u00b2 + " + +b.toString()+"x + "+c.toString()+" hat "
    // a-Variable prüfen
        if (a>0){
            b= b/a;
            c = c/a;
        };
    //Prüfen ob Eingabe im definierten Bereich liegt:
        if (-10<=a<=10 || -10<b<10 || -10<c<10){
    // Nullstellen berechnen
            let sqrt_calculated = Math.sqrt(( Math.pow((b/2),2))-c)
            let x1 = (-(b/2)) + sqrt_calculated;
            let x2 = (-(b/2)) - sqrt_calculated;
    //Nullstellen ausgeben
            if (isNaN(x1) || isNaN(x2)){
                document.getElementById("result_text").innerHTML = message +"keine Nullstellen";
            }
            else if (x1==x2){
                document.getElementById("result_text").innerHTML = message+"die Nullstelle; "+x1.toString();
                zeichneNullstelle(x1)
            }
            else {
                document.getElementById("result_text").innerHTML = message+"die Nullstellen: x"+"\u2081"+" = "+x1.toString()+", x"+"\u2082"+" = "+x2.toString();
                zeichneNullstellen(x1,x2)
            }}
    //Nutzerinfo bei falscher Eingabe der Parameter ausgeben
        else{
            document.getElementById("result_text").innerHTML = error_message
        };
};
function zeichneNullstelle(x1){
    nullstellen.beginPath();
    nullstellen.arc(toCnavasX(x1),toCnavasY(0),3,0,90);
    nullstellen.fill();
};
function zeichneNullstellen(x1,x2){
    nullstellen.beginPath();
    nullstellen.arc(toCnavasX(x1),toCnavasY(0),4,0,90);
    nullstellen.arc(toCnavasX(x2),toCnavasY(0),4,0,90);
    nullstellen.fillStyle = "green";
    nullstellen.fill();
    

};
function zeichnePolynom(){
    params = holeInput();
    a = params[0];
    b = params[1];
    c = params[2];
    console.log(c)
    ctx.beginPath();
    for(x=min;x<=max;x = x+.1){
        y1 = a*Math.pow(x,2)+b*x+c;
        console.log(y1)
        x2 = x+.1;
        y2 = a*Math.pow(x2,2)+b*x2+c;

        ctx.moveTo(toCnavasX(x),toCnavasY(y1));
        ctx.lineTo(toCnavasX(x2),toCnavasY(y2));
        ctx.strokeStyle = "green";
        ctx.stroke();
    };
};

function draw_ksystem (_breite, _hoehe, _canvasID) {

    // Die Größen des Canvas werden zugewiesen  
    document.getElementById(_canvasID).height = _hoehe;
    document.getElementById(_canvasID).width = _breite;

    // Koordinatensystem wird erstellt

    // Das Koordinatenkreuz wird gezeichnet
    ksystem.beginPath();
    ksystem.moveTo(_breite / 2, 10);
    ksystem.lineTo(_breite / 2, _hoehe - 10);
    ksystem.moveTo(10, _hoehe / 2);
    ksystem.lineTo(_breite - 10, _hoehe / 2);

    // Der Auftrag zum Zeichnen mit der Farbe Schwarz
    ksystem.strokeStyle="#000000";
    ksystem.stroke();
};












