import * as THREE from 'three';

class Tween {
    constructor(start, target, length) {
        this.clock = new THREE.Clock();
        this.clock.start();      
        this.start = start;
        this.target = target;  
        this.length = length;    
    }

    get pct() {
        return Math.min(this.clock.getElapsedTime() / this.length, 1.0);
    }
    get done() {
        return this.pct == 1.0;
    }
    get current() { 
        return ((this.target - this.start) * this.pct) + this.start;    
    }
} 

export default Tween;