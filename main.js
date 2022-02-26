objectIdentifier = "";
objects=[];
Status = "";
sound = "";
label = "";

function preload(){
    sound = loadSound("sound.wav");
}

function setup(){
    canvas = createCanvas(380 ,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectIdentifier = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Baby";
}

function draw(){
    image(video,0,0,380,380);
    if(Status != ""){
        objectIdentifier.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(label != "person"){
        sound.play();
    }
    
}

function modelLoaded(){
    console.log("model is loaded");
    Status = true;
    objectIdentifier.detect(video, gotResults);
}

function gotResults(error , Results){
    if(error){
        console.error(error);
    }
    console.log(Results);
    objects = Results;
    label = Results[0].label;
}