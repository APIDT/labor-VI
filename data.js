const { Client } = require('pg')

async function createTables(client) {
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS djurnal (
                id SERIAL PRIMARY KEY,
                student_id INTEGER,
                subject VARCHAR(255),
                grade VARCHAR(10)
            )
        `)

        await client.query(`
            CREATE TABLE IF NOT EXISTS schedule (
                id SERIAL PRIMARY KEY,
                group_name VARCHAR(255),
                day_of_week VARCHAR(10),
                start_time TIME,
                end_time TIME,
                note TEXT
            )
        `)

        console.log('Tables created successfully.')
    } catch (error) {
        console.error('Error creating tables:', error)
    }
}

async function insertData(client) {
    try {
        const djurnalData = [
            { student_id: 1, subject: 'Math', grade: 'A' },
            { student_id: 2, subject: 'History', grade: 'B' },
            { student_id: 3, subject: 'Science', grade: 'C' }
        ]

        for (const item of djurnalData) {
            await client.query(`
                INSERT INTO djurnal (student_id, subject, grade)
                VALUES ($1, $2, $3)
            `, [item.student_id, item.subject, item.grade])
        }

        console.log('Sample data inserted into "djurnal" table successfully.')

    } catch (error) {
        console.error('Error inserting djurnal data:', error)
    }
}

async function insertScheduleData(client) {
    try {
        const scheduleData = [
            { group_name: 'Group A', day_of_week: 'Monday', start_time: '09:00', end_time: '11:00', note: 'No class' },
            { group_name: 'Group B', day_of_week: 'Wednesday', start_time: '13:00', end_time: '15:00', note: 'Exam' }
        ]

        for (const item of scheduleData) {
            await client.query(`
                INSERT INTO schedule (group_name, day_of_week, start_time, end_time, note)
                VALUES ($1, $2, $3, $4, $5)
            `, [item.group_name, item.day_of_week, item.start_time, item.end_time, item.note])
        }

        console.log('Sample data inserted into "schedule" table successfully.')

    } catch (error) {
        console.error('Error inserting schedule data:', error)
    }
}

async function main() {
    const client = new Client({
        host: 'cornelius.db.elephantsql.com',
        port: '62.122.202.91',
        database: 'timetable',
        user: 'qdrugoxk',
        password: 'YVQG8PHBjD7NTw14FCwo127aOe6v9InD',
    });

    try {
        await client.connect()

        await createTables(client) 

        await insertData(client) 

        await insertScheduleData(client)

    } catch (error) {
        console.error('Error executing queries:', error)
    } finally {
        await client.end()
    }
}

main().catch(console.error)
