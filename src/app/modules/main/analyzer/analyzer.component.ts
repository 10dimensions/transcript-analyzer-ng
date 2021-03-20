import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import TemplateService from '../../../core/services/template.service';

import callsmockdata from './data/calls-mock-data.json';
import agentsmockdata from './data/agents-mock-data.json';
import transcriptmockdata from './data/transcript-mock-data.json';

@Component({
    selector: 'app-analyzer',
    templateUrl: './analyzer.component.html',
    styleUrls: ['./analyzer.component.scss']
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {

  agentsList : any[] = agentsmockdata;
  callsList: any[] = [];

    displayedColumns: string[] = [
        'time',
        'speaker',
        'sentence'
    ];

    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    dataSourceRep: MatTableDataSource<any> = new MatTableDataSource();

    @ViewChild('subHeader')
    subHeader?: TemplateRef<any>;

    get form(): FormGroup {
        return this._form;
    }
    private _form: FormGroup;

    constructor(
        private _tplService: TemplateService,
        private _fb: FormBuilder
    ) {
        this._form = this._fb.group({
            agent: _fb.control(null),
            call: _fb.control({
                value: null,
                disabled: true
            })
        });
    }

    ngOnInit(): void {

        this.dataSource.data = MOCK_DATA();
        this.dataSourceRep.data = MOCK_DATA().slice(-25);
    }

    ngAfterViewInit(): void {
        this._tplService.register('subHeader', this.subHeader);
    }

    fetchCallsForAgent(agent_id:string){
      this.callsList = callsmockdata.filter(function (el) {
        return el.agent[0].agent_id == agent_id;
      });
    }

    fetchTranscriptForCall(call_id: string){

      if(transcriptmockdata.call_id !== call_id)  return;

      const DATA: any[] = [];

      for (let i = 0; i < transcriptmockdata.script.length; i++){

        let _script = transcriptmockdata.script[i];

      DATA.push({
            time: ``,
            speaker: ``,
            sentence: transcriptmockdata.script[i].sentence,
            match: `${_script.similarity*100} % matching with line # '${_script.matching_sentence}'`,
        });
      }

      this.dataSourceRep.data = DATA;
    }
}

const MOCK_DATA = () => {
    const DATA: any[] = [];

    const SPEAKERS: string[] = agentsmockdata.map(function(item) {return item['full_name']});

    return DATA;

    // const SPEAKERS: string[] = [
    //     'Harvey',
    //     'Luke',
    //     'Unknown'
    // ];

    let currentTime = 30;

    for (let i = 0; i < 100; i++) {
        const min = Math.floor(currentTime / 60);
        const sec = Math.floor(currentTime - min * 60);

        DATA.push({
            time: `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`,
            speaker: SPEAKERS[Math.floor(Math.random() * (SPEAKERS.length))],
            sentence: `This is a sample sentence #${i + 1}`
        });

        currentTime += (Math.random() *  10) + 5;
    }

    return DATA;
};
