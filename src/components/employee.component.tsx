import React, { SyntheticEvent, useEffect, useState } from "react";
import { Employee } from "../shared/models/employee";
import { Role } from "../shared/models/role";
import { roleService } from "../shared/service/role.service";

interface EmployeeFormProps {
    employee: Employee;
    onCancel: () => void;
    onSave: (employee: Employee) => void;
}

function EmployeeForm() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [employee, setEmployee] = useState();

    const [selectedValue, setSelectedValue] = useState('');
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    useEffect(() => {
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
    }, [])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        console.log('selected role: ', selectedValue)
    };

    const handleChange = (event: any) => {
        const {type, name, value, checked} = event.target;

        let updatedValue = type === 'checkbox' ? checked : value;

        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updateEmployee: Employee;

        // setEmployee((p) => {
        //     updateEmployee = new Employee({...p, ...change});
        //     return updateEmployee;  
        // })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" placeholder="enter first name"  onChange={handleChange}/>
            <label htmlFor="lastName">Last Name</label>
            <textarea name="lastName" placeholder="enter last name" onChange={handleChange}/>
            <label htmlFor="extension">Extension</label>
            <input type="number" name="extension" placeholder="enter extension"  onChange={handleChange} />
            <label htmlFor="role">Role:</label>
            <select value={selectedValue} onChange={handleSelectChange}>
                <option value="">Select Role</option>
                {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.roleName}</option>
                ))}
            </select>
                            
            <div>
                <button className="primary bordered medium">Save</button>
                <span />
                <button type="button" className="bordered medium" >
                    cancel
                </button>
            </div>
        </form>
    );
}

export default EmployeeForm;