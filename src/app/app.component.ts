import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  card: number = null;
  deckOfCards: Array<any> = [];
  differential = 0;
  iterations = 0;
  totalCards = 52;
  totalIterations = 0;

  ngOnInit() {
    this.resetDeck();
  }

  resetDeck() {
    this.deckOfCards.length = 0;

    for (let i = 0; i < this.totalCards; i++) {
      this.deckOfCards.push({
        average: 0,
        card: i + 1,
        count: 0
      });
    }
  }

  simulate() {
    // this.resetDeck();
    this.totalIterations += Number(this.iterations);

    for (let j = 0; j < this.iterations; j++) {
      this.card = Math.floor(Math.random() * this.totalCards);
      this.deckOfCards[this.card].count += 1;
    }

    this.deckOfCards.map((card) => {
      if (card.count) {
        card.average = Number((card.count / this.totalIterations) * 100).toFixed(2);
      }
    });

    this.deckOfCards.sort((a, b) => {
      if (a.count === b.count) {
        return a.card - b.card;
      } else {
        return b.average - a.average;
      }
    });

    this.differential = Number(Number(this.deckOfCards[0].average - this.deckOfCards[this.deckOfCards.length - 1].average).toFixed(2));
  }
}
