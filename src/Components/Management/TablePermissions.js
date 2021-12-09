import React from "react";
import './management.scss';
 
 
import search from '../../images/sesr.png';  
import aUp from '../../images/aup.png';


const Users = [
  {
    id: 1,
    selected: false,
    name: "create.role",
    description: "Create new Roles", 
    application: "SUSI Cloud", 
    component: "User Management", 
    module: "Analytics", 
    roles: "Cloud Owner", 
  },
  {
    id: 2,
    selected: false,
    name: "create.role",
    description: "Create new Roles", 
    application: "SUSI Cloud", 
    component: "User Management", 
    module: "Analytics", 
    roles: "Cloud Owner", 
  },
  
];

// Sorting function
const sortedList = (data, order, item) => {
  if (order === 'up') {
    return data.sort((a, b) => (a[item] > b[item] ? 1 : -1));
  }
  if (order === 'down') {
    return data.sort((a, b) => (a[item] > b[item] ? -1 : 1));
  }
}

class TableRoles extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      List: Users,
      MasterChecked: false,
      SelectedList: [],
      show: false,
      currentSort: 'up',
    };
  }

  handleModal() {
    this.setState({show:!this.state.show})
  }

  // Select/ UnSelect Table rows
  onMasterCheck(e) {
    let tempList = this.state.List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = this.state.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  onSortChange = () => {
    const {currentSort} = this.state;
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    if (currentSort === 'up') nextSort = 'down';
    this.setState({
      currentSort: nextSort,
    });
  };

  render() {
    return (
      <>
      <div className="table-componet">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    />
                  </th>
                  <th onClick={this.onSortChange} scope="col" className="id">ID <img src={aUp}/>{' '}</th>
                  <th scope="col" className="name">Permission Name</th>
                  <th scope="col" className="desc">Description</th>
                  <th scope="col" className="desc">Application</th>
                  <th scope="col" className="desc">Component</th> 
                  <th scope="col" className="desc">Module</th> 
                  <th scope="col" className="desc">Roles</th> 
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {sortedList(this.state.List, this.state.currentSort, 'id').map((user) => (
                  <tr key={user.id} className={user.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={user.selected}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                        onChange={(e) => this.onItemCheck(e, user)}
                      />
                    </th>
                    <td><span>{user.id}</span></td>
                    <td><span>{user.name}</span></td>
                    <td><span>{user.description}</span></td>
                    <td><span>{user.application}</span></td>
                    <td><span>{user.component}</span></td>
                    <td><span>{user.module}</span></td>
                    <td><span>{user.roles}</span></td>
                    <td><a href=""><img src={search}/></a></td>
                  </tr>
                ))}
              </tbody> 
            </table>
             
            
          </div>
        </div>
      </div> 

      </>
    );
  }
}

export default TableRoles;