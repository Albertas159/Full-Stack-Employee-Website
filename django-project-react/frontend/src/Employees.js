import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Employee extends Component{

    constructor(props){
        super(props);

        this.state={
            skilllevels:[],
            employees:[],
            modalTitle:"",
            EmployeesID:0,
            First_Name:"",
            Last_Name:"",
            Skill_Level:"",
            Active:"",
            Email:"",
            Age:"",
            DOB:""
        }
    }

    refreshList(){

        fetch(variables.API_URL+'Employees')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data});
        });

        fetch(variables.API_URL+'Skill_Level')
        .then(response=>response.json())
        .then(data=>{
            this.setState({skilllevels:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
 render(){
        const {
            skilllevels,
            employees,
            modalTitle,
            EmployeesID,
            First_Name,
            Last_Name,
            DOB,
            Email,
            Skill_Level,
            Active,
            Age
        }=this.state;

        return(
<div>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            EmployeesID
        </th>
        <th>
            First Name
        </th>
        <th>
            Last Name
        </th>

        <th>
            Email
        </th>
        <th>
            Skill Level
        </th>

    </tr>
    </thead>
    <tbody>
        {employees.map(emp=>
            <tr key={emp.EmployeesID}>
                <td>{emp.EmployeesID}</td>
                <td>{emp.First_Name}</td>
                <td>{emp.Last_Name}</td>
                <td>{emp.Email}</td>
                <td>{emp.Skill_Level}</td>
            </tr>
            )}
    </tbody>
    </table>


</div>
        )
    }
}