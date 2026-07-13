CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	full_name VARCHAR(100) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	role VARCHAR(20) CHECK(role IN ('job_seeker','employer')) NOT NULL,
	phone VARCHAR(20),
	status VARCHAR(20) CHECK(status IN ('active','suspended','deleted')) DEFAULT 'active' NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);