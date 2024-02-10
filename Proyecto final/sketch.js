let video;
let poseNet;
let poses = [];
let paginaAbiertaYouTube = false;
let paginaAbiertaWhatsApp = false;
let paginaAbiertaFacebook = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function(results) {
    poses = results;
    console.log(results);
  });
  video.hide();
}

function modelReady() {
  select("#status").html("Modelo Cargado");
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints();
  drawSkeleton();
}

function drawKeypoints() {  
  for (let i = 0; i < poses.length; i++) {
    const pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      const keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    const skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
    
    const rightWrist = poses[i].pose.rightWrist;
    const leftWrist = poses[i].pose.leftWrist;
    if ((rightWrist || leftWrist) && !paginaAbiertaYouTube) {
      let x, y;
      if (rightWrist) {
        x = rightWrist.x;
        y = rightWrist.y;
      } else {
        x = leftWrist.x;
        y = leftWrist.y;
      }
      const circleX = 150;
      const circleY = 50;
      const circleRadius = 20;
      
      const distance = dist(x, y, circleX, circleY);
      
      if (distance < circleRadius) {
        window.open('https://www.youtube.com/?gl=MX&hl=es');
        paginaAbiertaYouTube = true;
      }
    }
    
    const rightWristGreen = poses[i].pose.rightWrist;
    const leftWristGreen = poses[i].pose.leftWrist;
    if ((rightWristGreen || leftWristGreen) && !paginaAbiertaWhatsApp) {
      let x, y;
      if (rightWristGreen) {
        x = rightWristGreen.x;
        y = rightWristGreen.y;
      } else {
        x = leftWristGreen.x;
        y = leftWristGreen.y;
      }
      const circleX = 300;
      const circleY = 50;
      const circleRadius = 20;
      
      const distance = dist(x, y, circleX, circleY);
      
      if (distance < circleRadius) {
        window.open('https://web.whatsapp.com/');
        paginaAbiertaWhatsApp = true;
      }
    }

    const rightWristBlue = poses[i].pose.rightWrist;
    const leftWristBlue = poses[i].pose.leftWrist;
    if ((rightWristBlue || leftWristBlue) && !paginaAbiertaFacebook) {
      let x, y;
      if (rightWristBlue) {
        x = rightWristBlue.x;
        y = rightWristBlue.y;
      } else {
        x = leftWristBlue.x;
        y = leftWristBlue.y;
      }
      const circleX = 450;
      const circleY = 50;
      const circleRadius = 20;
      
      const distance = dist(x, y, circleX, circleY);
      
      if (distance < circleRadius) {
        window.open('https://www.facebook.com/');
        paginaAbiertaFacebook = true;
      }
    }
    
    fill(255, 0, 0);
    ellipse(150, 50, 20, 20);
    fill(0, 255, 0);
    ellipse(300, 50, 20, 20);
    fill(0, 0, 255);
    ellipse(450, 50, 20, 20);
  }
}