-- 🔥 CLEAN RESET
TRUNCATE TABLE shipments, drivers, cities, states, users RESTART IDENTITY CASCADE;

--------------------------------------------------
-- STATES
--------------------------------------------------
INSERT INTO states (name) VALUES
('Karnataka'),
('Maharashtra'),
('Delhi'),
('Tamil Nadu'),
('West Bengal');

--------------------------------------------------
-- CITIES
--------------------------------------------------
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

--------------------------------------------------
-- DRIVERS
--------------------------------------------------
INSERT INTO drivers (name, phone, status) VALUES
('Driver1', '9999999991', 'AVAILABLE'),
('Driver2', '9999999992', 'AVAILABLE'),
('Driver3', '9999999993', 'AVAILABLE');

--------------------------------------------------
-- USERS (WITH HASHED PASSWORDS)
--------------------------------------------------
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@test.com', '$argon2id$v=19$m=65536,t=3,p=1$T0mLs+aSlFtjwpYqWV7ZCg$zHHpOjCzKKhNFlrxlhr/PYjKPyiKN6Lhc6km/RFPZqk', 'ROLE_ADMIN'),
('User1', 'user1@test.com', '$argon2id$v=19$m=65536,t=3,p=1$T0mLs+aSlFtjwpYqWV7ZCg$zHHpOjCzKKhNFlrxlhr/PYjKPyiKN6Lhc6km/RFPZqk', 'ROLE_USER'),
('User2', 'user2@test.com', '$argon2id$v=19$m=65536,t=3,p=1$T0mLs+aSlFtjwpYqWV7ZCg$zHHpOjCzKKhNFlrxlhr/PYjKPyiKN6Lhc6km/RFPZqk', 'ROLE_USER'),
('Manager1', 'manager@test.com', '$argon2id$v=19$m=65536,t=3,p=1$T0mLs+aSlFtjwpYqWV7ZCg$zHHpOjCzKKhNFlrxlhr/PYjKPyiKN6Lhc6km/RFPZqk', 'ROLE_MANAGER');

--------------------------------------------------
-- SHIPMENTS (LINKED TO USERS)
--------------------------------------------------
INSERT INTO shipments (pickup_location, delivery_location, route, cost, status, driver_id, user_id) VALUES
('Bangalore', 'Mumbai', 'Bangalore → Hub1 → Hub2 → Mumbai', 120, 'ASSIGNED', 1, 2),
('Delhi', 'Chennai', 'Delhi → Hub3 → Hub4 → Chennai', 200, 'IN_TRANSIT', 2, 3),
('Kolkata', 'Pune', 'Kolkata → Hub5 → Pune', 180, 'DELIVERED', 1, 2),
('Mysore', 'Nagpur', 'Mysore → Hub1 → Nagpur', 150, 'PENDING', NULL, 3);