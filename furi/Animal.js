export class Animal{
    constructor({x,y,size,speed=3,accel=.2,friction=.1,color='#000'}){
        // this.x=x;
        // this.y=y;
        this.xy=[x,y];
        this.size=size;
        // this.height=height;
        this.color=color

        this.speed=0;
        this.accel=accel;
        this.maxSpeed=speed;
        this.friction=friction;
        this.angle=0;
        this.deformation=.4;
        this.dc=1
        this.turnRate=0.08;

        this.controls=new Controls();
        this.eyes=new Eyes({owner:this,resolution:20,angle:Math.PI,sensitivity:300})
    }

    update(){
        this.#move();
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.accel;
            if(this.speed>this.maxSpeed){
                this.speed=this.maxSpeed;
            }
        }else if(this.controls.reverse){
            this.speed-=this.accel;
            if(this.speed<-this.maxSpeed/1){
                this.speed=-this.maxSpeed/1;
            }
        }else{
            if(this.speed>this.friction){
                this.speed-=this.friction;
            }else if(this.speed<-this.friction){
                this.speed+=this.friction;
            }else
                this.speed=0;
        }

        // if(this.speed!=0){
        //     const flip=this.speed<0?-1:1;
        //     if(this.controls.left){
        //         this.angle+=this.turnRate*flip;
        //     }
        //     if(this.controls.right){
        //         this.angle-=this.turnRate*flip;
        //     }
        // }
        if(this.controls.left){
            this.angle+=this.turnRate;
        }else if(this.controls.right){
            this.angle-=this.turnRate;
        }

        if(this.speed){
            let points=objects.intersectLine(this.xy,
                [this.xy[0]-Math.sin(this.angle)*this.dc*this.size
                ,this.xy[1]-Math.cos(this.angle)*this.dc*this.size])
            if(points.length){
                this.speed=0
            }else{
                this.xy[0]-=Math.sin(this.angle)*this.speed;
                this.xy[1]-=Math.cos(this.angle)*this.speed;
            }
        }
        this.dc=1+this.deformation*this.speed/this.maxSpeed
    }

    draw(ctx){
        this.update()
        this.eyes.draw(ctx)
        ctx.save();
        // ctx.translate(...this.xy);
        // ctx.rotate(-this.angle);
        ctx.fillStyle=this.color
        ctx.beginPath();
        // let dc=1+this.deformation*this.speed/this.maxSpeed  // deformation coeficient
        ctx.ellipse(
            ...this.xy,
            this.size/this.dc,
            this.size*this.dc,
            -this.angle,              // rotation
            -this.angle, -this.angle + 2 * Math.PI  // start - end
        );
        // ctx.rect(
        //     -this.width/2,
        //     -this.height/2,
        //     this.width,
        //     this.height
        // );
        ctx.fill();

        ctx.fillStyle='#ff0'
        ctx.beginPath();
        ctx.arc( this.size/3, this.size*-.6*this.dc, this.size*.30 ,0 ,2*Math.PI);
        ctx.arc(-this.size/3, this.size*-.6*this.dc, this.size*.30 ,0 ,2*Math.PI);
        ctx.fill()

        ctx.restore();

        ctx.strokeStyle='#f00'
        ctx.beginPath()
        ctx.moveTo(...this.xy)
        ctx.lineTo(
            this.xy[0]-Math.sin(this.angle)*this.dc*this.size
           ,this.xy[1]-Math.cos(this.angle)*this.dc*this.size
        )
        ctx.stroke()

    }
}