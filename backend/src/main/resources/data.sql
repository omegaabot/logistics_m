TRUNCATE TABLE shipments, drivers, cities, states RESTART IDENTITY CASCADE;

-- STATES
INSERT INTO states (name) VALUES
('Karnataka'),
('Maharashtra'),
('Delhi'),
('Tamil Nadu'),
('West Bengal');

-- CITIES
INSERT INTO cities (name, state_id) VALUES
('Bangalore', 1),
('Mysore', 1),
('Mangalore', 1),
('Hubli', 1),

('Mumbai', 2),
('Pune', 2),
('Nagpur', 2),
('Nashik', 2),

('New Delhi', 3),
('Dwarka', 3),
('Rohini', 3),
('Saket', 3),

('Chennai', 4),
('Coimbatore', 4),
('Madurai', 4),
('Salem', 4),

('Kolkata', 5),
('Howrah', 5),
('Durgapur', 5),
('Siliguri', 5);

-- DRIVERS
INSERT INTO drivers (name, phone, status) VALUES
('Driver1', '9999999991', 'AVAILABLE'),
('Driver2', '9999999992', 'AVAILABLE'),
('Driver3', '9999999993', 'AVAILABLE');
