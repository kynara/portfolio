import * as p5 from "p5";

export class Vehicle {
    private pos: p5.Vector;
    private target: p5.Vector;
    private vel: p5.Vector;
    private acc: p5.Vector;
    private r: number;
    private maxspeed: number;
    private maxforce: number;

    constructor(p: p5, x: number, y: number) {
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.target = p.createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = p.createVector();
        this.r = 8;
        this.maxspeed = 10;
        this.maxforce = 1;
    }

    behaviors(p: p5) {
        var arrive = this.arrive(this.target, p);
        arrive.mult(1);
        this.applyForce(arrive, p);

        var mouse = p.createVector(p.mouseX, p.mouseY);
        var flee = this.flee(mouse, p);
        this.applyForce(flee, p);


    }

    applyForce(f: p5.Vector, p: p5) {
        this.acc = p.createVector(this.acc.x+f.x, this.acc.y+f.y);
    }

    update(p: p5) {
        this.pos = p.createVector(this.pos.x+this.vel.x, this.pos.y+this.vel.y);
        this.vel = p.createVector(this.vel.x+this.acc.x, this.vel.y+this.acc.y);
        this.acc.mult(0);
    }

    show(p: p5) {
        p.stroke("#875053");
        p.strokeWeight(this.r);
        p.point(this.pos.x, this.pos.y);
    }


    arrive(target: p5.Vector, p: p5) {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        var speed = this.maxspeed;
        if (d < 100) {
            speed = p.map(d, 0, 100, 0, this.maxspeed);
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    flee(target: p5.Vector, p: p5) {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        if (d < 100) {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return p.createVector(0, 0);
        }
    }
}