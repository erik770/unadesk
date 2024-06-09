import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appGenerateDescription',
  standalone: true,
})
export class GenerateDescriptionPipe implements PipeTransform {
  transform(name: string): string {
    switch (Math.floor(Math.random() * (5 - 1 + 1) + 1)) {
      case 1:
        return `${name} крутой чел`;
      case 2:
        return `${name} нормальный чел`;
      case 3:
        return `${name} грустный чел`;
      case 4:
        return `${name} веселый чел`;
      case 5:
        return `${name} умный чел`;
      default:
        return `${name} необычный исключительный чел`;
    }
  }
}
