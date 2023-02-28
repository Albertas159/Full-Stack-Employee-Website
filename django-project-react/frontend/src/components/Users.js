// import React,{Component} from 'react';
// import {Table} from 'react-bootstrap';


// //import 'bootstrap/dist/css/bootstrap.min.css';



// export class User extends Component{

//     constructor(){
//         super();
//         this.state={
//             userr:[]
//         }
//     }

//     refreshList(){
//         fetch('http://127.0.0.1:8000/Users/')
//         .then(response=>response.json())
//         .then(userr=>{
//             this.setState({
//                 userr:userr
//             });
//             console.log(userr);

//         })};


//     componentDidMount(){
//         this.refreshList();
//         }

//     componentDidUpadte(){
//         this.refreshList();
//             }
            

//     render(){
//         const userData = this.state.userr;
//         const rows = userData.map((user) =>
//         <tr key={user.id}>
//             <td>{user.UsersID}</td>
//             <td>{user.Username}</td>
//             <td>{user.Password}</td>
 


//       </tr>
//         );
        
//         return(
         
//             <div>
//                 <p id="before-table"></p>
//                <Table className="table table-bordered" id="dataTable">
//                 <thead>
//                     <tr>
//                 <th>ID</th>
//                 <th>Username</th>
//                 <th>Password</th>

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