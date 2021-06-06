import React, { Component } from 'react';
import xlsx from 'xlsx'

class InputExcel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dosens: []
        }
    }
    handleOnChangeFile = (event) => {
        let result = {}
        let file = event.currentTarget.files[0];
        console.log(file);
        let reader = new FileReader();
        reader.onload= (e)=>{
            let wb = xlsx.read(reader.result, {type: 'binary'});
            let sheets = wb.SheetNames;
            let sheet = wb.Sheets[sheets[0]];
                result[sheets[0]] = xlsx.utils.sheet_to_json(sheet);
                console.log(result);
        }
        reader.readAsBinaryString(file);
    }
    render() {
        return (
            <div className="page-excel">
                <input onChange={this.handleOnChangeFile} type="file" name="file" id="file" />
            </div>
        )
    }
}

export default InputExcel