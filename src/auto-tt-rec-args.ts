
export class AutoTTRecArgs {
  private isoFilename: string;

  constructor() {
    this.isoFilename = "";
  }

  setIsoFilename(isoFilename: string) {
    this.isoFilename = isoFilename;
  }

  getIsoFilename() {
    return this.isoFilename;
  }

}
