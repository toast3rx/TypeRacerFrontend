import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  @ViewChild('typingField') typingField: ElementRef;

  // Text showing in input field
  typedValue: string;

  // String coming from api
  words: string = 'hello world foo bar';

  wordsArray: string[];
  correctWords: string[];
  wrongWords: string[];

  timeLeftInSeconds: number;
  private totalTimeInSeconds: number;
  interval: NodeJS.Timer;

  wordsTyped: number;
  typingSpeed: number;

  constructor() {
    this.wordsArray = this.words.split('');
    this.correctWords = [];
    this.wrongWords = [];

    this.typedValue = '';

    this.timeLeftInSeconds = 60;
    this.totalTimeInSeconds = 60;

    this.wordsTyped = 0;
    this.typingSpeed = 0;
  }

  ngOnInit(): void {}

  public onSearchChange(value: InputEvent) {
    if (this.typedValue === '') {
      this.wordsArray = [...this.wrongWords, ...this.wordsArray];
      this.wrongWords = [];
    }
    if (value.data) {
      if (this.wordsArray[0] === value?.data && this.wrongWords.length === 0) {
        if (value.data === ' ') {
          this.typedValue = '';
          this.wordsTyped++;
        }
        this.correctWords.push(value.data);
        this.wordsArray.shift();
      } else {
        this.wrongWords.push(this.wordsArray[0]);
        this.wordsArray.shift();
      }
    } else if (this.wrongWords.length > 0) {
      let currentLetter = this.wrongWords.pop() as string;
      this.wordsArray.unshift(currentLetter);
    }

    if (this.correctWords.length === this.words.length) {
      this.wordsTyped++;
      this.stopGame();
    }
  }

  /**
   * Starts the game by enabling typing and starting the timer
   */
  startGame() {
    this.typingField.nativeElement.disabled = false;
    this.typingField.nativeElement.focus();
    this.startTimer();
  }

  /**
   * Stops the game by disabled typing and calculating typing speed
   */
  stopGame() {
    this.typingField.nativeElement.disabled = true;
    this.setTypingSpeed();
  }

  //////// Timer Methods ////////
  startTimer() {
    this.typingField.nativeElement.disabled = false;
    this.typingField.nativeElement.focus();
    this.interval = setInterval(() => {
      if (this.timeLeftInSeconds > 0) {
        this.timeLeftInSeconds--;
      }
    }, 1000);
  }

  resetTimer() {
    this.stopTimer();
    this.timeLeftInSeconds = 60;
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  /**
   * Calculate typing speed using time left on timer, total words typed
   */
  setTypingSpeed() {
    clearInterval(this.interval);
    this.typingSpeed = Math.trunc(
      (60 * this.wordsTyped) /
        (this.totalTimeInSeconds - this.timeLeftInSeconds)
    );
  }
}
