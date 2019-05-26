import React, { Component } from 'react';
import { PanelProps, PanelPlugin } from '@grafana/ui';
import { defaults, ATBEditor } from "./ATBEditor";
import {transform} from "./aggregationTransformer";
import './style/module.css';

interface dProps extends PanelProps {
  data: any
}
 
export class MyPanel extends Component<dProps> {

  constructor(props: dProps) {
    super(props);
  }

  render() { 
    const { data } = this.props;    
    const {rows,fields} = transform(data['series'][0].rows,data['series'][0].fields, this.props.options)
    return (
      <div>
        <table className={`table-wrapper`}>        
          <thead className={`table-header-wrapper`}>
            <tr className={`table-header-row`}>
            {fields.map(field => {
             return <th>
                {field.name}
              </th>
            })}
            </tr>
          </thead>
          <tbody className={`table-body-wrapper`}>
          {rows.map(row => {            
            return <tr className={`table-body-row`}>
              {row.map(element => {                
                let nivz = element > 5 ? 'green' : 'red';
                return <td className={`row ${nivz}`}>{element}</td>
              })}
            </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export const plugin = new PanelPlugin(MyPanel).setDefaults(defaults).setEditor(ATBEditor);
