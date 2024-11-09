CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    soil_humidity INTEGER NOT NULL,
    air_humidity FLOAT NOT NULL,
    temperature FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sensor_data_created_at ON sensor_data(created_at);
