import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AddEmployeeCommand } from '../shared/models/addemployeeCommand';
import { Employee } from '../shared/models/employee';
import { Role } from '../shared/models/role';
import { addEmployeeService, deleteEmployeeService, getEmployeeService, searchEmployeeService } from '../shared/service/employee.service';
import { roleService } from '../shared/service/role.service';
import EmployeeForm from './employee.component';

interface EmployeeListProps {
    employees: Employee[];
    onSave: (employee: Employee) => void;
}

function HomePage() {
    const [employees, setEmployee] = useState<Employee[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [employeePayload, setEmployeePayload] = useState({
        firstName: "",
        lastName: "",
        extension: "",
        roleId: null
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(0);
    const [selectedPageSize, setSelectedPageSize] = useState('')

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const data = await getEmployeeService();
                setEmployee(data);
            } catch (error) {
                console.error(error);
            }
        };
        getEmployees();
    }, []);

    const handleButtonClick = () => {
        const getRoles = async () => {
            try {
                const data = await roleService();
                console.log('roles: ', data)
                setRoles(data);
            } catch (error) {
                console.error(error);
            }
        };

        getRoles();
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        // TODO: why POST method is returning 415 Status code 
        var newPayload = {
            firstName: employeePayload.firstName,
            lastName: employeePayload.lastName,
            extension: employeePayload.extension,
            roleId: selectedRole,
        }

        const payload = new AddEmployeeCommand(newPayload);
        try {
            const data = await addEmployeeService(payload);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteButtonClick = async (id: any) => {
        try {
            const data = await deleteEmployeeService(id);
        } catch (error) {
            console.error(error);
        } finally {
            const data = await getEmployeeService();
            setEmployee(data);
        }
    }

    const handleSelectPageSizeChange = async (event: any) => {
        setSelectedPageSize(event.target.value);
        const data = await getEmployeeService(1, event.target.value);
        setEmployee(data);
    }

    const handleSelectChange = (event: any) => {
        setSelectedRole(event.target.value);
        console.log('selected role: ', event.target.value)
    };

    const handleSearchChange = async (searchTerm: string) => {
        if (searchTerm !== '') {
            const data = await searchEmployeeService(searchTerm);
            setEmployee(data);
        } else {
            const data = await getEmployeeService();
            setEmployee(data);
        }
    }


    return (
        <div className='container'>
            <div className='labelDiv'>
                <div className='labelEmployee'>
                    <h2>Employee Tracking</h2>
                </div>
            </div>
            <div className='search-area'>
                <label>
                    Search:
                    <input placeholder='first name, lastname or role' type="text" onChange={(e) => handleSearchChange(e.target.value)} />
                </label>
            </div>
            <div className='tableDiv'>
                <table>
                    <thead>
                        <tr>
                            <th>Employee Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date Joined</th>
                            <th>Extension</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(item => (
                            <tr key={item.id}>
                                <td>{item.employeeNumber}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.dateJoined}</td>
                                <td>{item.extension}</td>
                                <td>{item.roleName}</td>
                                <td><button className="delete-button" onClick={() => handleDeleteButtonClick(item.id)}>x</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='pageSize'>
                    <label>Page Size: </label>
                    <select value={selectedPageSize} onChange={handleSelectPageSizeChange}>
                        <option value="select">Select Page Size</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
            <div className='action-buttons'>
                <div className='labelInput'>
                    <div className="input-group">
                        <button className="button" onClick={handleButtonClick}>Add</button>
                        <span />
                        {/* <button className="butto-edit" onClick={handleButtonClick}>Edit</button> */}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className='modal-overlay'>
                    <div className="modal">
                        <form className="input-group vertical" onSubmit={handleSubmit}>
                            <div className="modal-content">
                                <h2>Add Employee</h2>
                                <label>
                                    First Name:
                                    <input type="text" value={employeePayload?.firstName} onChange={(e) => setEmployeePayload({ ...employeePayload, firstName: e.target.value })} />
                                </label>
                                <br />
                                <label>
                                    Last Name:
                                    <input type="text" value={employeePayload?.lastName} onChange={(e) => setEmployeePayload({ ...employeePayload, lastName: e.target.value })} />
                                </label>
                                <br />
                                <label>
                                    Extension:
                                    <input type="number" value={employeePayload?.extension} onChange={(e) => setEmployeePayload({ ...employeePayload, extension: e.target.value })} />
                                </label>
                                <br />
                                <label>
                                    Role:
                                    <select value={selectedRole} onChange={handleSelectChange}>
                                        <option value="">Select Role</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.id}>{role.roleName}</option>
                                        ))}
                                    </select>
                                </label>
                                <div className="button-container">
                                    <button type="submit">Save</button>
                                    <button onClick={handleModalClose}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </div >
    )
}


export default HomePage;