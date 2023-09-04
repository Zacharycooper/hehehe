objects = [];
status1 = '';

function preload(){
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}

function someRandomFunction(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'We are now detecting bc we are so epic ikr';
    object_name = document.getElementById('object_name').value;
}


function modelLoaded(){
    console.log('I have brains');
    status1 = true;
}

function gotResult(e, results){
    if (e){
        console.log(e);
    }else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video, 0,0,600,500);
    if(status1 != ''){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById('status').innerHTML = 'Status';
            
            fill('#FF0000');
            percent = floor(objects[i].confidence *100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name){
                video.stop()
                objectDetector.detect(gotResult)
                document.getElementById('object_status').innerHTML = object_name + ' FOUND!!!!!!!!!!!!!!!!!!! WE R EPIC!'
                synth = window.speechSynthesis;
                utter = new SpeechSynthesisUtterance(object_name + 'Found');
                synth.speak(utter)
                
            }else{
                document.getElementById('object_status').innerHTML = object_name + ' No Found. We Sad :('
            }
        }
    }
}
