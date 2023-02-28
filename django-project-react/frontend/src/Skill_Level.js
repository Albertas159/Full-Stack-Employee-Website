import React,{Component} from 'react';
import {variables} from './Variables';

export class SkillLevel extends Component{

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
            modalTitle,
            Skill_Level_ID,
            Skill_Name,
            Skill_Description
        }=this.state;

        return(
<div>

    <table className="table table-striped">
    <thead>
    <tr>
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
    </tr>
    </thead>
    <tbody>
        {skilllevels.map(dep=>
            <tr key={dep.Skill_Level_ID}>
                <td>{dep.Skill_Name}</td>
                <td>{dep.Skill_Description}</td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
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
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {Skill_Level_ID!==0?
        <button type="button"
        className="btn btn-primary float-start"
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