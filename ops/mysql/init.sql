CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country VARCHAR(64) NOT NULL,
  name VARCHAR(128) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.8,
  duration VARCHAR(32) DEFAULT '5 nights',
  price INT DEFAULT 1500
);

INSERT INTO destinations (country, name, summary, rating, duration, price) VALUES
('Japan', 'Kyoto in layers', 'Ryokan mornings, tea ateliers, twilight through Torii gates.', 4.9, '5 nights', 1680),
('Portugal', 'Lisbon light', 'Azulejo facades, miradouros at blue hour, petiscos crawl.', 4.8, '4 nights', 1220),
('Iceland', 'Nordic contrast', 'Black sand arcs, geothermal swims, and stargazing domes.', 5.0, '6 nights', 1980);
