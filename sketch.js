var Wimg, Fimg, Insimg, Snimg, Tweetimg, Ytimg;
var p1,ground,book,book_img;
var gameState = "Home";
var bar,student,stu_img,soc_med;
var disturb,score = 0;
var book_grp,dist_grp;

function preload(){
   Wimg = loadImage("Images/WhatsApp_Icon.png");
   Fimg = loadImage("Images/FaceBook_Icon.png");
   Insimg = loadImage("Images/Instagram_Icon.png");
   Snimg = loadImage("Images/SnapChat_Icon.png");
   Tweetimg = loadImage("Images/Twitter_Icon.png");
   Ytimg = loadImage("Images/Youtube_Icon.png");
   stu_img = loadImage("Images/Student_Img.png");
   book_img = loadImage("Images/Book_Image.png");
}

function setup(){
   createCanvas(displayWidth,displayHeight);
   p1 = new HomePage();

   student = createSprite(190,470,30,20);
   student.addImage(stu_img);
   student.scale = 0.3;
   student.visible = false;

   book_grp = new Group();
   dist_grp = new Group();

   ground = createSprite(displayWidth/2-100,displayHeight-170,displayWidth+1000,20);
   ground.visible = false;

   


}

function draw(){
   background("lightblue");

   p1.display();
   p1.playGame();
   p1.showInst();
   p1.showControls();

   if(gameState === "instruct"){
      p1.hide();

      ok = createButton('Back');
      ok.position(displayWidth/2-70,displayHeight/2+100);
      ok.style('width','100px');
      ok.style('height','40px');

      ok.mousePressed(()=>{
         location.reload();
      })

      textSize(20);
      fill("red");
      text("Game Instructions:",displayWidth/2-380,displayHeight/2-150);
      textSize(15);
      fill("black");
      text("1. Click on 'Play' option in the game menu.",displayWidth/2-380,displayHeight/2-100);
      text("2. Then, enter your name & a time span during which you'd like to study. (Min. 4 hrs & Max. 10 hrs)",displayWidth/2-380,displayHeight/2-80);
      text("3. Click on 'Start !' to begin.",displayWidth/2-380,displayHeight/2-60);
      text("4. You, as a student, have to concentrate & avoid distraction by dodging over the running social media icons.",displayWidth/2-380,displayHeight/2-40);
      text("5. If you touch any of the obstacles, your completion bar will turn red.",displayWidth/2-380,displayHeight/2-20);
      text("6. Continuous contact may automatically make you lose the game.",displayWidth/2-380,displayHeight/2);
      text("8. You'll also get some interesting quizzes in between. I hope you'll definitely like them.",displayWidth/2-380,displayHeight/2+20);
      text("9. Collect books to increase knowledge points (XP).",displayWidth/2-380,displayHeight/2+40);
      text("10. After you play, you can share your opinion in the 'Give Feedback' option",displayWidth/2-380,displayHeight/2+60);
   }

   if(gameState === "con"){
      p1.hide();
      fill("red");
      textSize(20);      
      text("CONTROLS",displayWidth/2-50,displayHeight/2-150);
      fill("green");
      text("Key                                                                                    Function",displayWidth/2-270,displayHeight/2-80)
      fill("blue");
      text("Q ----------------------------------------------------------------------- Show goal bar",displayWidth/2-270,displayHeight/2-50);
      text("W ----------------------------------------------------------------------- Move forward",displayWidth/2-270,displayHeight/2-20);
      text("E ----------------------------------------------------------------------- Jump",displayWidth/2-270,displayHeight/2+10);

      ok2 = createButton('Back');
      ok2.position(displayWidth/2-40,displayHeight/2+150);
      ok2.style('width','100px');
      ok2.style('height','40px');

      ok2.mousePressed(()=>{
         location.reload();
      })
   }

   if(gameState === "play"){
      background("lightgreen");
      
      student.visible = true;
      ground.visible = true;

      if(keyDown("E") && student.y>470){
         student.velocityY = -20;
      }
      student.velocityY += 1;

      if(keyDown("Q")){
         bar.visible = true;
      }

      if(keyDown("W")){
         spawnBooks();
         spawnDisturbance();
      }

      var bar_length = p1.goal.value();
      bar = createSprite(displayWidth/2-600,displayHeight-550,30,bar_length*30);
      bar.shapeColor = "white";
      bar.visible = false;
      student.collide(ground);
      
      textSize(13);
      fill("blue");
      text(p1.name.value(),student.x-25,student.y-40);

      text("Knowledge Points : "+score,displayWidth/2-70,displayHeight-600);
   }

   drawSprites();
}

function spawnBooks(){
   if(frameCount%80 === 0){
      book = createSprite(displayWidth-100,displayHeight-450,30,30);
      book.velocityX = -8;
      book.addImage(book_img);
      book.scale = 0.2;
      book.lifetime = displayWidth/-8;
      book_grp.add(book);
   }
   if(student.isTouching(book_grp)){
      score += 5;
      book_grp.destroyEach();
   }
}

function spawnDisturbance(){
   if(frameCount%50 === 0){
      disturb = createSprite(displayWidth-100,displayHeight-250,30,30);
      disturb.velocityX = -20;
      disturb.scale = 0.2;
      disturb.lifetime = displayWidth/-20;
      dist_grp.add(disturb);

      var x = Math.round(random(1,6));
      switch(x){
         case 1:disturb.addImage(Wimg)
         break;
         case 2:disturb.addImage(Fimg)
         break;
         case 3:disturb.addImage(Insimg)
         break;
         case 4:disturb.addImage(Snimg)
         break;
         case 5:disturb.addImage(Tweetimg)
         break;
         case 6:disturb.addImage(Ytimg)
         break;
         default:break;
      }
   }
   if(student.isTouching(dist_grp)){
      if(score>0){
         score -= 5;
      }
      gameState = "end";
      disturb.destroy();
   }
   }
