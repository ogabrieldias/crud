import axios from 'axios';
import { useState} from 'react';

export default function TableList({ handleOpen, tableData, setTableData , searchTerm}) {
    const [error, setError] = useState(null);

    

     // Filter the tableData based on the searchTerm
     const filteredData = tableData.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/clients/${id}`);
                setTableData((prevData) => prevData.filter(client => client.id !== id)); // Update state
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        }
    };



    return (
        <>  

            {error && <div className="alert alert-error">{error}</div>}

            <div className="overflow-x-auto mt-10">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Trabalho</th>
                    <th>Avaliar</th>
                    <th>Status</th>

                </tr>
                </thead>
                <tbody className="hover">
                {/* row 1 */}

                {filteredData.map((client) => (
                <tr key={client.id}>
                    <th>{client.id}</th>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.job}</td>
                    <td>{client.rate}</td>
                    <td>
                        <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary` : `btn-outline btn-primary`}`}>
                            {client.isactive ? 'Active' : 'Inactive'}
                        </button>
                    </td>
                    <td>
                        <button onClick={() => handleOpen('edit', client)} className="btn btn-secondary">Update</button>
                    </td>
                    <td>
                        <button className="btn btn-accent"  onClick={() => handleDelete(client.id)}>Delete</button>
                    </td>

            

                </tr>
                ))}
                    
           
               
                </tbody>
            </table>
            </div>
        </>
    )
}