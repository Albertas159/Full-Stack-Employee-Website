// import React,{Component} from 'react';
// import {variables} from '../Variables.js';

// export class EmployeesManage extends Component{

//     constructor(props){
//         super(props);

//         this.state={
//             skilllevels:[],
//             employees:[],
//             modalTitle:"",
//             EmployeesID:0,
//             First_Name:"",
//             Last_Name:"",
//             Skill_Level:"",
//             Active:"",
//             Email:"",
//             Age:"",
//             DOB:""
//         }
//     }

//     refreshList(){

//         fetch(variables.API_URL+'Employees')
//         .then(response=>response.json())
//         .then(data=>{
//             this.setState({employees:data});
                    
        
//         });

//         // fetch(variables.API_URL+'Skill_Level')
//         // .then(response=>response.json())
//         // .then(data=>{
//         //     this.setState({skilllevels:data});
//         // });
//     }

//     componentDidMount(){
//         this.refreshList();
//     }
    
//     changeFirst_Name =(e)=>{
//         this.setState({First_Name:e.target.value});
//     }
//     changeLast_Name =(e)=>{
//         this.setState({Last_Name:e.target.value});
//     }
//     changeDOB =(e)=>{
//         this.setState({DOB:e.target.value});
//     }
//     changeEmail =(e)=>{
//         this.setState({Email:e.target.value});
//     }
//     changeSkill_Level =(e)=>{
//         this.setState({Skill_Level:e.target.value});
//     }
//     changeActive =(e)=>{
//         this.setState({Active:e.target.value});
//     }
//     changeAge =(e)=>{
//         this.setState({Age:e.target.value});
//     }

//     addClick(){
//         this.setState({
//             modalTitle:"Add Employee",
//             EmployeesID:0,
//             First_Name:"",
//             Last_Name:"",
//             Skill_Level:"",
//             Active:"",
//             Email:"",
//             Age:"",
//             DOB:"",
//         });
//     }
//     editClick(emp){
//         this.setState({
//             modalTitle:"Edit Employee",
//             EmployeesID:emp.EmployeesID,
//             First_Name:emp.First_Name,
//             Last_Name:emp.Last_Name,
//             DOB:emp.DOB,
//             Email:emp.Email,
//             Skill_Level:emp.Skill_Level,
//             Active:emp.Active,
//             Age:emp.Age
//         });
//     }

//     createClick(){
//         fetch(variables.API_URL+'Employees',{
//             method:'POST',
//             headers:{
//                 'Accept':'application/json',
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify({
//                 First_Name:this.state.First_Name,
//                 Last_Name:this.state.Last_Name,
//                 DOB:this.state.DOB,
//                 Email:this.state.Email,
//                 Skill_Level:this.state.Skill_Level,
//                 Active:this.state.Active,
//                 Age:this.state.Age
//             })
//         })
//         .then(res=>res.json())
//         .then((result)=>{
//             alert(result);
//             this.refreshList();
//         },(error)=>{
//             alert('\nOne or more fields may be incorrect refer to red text');
//         })
//     }


//     updateClick(){
//         fetch(variables.API_URL+'Employees',{
//             method:'PUT',
//             headers:{
//                 'Accept':'application/json',
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify({
//                 First_Name:this.state.First_Name,
//                 Last_Name:this.state.Last_Name,
//                 DOB:this.state.DOB,
//                 Email:this.state.Email,
//                 Skill_Level:this.state.Skill_Level,
//                 Active:this.state.Active,
//                 Age:this.state.Age
//             })
//         })
//         .then(res=>res.json())
//         .then((result)=>{
//             alert(result);
//             this.refreshList();
//         },(error)=>{
//             alert('\nOne or more fields may be incorrect refer to red text');
//         })
//     }

//     deleteClick(id){
//         if(window.confirm('Are you sure?')){
//         fetch(variables.API_URL+'Employees/'+id,{
//             method:'DELETE',
//             headers:{
//                 'Accept':'application/json',
//                 'Content-Type':'application/json'
//             }
//         })
//         .then(res=>res.json())
//         .then((result)=>{
//             alert(result);
//             this.refreshList();
//         },(error)=>{
//             alert('This field is already deleted');
//         })
//         }
//     }

//     render(){
//         const {
//             skilllevels,
//             employees,
//             modalTitle,
//             EmployeesID,
//             First_Name,
//             Last_Name,
//             DOB,
//             Email,
//             Skill_Level,
//             Active,
//             Age
//         }=this.state;

//         return(
// <div>

//     <button type="button"
//     className="btn btn-primary m-2 float-end"
//     data-bs-toggle="modal"
//     data-bs-target="#exampleModal"
//     onClick={()=>this.addClick()}>
//         Add Employee
//     </button>
//     <table className="table table-striped">
//     <thead>
//     <tr>
//         <th>
//             EmployeesID
//         </th>
//         <th>
//             First Name
//         </th>
//         <th>
//             Last Name
//         </th>
//         <th>
//             DOB
//         </th>
//         <th>
//             Email
//         </th>
//         <th>
//             Skill Level
//         </th>
//         <th>
//             Active
//         </th>
//         <th>
//             Age
//         </th>
//         <th>
//             Options
//         </th>
//     </tr>
//     </thead>
//     <tbody>
//         {employees.map(emp=>
//             <tr key={emp.EmployeesID}>
//                 <td>{emp.EmployeesID}</td>
//                 <td>{emp.First_Name}</td>
//                 <td>{emp.Last_Name}</td>
//                 <td>{emp.DOB}</td>
//                 <td>{emp.Email}</td>
//                 <td>{emp.Skill_Level}</td>
//                 <td>{emp.Active.toString()}</td>
//                 <td>{emp.Age}</td>
//                 <td>
//                 <button type="button"
//                 className="btn btn-light mr-1"
//                 data-bs-toggle="modal"
//                 data-bs-target="#exampleModal"
//                 onClick={()=>this.editClick(emp)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
//                     <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
//                     </svg>
//                 </button>

//                 <button type="button"
//                 className="btn btn-light mr-1"
//                 onClick={()=>this.deleteClick(emp.EmployeesID)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
//                     <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
//                     </svg>
//                 </button>

//                 </td>
//             </tr>
//             )}
//     </tbody>
//     </table>

// <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
// <div className="modal-dialog modal-lg modal-dialog-centered">
// <div className="modal-content">
//    <div className="modal-header">
//        <h5 className="modal-title">{modalTitle}</h5>
//        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
//        ></button>
//    </div>

//    <div className="modal-body">
//     <div className="d-flex flex-row bd-highlight mb-3">
     
//      <div className="p-2 w-50 bd-highlight">
    
//         <div className="input-group mb-3">
//             <span className="input-group-text">First Name</span>
//             <input type="text" className="form-control"
//             value={First_Name}
//             onChange={this.changeFirst_Name}/>
//         </div>
//         <div className="input-group mb-3">
//             <span className="input-group-text">Last Name</span>
//             <input type="text" className="form-control"
//             value={Last_Name}
//             onChange={this.changeLast_Name}/>
//         </div>
//         <div className="input-group mb-3">
//             <span className="input-group-text">DOB</span>
//             <input type="date" className="form-control"
//             value={DOB}
//             onChange={this.changeDOB}/>
//         </div>
//         <div className="input-group mb-3">
//             <span className="input-group-text">Email</span>
//             <input type="text" className="form-control"
//             value={Email}
//             onChange={this.changeEmail}/>
//         </div>
//         <div className="input-group mb-3">
//             <span className="input-group-text">Skill Level</span>
//             <select className="form-select"
//             onChange={this.changeSkill_Level}
//             value={Skill_Level}>
//                 {skilllevels.map(dep=><option key={dep.Skill_LevelId}>
//                     {dep.Skill_Name}
//                 </option>)}
//             </select>
//         </div>

//         <div className="input-group mb-3">
//             <span className="input-group-text">Active</span>
//             <input type="text" className="form-control"
//             value={Active}
//             onChange={this.changeActive}
//             placeholder={'true/false'}/>
//         </div>
//         <div className="input-group mb-3">
//             <span className="input-group-text">Age</span>
//             <input type="text" className="form-control"
//             value={Age}
//             onChange={this.changeAge}/>
//         </div>


//      </div>
//     </div>

//     {EmployeesID===0?
//         <button type="button"
//         className="btn btn-primary float-start"
//         onClick={()=>this.createClick()}
//         >Create</button>
//         :null}

//         {EmployeesID!==0?
//         <button type="button"
//         className="btn btn-primary float-start"
//         onClick={()=>this.updateClick()}
//         >Update</button>
//         :null}
//    </div>

// </div>
// </div> 
// </div>


// </div>
//         )
//     }
// }