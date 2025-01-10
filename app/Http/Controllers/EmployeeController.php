<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request) 
    {
        $query = $request->input('search'); // รับค่า search ที่ส่งมาจากหน้า index และเก็บไว้ในตัวแปร query

        $employees = DB::table('employees') // ดึงข้อมูลจากตาราง employees ในฐานข้อมูล
        ->where('first_name', 'like', '%' . $query . '%')
        ->orWhere('last_name', 'like', '%' . $query . '%') // ใช้ orWhere ใช้เมื่อเราต้องการให้เงื่อนไขการค้นหามีหลายตัวเลือกที่เชื่อมโยงกันด้วย OR
        ->paginate(10);// ใช้ paginate แบ่งหน้าผลลัพธ์ แสดงผลแค่ 10 รายการต่อหน้า

        return Inertia::render('Employee/index', [ //ส่งข้อมูลไปที่หน้า index 
            'employees' => $employees,//ข้อมูลพนักงานทั้งหมด
            'query' => $query, //ข้อมูลที่พิมพ์เข้าไปเราต้องการให้ค้างอยู่ในช่องค้นหา
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Employee $employee)
    {
        //
    }

    public function edit(Employee $employee)
    {
        //
    }

    public function update(Request $request, Employee $employee)
    {
        //
    }

    public function destroy(Employee $employee)
    {
        //
    }
}
