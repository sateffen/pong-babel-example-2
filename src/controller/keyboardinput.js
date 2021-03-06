
export default class KeyboardInput {
    constructor(aPlayer) {
        this.player = aPlayer;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    
    handleKeyDown(aEvent) {
        if (aEvent.keyCode === 38) {
            this.player.speed = 0.2;
            this.player.direction[1] = -1;
        }
        
        if (aEvent.keyCode === 40) {
            this.player.speed = 0.2;
            this.player.direction[1] = 1;
        }
    }
    
    handleKeyUp(aEvent) {
        if (aEvent.keyCode === 38 || aEvent.keyCode === 40) {
            this.player.speed = 0;
            this.player.direction[1] = 0;
        }
    }
    
    apply() {
        document.body.addEventListener('keydown', this.handleKeyDown);
        document.body.addEventListener('keyup', this.handleKeyUp);
    }
}