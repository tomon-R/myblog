/**
 * Generic classification for Custom Warniongs
 */

export abstract class CustomWarning {
  name: string;
  message: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }

  addChildName(childName: string): void {
    this.name = this.name + "." + childName;
  }
}
