import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import TemplateService from '../../../core/services/template.service';

import callsmockdata from './data/calls-mock-data.json';
import agentsmockdata from './data/agents-mock-data.json';
import transcriptmockdata from './data/transcript-mock-data.json';
import { isFunction } from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-analyzer',
    templateUrl: './analyzer.component.html',
    styleUrls: ['./analyzer.component.scss']
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {

  agentsList : any[] = agentsmockdata;
  callsList: any[] = [];
  agentSelected : any = null;
  customerSelected: any = null;

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

        this.dataSource.data = [];
        this.dataSourceRep.data = [];
    }

    ngAfterViewInit(): void {
        this._tplService.register('subHeader', this.subHeader);
    }

    fetchCallsForAgent(agent_id:string){
      this.callsList = callsmockdata.filter(function (el) {
        return el.agent[0].agent_id == agent_id;
      });

      this.agentSelected = this.agentsList.find(x => x.agent_id === agent_id)
    }

    fetchTranscriptForCall(call_id: string){

      if(transcriptmockdata.call_id !== call_id)  return;      

      this.dataSourceRep.data = DATA_EXPECTED();
      this.dataSource.data = DATA_REAL(this.agentSelected);

    }
}

const DATA_EXPECTED = () => {

  const DATA: any[] = [];
  for (let i = 0; i < transcriptmockdata.script.length; i++){

    let _script = transcriptmockdata.script[i];

    DATA.push({
      time: ``,
      speaker: ``,
      sentence: _script.sentence,
      match: `${_script.similarity*100} % matching with line # '${_script.matching_sentence}'`,
    });
  }

  return DATA;
};

const DATA_REAL = (agentSelected: any) => {

  const DATA: any[] = [];
  const agentChannel: number = transcriptmockdata.agent[0].channel_no;
  const customerChannel: number = transcriptmockdata.customer[0].channel_no;
  const customerName: string = transcriptmockdata.customer[0].full_name;

  for (let i = 0; i < transcriptmockdata.transcript.length; i++){

    let _script = transcriptmockdata.transcript[i];

    let _speaker = '';

    if(_script.channel === agentChannel)
      _speaker = agentSelected.full_name
    else if(_script.channel === customerChannel)
      _speaker = customerName
    else
      _speaker = 'Unknown'

    DATA.push({
      time: new Date(_script.timeFrom * 1000).toISOString().substr(14, 5),
      speaker: _speaker,
      sentence: _script.sentence,
      match: `${_script.similarity*100} % matching with line # '${_script.matching_sentence}'`,
    });
  }

  return DATA;
};

