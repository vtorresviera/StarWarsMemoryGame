//<!--text in canvas 1 -->
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            var imageObj = new Image();
            var pat=ctx.createPattern(imageObj,"no-repeat");


            ctx.font = "20px Lato";
            ctx.fillStyle = pat;
            ctx.fillText("Leia Organa", 20, 50);
            imageObj.source = "img/leiaOrgana.png";
            