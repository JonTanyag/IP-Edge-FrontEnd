import { AddEmployeeCommand } from "../models/addemployeeCommand";

const baseUrl = 'https://localhost:7291/api/';
const url = `${baseUrl}Employee`


const getEmployeeService = async (page: number = 1, pageSize: number = 20) => {
    const data = await fetch(`${url}?page=${page}&pageSize=${pageSize}`);
    return await data.json();
}

export {getEmployeeService}

const searchEmployeeService = async (searchTerm: string) => {
    const data = await fetch(`${url}/search?query=${searchTerm}`);
    return await data.json();
}

export {searchEmployeeService}

const deleteEmployeeService = async (id: number) => {
    await fetch(`${url}/`+id, {
        method: 'DELETE'
    }).catch((error) => {
        console.log(error);
    });
}

export {deleteEmployeeService}

const addEmployeeService = async (employeePayload: AddEmployeeCommand) => {
    await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            employeePayload
        )
    }).catch((error) => {
        console.log(error);
    });
}

export {addEmployeeService}