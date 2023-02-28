import React,{Component} from 'react';
import {variables} from './Variables';



export class Users extends Component{

    constructor(props){
        super(props);

        this.state={
            users:[],
            modalTitle:"",
            Username:"",
            Password:"",
            UsersID:0,

            UsersIDFilter:"",
            UsernameFilter:"",
            PasswordFilter:"",
            UserrWithoutFilter:[]
        }
    }

    FilterFn(){
        var UsersIDFilter=this.state.UsersIDFilter;
        var UsernameFilter = this.state.UsernameFilter;
        var PasswordFilter = this.state.PasswordFilter;

        var filteredData=this.state.UserrWithoutFilter.filter(
            function(el){
                return el.UsersID.toString().toLowerCase().includes(
                    UsersIDFilter.toString().trim().toLowerCase()
                )&&
                el.Username.toString().toLowerCase().includes(
                  UsernameFilter.toString().trim().toLowerCase()
                )&&
                el.Password.toString().toLowerCase().includes(
                    PasswordFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({users:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.UserrWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({users:sortedData});
    }



    refreshList(){
        fetch(variables.API_URL+'Users')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data,UserrWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }


    render(){
        const {
            users,
            modalTitle,
            UsersID,
            Username,
            Password
        }=this.state;

        return(
<div>
    
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            
            <input className="form-control m-2"
            onChange={this.changeUsersIDFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('UsersID',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16" color='LightGreen'>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('UsersID',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16" color='LightGreen'>
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>

            </div>
            UsersID
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changeUsernameFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('Username',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16" color='LightGreen'>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('Username',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16" color='LightGreen'>
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            Username
      
        </th>
    </tr>
    </thead>
    <tbody>
        {users.map(dep=>
            <tr key={dep.UsersID}>
                <td>{dep.UsersID}</td>
                <td>{dep.Username}</td>
            </tr>
            )}
    </tbody>
    </table>



</div>
        )
    }
}