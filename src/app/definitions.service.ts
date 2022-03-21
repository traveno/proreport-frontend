import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefinitionsService {
  private DEFINITIONS : DefinitionsObject | undefined;

  constructor() { }

  getDefinitions(): DefinitionsObject {
    if (this.DEFINITIONS === undefined)
      throw Error('Definitions undefined. Does definitions.json exist?');

    return this.DEFINITIONS;
  }

  async loadDefinitions(): Promise<any> {
    await new Promise(resolve => {
      chrome.storage.local.get(['definitions'], function(result) {
        resolve(result['definitions']);
      });
    }).then(result => {
      this.DEFINITIONS = result as DefinitionsObject;
    });
  }
}

export interface DefinitionsObject {
  departments: DeptObj[]
}

export interface DeptObj {
  department: string,
  pretty: string,
  machines: string[],
  query: string
}