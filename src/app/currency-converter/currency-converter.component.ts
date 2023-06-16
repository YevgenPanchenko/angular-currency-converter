import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  amount: number = 0;
  fromCurrency: string = '';
  toCurrency: string = '';
  convertedAmount: number = 0;
  rates: any = {};

  ngOnInit(): void {
    this.getCurrencies();
  }

  async getCurrencies(): Promise<void> {
    const response = await fetch(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
    );
    const data = await response.json();

    data.forEach((currency: any) => {
      this.rates[currency.cc] = currency.rate;
    });

    this.rates.UAH = 1.0;
  }

  convertValue(): void {
    const inputValue = parseFloat(this.amount.toString());

    let convertedValue;

    if (this.fromCurrency === this.toCurrency) {
      convertedValue = inputValue;
    } else if (this.fromCurrency === 'UAH') {
      convertedValue = inputValue / this.rates[this.toCurrency];
    } else if (this.toCurrency === 'UAH') {
      convertedValue = inputValue * this.rates[this.fromCurrency];
    } else {
      convertedValue =
        (inputValue * this.rates[this.fromCurrency]) /
        this.rates[this.toCurrency];
    }

    this.convertedAmount = parseFloat(convertedValue.toFixed(2));
  }

  convertBack(): void {
    const inputValue = parseFloat(this.convertedAmount.toString());

    let convertedValue;

    if (this.fromCurrency === this.toCurrency) {
      convertedValue = inputValue;
    } else if (this.fromCurrency === 'UAH') {
      convertedValue = inputValue / this.rates[this.toCurrency];
    } else if (this.toCurrency === 'UAH') {
      convertedValue = inputValue * this.rates[this.fromCurrency];
    } else {
      convertedValue =
        (inputValue * this.rates[this.toCurrency]) /
        this.rates[this.fromCurrency];
    }

    this.amount = parseFloat(convertedValue.toFixed(2));
  }
  
}

