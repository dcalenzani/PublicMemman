import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
    const url = new URL(request.url);
    const month = url.searchParams.get('month');

    let report;
    try {
        const client = await pool.connect();
        report = await client.query(`
            SELECT
                teacher_hours.teacher_id as "DNI", 
                teacher_hours.firstname as "NOMBRE", 
                teacher_hours.lastname as "APELLIDO",
                TO_CHAR(teacher_hours.payment_month, 'Month') as "MES",
                teacher_hours.lesson_hours as "HORAS DE CLASE",
                teacher_hours.event_hours as "HORAS DE EVENTO",
                teacher_hours.total_hours as "HORAS TOTALES",
                teacher_students.total_students as "ESTUDIANTES TOTALES",
                teacher_avg_students.average_students as "ESTUDIANTES PROMEDIO"
            FROM 
                (
                    SELECT 
                        teacher_id, 
                        firstname, 
                        lastname,
                        payment_month,
                        ROUND(SUM(case when lesson_id is not null then total_hours else 0 end), 1) as lesson_hours,
                        ROUND(SUM(case when event_id is not null then total_hours else 0 end), 1) as event_hours,
                        ROUND(SUM(total_hours), 1) as total_hours
                    FROM 
                        (
                            SELECT 
                                l.teacher_id, 
                                l.id as lesson_id,
                                null as event_id,
                                u.firstname, 
                                u.lastname,
                                DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') as payment_month,
                                EXTRACT(EPOCH FROM l.duration)/3600 as total_hours
                            FROM 
                                climbing_gym.lesson l
                            JOIN 
                                climbing_gym.users u ON l.teacher_id = u.id
                            WHERE
                                l.lesson_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') 
                                AND l.lesson_date < DATE_TRUNC('month', CURRENT_DATE)

                            UNION ALL

                            SELECT 
                                et.teacher_id, 
                                null as lesson_id,
                                se.id as event_id,
                                u.firstname, 
                                u.lastname,
                                DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') as payment_month,
                                EXTRACT(EPOCH FROM se.duration)/3600 as total_hours
                            FROM 
                                climbing_gym.special_event se
                            JOIN 
                                climbing_gym.event_teachers et ON se.id = et.event_id
                            JOIN 
                                climbing_gym.users u ON et.teacher_id = u.id
                            WHERE
                                se.event_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') 
                                AND se.event_date < DATE_TRUNC('month', CURRENT_DATE)
                        ) AS combined
                    GROUP BY 
                        teacher_id, firstname, lastname, payment_month
                ) AS teacher_hours
                JOIN 
                (
                    SELECT 
                        l.teacher_id, 
                        COUNT(sa.student_id) as total_students
                    FROM 
                        climbing_gym.lesson l
                    JOIN 
                        climbing_gym.student_attendance sa ON l.id = sa.lesson_id
                    WHERE 
                        sa.attendance = TRUE
                    GROUP BY 
                        l.teacher_id
                ) AS teacher_students ON teacher_hours.teacher_id = teacher_students.teacher_id
                JOIN 
                (
                    SELECT 
                        subquery.teacher_id, 
                        ROUND(AVG(student_count), 2) as average_students
                    FROM 
                        (
                            SELECT 
                                l.teacher_id, 
                                COUNT(sa.student_id) as student_count
                            FROM 
                                climbing_gym.lesson l
                            JOIN 
                                climbing_gym.student_attendance sa ON l.id = sa.lesson_id
                            WHERE 
                                sa.attendance = TRUE
                            GROUP BY 
                                l.id, l.teacher_id
                        ) AS subquery
                    GROUP BY 
                        subquery.teacher_id
                ) AS teacher_avg_students ON teacher_hours.teacher_id = teacher_avg_students.teacher_id
            ORDER BY 
                teacher_hours.total_hours DESC, 
                teacher_students.total_students DESC, 
                teacher_avg_students.average_students DESC;
        `);
        client.release();
    } catch (error) {
        console.error('Error executing query', error);
        return NextResponse.json({ error: 'An error occurred while fetching the report' }, { status: 500 });
    }

    return NextResponse.json({ report: report.rows }, { status: 200 });
}
