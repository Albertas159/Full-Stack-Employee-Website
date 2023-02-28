import React,{Component} from 'react';
import {variables} from '../Variables';
const data = JSON.parse(localStorage.getItem('authTokens'));
export class SkillManage extends Component{

    constructor(props){
        super(props);

        this.state={
            skilllevels:[],
            modalTitle:"",
            Skill_Name:"",
            Skill_Description:"",
            Skill_Level_ID:0,
        }
    }

    refreshList(){
        fetch(variables.API_URL+'api/SkillLevelView/',{
            method:'GET',
            headers:{
                'Authorization':'Bearer'+ ' '+ (JSON.parse(localStorage.getItem("authTokens")))["access"],
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({skilllevels:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeSkill_Name =(e)=>{
        this.setState({Skill_Name:e.target.value});
    }
    
    changeSkill_Description =(e)=>{
        this.setState({Skill_Description:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Skills",
            Skill_Level_ID:0,
            Skill_Name:"",
            Skill_Description:""
        });
    }
    editClick(dep){
        this.setState({
            modalTitle:"Edit Skill",
            Skill_Level_ID:dep.Skill_Level_ID,
            Skill_Name:dep.Skill_Name,
            Skill_Description:dep.Skill_Description
        });
    }

    createClick(){
        fetch(variables.API_URL+'api/SkillLevelView/',{
            method:'POST',
            headers:{
                'Authorization':'Bearer'+ ' '+ (JSON.parse(localStorage.getItem("authTokens")))["access"],
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Skill_Name:this.state.Skill_Name,
                Skill_Description:this.state.Skill_Description
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('\nOne or more fields may be incorrect refer to red text');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'api/SkillLevelView/',{
            method:'PUT',
            headers:{
                'Authorization':'Bearer'+ ' '+ (JSON.parse(localStorage.getItem("authTokens")))["access"],
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Skill_Level_ID:this.state.Skill_Level_ID,
                Skill_Name:this.state.Skill_Name,
                Skill_Description:this.state.Skill_Description
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('\nOne or more fields may be incorrect refer to red text');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Skill_Level/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
            alert('This field is already deleted');
        })
        }
    }

    render(){
        const {
            skilllevels,
            modalTitle,
            Skill_Level_ID,
            Skill_Name,
            Skill_Description
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-light btn-outline-primary float-end"
    data-bs-toggle="modal"
    data-bs-target="#skillModal"
    onClick={()=>this.addClick()}>
        Add Skills
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            </div>
            Skill Level ID
        </th>
        <th>
        <div className="d-flex flex-row">

            </div>
            Skill Name
      
        </th>
        <th>
        <div className="d-flex flex-row">
            </div>
            Skill Description
      
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {skilllevels.map(dep=>
            <tr key={dep.Skill_Level_ID}>
                <td key = {dep.Skill_Level_ID}>{dep.Skill_Level_ID}</td>
                <td key = {dep.Skill_Name}>{dep.Skill_Name}</td>
                <td key = {dep.Skill_Description}>{dep.Skill_Description}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#skillModal"
                onClick={()=>this.editClick(dep)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" color ="green">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(dep.Skill_Level_ID)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16" color ="red">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="skillModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">Skill Name</span>
        <input type="text" className="form-control" 
        value={Skill_Name}
        onChange={this.changeSkill_Name}/>
       </div>

       <div className="input-group mb-3">
            <span className="input-group-text">Skill Description</span>
        <input type="text" className="form-control" 
        value={Skill_Description}
        onChange={this.changeSkill_Description}/>
        </div>
        
        {Skill_Level_ID===0?
        <button type="button"
        className="btn btn-light btn-outline-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {Skill_Level_ID!==0?
        <button type="button"
        className="btn btn-light btn-outline-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

   </div>

</div>
</div> 
</div>


</div>
        )
    }
}