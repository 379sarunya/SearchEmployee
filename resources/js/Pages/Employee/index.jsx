import { router } from '@inertiajs/react'; 
import { useState } from 'react'; 

//query = ค่าของการค้นหาที่ส่งมาจาก controller
//employees = ข้อมูลพนักงานทั้งหมดที่ส่งมาจาก controller

export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || ''); // กำหนด state สำหรับเก็บค่าการค้นหา โดยค่าเริ่มต้นมาจาก query

    const handleSearch = (e) => { // ฟังก์ชันสำหรับจัดการเมื่อทำการค้นหา
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า
        router.get('/employee', { search }); // ส่ง request พร้อมค่าค้นหาไปยัง route `/employee`
    };

    const handlePageChange = (page) => { // ตรวจสอบและเปลี่ยนหน้า
        if (page < 1 || page > employees.last_page) return; // ตรวจสอบให้แน่ใจว่าหน้าไม่เกินขอบเขต

        router.get('/employee', { search, page }); // ส่งคำขอไปที่หน้าถัดไปพร้อมกับการค้นหาหรือหน้า
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen"> 
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Employee List</h1> 

            <form onSubmit={handleSearch} className="mb-8 flex justify-center space-x-1"> 
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // เมื่อมีการเปลี่ยนแปลงใน input จะเรียกใช้ฟังก์ชันนี้
                    placeholder="Search Employee"
                    className="border border-gray-300 rounded-l-lg px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg " 
                >
                    Search
                </button>
            </form>

            <div className="overflow-x-auto shadow-lg rounded-lg"> 
                <table className="table-auto w-full bg-white border-collapse border border-gray-200">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('emp_no')}>ID</th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('first_name')}>First Name</th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('last_name')}>Last Name</th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('gender')}>Gender</th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('birth_date')}>Birthday</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {employees.data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">Employee Not Found</td>
                            </tr>
                        ) : (
                            employees.data.map((employee) => (
                                <tr key={employee.emp_no} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6">{employee.emp_no}</td>
                                    <td className="py-3 px-6">{employee.first_name}</td>
                                    <td className="py-3 px-6">{employee.last_name}</td>
                                    <td className="py-3 px-6">{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                                    <td className="py-3 px-6">{employee.birth_date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={() => handlePageChange(employees.current_page - 1)}
                    disabled={employees.current_page === 1}
                    className={`px-4 py-2 rounded-lg ${employees.current_page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Previous
                </button>

                <span className="text-gray-600">
                    Page {employees.current_page} of {employees.last_page}
                </span>

                <button
                    onClick={() => handlePageChange(employees.current_page + 1)}
                    disabled={employees.current_page === employees.last_page}
                    className={`px-4 py-2 rounded-lg ${employees.current_page === employees.last_page ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
