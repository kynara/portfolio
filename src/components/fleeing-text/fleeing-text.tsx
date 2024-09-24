import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import {Vehicle} from "./vehicle"; //Import this for typechecking and intellisense

interface FleeingTextProps {
    text: string;
}

let x = 50;
const y = 50;

export const FleeingText: React.FC<FleeingTextProps> = (props: FleeingTextProps) => {
    let font: p5Types.Font;
    let vehicles: Vehicle[] = [];

    const preload = (p5: p5Types) => {
        font = p5.loadFont('./fonts/super-normal-font/SuperNormal-xRoj5.ttf');
    };

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);


        p5.textFont(font);
        p5.textSize(250);
        p5.fill("#F0CF65");
        p5.noStroke();
        p5.text('kynara', window.innerWidth/2-438, window.outerHeight/2);

        let points = font.textToPoints(props.text, window.innerWidth/2-438, window.outerHeight/2, 250, {
            sampleFactor: 0.25
        });


        for (var i = 0; i < points.length; i+=3) {
            let pt = points[i];
            let vehicle = new Vehicle(p5, pt.x, pt.y);
            vehicles.push(vehicle);
        //
        //     p5.stroke(255);
        //     p5.strokeWeight(5);
        //     p5.point(pt.x, pt.y);
        }
    };

    const draw = (p5: p5Types) => {
        p5.background('#DDEDAA');
        p5.noStroke();
        p5.text('kynara', window.innerWidth/2-438, window.outerHeight/2);

        for (let i = 0; i < vehicles.length; i++) {
            let v = vehicles[i];
            v.behaviors(p5);
            v.update(p5);
            v.show(p5);
        }
    };

    return <Sketch setup={setup} draw={draw} preload={preload}/>;
};