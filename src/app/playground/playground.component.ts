import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  typedValue: string = '';

  words: string = 'hello world foo bar';
  wordsArray = this.words.split('');
  correctWords: string[] = [];
  wrongWords: string[] = [];

  constructor() {}

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
  }
}
