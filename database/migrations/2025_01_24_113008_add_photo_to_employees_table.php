<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
             // เพิ่มคอลัมน์ photo แบบ nullable หลังจากคอลัมน์ hire_date
             $table->string('photo')->nullable()->after('hire_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            // ลบคอลัมน์ photo หากย้อนกลับ migration
            $table->dropColumn('photo');
        });
    }
};
