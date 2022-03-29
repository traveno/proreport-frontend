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
      // chrome.storage.local.get(['definitions'], function(result) {
      //   resolve(result['definitions']);
      // });
      resolve(JSON.parse(def));
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

var def = `
{
  "departments": [
      {
          "department": "HAAS",
          "pretty": "Haas",
          "machines": ["HAAS1", "HAAS2", "HAAS3", "HAAS4", "HAAS5", "HAAS6", "HAAS7", "ROBO"],
          "query": "query56"
      },
      {
          "department": "DMU",
          "pretty": "DMU",
          "machines": ["DMU1", "DMU2", "DMU3", "DMU4"],
          "query": "query55"
      },
      {
          "department": "MAM",
          "pretty": "Matsuura",
          "machines": ["MAM1", "MAM2", "MAM3"],
          "query": "query58"
      },
      {
          "department": "MAK",
          "pretty": "Makino",
          "machines": ["MAK1", "MAK2", "MAK3", "MAK4", "MAK5", "MAK6", "MAK7"],
          "query": "query57"
      },
      {
          "department": "LATHE",
          "pretty": "Lathe",
          "machines": ["NL2500", "NLX2500", "NT1000", "NTX2000", "L2-20"],
          "query": "query59"
      }
  ]
}
`