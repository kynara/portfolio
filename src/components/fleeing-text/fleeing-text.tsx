import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import {Vehicle} from "./vehicle";

interface FleeingTextProps {
    text: string;
}

export const FleeingText: React.FC<FleeingTextProps> = (props: FleeingTextProps) => {
    let font: p5Types.Font;
    let vehicles: Vehicle[] = [];

    let points: any[] = [];

    const preload = (p5: p5Types) => {
        font = p5.loadFont('./fonts/super-normal-font/SuperNormal-xRoj5.ttf');
    };

    const isGoodPt = (x: number, y: any, p5:p5Types) => {
        for(let i = -2; i < 3; i++) {
            for(let j = -2; j < 3; j++) {
                if (p5.get(x+i, y+j)[0] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);


        p5.textFont(font);
        p5.textSize(250);
        p5.fill("#F0CF65");
        p5.noStroke();
        p5.text(props.text, window.innerWidth/2-438, window.outerHeight/2);

        let outlinepts = font.textToPoints(props.text, window.innerWidth/2-438, window.outerHeight/2, 250, {
            sampleFactor: 0.1
        });

        for (let i = 0; i < outlinepts.length; i++) {
            p5.point(outlinepts[i].x, outlinepts[i].y);
            let tempx =outlinepts[i].x, tempy = outlinepts[i].y;

            points.push({x: tempx, y: tempy});
            let vehicle = new Vehicle(p5, tempx, tempy);
            vehicles.push(vehicle);
            p5.stroke(255);
            p5.strokeWeight(5);
            p5.point(tempx, tempy);
        }

        let factor = 5;
        for (let y = 205; y < 415; y += factor) {
            for (let x = 250; x < 1400; x += factor){
                let tempx = x + p5.random(0, factor), tempy = y + p5.random(0, factor);
                if (isGoodPt(tempx, tempy, p5)) {
                    points.push({x: tempx, y: tempy});
                    let vehicle = new Vehicle(p5, tempx, tempy);
                    vehicles.push(vehicle);
                    p5.stroke(255);
                    p5.strokeWeight(5);
                    p5.point(tempx, tempy);
                }
            }
        }
    };

    const draw = (p5: p5Types) => {
        p5.textSize(250);
        p5.background('#DDEDAA');
        p5.noStroke();
        p5.text(props.text, window.innerWidth/2-438, window.outerHeight/2);

        for (let i = 0; i < vehicles.length; i++) {
            let v = vehicles[i];
            v.behaviors(p5);
            v.update(p5);
            v.show(p5);
        }
    };

    return <Sketch setup={setup} draw={draw} preload={preload}/>;
};