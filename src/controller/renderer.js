import Player from '../models/player';
import Ball from '../models/ball';
import PlayField from '../models/playfield';
import AI from './ai';
import KeyboardInput from './keyboardinput';

export default class Renderer {
    constructor() {
        this._ctx = null;
        this._lastRenderTime = null;

        this.playField = new PlayField(800, 600);
        this.player1 = new Player(10, 270, 10, 60);
        this.player2 = new Player(780, 270, 10, 60);
        this.ball = new Ball(400, 300, 5);

        const player1KeyBoardInput = new KeyboardInput(this.player1);
        const player2AI = new AI(this.player2, this.ball);

        player1KeyBoardInput.apply();
        player2AI.apply();
        this.loop = this.loop.bind(this);
    }

    appendToElement(aElement) {
        const canvas = this.playField.getCanvasElement();

        aElement.appendChild(canvas);

        this._ctx = canvas.getContext('2d');
    }

    render() {
        this.playField.render(this._ctx);
        this.ball.render(this._ctx);
        this.player1.render(this._ctx);
        this.player2.render(this._ctx);

        this._lastRenderTime = (new Date()).valueOf();
    }

    recalculateBall(aTimeSinceLastFrame) {
        let tmp = 0;
        let currentBallPosition = [this.ball.x, this.ball.y];
        let ballPositionTransformation = this.ball.direction.map((aDirection) => {
            return aDirection * this.ball.speed * aTimeSinceLastFrame;
        });
        const nextEstimatedBallPosition = [
            currentBallPosition[0] + ballPositionTransformation[0],
            currentBallPosition[1] + ballPositionTransformation[1]
        ];
        const ballHitsPlayer = nextEstimatedBallPosition[0] < this.player1.x + this.player1.width ||
            nextEstimatedBallPosition[0] > this.player2.x;
        const ballHitsBorders = nextEstimatedBallPosition[1] < this.ball.radius ||
            nextEstimatedBallPosition[1] > this.playField.height - this.ball.radius;

        this.ball.speed = this.ball.speed + 0.000025 * aTimeSinceLastFrame;

        if (ballHitsPlayer) {
            // if the ball hits the player 1
            if (nextEstimatedBallPosition[0] < this.player1.x + this.player1.width &&
                nextEstimatedBallPosition[1] > this.player1.y - this.ball.radius &&
                nextEstimatedBallPosition[1] < this.player1.y + this.player1.height + this.ball.radius
            ) {
                tmp = currentBallPosition[0] * this.ball.speed / (this.player1.x + this.player1.width);
                this.ball.direction[1] = this.ball.direction[1] + this.player1.speed * this.player1.direction[1];
            }
            // else if the ball hits the player 2
            else if (nextEstimatedBallPosition[0] > this.player2.x &&
                nextEstimatedBallPosition[1] > this.player2.y - this.ball.radius &&
                nextEstimatedBallPosition[1] < this.player2.y + this.player2.height + this.ball.radius
            ) {
                tmp = currentBallPosition[0] * this.ball.speed / this.player2.x;
                this.ball.direction[1] = this.ball.direction[1] + this.player2.speed * this.player2.direction[1];
            }
            // else the ball scores a point
            else {
                this.ball.speed = 0.3;
                this.ball.direction = [1, 0];
                currentBallPosition = [400, 300];
                tmp = 0;
            }

            ballPositionTransformation = this.ball.direction.map((aDirection) => {
                return aDirection * this.ball.speed * tmp;
            });

            this.ball.direction[0] = -1 * this.ball.direction[0];
        }

        if (ballHitsBorders) {
            if (nextEstimatedBallPosition[1] < 0) {
                tmp = currentBallPosition[1] * this.ball.speed / this.ball.radius;
            }
            else {
                tmp = currentBallPosition[1] * this.ball.speed / (this.playField.height - this.ball.radius);
            }

            ballPositionTransformation = this.ball.direction.map((aDirection) => {
                return aDirection * this.ball.speed * tmp;
            });

            this.ball.direction[1] = -1 * this.ball.direction[1];
        }

        this.ball.x = currentBallPosition[0] + ballPositionTransformation[0];
        this.ball.y = currentBallPosition[1] + ballPositionTransformation[1];
    }

    recalculatePlayer(aTimeSinceLastFrame, aPlayer) {
        const currentPosition = [aPlayer.x, aPlayer.y];
        const playerTransformation = aPlayer.direction.map((aDirection) => {
            return aDirection * aPlayer.speed * aTimeSinceLastFrame;
        });
        const nextPosition = [
            currentPosition[0] + playerTransformation[0],
            currentPosition[1] + playerTransformation[1]
        ];

        if (nextPosition[1] < 0) {
            nextPosition[1] = 0;
        }
        else if (nextPosition[1] + aPlayer.height > this.playField.height) {
            nextPosition[1] = this.playField.height - aPlayer.height;
        }

        aPlayer.x = nextPosition[0];
        aPlayer.y = nextPosition[1];
    }

    loop() {
        if (this._lastRenderTime === null) {
            this.render();
        }

        const timeSinceLastFrame = (new Date()).valueOf() - this._lastRenderTime;

        this.recalculatePlayer(timeSinceLastFrame, this.player1);
        this.recalculatePlayer(timeSinceLastFrame, this.player2);
        this.recalculateBall(timeSinceLastFrame);
        this.render();

        window.requestAnimationFrame(this.loop);
    }

    start() {
        window.requestAnimationFrame(this.loop);
    }
}