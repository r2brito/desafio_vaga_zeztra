export default class ValidatorUtil {
  static document(document: string) {
    document = document.replace(/[^\d]/g, "");

    if (document.length === 11) {
      for (let i = 9; i < 11; i++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
          sum += parseInt(document.charAt(j), 10) * (i + 1 - j);
        }
        let remainder = sum % 11;
        let digit = remainder < 2 ? 0 : 11 - remainder;
        if (parseInt(document.charAt(i), 10) !== digit) {
          return false;
        }
      }
    }

    if (document.length === 14) {
      const calcDigit = (str, weights) => {
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
          sum += parseInt(str[i], 10) * weights[i];
        }
        let remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
      };

      const weightsForFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const weightsForSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      const firstDigit = calcDigit(document.substring(0, 12), weightsForFirstDigit);
      const secondDigit = calcDigit(
        document.substring(0, 12) + firstDigit,
        weightsForSecondDigit
      );

      return document.substring(12) === `${firstDigit}${secondDigit}`;
    }
  }
}

