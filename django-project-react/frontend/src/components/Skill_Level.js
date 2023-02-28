// import React,{Component} from 'react';
// import {Table} from 'react-bootstrap';


// //import 'bootstrap/dist/css/bootstrap.min.css';



// export class Skill_Levels extends Component{

//     constructor(){
//         super();
//         this.state={
//             skill:[]
//         }
//     }

//     refreshList(){
//         fetch('http://127.0.0.1:8000/Skill_Level/')
//         .then(response=>response.json())
//         .then(skill=>{
//             this.setState({
//                 skill:skill
//             });
//             console.log(skill);

//         })};


//     componentDidMount(){
//         this.refreshList();
//         }

//     componentDidUpadte(){
//         this.refreshList();
//             }
            

//     render(){
//         const skillData = this.state.skill;
//         const rows = skillData.map((skill) =>
//         <tr key={skill.id}>
//             <td>{skill.Skill_Level_ID}</td>
//             <td>{skill.Skill_Name}</td>
//             <td>{skill.Skill_Description}</td>    


//       </tr>
//         );

//         return(
         
//             <div>
//                 <p id="before-table"></p>
//                <Table className="table table-bordered" id="dataTable">
//                 <thead>
//                     <tr>
//                 <th>ID</th>
//                 <th>Skill Name</th>
//                 <th>Skill Description</th>

//                 </tr>
//                 </thead>
//                 <tbody>
//                     {rows} 
//                 </tbody>
//                 </Table>
//             </div>

//         )
//     }
// }